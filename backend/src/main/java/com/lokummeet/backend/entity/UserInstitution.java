package com.lokummeet.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.OffsetDateTime;

@Entity
@Table(name = "user_institutions")
@Data
public class UserInstitution {
    @EmbeddedId
    private UserInstitutionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("institutionId")
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @Column(length = 50)
    private String role = "MEMBER";

    @Column(name = "joined_at")
    private OffsetDateTime joinedAt = OffsetDateTime.now();
}