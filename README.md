# Spring Boot Microservices Monorepo

Hi,  
This project intends to showcase my skills in **Java**, **Spring Boot**, and **Microservice Architecture** using a monorepo approach.

## 🏗️ Project Structure

```
main_module/
├── eureka-discovery-service     # Service registry using Netflix Eureka
├── api-gateway-service          # Central API gateway (planned)
├── auth-service                 # Authentication service (planned)
├── user-service                 # User profile and management (planned)
├── product-service              # Product catalog service (planned)
├── order-service                # Order management service (planned)
```

> This project is organized as a **monorepo**, meaning all microservices are maintained within a single Git repository for easier coordination, sharing configurations, and unified CI/CD.

## ✅ Current Progress

- ✅ `eureka-discovery-service` implemented and running on port `8761`
- ✅ `api-gateway-service` implemented and running on port `80`
- ✅ `=auth-service` implemented and running on port `8081`, E-mail/passowrd based JWT authentication has been implemented
- 🔧 Other services are planned and under development

## 🚀 Tech Stack

- Java 17
- Spring Boot 3.x
- Spring Cloud (2023.0.1)
- Eureka Discovery Server
- Maven (multi-module project)
- (Planned) Spring Security, Spring Gateway, MySQL, Docker

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- IntelliJ IDEA (recommended)

### To Run Eureka Server:

1. Navigate to `eureka-discovery-service`:
   ```bash
   cd eureka-discovery-service
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

3. Visit [http://localhost:8761](http://localhost:8761) to see the Eureka dashboard.

> Optional: Eureka UI is secured using basic authentication (`admin` / `admin123`)

## 📌 Notes

- This project will evolve to include inter-service communication, API Gateway, authentication & authorization, database integrations, and deployment automation.
- A `docker-compose.yml` and CI/CD pipeline will be added later for full-stack simulation.

## 📂 License

This project is open source and available under the [MIT License](LICENSE).
