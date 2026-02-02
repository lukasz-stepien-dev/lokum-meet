package com.lokummeet.backend.controller;

import com.lokummeet.backend.auth.SecurityUtil;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final SecurityUtil securityUtil;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<User> me() {
        final User user = securityUtil.getManagedUser();
        return ResponseEntity.ok(user);
    }
}
