package com.lokummeet.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "events")
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(length = 500, nullable = false)
    private String location;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "date_event", nullable = false)
    private LocalDate dateEvent;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "current_capacity")
    private Integer currentCapacity = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private EventCategory category;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "image_filename")
    private String imageFilename;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_institution")
    private Institution approvedInstitution;

    @Column(name = "min_age")
    private Integer minAge = 13;

    @Column(name = "max_age")
    private Integer maxAge = 150;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}