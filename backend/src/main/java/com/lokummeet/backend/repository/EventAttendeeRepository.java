package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.EventAttendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventAttendeeRepository extends JpaRepository<EventAttendee, Long> {
    @Query("SELECT ea FROM EventAttendee ea WHERE ea.event.id = :eventId AND ea.user.id = :userId")
    Optional<EventAttendee> findByEventIdAndUserId(@Param("eventId") Long eventId, @Param("userId") Long userId);
    
    @Query("SELECT ea FROM EventAttendee ea WHERE ea.event.id = :eventId")
    List<EventAttendee> findByEventId(@Param("eventId") Long eventId);
    
    @Query("SELECT ea FROM EventAttendee ea WHERE ea.user.id = :userId")
    List<EventAttendee> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(ea) FROM EventAttendee ea WHERE ea.event.id = :eventId AND ea.status = 'JOINED'")
    Long countByEventId(@Param("eventId") Long eventId);
}

