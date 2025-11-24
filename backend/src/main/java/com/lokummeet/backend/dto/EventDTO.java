package com.lokummeet.backend.dto;

import com.lokummeet.backend.entity.EventCategory;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate dateEvent;
    private Integer maxCapacity;
    private Integer currentCapacity;
    private EventCategory category;
    private String imageUrl;
    private Long createdById;
    private String createdByUsername;
    private Long approvedInstitutionId;
    private String approvedInstitutionName;
    private Integer minAge;
    private Integer maxAge;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

