package com.lokummeet.backend.mapper;

import com.lokummeet.backend.dto.EventCardDTO;
import com.lokummeet.backend.entity.Event;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EventCardMapper extends BaseMapper<EventCardDTO, Event> {
    EventCardDTO toDto(Event entity);
    Event toEntity(EventCardDTO dto);
}