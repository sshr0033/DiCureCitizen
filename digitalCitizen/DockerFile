# syntax=docker/dockerfile:1
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# If you have the Maven Wrapper (recommended)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw
# Download deps first for better caching
RUN ./mvnw -q -DskipTests dependency:go-offline

# Now add the source and build
COPY src ./src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app

ENV PORT=8080

COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080

CMD ["sh","-c","java -Dserver.port=${PORT} -jar /app/app.jar"]
