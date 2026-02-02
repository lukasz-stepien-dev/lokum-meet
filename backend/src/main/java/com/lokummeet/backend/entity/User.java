package com.lokummeet.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.*;

@Table(name = "users")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column()
    @Setter
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

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

    @ManyToMany()
    @JoinTable(
            name = "user_institution",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id")
    )
    private Set<Institution> institutions;

    @Setter
    private boolean banned = false;

    @Column(name = "created_at")
    @CreatedDate
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private OffsetDateTime updatedAt;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ConnectedAccount> connectedAccounts = new ArrayList<>();

    public String getUsername() {
        return StringUtils.isNotBlank(username) ? username : email;
    }

    public static User fromOidc(DefaultOidcUser googleUser) {
        final User user = new User();
        user.username = googleUser.getName();
        user.email = googleUser.getEmail();
        user.avatarUrl = googleUser.getPicture();
        user.passwordHash = ""; // OAuth users don't have password
        user.userRoles = new HashSet<>(Set.of(UserRoles.ROLE_USER)); // Use mutable HashSet
        user.bio = "Hi there! I'm new to LokumMeet.";
        user.createdAt = OffsetDateTime.now();

        // Birthdate is not provided by Google OAuth - set default or null
        String birthdate = googleUser.getBirthdate();
        if (birthdate != null) {
            user.birthDate = LocalDate.parse(birthdate);
            user.age = LocalDate.now().getYear() - user.birthDate.getYear();
        } else {
            user.birthDate = LocalDate.of(2000, 1, 1); // Default value
            user.age = 0;
        }

        return user;
    }


    public void addConnectedAccount(ConnectedAccount connectedAccount) {
        connectedAccounts.add(connectedAccount);
    }
}

