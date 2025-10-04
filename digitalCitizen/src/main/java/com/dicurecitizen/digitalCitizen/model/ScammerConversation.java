package com.dicurecitizen.digitalCitizen.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "SCAMMER_CONVERSATION")
public class ScammerConversation {

    @Id
    @Column(name = "CONVERSATION_ID")
    private Long conversationId;

    @Column(name = "CONVERSATION", length = 4000)
    private String conversation;

    @Column(name = "LABEL")
    private BigDecimal label;
    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public String getConversation() {
        return conversation;
    }

    public void setConversation(String conversation) {
        this.conversation = conversation;
    }

    public BigDecimal getLabel() {
        return label;
    }

    public void setLabel(BigDecimal label) {
        this.label = label;
    }
}
