package com.dicurecitizen.digitalCitizen.repository;


import com.dicurecitizen.digitalCitizen.model.ScammerConversation;
import com.dicurecitizen.digitalCitizen.model.SpamMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ScammerConversationRepo extends JpaRepository<ScammerConversation, Long> {
    List<ScammerConversation> findByLabel(BigDecimal label);
}