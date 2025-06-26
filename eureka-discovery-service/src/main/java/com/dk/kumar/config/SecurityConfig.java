package com.dk.kumar.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Optional: disable CSRF for simplicity
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/eureka/**").authenticated()
                        .anyRequest().permitAll()
                )
                .httpBasic(customizer -> customizer.realmName("Eureka Server")); // Use basic auth (browser login popup)

        return http.build();
    }
}
