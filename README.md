# ShopNow - Spring Boot Microservices E-Commerce Platform

A scalable e-commerce platform built using Spring Boot, Java 17, and microservices architecture.

---

## 🏗️ Project Structure

```
shopnow/
├── eureka-discovery-service/
├── api-gateway-service/
├── auth-service/
├── user-service/
├── product-service/
├── docker-compose.yml
├── build-images.sh / .bat
├── README.md
```

---

## ✅ Current Progress

- ✅ `eureka-discovery-service` implemented and running on port `8761`
- ✅ `api-gateway-service` implemented and running on port `80`
- ✅ `auth-service` implemented and running on port `8081`, E-mail/passowrd based JWT authentication has been implemented
- 🔧 Other services are planned and under development

## 🚀 Tech Stack

- Java 17
- Spring Boot 3.x
- Spring Cloud Gateway & Eureka Discovery
- Docker / Docker Compose
- JWT Authentication
- Maven (multi-module project)


## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- IntelliJ IDEA (recommended)

## 🚀 Project Branches

We maintain **two branches** for different ways to run the project:

### 🔹 `non-docker-dev-build`
> Ideal for developers running the app locally via Spring Boot

- Services run via IntelliJ / VS Code / Maven CLI
- Uses default `localhost`-based configuration
- No Docker dependencies required

### 🔹 `docker-build`
> For running the project using Docker and Docker Compose

- Each service has its own Dockerfile
- Centralized `docker-compose.yml` to manage services
- Uses service discovery via Docker network

---

## 🟢 How to Run the Project

### ✅ Option 1: Run Without Docker (Branch: `non-docker-dev-build`)

> Prerequisites: Java 17+, Maven

```bash
git clone -b non-docker-dev-build https://github.com/yourusername/shopnow.git
cd shopnow
mvn clean install -DskipTests
```

Start the services manually in this order:

```bash
# Run from your IDE or CLI:
- eureka-discovery-service (port 8761)
- api-gateway-service      (port 80)
- auth-service             (port 8081)
- user-service             (port 8082)
- product-service          (port 8083)
```

Access:
- Eureka: [http://localhost:8761](http://localhost:8761)
- API Gateway: [http://localhost](http://localhost)

---

### ✅ Option 2: Run With Docker (Branch: `docker-build`)

> Prerequisites: Docker Desktop

```bash
git clone -b docker-build https://github.com/yourusername/shopnow.git
cd shopnow
```

Build Docker images:
```bash
./build-images.sh   # or build-images.bat on Windows
```

Start with Docker Compose:
```bash
docker compose up -d
```

Access:
- Eureka: [http://localhost:8761](http://localhost:8761)
- Gateway: [http://localhost](http://localhost)

Stop:
```bash
docker compose down
```

## 📌 Notes

- Eureka UI is secured using basic authentication (`admin` / `admin123`)

---

## 📂 License

This project is open source and available under the [MIT License](LICENSE).

