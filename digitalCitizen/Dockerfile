
FROM amazoncorretto:17-alpine AS runtime
WORKDIR /app


RUN apk add --no-cache ca-certificates curl coreutils


ARG RDS_BUNDLE_URL="https://truststore.pki.rds.amazonaws.com/ap-southeast-2/ap-southeast-2-bundle.pem"
ENV RDS_TRUSTSTORE_PASS=changeit

RUN mkdir -p /opt/rds \
 && curl -fsSL "$RDS_BUNDLE_URL" -o /tmp/rds-bundle.pem \
 && csplit -z -f /tmp/rds- -b %02d.pem /tmp/rds-bundle.pem '/-----BEGIN CERTIFICATE-----/' '{*}' \
 && rm -f /opt/rds/rds-truststore.p12 || true \
 && for c in /tmp/rds-*.pem; do \
      keytool -importcert -trustcacerts -alias $(basename "$c" .pem) -file "$c" \
        -keystore /opt/rds/rds-truststore.p12 -storetype PKCS12 \
        -storepass "$RDS_TRUSTSTORE_PASS" -noprompt; \
    done


COPY --from=build /app/target/*.jar /app/app.jar


ENV MYSQL_TRUSTSTORE_URL="file:/opt/rds/rds-truststore.p12" \
    MYSQL_TRUSTSTORE_PASSWORD="$RDS_TRUSTSTORE_PASS" \
    MYSQL_TRUSTSTORE_TYPE="PKCS12"

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
