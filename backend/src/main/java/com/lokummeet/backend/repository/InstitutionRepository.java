package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.Institution;
import com.lokummeet.backend.entity.InstitutionCategory;
import com.lokummeet.backend.entity.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    Optional<Institution> findByEmail(String email);
    
    List<Institution> findByCategory(InstitutionCategory category);
    
    List<Institution> findByVerificationStatus(VerificationStatus status);
    
    List<Institution> findByCategoryAndVerificationStatus(InstitutionCategory category, VerificationStatus status);
    
    boolean existsByEmail(String email);
}

