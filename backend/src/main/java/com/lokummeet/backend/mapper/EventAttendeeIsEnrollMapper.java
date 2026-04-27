package com.lokummeet.backend.mapper;

import com.lokummeet.backend.dto.EventAttendeeIsEnrollDto;
import com.lokummeet.backend.entity.EventAttendee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventAttendeeIsEnrollMapper extends BaseMapper<EventAttendeeIsEnrollDto, EventAttendee> {
    EventAttendeeIsEnrollDto toDto(EventAttendee entity);
    EventAttendee toEntity(EventAttendeeIsEnrollDto dto);
}
