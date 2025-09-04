package com.dicurecitizen.digitalCitizen.Repository;


import com.dicurecitizen.digitalCitizen.Models.DetectLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetectionRepo extends JpaRepository<DetectLog, Long> {}


