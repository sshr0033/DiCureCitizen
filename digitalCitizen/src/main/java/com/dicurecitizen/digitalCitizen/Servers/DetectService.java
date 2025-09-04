package com.dicurecitizen.digitalCitizen.Servers;

import com.dicurecitizen.digitalCitizen.DTOs.DetectMessage;
import com.dicurecitizen.digitalCitizen.DTOs.DetectResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DetectService {

    private static final double LOW_MAX  = 0.01;
    private static final double HIGH_MIN = 0.10;

    public DetectResponse analyze(DetectMessage req) {
        int topK = req.getTop_k() == null ? 5 : req.getTop_k();
        boolean qLink = Boolean.TRUE.equals(req.getLink());
        boolean qBank = Boolean.TRUE.equals(req.getBank());
        boolean anyYes = qLink || qBank;

        double p = predictProbability(req.getText(), topK);

        List<String> reasons = new ArrayList<>();
        reasons.add("AI probability=" + String.format("%.2f", p));
        if (qLink) reasons.add("User indicated: contains/suggests a link");
        if (qBank) reasons.add("User indicated: asks for bank/card details");

        String risk;
        if (p < LOW_MAX && !anyYes) {
            risk = "PASS";
        } else if (p >= HIGH_MIN && anyYes) {
            risk = "HIGH";
        } else if (p >= HIGH_MIN && !anyYes) {
            risk = "MODERATE";
        } else {
            risk = anyYes ? "MODERATE" : "PASS";
        }

        boolean allowPdf = true;

        return new DetectResponse(risk, allowPdf, p, reasons);
    }

    private double predictProbability(String text, int topK) {
        String t = (text == null ? "" : text).toLowerCase();

        int score = 0;
        if (t.contains("http") || t.contains("www")) score += 2;
        if (t.contains("bank") || t.contains("bsb") || t.contains("password")) score += 2;
        if (t.contains("urgent") || t.contains("verify") || t.contains("locked")) score += 1;

        return Math.min(1.0, score / 5.0);
    }
}
