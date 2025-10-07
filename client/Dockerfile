FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir \
    grpcio==1.60.0 \
    grpcio-tools==1.60.0 \
    prometheus-client==0.19.0

# Copy proto file and client code
COPY ../server/video_streaming.proto .
COPY load_simulator.py .

# Generate gRPC code from proto
RUN python -m grpc_tools.protoc \
    -I. \
    --python_out=. \
    --grpc_python_out=. \
    video_streaming.proto

# Expose metrics port
EXPOSE 8001

CMD ["python", "load_simulator.py"]
