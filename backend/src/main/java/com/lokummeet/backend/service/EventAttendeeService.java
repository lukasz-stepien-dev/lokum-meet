package com.lokummeet.backend.service;

import com.lokummeet.backend.dto.EventAttendeeDTO;
import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.entity.EventAttendee;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.exception.BadRequestException;
import com.lokummeet.backend.exception.ResourceNotFoundException;
import com.lokummeet.backend.repository.EventAttendeeRepository;
import com.lokummeet.backend.repository.EventRepository;
import com.lokummeet.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventAttendeeService {
    private final EventAttendeeRepository eventAttendeeRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Transactional
    public void joinEvent(Long eventId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        // Check if user already joined
        if (eventAttendeeRepository.findByEventIdAndUserId(eventId, user.getId()).isPresent()) {
            throw new BadRequestException("You have already joined this event");
        }

        // Check capacity
        if (event.getCurrentCapacity() >= event.getMaxCapacity()) {
            throw new BadRequestException("Event is full");
        }

        // Check age restrictions
        int userAge = user.getAge();
        if (userAge < event.getMinAge() || userAge > event.getMaxAge()) {
            throw new BadRequestException("You don't meet the age requirements for this event");
        }

        EventAttendee attendee = new EventAttendee();
        attendee.setEvent(event);
        attendee.setUser(user);
        attendee.setJoinedAt(OffsetDateTime.now());
        attendee.setStatus("JOINED");

        eventAttendeeRepository.save(attendee);

        // Update event capacity
        event.setCurrentCapacity(event.getCurrentCapacity() + 1);
        eventRepository.save(event);
    }

    @Transactional
    public void leaveEvent(Long eventId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        EventAttendee attendee = eventAttendeeRepository.findByEventIdAndUserId(eventId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("You are not a member of this event"));

        eventAttendeeRepository.delete(attendee);

        // Update event capacity
        event.setCurrentCapacity(Math.max(0, event.getCurrentCapacity() - 1));
        eventRepository.save(event);
    }

    public List<EventAttendeeDTO> getEventAttendees(Long eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new ResourceNotFoundException("Event not found");
        }
        return eventAttendeeRepository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventAttendeeDTO> getUserEvents(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return eventAttendeeRepository.findByUserId(user.getId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EventAttendeeDTO convertToDTO(EventAttendee attendee) {
        EventAttendeeDTO dto = new EventAttendeeDTO();
        dto.setId(attendee.getId());
        dto.setEventId(attendee.getEvent().getId());
        dto.setEventTitle(attendee.getEvent().getTitle());
        dto.setUserId(attendee.getUser().getId());
        dto.setUsername(attendee.getUser().getUsername());
        dto.setUserEmail(attendee.getUser().getEmail());
        dto.setUserAvatarUrl(attendee.getUser().getAvatarUrl());
        dto.setJoinedAt(attendee.getJoinedAt());
        dto.setStatus(attendee.getStatus());
        return dto;
    }
}

