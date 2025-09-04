package com.dicurecitizen.digitalCitizen.DTOs;

import java.util.List;

public class DetectResponse {
    private String risk;
    private boolean allowPdf;
    private double probability;
    private List<String> reasons;

    public DetectResponse(String risk, boolean allowPdf, double probability, List<String> reasons) {
        this.risk = risk; this.allowPdf = allowPdf; this.probability = probability; this.reasons = reasons;
    }
    public String getRisk(){ return risk; }
    public boolean isAllowPdf(){ return allowPdf; }
    public double getProbability(){ return probability; }
    public List<String> getReasons(){ return reasons; }
}
