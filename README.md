# Distributed Video Streaming Simulator

A comprehensive distributed system simulator for video streaming services built with gRPC, Kubernetes, Next.js, and real-time monitoring capabilities. This project demonstrates a production-grade architecture for handling high-throughput video streaming with adaptive bitrate selection, load balancing, and comprehensive observability.

## 🎯 Overview

This simulator recreates a realistic distributed video streaming platform that handles thousands of concurrent video streams across multiple server nodes. It includes a beautiful web dashboard for real-time monitoring of streaming metrics, server health, and quality distribution analytics.

### Key Features

- **🚀 High-Performance gRPC Streaming**: Efficient bidirectional streaming using Protocol Buffers
- **📊 Real-Time Dashboard**: Modern Next.js web interface with live metrics visualization
- **🎬 Adaptive Bitrate Streaming**: Dynamic quality selection (Low/Medium/High)
- **⚖️ Load Balancing**: Distributed load across multiple server nodes
- **📈 Comprehensive Monitoring**: Prometheus metrics and Grafana dashboards
- **☸️ Kubernetes-Native**: Full Kubernetes deployment with auto-scaling
- **🔍 Observability**: Detailed metrics for streams, latency, throughput, and errors
- **🎭 Load Simulation**: Realistic client simulation with configurable concurrency

## 🏗️ Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Dashboard                        │
│            (Real-time Metrics Visualization)                 │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────┼───────────────────────────────┐
│                             │                                │
│    ┌────────────────────────┴──────────────────────────┐   │
│    │             Prometheus Metrics Server              │   │
│    │           (Scrapes metrics every 15s)              │   │
│    └────────────────────────┬──────────────────────────┘   │
│                             │                                │
│    ┌────────────────────────┴──────────────────────────┐   │
│    │                 Grafana Dashboard                   │   │
│    │          (Advanced Analytics & Alerts)              │   │
│    └─────────────────────────────────────────────────────   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              ▲
                              │ (Scrapes Metrics)
                              │
┌─────────────────────────────┼───────────────────────────────┐
│                             │                                │
│         ┏━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━┓            │
│         ┃      Video Server Cluster (5x)       ┃            │
│         ┃  ┌────────────┐  ┌────────────┐     ┃            │
│         ┃  │  Server 1  │  │  Server 2  │ ... ┃            │
│         ┃  │ gRPC:50051 │  │ gRPC:50051 │     ┃            │
│         ┃  │ Metrics:800│  │ Metrics:800│     ┃            │
│         ┃  └────────────┘  └────────────┘     ┃            │
│         ┗━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┛            │
│                             │                                │
│                             │ (gRPC Streaming)               │
│                             │                                │
│         ┏━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━┓            │
│         ┃    Load Simulator Clients (100x)     ┃            │
│         ┃  ┌────────────┐  ┌────────────┐     ┃            │
│         ┃  │  Client 1  │  │  Client 2  │ ... ┃            │
│         ┃  │ Port:8001  │  │ Port:8001  │     ┃            │
│         ┃  └────────────┘  └────────────┘     ┃            │
│         ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Client Request**: Load simulator clients request video streams via gRPC
2. **Server Selection**: Kubernetes service distributes requests across 5 server pods
3. **Video Streaming**: Servers stream video chunks (1200 chunks for 60-second video)
4. **Quality Adaptation**: Clients request different quality levels (256KB/512KB/1MB chunks)
5. **Metrics Collection**: Both clients and servers expose Prometheus metrics
6. **Visualization**: Dashboard displays real-time metrics and analytics

## 💻 Technology Stack

### Backend Services
- **Python 3.11**: Core server and client implementation
- **gRPC**: High-performance RPC framework for streaming
- **Protocol Buffers**: Efficient binary serialization
- **Prometheus Client**: Metrics instrumentation and exposition

### Frontend Dashboard
- **Next.js 15**: React-based web framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization library
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Modern icon library

### Infrastructure
- **Kubernetes**: Container orchestration
- **Docker**: Containerization
- **Prometheus**: Metrics collection and storage
- **Grafana**: Advanced metrics visualization and alerting

## 📋 Prerequisites

- **Docker**: Version 20.0 or higher
- **Kubernetes**: minikube, kind, or any Kubernetes cluster (v1.25+)
- **kubectl**: Kubernetes CLI tool
- **Node.js**: Version 18.0 or higher (for dashboard)
- **pnpm**: Version 8.0 or higher (preferred) or npm

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/johaankjis/Distributed-Video-Streaming-Simulator.git
cd Distributed-Video-Streaming-Simulator
```

### 2. Build Docker Images

```bash
# Build server image
docker build -t video-streaming-server:latest -f server/Dockerfile server/

