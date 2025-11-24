package com.lokummeet.backend.service;

import com.lokummeet.backend.dto.InstitutionDTO;
import com.lokummeet.backend.entity.Institution;
import com.lokummeet.backend.entity.InstitutionCategory;
import com.lokummeet.backend.entity.VerificationStatus;
import com.lokummeet.backend.exception.BadRequestException;
import com.lokummeet.backend.exception.ResourceNotFoundException;
import com.lokummeet.backend.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstitutionService {
    private final InstitutionRepository institutionRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public InstitutionDTO createInstitution(Institution institution) {
        if (institutionRepository.existsByEmail(institution.getEmail())) {
            throw new BadRequestException("Institution with this email already exists");
        }

        institution.setCreatedAt(OffsetDateTime.now());
        institution.setUpdatedAt(OffsetDateTime.now());
        institution.setVerificationStatus(VerificationStatus.PENDING);

        Institution saved = institutionRepository.save(institution);
        return modelMapper.map(saved, InstitutionDTO.class);
    }

    @Transactional
    public InstitutionDTO updateInstitution(Long id, Institution institutionDetails) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Institution not found"));

        institution.setName(institutionDetails.getName());
        institution.setCategory(institutionDetails.getCategory());
        institution.setDescription(institutionDetails.getDescription());
        institution.setLogoUrl(institutionDetails.getLogoUrl());
        institution.setWebsiteUrl(institutionDetails.getWebsiteUrl());
        institution.setUpdatedAt(OffsetDateTime.now());

        Institution updated = institutionRepository.save(institution);
        return modelMapper.map(updated, InstitutionDTO.class);
    }

    public InstitutionDTO getInstitutionById(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Institution not found"));
        return modelMapper.map(institution, InstitutionDTO.class);
    }

    public List<InstitutionDTO> getAllInstitutions() {
        return institutionRepository.findAll().stream()
                .map(inst -> modelMapper.map(inst, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    public List<InstitutionDTO> getInstitutionsByCategory(InstitutionCategory category) {
        return institutionRepository.findByCategory(category).stream()
                .map(inst -> modelMapper.map(inst, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    public List<InstitutionDTO> getVerifiedInstitutions() {
        return institutionRepository.findByVerificationStatus(VerificationStatus.APPROVED).stream()
                .map(inst -> modelMapper.map(inst, InstitutionDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteInstitution(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Institution not found"));
        institutionRepository.delete(institution);
    }
}

