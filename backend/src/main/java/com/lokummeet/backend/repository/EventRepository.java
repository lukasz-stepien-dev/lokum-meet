package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.Event;
import com.lokummeet.backend.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategory(EventCategory category);

    List<Event> findByDateEventAfter(LocalDate date);

    List<Event> findByDateEventBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT e FROM Event e WHERE e.createdBy.id = :userId")
    List<Event> findByCreatedById(@Param("userId") Long userId);

    @Query("SELECT e FROM Event e WHERE e.approvedInstitution.id = :institutionId")
    List<Event> findByInstitutionId(@Param("institutionId") Long institutionId);

    @Query("SELECT e FROM Event e WHERE e.dateEvent >= :date AND e.currentCapacity < e.maxCapacity")
    List<Event> findUpcomingEventsWithCapacity(@Param("date") LocalDate date);

    @Query("SELECT e FROM Event e WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Event> searchEvents(@Param("query") String query);
}

