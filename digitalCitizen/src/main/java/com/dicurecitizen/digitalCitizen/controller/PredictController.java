package com.dicurecitizen.digitalCitizen.controller;

import com.dicurecitizen.digitalCitizen.services.PredictServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictController {

    private final PredictServices service;

    public PredictController(PredictServices service) {
        this.service = service;
    }

    @PostMapping("/predict")
    public ResponseEntity<String> predict(@RequestBody Map<String, Object> body) {
        try {
            // ✅ Validate that text exists and is not empty
            if (body == null || !body.containsKey("text")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("{\"error\":\"Missing required field 'text'\"}");
            }

            String text = String.valueOf(body.get("text")).trim();
            if (text.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("{\"error\":\"Text cannot be empty\"}");
            }

            // ✅ Call service method to send to Python API
            String result = service.predict(text);

            // ✅ Return model API’s JSON response directly to frontend
            return ResponseEntity.ok(result);

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"Failed to call model API\"}");
        }
    }

    // Optional quick health check endpoint
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("{\"status\":\"UP\"}");
    }
}
