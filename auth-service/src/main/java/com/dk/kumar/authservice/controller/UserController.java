package com.dk.kumar.authservice.controller;

import com.dk.kumar.authservice.security.annotations.ADMIN;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class UserController {

    @GetMapping("/public")
    public ResponseEntity<String> getProfile() {
        return ResponseEntity.ok("You are on public!");
    }


    @ADMIN
    @GetMapping("/admin/data")
    public ResponseEntity<?> getAdminData() {
        return ResponseEntity.ok("Admin content");
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/user/data")
    public ResponseEntity<?> getUserData() {
        return ResponseEntity.ok("User content");
    }

}



