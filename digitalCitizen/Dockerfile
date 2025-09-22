# Use Java 17 (compatible with Spring Boot 3.x)
FROM openjdk:17-jdk-slim
COPY wallet /etc/wallet

# Set working dir
WORKDIR /app

# Copy target jar (pehle tu maven build karega)
ARG JAR_FILE=target/digitalCitizen-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Run the Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
