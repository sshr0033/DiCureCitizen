package com.dicurecitizen.digitalCitizen.repository;


import com.dicurecitizen.digitalCitizen.model.SpamMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpamMessageRepo extends JpaRepository<SpamMessage, Long> {
}
