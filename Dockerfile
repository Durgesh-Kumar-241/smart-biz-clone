# ----------- Build Stage -----------
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

COPY . .
# Copies full project including parent + all modules

RUN mvn clean package -DskipTests

# ----------- Runtime Stage -----------
FROM eclipse-temurin:21-jre-alpine AS runner

WORKDIR /app

ARG MODULE_NAME
ARG EXPOSE_PORT=8080

COPY --from=builder /app/${MODULE_NAME}/target/*.jar app.jar

EXPOSE ${EXPOSE_PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]
