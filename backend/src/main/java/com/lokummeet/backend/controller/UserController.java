package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.AuthResponse;
import com.lokummeet.backend.dto.RegisterRequest;
import com.lokummeet.backend.dto.UserDTO;
import com.lokummeet.backend.entity.AuthRequest;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.UserRepository;
import com.lokummeet.backend.service.JwtService;
import com.lokummeet.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.registerUser(request);
        String token = jwtService.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse(
                token,
                user.getEmail(),
                user.getUsername(),
                user.getId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/addNewUser")
    public ResponseEntity<Object> addNewUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/generateToken")
    public ResponseEntity<AuthResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getUsername());
            User user = userRepository.findByEmail(authRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            AuthResponse response = new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getUsername(),
                    user.getId()
            );
            return ResponseEntity.ok(response);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @GetMapping("/user/profile")
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        String username = authentication.getName();
        UserDTO userDTO = userService.getUserProfile(username);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/user/profile")
    public ResponseEntity<UserDTO> updateProfile(
            @RequestBody Map<String, Object> updates,
            Authentication authentication) {
        String username = authentication.getName();
        UserDTO userDTO = userService.updateUserProfile(username, updates);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/user/profile")
    public Map<String, Object> profileInfo(Authentication authentication) throws UsernameNotFoundException {
        String username = authentication.getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        Map<String, Object> map = new HashMap<>();
        map.put("email", user.getEmail());
        map.put("username", user.getUsername());
        map.put("avatarUrl", user.getAvatarUrl());
        map.put("bio", user.getBio());

        return map;
    }
}
