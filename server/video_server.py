import grpc
from concurrent import futures
import time
import random
import os
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import video_streaming_pb2
import video_streaming_pb2_grpc

# Prometheus metrics
STREAM_COUNTER = Counter('video_streams_total', 'Total number of video streams', ['quality', 'node_id'])
CHUNK_COUNTER = Counter('video_chunks_sent_total', 'Total chunks sent', ['node_id'])
STREAM_LATENCY = Histogram('stream_chunk_latency_seconds', 'Latency per chunk', ['node_id'])
ACTIVE_CONNECTIONS = Gauge('active_connections', 'Number of active streaming connections', ['node_id'])
CHUNK_ERROR_RATE = Counter('chunk_errors_total', 'Total chunk delivery errors', ['node_id'])

NODE_ID = os.getenv('NODE_ID', 'node-1')

class VideoStreamingService(video_streaming_pb2_grpc.VideoStreamingServiceServicer):
    def __init__(self):
        self.active_connections = 0
        self.total_chunks_sent = 0
        
    def StreamVideoChunks(self, request, context):
        """Stream video chunks to client with simulated network conditions"""
        self.active_connections += 1
        ACTIVE_CONNECTIONS.labels(node_id=NODE_ID).set(self.active_connections)
        STREAM_COUNTER.labels(quality=request.quality, node_id=NODE_ID).inc()
        
        try:
            # Simulate 1-minute video (60 seconds)
            # Chunk size based on quality
            chunk_sizes = {
                'low': 256 * 1024,      # 256 KB
                'medium': 512 * 1024,   # 512 KB
                'high': 1024 * 1024     # 1 MB
            }
            
            chunk_size = chunk_sizes.get(request.quality, 512 * 1024)
            chunks_per_second = 20  # 20 chunks per second
            total_chunks = 60 * chunks_per_second  # 1200 chunks for 1-minute video
            
            for chunk_num in range(total_chunks):
                # Simulate network variability (50-100ms delay)
                delay = random.uniform(0.05, 0.1)
                time.sleep(delay)
                
                # Record latency
                with STREAM_LATENCY.labels(node_id=NODE_ID).time():
                    # Generate simulated chunk data
                    chunk_data = os.urandom(chunk_size)
                    
                    chunk = video_streaming_pb2.VideoChunk(
                        data=chunk_data,
                        chunk_number=chunk_num,
                        timestamp=int(time.time() * 1000),
                        size_bytes=chunk_size,
                        quality=request.quality
                    )
                    
                    # Simulate occasional errors (1% error rate)
                    if random.random() < 0.01:
                        CHUNK_ERROR_RATE.labels(node_id=NODE_ID).inc()
                        context.abort(grpc.StatusCode.UNAVAILABLE, "Chunk delivery failed")
                    
                    yield chunk
                    
                    CHUNK_COUNTER.labels(node_id=NODE_ID).inc()
                    self.total_chunks_sent += 1
                    
        except Exception as e:
            print(f"Error streaming video: {e}")
            CHUNK_ERROR_RATE.labels(node_id=NODE_ID).inc()
        finally:
            self.active_connections -= 1
            ACTIVE_CONNECTIONS.labels(node_id=NODE_ID).set(self.active_connections)
    
    def GetServerHealth(self, request, context):
        """Return server health metrics"""
        return video_streaming_pb2.HealthResponse(
            status="healthy",
            active_connections=self.active_connections,
            cpu_usage=random.uniform(20, 80),  # Simulated CPU usage
            memory_usage=random.uniform(30, 70),  # Simulated memory usage
            total_chunks_sent=self.total_chunks_sent
        )

def serve():
    # Start Prometheus metrics server
    start_http_server(8000)
    print(f"Prometheus metrics available at http://0.0.0.0:8000/metrics")
    
    # Start gRPC server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=100))
    video_streaming_pb2_grpc.add_VideoStreamingServiceServicer_to_server(
        VideoStreamingService(), server
    )
    
    port = os.getenv('GRPC_PORT', '50051')
    server.add_insecure_port(f'[::]:{port}')
    server.start()
    
    print(f"Video streaming server started on port {port} (Node: {NODE_ID})")
    
    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
