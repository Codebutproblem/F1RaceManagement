package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorDTO;
import com.example.Sponsorship.models.Sponsor;
import com.example.Sponsorship.repositories.SponsorRepository;
import com.example.Sponsorship.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SponsorService {

    @Autowired
    private SponsorRepository sponsorRepository;

    public List<SponsorDTO> getAllSponsors() {
        return sponsorRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SponsorDTO> getSponsorById(Integer id) {
        return sponsorRepository.findById(id).map(ConvertUtils::convertToDTO);
    }

    public SponsorDTO createSponsor(SponsorDTO sponsorDTO) {
        Sponsor sponsor = Sponsor.builder()
                .sponsorName(sponsorDTO.getSponsorName())
                .contactEmail(sponsorDTO.getContactEmail())
                .contactPhone(sponsorDTO.getContactPhone())
                .contactPerson(sponsorDTO.getContactPerson())
                .industry(sponsorDTO.getIndustry())
                .build();
        Sponsor savedSponsor = sponsorRepository.save(sponsor);
        return ConvertUtils.convertToDTO(savedSponsor);
    }

    @Transactional
    public Optional<SponsorDTO> updateSponsor(Integer id, SponsorDTO sponsorDTO) {
        Optional<Sponsor> sponsor = sponsorRepository.findById(id);

        if (sponsor.isPresent()) {
            Sponsor existingSponsor = sponsor.get();

            if (sponsorDTO.getSponsorName() != null) {
                existingSponsor.setSponsorName(sponsorDTO.getSponsorName());
            }
            if (sponsorDTO.getContactEmail() != null) {
                existingSponsor.setContactEmail(sponsorDTO.getContactEmail());
            }
            if (sponsorDTO.getContactPhone() != null) {
                existingSponsor.setContactPhone(sponsorDTO.getContactPhone());
            }
            if (sponsorDTO.getContactPerson() != null) {
                existingSponsor.setContactPerson(sponsorDTO.getContactPerson());
            }
            if (sponsorDTO.getIndustry() != null) {
                existingSponsor.setIndustry(sponsorDTO.getIndustry());
            }

            Sponsor updatedSponsor = sponsorRepository.save(existingSponsor);
            return Optional.of(ConvertUtils.convertToDTO(updatedSponsor));
        }

        return Optional.empty();
    }

    @Transactional
    public boolean deleteSponsor(Integer id) {
        if (sponsorRepository.existsById(id)) {
            sponsorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}