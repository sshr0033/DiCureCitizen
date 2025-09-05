package com.dicurecitizen.digitalCitizen.Servers;

import com.dicurecitizen.digitalCitizen.DTOs.DetectMessage;
import com.dicurecitizen.digitalCitizen.DTOs.DetectResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DetectService {

    @Value("${risk.lowMax:0.10}")
    private double LOW_MAX;

    @Value("${risk.highMin:0.15}")
    private double HIGH_MIN;

    @Value("${python.api.base:}")
    private String pythonBase;

    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(3))
            .build();

    public DetectResponse analyze(DetectMessage req) {
        int topK = req.getTop_k() == null ? 5 : req.getTop_k();
        boolean qLink = Boolean.TRUE.equals(req.getLink());
        boolean qBank = Boolean.TRUE.equals(req.getBank());
        boolean anyYes = qLink || qBank;

        double p = predictProbability(req.getText(), topK, qLink, qBank);

        List<String> reasons = new ArrayList<>();
        reasons.add("AI probability=" + String.format("%.2f", p));
        if (qLink) reasons.add("User indicated: contains/suggests a link");
        if (qBank) reasons.add("User indicated: asks for bank/card details");

        String risk;
        boolean allowPdf = false;

        if (p < LOW_MAX && !anyYes) {
            risk = "PASS";
        } else if (p >= HIGH_MIN && anyYes) {
            risk = "HIGH"; allowPdf = true;
        }
        else {
            risk = anyYes ? "MODERATE" : "PASS";
        }

        return new DetectResponse(risk, allowPdf, p, reasons);
    }

    private double predictProbability(String text, int topK, boolean link, boolean bank) {
        String safeText = (text == null) ? "" : text;

        // 1) Try ML first if configured
        if (pythonBase != null && !pythonBase.isBlank()) {
            try {
                String url = pythonBase.endsWith("/") ? pythonBase + "predict" : pythonBase + "/predict";
                String json = mapper.writeValueAsString(Map.of(
                        "text", safeText,
                        "link", link,
                        "bank", bank,
                        "top_k", topK
                ));
                HttpRequest req = HttpRequest.newBuilder()
                        .uri(URI.create(url))
                        .timeout(Duration.ofSeconds(6))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(json))
                        .build();
                HttpResponse<String> resp = http.send(req, HttpResponse.BodyHandlers.ofString());
                if (resp.statusCode() >= 200 && resp.statusCode() < 300) {
                    JsonNode node = mapper.readTree(resp.body());
                    if (node.has("probability")) {
                        return node.get("probability").asDouble();
                    }
                }
            } catch (Exception ignore) {

            }
        }


        String t = safeText.toLowerCase();
        int score = 0;
        if (t.contains("http") || t.contains("www")) score += 2;
        if (t.contains("bank") || t.contains("bsb") || t.contains("password")) score += 2;
        if (t.contains("urgent") || t.contains("verify") || t.contains("locked")) score += 1;
        return Math.min(1.0, score / 5.0);
    }
}
