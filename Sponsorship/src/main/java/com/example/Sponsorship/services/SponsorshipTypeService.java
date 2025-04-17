package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorshipTypeDTO;
import com.example.Sponsorship.models.SponsorshipType;
import com.example.Sponsorship.repositories.SponsorshipTypeRepository;
import com.example.Sponsorship.utils.ConvertUtils;
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
}