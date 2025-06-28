package com.dk.kumar.authservice.service;

import com.dk.kumar.authservice.dto.DTOs;
import com.dk.kumar.authservice.entity.User;
import com.dk.kumar.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public DTOs.AuthResponse signup(DTOs.SignupRequest request) {
        var user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role().getRole());
        userRepo.save(user);
        return new DTOs.AuthResponse(jwtService.generateToken(user));
    }

    public DTOs.AuthResponse login(DTOs.LoginRequest request) {
        var user = userRepo.findByEmail(request.email()).orElseThrow();
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid Credentials");
        }
        return new DTOs.AuthResponse(jwtService.generateToken(user));
    }
}
