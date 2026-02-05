package com.lokummeet.backend.service;

import com.lokummeet.backend.dto.EventCardDTO;
import com.lokummeet.backend.dto.EventDTO;
import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.mapper.EventCardMapper;
import com.lokummeet.backend.mapper.EventMapper;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    private final EventCardMapper eventCardMapper;
    private final EventMapper eventMapper;

    public EventService(EventCardMapper eventCardMapper,
                        EventMapper eventMapper) {
        this.eventCardMapper = eventCardMapper;
        this.eventMapper = eventMapper;
    }

    public EventCardDTO getEventCardDTO(Event event) {
        return eventCardMapper.toDto(event);
    }

    public EventDTO getEventDTO(Event event) {
        return eventMapper.toDto(event);
    }

    public Event createEventCardFromEventCardDTO(EventCardDTO eventCardDTO) {
        return eventCardMapper.toEntity(eventCardDTO);
    }

    public Event createEventFromEventDTO(EventDTO eventDTO) {
        return eventMapper.toEntity(eventDTO);
    }


}
