package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.EventAttendeeDTO;
import com.lokummeet.backend.service.EventAttendeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-attendees")
@RequiredArgsConstructor
public class EventAttendeeController {
    private final EventAttendeeService eventAttendeeService;

    @PostMapping("/join/{eventId}")
    public ResponseEntity<Void> joinEvent(
            @PathVariable Long eventId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        eventAttendeeService.joinEvent(eventId, userEmail);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/leave/{eventId}")
    public ResponseEntity<Void> leaveEvent(
            @PathVariable Long eventId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        eventAttendeeService.leaveEvent(eventId, userEmail);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventAttendeeDTO>> getEventAttendees(@PathVariable Long eventId) {
        List<EventAttendeeDTO> attendees = eventAttendeeService.getEventAttendees(eventId);
        return ResponseEntity.ok(attendees);
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<EventAttendeeDTO>> getMyEvents(Authentication authentication) {
        String userEmail = authentication.getName();
        List<EventAttendeeDTO> events = eventAttendeeService.getUserEvents(userEmail);
        return ResponseEntity.ok(events);
    }
}

