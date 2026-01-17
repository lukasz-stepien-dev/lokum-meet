package com.lokummeet.backend.service;

import com.lokummeet.backend.dto.EventCardDTO;
import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.mapper.EventCardMapper;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    private final EventCardMapper eventCardMapper;

    public EventService(EventCardMapper eventCardMapper) {
        this.eventCardMapper = eventCardMapper;
    }

    public EventCardDTO getEventCardDTO(Event event) {
        return eventCardMapper.toDto(event);
    }

    public Event createEventCardFromDTO(EventCardDTO eventCardDTO) {
        return eventCardMapper.toEntity(eventCardDTO);
    }
}
