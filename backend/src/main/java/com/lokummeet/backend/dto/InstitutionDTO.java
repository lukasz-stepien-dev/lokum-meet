package com.lokummeet.backend.dto;

import com.lokummeet.backend.entity.InstitutionCategory;
import com.lokummeet.backend.entity.VerificationStatus;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class InstitutionDTO {
    private Long id;
    private String name;
    private String email;
    private InstitutionCategory category;
    private String description;
    private VerificationStatus verificationStatus;
    private String logoUrl;
    private String websiteUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}

