package com.lokummeet.backend.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Table(name = "users")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;
    @Column(nullable = false)
    private int age;
    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;
    private String bio;
    @Column(name = "is_verified")
    private boolean isVerified = false;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "user_roles")
    private Set<UserRoles> userRoles = new HashSet<>();
    @Column(name = "created_at")
    @CreatedDate
    private OffsetDateTime createdAt;
    @Column(name = "updated_at")
    @LastModifiedDate
    private OffsetDateTime updatedAt;
}

enum UserRoles { ROLES_USER, ROLE_INSTITUTION, ROLE_ADMIN }