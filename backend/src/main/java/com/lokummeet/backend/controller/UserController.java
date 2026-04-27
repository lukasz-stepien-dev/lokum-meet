package com.lokummeet.backend.controller;

import com.lokummeet.backend.auth.SecurityUtil;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.UserRepository;
import com.lokummeet.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final SecurityUtil securityUtil;

    @PostMapping("/addNewUser")
    public ResponseEntity<Object> addNewUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/user/profile")
    public Map<String, Object> profileInfo(Authentication authentication) throws UsernameNotFoundException {
        String username =  authentication.getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        Map<String, Object> map = new HashMap<>();
        map.put("email", user.getEmail());
        map.put("username", user.getUsername());
        map.put("avatarUrl", user.getAvatarUrl());
        map.put("bio", user.getBio());

        return map;
    }

    @GetMapping("/me")
    public ResponseEntity<User> me() {
        final User user = securityUtil.getManagedUser();
        return ResponseEntity.ok(user);
    }
}
