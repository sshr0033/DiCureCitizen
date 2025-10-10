package com.dicurecitizen.digitalCitizen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebCorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(

                        "https://dicurecitizen.com",
                        "https://www.dicurecitizen.com",
                        "https://*.dicurecitizen.com",
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://13.237.240.102"

                )
                .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Content-Disposition")
                .allowCredentials(true)
                .maxAge(3600);
    }

}

