package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.EventCardDTO;
import com.lokummeet.backend.repository.EventRepository;
import com.lokummeet.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/events")
public class EventController {
    private final EventRepository eventRepository;
    private final EventService eventService;

    @GetMapping("/latest")
    public List<EventCardDTO> getLatestEvents() {
        return eventRepository.findByDateEventAfter(LocalDate.now(), Sort.by(Sort.Direction.ASC, "dateEvent"))
                .stream()
                .map(eventService::getEventCardDTO)
                .toList();
    }
}
