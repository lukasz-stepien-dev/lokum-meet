package com.lokummeet.backend.controller;

import com.lokummeet.backend.dto.InstitutionDTO;
import com.lokummeet.backend.entity.Institution;
import com.lokummeet.backend.entity.InstitutionCategory;
import com.lokummeet.backend.service.InstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
@RequiredArgsConstructor
public class InstitutionController {
    private final InstitutionService institutionService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_INSTITUTION')")
    public ResponseEntity<InstitutionDTO> createInstitution(@RequestBody Institution institution) {
        InstitutionDTO created = institutionService.createInstitution(institution);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_INSTITUTION')")
    public ResponseEntity<InstitutionDTO> updateInstitution(
            @PathVariable Long id,
            @RequestBody Institution institution) {
        InstitutionDTO updated = institutionService.updateInstitution(id, institution);
        return ResponseEntity.ok(updated);
    }

    // Public GET endpoints - no @PreAuthorize needed
    @GetMapping("/{id}")
    public ResponseEntity<InstitutionDTO> getInstitutionById(@PathVariable Long id) {
        InstitutionDTO institution = institutionService.getInstitutionById(id);
        return ResponseEntity.ok(institution);
    }

    @GetMapping
    public ResponseEntity<List<InstitutionDTO>> getAllInstitutions() {
        List<InstitutionDTO> institutions = institutionService.getAllInstitutions();
        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/verified")
    public ResponseEntity<List<InstitutionDTO>> getVerifiedInstitutions() {
        List<InstitutionDTO> institutions = institutionService.getVerifiedInstitutions();
        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<InstitutionDTO>> getInstitutionsByCategory(@PathVariable InstitutionCategory category) {
        List<InstitutionDTO> institutions = institutionService.getInstitutionsByCategory(category);
        return ResponseEntity.ok(institutions);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        institutionService.deleteInstitution(id);
        return ResponseEntity.noContent().build();
    }
}

