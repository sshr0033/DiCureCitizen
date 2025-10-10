package com.dicurecitizen.digitalCitizen.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.*;
import java.time.Duration;

@Service
public class PredictServices {

    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    private final String predictUrl;

    public PredictServices(@Value("${predict.url}") String predictUrl) {
        this.predictUrl = predictUrl;
    }

    public String predict(String text) throws Exception {
        // ✅ Build minimal JSON body
        String json = "{\"text\":\"" + text.replace("\"", "") + "\"}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(predictUrl))
                .timeout(Duration.ofSeconds(10))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new RuntimeException("Upstream HTTP " + response.statusCode());
        }

        // ✅ Return Python API’s raw JSON response
        return response.body();
    }
}
