# Distributed Video Streaming Simulator

A comprehensive distributed video streaming system simulator built with Next.js frontend, Python gRPC backend, and Kubernetes orchestration. This project demonstrates a production-grade architecture for video content delivery with real-time monitoring, load balancing, and observability.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![gRPC](https://img.shields.io/badge/gRPC-1.60.0-green)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5)

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Kubernetes Deployment](#kubernetes-deployment)
- [Monitoring & Observability](#monitoring--observability)
- [Project Structure](#project-structure)
- [gRPC API Documentation](#grpc-api-documentation)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project simulates a distributed video streaming infrastructure that can handle thousands of concurrent video streams. It includes:

- **Frontend Dashboard**: A modern Next.js web application with real-time metrics visualization
- **gRPC Streaming Servers**: Python-based video streaming servers with adaptive bitrate support
- **Load Simulator**: Automated load testing client that simulates concurrent user behavior
- **Monitoring Stack**: Prometheus for metrics collection and Grafana for visualization
- **Kubernetes Orchestration**: Full containerization and orchestration with auto-scaling capabilities

## 🏗️ Architecture

The system follows a microservices architecture with the following components:

```
┌─────────────────┐
│  Next.js Web UI │
│  (Dashboard)    │
└────────┬────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│         Kubernetes Cluster                 │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  gRPC Video Servers (5 replicas)     │ │
│  │  - Adaptive bitrate streaming        │ │
│  │  - Health monitoring                 │ │
│  │  - Prometheus metrics export         │ │
│  └──────────┬───────────────────────────┘ │
│             │                              │
│  ┌──────────▼───────────────────────────┐ │
│  │  Load Simulator Clients              │ │
│  │  - Concurrent stream requests        │ │
│  │  - Quality adaptation                │ │
│  │  - Load balancing                    │ │
│  └──────────┬───────────────────────────┘ │
│             │                              │
│  ┌──────────▼───────────────────────────┐ │
│  │  Prometheus (Metrics Collection)     │ │
│  └──────────┬───────────────────────────┘ │
│             │                              │
│  ┌──────────▼───────────────────────────┐ │
│  │  Grafana (Visualization)             │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

## ✨ Features

### Frontend Dashboard
- 📊 Real-time metrics visualization with interactive charts
- 🎨 Modern UI built with shadcn/ui and Tailwind CSS
- 📈 Stream quality distribution analytics
- 🔄 Live data updates and monitoring
- 🎯 Responsive design for desktop and mobile

### Video Streaming Backend
- 🎬 gRPC-based streaming protocol for efficient data transfer
- 🎚️ Adaptive bitrate streaming (Low, Medium, High quality)
- ⚡ Concurrent stream handling with thread pool
- 📊 Prometheus metrics export for observability
- 🔄 Automatic error recovery and retry logic
- 💾 Configurable chunk sizes and streaming parameters

### Load Simulation
- 👥 Simulates 100+ concurrent clients
- 🎲 Random quality selection and server distribution
- 📊 Client-side metrics collection
- 🔄 Configurable test scenarios
- ⏱️ Realistic network delay simulation

### Monitoring & Observability
- 📈 Prometheus for metrics aggregation
- 📊 Grafana dashboards for visualization
- 🔍 Custom metrics for stream quality, latency, and errors
- 🚨 Health checks and liveness probes
- 📉 Historical data analysis

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4 with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives, shadcn/ui
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

### Backend
- **Language**: Python 3.11
- **RPC Framework**: gRPC 1.60.0
- **Metrics**: Prometheus Client 0.19.0
- **Protocol Buffers**: protobuf 3

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Monitoring**: Prometheus + Grafana
- **Service Mesh**: Built-in load balancing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and pnpm
- **Python** 3.11+
- **Docker** 20.10+
- **Kubernetes** (minikube, kind, or cloud provider)
- **kubectl** configured and connected to your cluster
- **Git** for version control

## 🚀 Getting Started

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Distributed-Video-Streaming-Simulator.git
   cd Distributed-Video-Streaming-Simulator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

#### Local Development (Python)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install Python dependencies**
   ```bash
   pip install grpcio==1.60.0 grpcio-tools==1.60.0 prometheus-client==0.19.0
   ```

3. **Generate gRPC code from proto file**
   ```bash
   python -m grpc_tools.protoc \
     -I. \
     --python_out=. \
     --grpc_python_out=. \
     video_streaming.proto
   ```

4. **Run the video server**
   ```bash
   python video_server.py
   ```

The gRPC server will start on port `50051` and Prometheus metrics will be available at `http://localhost:8000/metrics`

#### Client Load Simulator

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   pip install grpcio==1.60.0 grpcio-tools==1.60.0 prometheus-client==0.19.0
   ```

3. **Generate gRPC code**
   ```bash
   python -m grpc_tools.protoc \
     -I../server \
     --python_out=. \
     --grpc_python_out=. \
     ../server/video_streaming.proto
   ```

4. **Run the load simulator**
   ```bash
   # Connect to local server
   SERVER_ADDRESSES=localhost:50051 NUM_CLIENTS=10 python load_simulator.py
   ```

Client metrics will be available at `http://localhost:8001/metrics`

### Kubernetes Deployment

#### Quick Start with Script

```bash
# Make the script executable
chmod +x scripts/build-and-deploy.sh

# Build and deploy
./scripts/build-and-deploy.sh
```

#### Manual Deployment

1. **Build Docker images**
   ```bash
   # Build server image
   docker build -t video-streaming-server:latest -f server/Dockerfile server/

   # Build client image
   docker build -t video-streaming-client:latest -f client/Dockerfile client/
   ```

2. **Deploy to Kubernetes**
   ```bash
   # Deploy video servers (5 replicas)
   kubectl apply -f kubernetes/video-server-deployment.yaml

   # Deploy load simulator clients
   kubectl apply -f kubernetes/client-deployment.yaml

   # Deploy Prometheus
   kubectl apply -f kubernetes/prometheus-config.yaml

   # Deploy Grafana
   kubectl apply -f kubernetes/grafana-deployment.yaml
   ```

3. **Verify deployment**
   ```bash
   kubectl get pods
   kubectl get services
   ```

4. **Access services**
   - Prometheus: `http://localhost:30090`
   - Grafana: `http://localhost:30030` (credentials: admin/admin)

## 📊 Monitoring & Observability

### Prometheus Metrics

The system exports the following metrics:

#### Server Metrics
- `video_streams_total`: Total number of video streams by quality and node
- `video_chunks_sent_total`: Total chunks sent by node
- `stream_chunk_latency_seconds`: Histogram of chunk delivery latency
- `active_connections`: Current number of active streaming connections
- `chunk_errors_total`: Total chunk delivery errors

#### Client Metrics
- `client_streams_total`: Total streams initiated by quality
- `client_chunks_received_total`: Total chunks received
- `client_stream_latency_seconds`: Client-side stream latency histogram
- `client_errors_total`: Total client errors by type
- `active_clients`: Number of active client connections

### Grafana Dashboards

Access Grafana at `http://localhost:30030` and import the pre-configured dashboard:

```bash
# Dashboard is located at
grafana/dashboard.json
```

The dashboard includes:
- Real-time stream metrics
- Quality distribution pie charts
- Latency histograms
- Error rates and trends
- Server health status
- Active connections monitoring

### Health Checks

```bash
# Check server health via gRPC
grpcurl -plaintext localhost:50051 videostreaming.VideoStreamingService/GetServerHealth

# Check metrics endpoint
curl http://localhost:8000/metrics
```

## 📁 Project Structure

```
Distributed-Video-Streaming-Simulator/
├── app/                      # Next.js application
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── card.tsx
│   │   ├── sidebar.tsx
│   │   ├── toast.tsx
│   │   └── empty.tsx
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── header.tsx           # Dashboard header
│   ├── metrics-grid.tsx     # Metrics display grid
│   └── quality-distribution.tsx  # Quality charts
├── server/                  # Python gRPC server
│   ├── video_server.py      # Main server implementation
│   ├── video_streaming.proto # gRPC service definition
│   └── Dockerfile           # Server container image
├── client/                  # Load simulator
│   ├── load_simulator.py    # Client implementation
│   └── Dockerfile           # Client container image
├── kubernetes/              # Kubernetes manifests
│   ├── video-server-deployment.yaml
│   ├── client-deployment.yaml
│   ├── prometheus-config.yaml
│   └── grafana-deployment.yaml
├── grafana/                 # Grafana dashboards
│   └── dashboard.json       # Pre-configured dashboard
├── scripts/                 # Deployment scripts
│   └── build-and-deploy.sh  # Build and deploy automation
├── lib/                     # Utility libraries
├── hooks/                   # React hooks
├── styles/                  # Additional styles
├── public/                  # Static assets
├── package.json             # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── README.md               # This file
```

## 📡 gRPC API Documentation

### Service Definition

The video streaming service is defined in `server/video_streaming.proto`:

```protobuf
service VideoStreamingService {
  // Stream video chunks to client
  rpc StreamVideoChunks(StreamRequest) returns (stream VideoChunk);
  
  // Get server health status
  rpc GetServerHealth(HealthRequest) returns (HealthResponse);
}
```

### Streaming Video

**Request:**
```protobuf
message StreamRequest {
  string video_id = 1;      // ID of the video to stream
  string quality = 2;       // "low", "medium", or "high"
  string client_id = 3;     // Client identifier
}
```

**Response (Stream):**
```protobuf
message VideoChunk {
  bytes data = 1;           // Chunk binary data
  int32 chunk_number = 2;   // Chunk sequence number
  int64 timestamp = 3;      // Unix timestamp (ms)
  int32 size_bytes = 4;     // Chunk size in bytes
  string quality = 5;       // Quality level
}
```

### Quality Levels

| Quality | Chunk Size | Bitrate (approx) |
|---------|-----------|------------------|
| Low     | 256 KB    | ~4 Mbps          |
| Medium  | 512 KB    | ~8 Mbps          |
| High    | 1 MB      | ~16 Mbps         |

### Streaming Characteristics
- **Chunks per second**: 20
- **Total chunks per video**: 1200 (1-minute video)
- **Network delay**: 50-100ms per chunk (simulated)
- **Error rate**: 1% (simulated for testing)

## ⚙️ Configuration

### Environment Variables

#### Server Configuration
```bash
NODE_ID=node-1              # Server node identifier
GRPC_PORT=50051            # gRPC server port
```

#### Client Configuration
```bash
SERVER_ADDRESSES=localhost:50051,localhost:50052  # Comma-separated server list
NUM_CLIENTS=100            # Number of concurrent clients
```

### Kubernetes Resource Limits

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Scaling

To scale the video servers:
```bash
kubectl scale deployment video-server --replicas=10
```

## 🔧 Development

### Running Tests

```bash
# Frontend tests
pnpm test

# Lint code
pnpm lint
```

### Code Generation

When modifying the proto file:

```bash
# Server
cd server
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. video_streaming.proto

# Client
cd client
python -m grpc_tools.protoc -I../server --python_out=. --grpc_python_out=. ../server/video_streaming.proto
```

### Debugging

```bash
# View server logs
kubectl logs -l app=video-server -f

# View client logs
kubectl logs -l app=video-client -f

# Port forward for local debugging
kubectl port-forward service/video-server-service 50051:50051
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Monitoring powered by [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This is a simulation project for educational and demonstration purposes. It simulates video streaming behavior and is not intended for production video delivery.
