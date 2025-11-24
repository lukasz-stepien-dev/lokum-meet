package com.lokummeet.backend.dto;

import com.lokummeet.backend.entity.UserRoles;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private LocalDate birthDate;
    private int age;
    private String avatarUrl;
    private String bio;
    private boolean isVerified;
    private Set<UserRoles> userRoles;
    private OffsetDateTime createdAt;
}