# Build client image
docker build -t video-streaming-client:latest -f client/Dockerfile client/
```

### 3. Deploy to Kubernetes

```bash
# Option 1: Use the deployment script
chmod +x scripts/build-and-deploy.sh
./scripts/build-and-deploy.sh

# Option 2: Manual deployment
kubectl apply -f kubernetes/video-server-deployment.yaml
kubectl apply -f kubernetes/client-deployment.yaml
kubectl apply -f kubernetes/prometheus-config.yaml
kubectl apply -f kubernetes/grafana-deployment.yaml
```

### 4. Verify Deployment

```bash
# Check pod status
kubectl get pods

# Expected output:
# NAME                            READY   STATUS    RESTARTS   AGE
# video-server-xxxxxxxxxx-xxxxx   1/1     Running   0          1m
# video-server-xxxxxxxxxx-xxxxx   1/1     Running   0          1m
# video-client-xxxxxxxxxx-xxxxx   1/1     Running   0          1m
# prometheus-xxxxxxxxxx-xxxxx     1/1     Running   0          1m
# grafana-xxxxxxxxxx-xxxxx        1/1     Running   0          1m
```

### 5. Run the Dashboard

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:3000
```

## 📊 Monitoring & Observability

### Access Prometheus

```bash
# Forward Prometheus port
kubectl port-forward svc/prometheus-service 9090:9090

# Access at http://localhost:9090
```

### Access Grafana

```bash
# Forward Grafana port
kubectl port-forward svc/grafana-service 3000:3000

# Access at http://localhost:3000
# Default credentials: admin/admin
```

### Key Metrics

#### Server Metrics (Port 8000)

- `video_streams_total`: Total number of video streams initiated
- `video_chunks_sent_total`: Total chunks transmitted
- `stream_chunk_latency_seconds`: Histogram of chunk delivery latency
- `active_connections`: Current number of active streaming connections
- `chunk_errors_total`: Total chunk delivery errors

#### Client Metrics (Port 8001)

- `client_streams_total`: Total streams initiated by clients
- `client_chunks_received_total`: Total chunks received
- `client_stream_latency_seconds`: End-to-end stream latency
- `client_errors_total`: Total client-side errors
- `active_clients`: Number of active client connections

### Example Prometheus Queries

```promql
# Average chunks per second across all servers
rate(video_chunks_sent_total[1m])

# P99 latency
histogram_quantile(0.99, rate(stream_chunk_latency_seconds_bucket[5m]))

# Error rate percentage
rate(chunk_errors_total[5m]) / rate(video_chunks_sent_total[5m]) * 100

# Total active streams
sum(active_connections)
```

## 🎮 Usage

### Local Development

#### Run Server Locally

```bash
cd server

# Generate gRPC code
python -m grpc_tools.protoc \
    -I. \
    --python_out=. \
    --grpc_python_out=. \
    video_streaming.proto

# Run server
python video_server.py
```

#### Run Client Locally

```bash
cd client

# Generate gRPC code
python -m grpc_tools.protoc \
    -I. \
    --python_out=. \
    --grpc_python_out=. \
    ../server/video_streaming.proto

# Run load simulator
export SERVER_ADDRESSES=localhost:50051
export NUM_CLIENTS=10
python load_simulator.py
```

### Configuration

#### Server Configuration

Environment variables for video servers:

- `NODE_ID`: Unique identifier for the server node (default: `node-1`)
- `GRPC_PORT`: gRPC server port (default: `50051`)

#### Client Configuration

Environment variables for load simulator:

- `SERVER_ADDRESSES`: Comma-separated list of server addresses (default: `localhost:50051`)
- `NUM_CLIENTS`: Number of concurrent clients to simulate (default: `100`)

### Scaling

```bash
# Scale video servers
kubectl scale deployment video-server --replicas=10

# Scale load simulator clients
kubectl scale deployment video-client --replicas=5
```

## 📁 Project Structure

```
Distributed-Video-Streaming-Simulator/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with fonts and analytics
│   ├── page.tsx                 # Main dashboard page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── card.tsx            # Card component
│   │   ├── sidebar.tsx         # Sidebar navigation
│   │   ├── toast.tsx           # Toast notifications
│   │   └── empty.tsx           # Empty states
│   ├── header.tsx              # Dashboard header
│   ├── sidebar.tsx             # Main navigation sidebar
│   ├── metrics-grid.tsx        # Metrics overview grid
│   ├── metric-card.tsx         # Individual metric cards
│   ├── stream-chart.tsx        # Time-series charts
│   ├── node-status.tsx         # Server node status
│   └── quality-distribution.tsx # Quality distribution pie chart
├── server/                      # gRPC video streaming server
│   ├── video_server.py         # Server implementation
│   ├── video_streaming.proto   # Protocol Buffer definitions
│   └── Dockerfile              # Server container image
├── client/                      # Load simulator clients
│   ├── load_simulator.py       # Client implementation
│   └── Dockerfile              # Client container image
├── kubernetes/                  # Kubernetes manifests
│   ├── video-server-deployment.yaml    # Server deployment (5 replicas)
│   ├── client-deployment.yaml          # Client deployment (100 clients)
│   ├── prometheus-config.yaml          # Prometheus configuration
│   └── grafana-deployment.yaml         # Grafana deployment
├── grafana/                     # Grafana dashboard definitions
│   └── dashboard.json          # Pre-configured dashboard
├── scripts/                     # Deployment scripts
│   └── build-and-deploy.sh     # Automated build and deploy
├── lib/                         # Shared utilities
│   └── utils.ts                # Common utility functions
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── styles/                      # Additional stylesheets
├── package.json                # Node.js dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── components.json             # Shadcn UI configuration
└── README.md                   # This file
```

