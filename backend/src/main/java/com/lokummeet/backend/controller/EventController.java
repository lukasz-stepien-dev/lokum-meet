package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.CreateEventRequest;
import com.lokummeet.backend.dto.EventDTO;
import com.lokummeet.backend.entity.EventCategory;
import com.lokummeet.backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(
            @Valid @RequestBody CreateEventRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        EventDTO event = eventService.createEvent(request, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody CreateEventRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        EventDTO event = eventService.updateEvent(id, request, userEmail);
        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Long id,
            Authentication authentication) {
        String userEmail = authentication.getName();
        eventService.deleteEvent(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        EventDTO event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        List<EventDTO> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/available")
    public ResponseEntity<List<EventDTO>> getAvailableEvents() {
        List<EventDTO> events = eventService.getAvailableEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventDTO>> getEventsByCategory(@PathVariable EventCategory category) {
        List<EventDTO> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<EventDTO>> getMyEvents(Authentication authentication) {
        String userEmail = authentication.getName();
        List<EventDTO> events = eventService.getEventsByUser(userEmail);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventDTO>> searchEvents(@RequestParam String query) {
        List<EventDTO> events = eventService.searchEvents(query);
        return ResponseEntity.ok(events);
    }
}

