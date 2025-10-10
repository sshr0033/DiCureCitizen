package com.dicurecitizen.digitalCitizen.controller;


import com.dicurecitizen.digitalCitizen.model.PredictResponse;
import com.dicurecitizen.digitalCitizen.model.PredictSpam;
import com.dicurecitizen.digitalCitizen.services.PredictServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PredictController {

    private final PredictServices service;
    public PredictController(PredictServices service) { this.service = service; }

    @PostMapping("/predict")
    public ResponseEntity<PredictResponse> predict(@RequestBody PredictSpam req) {
        try {
            int pct = service.predictPercent(req);
            return ResponseEntity.ok(new PredictResponse(pct));
        } catch (Exception ex) {
            return ResponseEntity.status(502).body(new PredictResponse(0));
        }
    }
}
