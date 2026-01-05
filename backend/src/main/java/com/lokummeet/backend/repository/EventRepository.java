package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.Event;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findByDateEventAfter(LocalDate date, Sort sort);
}
