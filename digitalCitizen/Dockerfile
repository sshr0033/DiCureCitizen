# ---- build stage ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn -q -DskipTests package

# ---- run stage ----
FROM amazoncorretto:17-alpine
WORKDIR /app

RUN apk add --no-cache ca-certificates && update-ca-certificates

COPY --from=build /app/target/*.jar /app/app.jar

COPY rds-ca/rds-truststore.jks /opt/rds/rds-truststore.jks
ENV RDS_TRUSTSTORE=/opt/rds/rds-truststore.jks
ENV RDS_TRUSTSTORE_PASS=changeit


RUN adduser -D appuser
USER appuser

ENV SERVER_PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
