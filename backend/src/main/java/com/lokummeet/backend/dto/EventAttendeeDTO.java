package com.lokummeet.backend.dto;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class EventAttendeeDTO {
    private Long id;
    private Long eventId;
    private String eventTitle;
    private Long userId;
    private String username;
    private String userEmail;
    private String userAvatarUrl;
    private OffsetDateTime joinedAt;
    private String status;
}

