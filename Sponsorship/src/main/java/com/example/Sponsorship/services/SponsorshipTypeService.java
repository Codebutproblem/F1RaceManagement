package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorshipTypeDTO;
import com.example.Sponsorship.models.SponsorshipType;
import com.example.Sponsorship.repositories.SponsorshipTypeRepository;
import com.example.Sponsorship.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SponsorshipTypeService {

    @Autowired
    private SponsorshipTypeRepository sponsorshipTypeRepository;

    public List<SponsorshipTypeDTO> getAllSponsorshipTypes() {
        return sponsorshipTypeRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SponsorshipTypeDTO> getSponsorshipTypeById(Integer id) {
        return sponsorshipTypeRepository.findById(id).map(ConvertUtils::convertToDTO);
    }

    public SponsorshipTypeDTO createSponsorshipType(SponsorshipTypeDTO typeDTO) {
        SponsorshipType type = SponsorshipType.builder()
                .typeName(typeDTO.getTypeName())
                .description(typeDTO.getDescription())
                .visibilityLevel(typeDTO.getVisibilityLevel())
                .build();
        SponsorshipType savedType = sponsorshipTypeRepository.save(type);
        return ConvertUtils.convertToDTO(savedType);
    }

    @Transactional
    public Optional<SponsorshipTypeDTO> updateSponsorshipType(Integer id, SponsorshipTypeDTO typeDTO) {
        Optional<SponsorshipType> typeOptional = sponsorshipTypeRepository.findById(id);

        if (typeOptional.isPresent()) {
            SponsorshipType type = typeOptional.get();

            if (typeDTO.getTypeName() != null) {
                type.setTypeName(typeDTO.getTypeName());
            }
            if (typeDTO.getDescription() != null) {
                type.setDescription(typeDTO.getDescription());
            }
            if (typeDTO.getVisibilityLevel() != null) {
                type.setVisibilityLevel(typeDTO.getVisibilityLevel());
            }

            SponsorshipType updatedType = sponsorshipTypeRepository.save(type);
            return Optional.of(ConvertUtils.convertToDTO(updatedType));
        }

        return Optional.empty();
    }

    @Transactional
    public boolean deleteSponsorshipType(Integer id) {
        if (sponsorshipTypeRepository.existsById(id)) {
            sponsorshipTypeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}