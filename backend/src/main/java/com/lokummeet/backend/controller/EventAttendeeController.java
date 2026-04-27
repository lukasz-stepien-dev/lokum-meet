package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.EventAttendeeIsEnrollDto;
import com.lokummeet.backend.repository.EventAttendeeRepository;
import com.lokummeet.backend.service.EventAttendeeService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth/events")
public class EventAttendeeController {
    private final EventAttendeeRepository eventAttendeeRepository;
    private final EventAttendeeService eventAttendeeService;

    @GetMapping("/{id}/is-enroll")
    public EventAttendeeIsEnrollDto getIsEnroll(@PathVariable Long id) {
        boolean isEnroll = eventAttendeeService.checkIsEnroll(id);
        EventAttendeeIsEnrollDto dto = new EventAttendeeIsEnrollDto();
        dto.setIsEnroll(isEnroll);
        return dto;
    }
}
