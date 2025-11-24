package com.lokummeet.backend.service;

import com.lokummeet.backend.dto.RegisterRequest;
import com.lokummeet.backend.dto.UserDTO;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.entity.UserRoles;
import com.lokummeet.backend.exception.BadRequestException;
import com.lokummeet.backend.exception.ResourceNotFoundException;
import com.lokummeet.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.Period;
import java.util.HashSet;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User userInfo = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(userInfo.getEmail())
                .password(userInfo.getPasswordHash())
                .authorities(userInfo.getUserRoles())
                .build();
    }

    @Transactional
    public User registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("User with this email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setBirthDate(request.getBirthDate());
        user.setAge(calculateAge(request.getBirthDate()));
        user.setBio(request.getBio());
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());

        // Set default role
        if (request.getUserRoles() == null || request.getUserRoles().isEmpty()) {
            user.setUserRoles(new HashSet<>());
            user.getUserRoles().add(UserRoles.ROLE_USER);
        } else {
            user.setUserRoles(request.getUserRoles());
        }

        return userRepository.save(user);
    }

    public ResponseEntity<Object> addUser(User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        user.setAge(calculateAge(user.getBirthDate()));
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());

        if (user.getUserRoles() == null || user.getUserRoles().isEmpty()) {
            user.setUserRoles(new HashSet<>());
            user.getUserRoles().add(UserRoles.ROLE_USER);
        }

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    public UserDTO getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Transactional
    public UserDTO updateUserProfile(String email, Map<String, Object> updates) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (updates.containsKey("username")) {
            user.setUsername((String) updates.get("username"));
        }
        if (updates.containsKey("bio")) {
            user.setBio((String) updates.get("bio"));
        }
        if (updates.containsKey("avatarUrl")) {
            user.setAvatarUrl((String) updates.get("avatarUrl"));
        }
        if (updates.containsKey("birthDate")) {
            LocalDate birthDate = LocalDate.parse((String) updates.get("birthDate"));
            user.setBirthDate(birthDate);
            user.setAge(calculateAge(birthDate));
        }

        user.setUpdatedAt(OffsetDateTime.now());
        User updated = userRepository.save(user);
        return modelMapper.map(updated, UserDTO.class);
    }

    private int calculateAge(LocalDate birthDate) {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
