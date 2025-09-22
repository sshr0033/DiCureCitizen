# Java 17 image le lo (Spring Boot 3.x ke liye best)
FROM openjdk:17-jdk-slim

# app jar ka naam (maven build ke baad generate hota hai)
ARG JAR_FILE=target/digitalCitizen-0.0.1-SNAPSHOT.jar

# jar ko container me copy kar do
COPY ${JAR_FILE} app.jar

# Spring Boot run
ENTRYPOINT ["java","-jar","/app.jar"]
