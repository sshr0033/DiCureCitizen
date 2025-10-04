package com.dicurecitizen.digitalCitizen.controller;

import com.dicurecitizen.digitalCitizen.model.SpamMessage;
import com.dicurecitizen.digitalCitizen.repository.SpamMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class SpamMessageController {

    @Autowired
    private SpamMessageRepo spamRepo;

    @GetMapping("/test")
    public List<SpamMessage> getAll() {
        return spamRepo.findAll();
    }
}
