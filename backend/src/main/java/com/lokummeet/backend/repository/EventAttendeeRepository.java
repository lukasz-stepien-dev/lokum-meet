package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.entity.EventAttendee;
import com.lokummeet.backend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventAttendeeRepository extends CrudRepository<EventAttendee, Long> {
    Optional<EventAttendee> findByEventAndUser(Event event, User user);
}
