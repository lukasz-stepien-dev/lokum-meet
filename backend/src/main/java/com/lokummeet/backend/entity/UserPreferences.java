package com.lokummeet.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_preferences")
@Data
public class UserPreferences {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_favorite_categories", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Set<EventCategory> favoriteCategories = new HashSet<>();

    @Column(name = "preferred_distance")
    private Integer preferredDistance = 10;

    @Column(name = "notify_new_events")
    private Boolean notifyNewEvents = true;

    @Column(name = "notify_event_updates")
    private Boolean notifyEventUpdates = true;

    @Column(name = "updated_at")
    @LastModifiedDate
    private OffsetDateTime updatedAt;
}