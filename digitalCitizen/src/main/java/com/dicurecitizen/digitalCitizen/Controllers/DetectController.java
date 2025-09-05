package com.dicurecitizen.digitalCitizen.Controllers;

import com.dicurecitizen.digitalCitizen.DTOs.DetectMessage;
import com.dicurecitizen.digitalCitizen.DTOs.DetectResponse;
import com.dicurecitizen.digitalCitizen.Servers.DetectService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true")
public class DetectController {

    private final DetectService service;

    public DetectController(DetectService service) {
        this.service = service;
    }
    @CrossOrigin(
            origins = {
                    "http://localhost:5173",
                   "https://dicurecitizen-1.onrender.com"
            },
            allowCredentials = "true"
    )
    @PostMapping("/detect")
    public DetectResponse detect(@RequestBody DetectMessage req) {
        return service.analyze(req);
    }

    @CrossOrigin(
            origins = {
                    "http://localhost:5173",
                    "https://dicurecitizen-1.onrender.com"
            },
            allowCredentials = "true"
    )

    @GetMapping("/safety-guide")
    public ResponseEntity<InputStreamResource> downloadSafetyGuide() throws IOException {
        var resource = new ClassPathResource("static/safety-guide.pdf");
        var headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"safety-guide.pdf\"");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(resource.getInputStream()));
    }
}
