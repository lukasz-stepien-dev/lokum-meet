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


}
