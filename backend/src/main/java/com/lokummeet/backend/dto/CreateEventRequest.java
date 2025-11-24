package com.lokummeet.backend.dto;

import com.lokummeet.backend.entity.EventCategory;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CreateEventRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotBlank(message = "Location is required")
    @Size(max = 500, message = "Location must not exceed 500 characters")
    private String location;

    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;

    @NotNull(message = "Event date is required")
    private LocalDate dateEvent;

    @Min(value = 1, message = "Max capacity must be at least 1")
    private Integer maxCapacity;

    @NotNull(message = "Category is required")
    private EventCategory category;

    private String imageUrl;

    private Long approvedInstitutionId;

    @Min(value = 13, message = "Minimum age must be at least 13")
    private Integer minAge = 13;

    @Max(value = 150, message = "Maximum age must not exceed 150")
    private Integer maxAge = 150;
}