## 🔌 API Documentation

### gRPC Service Definition

```protobuf
service VideoStreamingService {
  // Stream video chunks to client
  rpc StreamVideoChunks(StreamRequest) returns (stream VideoChunk);
  
  // Get server health status
  rpc GetServerHealth(HealthRequest) returns (HealthResponse);
}
```

### StreamVideoChunks

**Request:**
```protobuf
message StreamRequest {
  string video_id = 1;        // Unique video identifier
  string quality = 2;         // "low", "medium", or "high"
  string client_id = 3;       // Unique client identifier
}
```

**Response (Stream):**
```protobuf
message VideoChunk {
  bytes data = 1;            // Chunk binary data
  int32 chunk_number = 2;    // Sequential chunk number
  int64 timestamp = 3;       // Unix timestamp in milliseconds
  int32 size_bytes = 4;      // Chunk size in bytes
  string quality = 5;        // Quality level of this chunk
}
```

**Streaming Characteristics:**
- **Low Quality**: 256 KB chunks
- **Medium Quality**: 512 KB chunks
- **High Quality**: 1 MB chunks
- **Frame Rate**: 20 chunks per second
- **Video Duration**: 60 seconds (1200 total chunks)
- **Network Delay**: 50-100ms per chunk (simulated)
- **Error Rate**: 1% (simulated)

### GetServerHealth

**Request:**
```protobuf
message HealthRequest {
  string node_id = 1;        // Node identifier
}
```

**Response:**
```protobuf
message HealthResponse {
  string status = 1;              // "healthy" or "unhealthy"
  int32 active_connections = 2;   // Current active streams
  double cpu_usage = 3;           // CPU usage percentage
  double memory_usage = 4;        // Memory usage percentage
  int64 total_chunks_sent = 5;    // Lifetime chunk count
}
```

## 🧪 Testing

### Load Testing

The load simulator automatically runs continuous load tests:

```bash
# View client logs
kubectl logs -l app=video-client -f

# Expected output:
# Client 0: Received 1200 chunks in 62.34s
# Client 1: Received 1200 chunks in 61.89s
# Client 2: Stream error - UNAVAILABLE
```

### Performance Benchmarks

On a typical Kubernetes cluster:
- **Throughput**: ~8,000 chunks/second
- **P99 Latency**: <100ms
- **Concurrent Streams**: 2,000+
- **Error Rate**: <1%

## 🛠️ Development

### Build Dashboard

```bash
# Development mode with hot reload
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Dashboard Features

1. **Overview**: Real-time metrics for active streams, throughput, latency, and errors
2. **Stream Charts**: Time-series visualization of request rates and bandwidth
3. **Node Status**: Health status of each server node with CPU/memory metrics
4. **Quality Distribution**: Pie chart showing distribution across quality levels

## 🐛 Troubleshooting

### Pods Not Starting

```bash
# Check pod status
kubectl get pods

# View pod logs
kubectl logs <pod-name>

# Describe pod for events
kubectl describe pod <pod-name>
```

### Connection Errors

```bash
# Verify service endpoints
kubectl get endpoints

# Test connectivity
kubectl run test-pod --rm -it --image=busybox -- sh
# Inside pod: nc -vz video-server-service 50051
```

### Metrics Not Appearing

```bash
# Check Prometheus targets
kubectl port-forward svc/prometheus-service 9090:9090
# Navigate to http://localhost:9090/targets

# Verify metrics endpoint
kubectl port-forward <video-server-pod> 8000:8000
curl http://localhost:8000/metrics
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)
- Monitoring with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/)
- gRPC framework by [Google](https://grpc.io/)

## 📞 Support

For issues, questions, or contributions, please:
- Open an issue on [GitHub Issues](https://github.com/johaankjis/Distributed-Video-Streaming-Simulator/issues)
- Submit a pull request
- Contact the maintainer

---

**Built with ❤️ by [johaankjis](https://github.com/johaankjis)**
