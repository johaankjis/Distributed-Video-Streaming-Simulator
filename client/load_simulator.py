import grpc
import asyncio
import time
import random
from concurrent.futures import ThreadPoolExecutor
import video_streaming_pb2
import video_streaming_pb2_grpc
from prometheus_client import Counter, Histogram, Gauge, start_http_server

# Prometheus metrics for client
CLIENT_STREAMS = Counter('client_streams_total', 'Total streams initiated', ['quality'])
CLIENT_CHUNKS_RECEIVED = Counter('client_chunks_received_total', 'Total chunks received')
CLIENT_LATENCY = Histogram('client_stream_latency_seconds', 'Client-side latency')
CLIENT_ERRORS = Counter('client_errors_total', 'Total client errors', ['error_type'])
ACTIVE_CLIENTS = Gauge('active_clients', 'Number of active client connections')

class VideoClient:
    def __init__(self, server_address, client_id):
        self.server_address = server_address
        self.client_id = client_id
        self.channel = None
        self.stub = None
        
    def connect(self):
        """Connect to gRPC server"""
        self.channel = grpc.insecure_channel(self.server_address)
        self.stub = video_streaming_pb2_grpc.VideoStreamingServiceStub(self.channel)
        
    def stream_video(self, video_id, quality):
        """Stream a video from the server"""
        try:
            ACTIVE_CLIENTS.inc()
            CLIENT_STREAMS.labels(quality=quality).inc()
            
            request = video_streaming_pb2.StreamRequest(
                video_id=video_id,
                quality=quality,
                client_id=self.client_id
            )
            
            start_time = time.time()
            chunks_received = 0
            
            for chunk in self.stub.StreamVideoChunks(request):
                chunks_received += 1
                CLIENT_CHUNKS_RECEIVED.inc()
                
                # Simulate client processing time
                time.sleep(random.uniform(0.001, 0.005))
            
            duration = time.time() - start_time
            CLIENT_LATENCY.observe(duration)
            
            print(f"Client {self.client_id}: Received {chunks_received} chunks in {duration:.2f}s")
            
        except grpc.RpcError as e:
            error_type = e.code().name
            CLIENT_ERRORS.labels(error_type=error_type).inc()
            print(f"Client {self.client_id}: Stream error - {error_type}")
        finally:
            ACTIVE_CLIENTS.dec()
            
    def close(self):
        """Close the connection"""
        if self.channel:
            self.channel.close()

def simulate_client(client_id, server_addresses, num_streams=5):
    """Simulate a single client making multiple stream requests"""
    qualities = ['low', 'medium', 'high']
    
    for i in range(num_streams):
        # Random server selection (load balancing simulation)
        server = random.choice(server_addresses)
        quality = random.choice(qualities)
        video_id = f"video_{random.randint(1, 100)}"
        
        client = VideoClient(server, f"client_{client_id}")
        client.connect()
        client.stream_video(video_id, quality)
        client.close()
        
        # Random delay between streams
        time.sleep(random.uniform(1, 5))

def run_load_test(num_clients=100, server_addresses=None):
    """Run load test with multiple concurrent clients"""
    if server_addresses is None:
        server_addresses = ['localhost:50051']
    
    # Start Prometheus metrics server for clients
    start_http_server(8001)
    print(f"Client metrics available at http://0.0.0.0:8001/metrics")
    
    print(f"Starting load test with {num_clients} clients...")
    print(f"Target servers: {server_addresses}")
    
    with ThreadPoolExecutor(max_workers=num_clients) as executor:
        futures = []
        for i in range(num_clients):
            future = executor.submit(simulate_client, i, server_addresses, num_streams=3)
            futures.append(future)
            
            # Stagger client start times
            time.sleep(0.1)
        
        # Wait for all clients to complete
        for future in futures:
            future.result()
    
    print("Load test completed!")

if __name__ == '__main__':
    # For Kubernetes deployment, read server addresses from environment
    import os
    servers = os.getenv('SERVER_ADDRESSES', 'localhost:50051').split(',')
    num_clients = int(os.getenv('NUM_CLIENTS', '100'))
    
    run_load_test(num_clients=num_clients, server_addresses=servers)
