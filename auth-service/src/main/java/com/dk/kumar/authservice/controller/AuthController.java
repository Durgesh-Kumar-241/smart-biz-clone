package com.dk.kumar.authservice.controller;

import com.dk.kumar.authservice.dto.DTOs;
import com.dk.kumar.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<DTOs.AuthResponse> signup(@RequestBody DTOs.SignupRequest signupRequest) {
        DTOs.AuthResponse authResponse = authService.signup(signupRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<DTOs.AuthResponse> login(@RequestBody DTOs.LoginRequest loginRequest) {
        DTOs.AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }
}

