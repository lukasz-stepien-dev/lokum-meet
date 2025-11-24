package com.lokummeet.backend.service;

import com.lokummeet.backend.dto.CreateEventRequest;
import com.lokummeet.backend.dto.EventDTO;
import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.entity.EventCategory;
import com.lokummeet.backend.entity.Institution;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.exception.BadRequestException;
import com.lokummeet.backend.exception.ResourceNotFoundException;
import com.lokummeet.backend.repository.EventRepository;
import com.lokummeet.backend.repository.InstitutionRepository;
import com.lokummeet.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public EventDTO createEvent(CreateEventRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new BadRequestException("End time must be after start time");
        }

        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setDateEvent(request.getDateEvent());
        event.setMaxCapacity(request.getMaxCapacity());
        event.setCategory(request.getCategory());
        event.setImageUrl(request.getImageUrl());
        event.setMinAge(request.getMinAge());
        event.setMaxAge(request.getMaxAge());
        event.setCreatedBy(user);
        event.setCreatedAt(LocalDateTime.now());
        event.setUpdatedAt(LocalDateTime.now());

        if (request.getApprovedInstitutionId() != null) {
            Institution institution = institutionRepository.findById(request.getApprovedInstitutionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Institution not found"));
            event.setApprovedInstitution(institution);
        }

        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }

    @Transactional
    public EventDTO updateEvent(Long eventId, CreateEventRequest request, String userEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!event.getCreatedBy().getId().equals(user.getId())) {
            throw new BadRequestException("You can only update your own events");
        }

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new BadRequestException("End time must be after start time");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setDateEvent(request.getDateEvent());
        event.setMaxCapacity(request.getMaxCapacity());
        event.setCategory(request.getCategory());
        event.setImageUrl(request.getImageUrl());
        event.setMinAge(request.getMinAge());
        event.setMaxAge(request.getMaxAge());
        event.setUpdatedAt(LocalDateTime.now());

        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }

    @Transactional
    public void deleteEvent(Long eventId, String userEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!event.getCreatedBy().getId().equals(user.getId())) {
            throw new BadRequestException("You can only delete your own events");
        }

        eventRepository.delete(event);
    }

    public EventDTO getEventById(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        return convertToDTO(event);
    }

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getUpcomingEvents() {
        return eventRepository.findByDateEventAfter(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByCategory(EventCategory category) {
        return eventRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return eventRepository.findByCreatedById(user.getId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> searchEvents(String query) {
        return eventRepository.searchEvents(query).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getAvailableEvents() {
        return eventRepository.findUpcomingEventsWithCapacity(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EventDTO convertToDTO(Event event) {
        EventDTO dto = modelMapper.map(event, EventDTO.class);
        dto.setCreatedById(event.getCreatedBy().getId());
        dto.setCreatedByUsername(event.getCreatedBy().getUsername());
        if (event.getApprovedInstitution() != null) {
            dto.setApprovedInstitutionId(event.getApprovedInstitution().getId());
            dto.setApprovedInstitutionName(event.getApprovedInstitution().getName());
        }
        return dto;
    }
}

