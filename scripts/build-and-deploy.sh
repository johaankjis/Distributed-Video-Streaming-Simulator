#!/bin/bash

# Build Docker images
echo "Building Docker images..."

# Build server image
docker build -t video-streaming-server:latest -f server/Dockerfile server/

# Build client image
docker build -t video-streaming-client:latest -f client/Dockerfile client/

echo "Docker images built successfully!"

# Deploy to Kubernetes
echo "Deploying to Kubernetes..."

# Apply Kubernetes configurations
kubectl apply -f kubernetes/video-server-deployment.yaml
kubectl apply -f kubernetes/client-deployment.yaml
kubectl apply -f kubernetes/prometheus-config.yaml
kubectl apply -f kubernetes/grafana-deployment.yaml

echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=video-server --timeout=120s
kubectl wait --for=condition=ready pod -l app=prometheus --timeout=120s
kubectl wait --for=condition=ready pod -l app=grafana --timeout=120s

echo "Deployment complete!"
echo ""
echo "Access points:"
echo "- Prometheus: http://localhost:30090"
echo "- Grafana: http://localhost:30030 (admin/admin)"
echo ""
echo "To view logs:"
echo "  kubectl logs -l app=video-server -f"
echo "  kubectl logs -l app=video-client -f"
