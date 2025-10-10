package com.dicurecitizen.digitalCitizen.services;


import com.dicurecitizen.digitalCitizen.model.PredictSpam;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.*;
import java.time.Duration;

    @Service
    public class PredictServices {
        private final HttpClient http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
        private final ObjectMapper mapper = new ObjectMapper();
        private final String predictUrl;

        public PredictServices(@Value("${predict.url}") String predictUrl) {
            this.predictUrl = predictUrl;
        }

        public int predictPercent(PredictSpam req) throws Exception {
            var body = mapper.writeValueAsString(req);
            var httpReq = HttpRequest.newBuilder()
                    .uri(URI.create(predictUrl))
                    .timeout(Duration.ofSeconds(10))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            var resp = http.send(httpReq, HttpResponse.BodyHandlers.ofString());
            if (resp.statusCode() < 200 || resp.statusCode() >= 300) {
                throw new RuntimeException("Upstream HTTP " + resp.statusCode());
            }

            JsonNode n = mapper.readTree(resp.body());
            double v;
            if (n.isNumber()) v = n.asDouble();
            else if (n.isObject()) {
                Double found = null;
                for (var k : new String[]{"probability","score","risk","result"}) {
                    if (n.has(k)) {
                        var node = n.get(k);
                        if (node.isNumber()) found = node.asDouble();
                        else if (node.isTextual()) found = Double.valueOf(node.asText());
                        if (found != null) break;
                    }
                }
                if (found == null) throw new RuntimeException("Unexpected JSON: " + resp.body());
                v = found;
            } else throw new RuntimeException("Unexpected JSON: " + resp.body());

            int pct = v <= 1 ? (int)Math.round(v*100) : (int)Math.round(v);
            return Math.max(0, Math.min(100, pct));
        }
    }


