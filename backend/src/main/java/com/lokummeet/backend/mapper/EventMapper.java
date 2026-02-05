package com.lokummeet.backend.mapper;

import com.lokummeet.backend.dto.EventDTO;
import com.lokummeet.backend.entity.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel =  "spring")
public interface EventMapper extends BaseMapper<EventDTO, Event> {
    EventDTO toDto(Event entity);
    Event toEntity(EventDTO dto);
}
