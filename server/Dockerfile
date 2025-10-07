FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir \
    grpcio==1.60.0 \
    grpcio-tools==1.60.0 \
    prometheus-client==0.19.0

# Copy proto file and server code
COPY video_streaming.proto .
COPY video_server.py .

# Generate gRPC code from proto
RUN python -m grpc_tools.protoc \
    -I. \
    --python_out=. \
    --grpc_python_out=. \
    video_streaming.proto

# Expose gRPC port and metrics port
EXPOSE 50051 8000

CMD ["python", "video_server.py"]
