package com.dk.kumar.authservice.dto;

public class DTOs {
    public record SignupRequest(String email, String password) {}
    public record LoginRequest(String email, String password) {}
    public record AuthResponse(String token) {}
}
