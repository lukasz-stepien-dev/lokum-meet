package com.lokummeet.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

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

    @Column(length = 500)
    private String location;

    @Column(name = "start_time")
}
