package com.dicurecitizen.digitalCitizen.controller;

import com.dicurecitizen.digitalCitizen.model.ScammerConversation;
import com.dicurecitizen.digitalCitizen.repository.ScammerConversationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/conversations")

public class ScammerConversationController {

    @Autowired
    private ScammerConversationRepo scamRepo;



    @GetMapping
    public List<ScammerConversation> getAll() {

        return scamRepo.findByLabel(BigDecimal.ONE);
    }


}
