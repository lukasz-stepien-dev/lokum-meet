package com.lokummeet.backend.controller;

import com.lokummeet.backend.repository.EventRepository;
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
@RequestMapping("/events")
public class EventController {
    private final EventRepository eventRepository;

    @GetMapping("/latest")
    public Object getLatestEvents() {
        return eventRepository.findByDateEventAfter(LocalDate.now(), Sort.by(Sort.Direction.DESC, "dateEvent"));
    }
}
