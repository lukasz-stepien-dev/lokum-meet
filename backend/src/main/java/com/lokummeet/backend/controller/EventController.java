package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.EventCardDTO;
import com.lokummeet.backend.dto.EventDTO;
import com.lokummeet.backend.repository.EventRepository;
import com.lokummeet.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public Optional<EventDTO> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(eventService::getEventDTO);
    }
}
