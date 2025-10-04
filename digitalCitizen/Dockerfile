# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download deps first (cache optimization)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/digitalCitizen-0.0.1-SNAPSHOT.jar app.jar

# Wallet copy (agar local wallet hai to add karo)
COPY wallet /etc/wallet

ENTRYPOINT ["java", "-jar", "app.jar"]
