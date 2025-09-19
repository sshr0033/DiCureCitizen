package com.dicurecitizen.digitalCitizen.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SPAM_COMBINED_CLEAN")  // exact table name in Oracle
public class SpamMessage {

    @Id
    private Long text_id;

    private String category;

    private String text;

    public Long getTextId() {
        return text_id;
    }

    public void setTextId(Long text_id) {
        this.text_id = text_id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSnippet() {
        return text;
    }

    public void setSnippet(String text) {
        this.text = text;
    }
}
