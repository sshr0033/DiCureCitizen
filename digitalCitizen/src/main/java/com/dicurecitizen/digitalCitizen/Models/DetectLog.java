package com.dicurecitizen.digitalCitizen.Models;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name="detection_logs")
public class DetectLog {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(length=3000) private String text;
    private Double probability;
    private Boolean ansLink;
    private Boolean ansBank;
    private String risk;
    private Boolean allowPdf;
    private Integer topKUsed;
    private OffsetDateTime createdAt = OffsetDateTime.now();


    public void setText(String text) {
        this.text = text;
    }

    public void setProbability(double p) {
        this.probability = p;
    }

    public void setAnsLink(boolean qLink) {
        this.ansLink = qLink;
    }

    public void setAnsBank(boolean qBank) {
            this.ansBank = qBank;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }

    public void setAllowPdf(boolean allowPdf) {
        this.allowPdf = allowPdf;
    }

    public void setTopKUsed(int topK) {
        this.topKUsed = topK;
    }
}
