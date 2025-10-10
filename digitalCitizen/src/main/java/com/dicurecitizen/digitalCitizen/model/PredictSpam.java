package com.dicurecitizen.digitalCitizen.model;
import jakarta.validation.constraints.NotBlank;

public class PredictSpam {
    @NotBlank(message = "text is required")
    private String text;

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}