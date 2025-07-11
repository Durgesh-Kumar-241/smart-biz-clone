#!/bin/bash

# Build the whole project
mvn clean package -DskipTests

# Build Docker images
docker build -t auth-service --build-arg MODULE_NAME=auth-service --build-arg EXPOSE_PORT=8081 .
docker build -t product-service --build-arg MODULE_NAME=product-service --build-arg EXPOSE_PORT=8083 .
docker build -t user-service --build-arg MODULE_NAME=user-service --build-arg EXPOSE_PORT=8082 .
docker build -t eureka-discovery-service --build-arg MODULE_NAME=eureka-discovery-service --build-arg EXPOSE_PORT=8761 .
docker build -t api-gateway-service --build-arg MODULE_NAME=api-gateway-service --build-arg EXPOSE_PORT=80 .

echo "All images built."
