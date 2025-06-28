package com.dk.kumar.authservice.dto;

import lombok.Getter;

public class DTOs {
    public record SignupRequest(String email, String password, UserRole role) {}
    public record LoginRequest(String email, String password) {}
    public record AuthResponse(String token) {}
    @Getter
    public enum UserRole {
        //ADMIN("ADMIN"),
        SELLER("SELLER"),
        CUSTOMER("CUSTOMER");

        private final String role;

        UserRole(String role) {
            this.role = role;
        }

        public static UserRole fromString(String value) {
            for (UserRole userRole : UserRole.values()) {
                if (userRole.getRole().equalsIgnoreCase(value)) {
                    return userRole;
                }
            }
            throw new IllegalArgumentException("Unknown role: " + value);
        }
    }

}
