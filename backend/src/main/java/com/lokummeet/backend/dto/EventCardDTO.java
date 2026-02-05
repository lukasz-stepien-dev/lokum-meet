package com.lokummeet.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventCardDTO {
    private Long id;
    private LocalDateTime startTime;
    private String title;
    private String description;
}
