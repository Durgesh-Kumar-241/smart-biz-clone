package com.dk.kumar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/user-service")
    public ResponseEntity<String> userServiceFallback() {
        return ResponseEntity.ok("User Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/product-service")
    public ResponseEntity<String> productServiceFallback() {
        return ResponseEntity.ok("Product Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/auth-service")
    public ResponseEntity<String> authServiceFallback() {
        return ResponseEntity.ok("Auth Service is currently unavailable. Please try again later.");
    }


    // Add more fallback methods as needed for other services
}

