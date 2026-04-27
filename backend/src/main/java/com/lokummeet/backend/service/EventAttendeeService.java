package com.lokummeet.backend.service;

import com.lokummeet.backend.auth.SecurityUtil;
import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.entity.EventAttendee;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.EventAttendeeRepository;
import com.lokummeet.backend.repository.EventRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class EventAttendeeService {
    private final EventAttendeeRepository eventAttendeeRepository;
    private final EventRepository eventRepository;
    private final SecurityUtil securityUtil;

    public Boolean checkIsEnroll(Long eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        User user = securityUtil.getManagedUser();
        Optional<EventAttendee> eventAttendee = eventAttendeeRepository.findByEventAndUser(event.orElseThrow(), user);
        return eventAttendee.filter(eventAttendee1 ->
                "JOINED".equals(eventAttendee1.getStatus()))
                .isPresent();
    }
}
