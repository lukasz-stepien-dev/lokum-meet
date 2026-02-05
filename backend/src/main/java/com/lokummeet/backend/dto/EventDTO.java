package com.lokummeet.backend.dto;

import com.lokummeet.backend.entity.EventCategory;
import com.lokummeet.backend.entity.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class EventDTO {
    private String title;
    private String description;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate dateEvent;
    private Integer maxCapacity;
    private EventCategory category;
    private String imageUrl;
    private String imageFilename;
    private User createdBy;
    private Integer minAge;
    private Integer maxAge;
}
