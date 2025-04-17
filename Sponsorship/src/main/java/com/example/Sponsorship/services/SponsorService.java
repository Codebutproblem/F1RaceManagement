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
            String sponsorName = sponsorDTO.getSponsorName();
            if (sponsorName != null && !sponsorName.isEmpty()) {
                existingSponsor.setSponsorName(sponsorName);
            }
            String contactEmail = sponsorDTO.getContactEmail();
            if (contactEmail != null && !contactEmail.isEmpty()) {
                existingSponsor.setContactEmail(contactEmail);
            }
            String contactPhone = sponsorDTO.getContactPhone();
            if (contactPhone != null && !contactPhone.isEmpty()) {
                existingSponsor.setContactPhone(contactPhone);
            }
            String contactPerson = sponsorDTO.getContactPerson();
            if (contactPerson != null && !contactPerson.isEmpty()) {
                existingSponsor.setContactPerson(contactPerson);
            }
            String industry = sponsorDTO.getIndustry();
            if (industry != null && !industry.isEmpty()) {
                existingSponsor.setIndustry(industry);
            }
            Sponsor updatedSponsor = sponsorRepository.save(existingSponsor);
            return Optional.of(ConvertUtils.convertToDTO(updatedSponsor));
        }

        return Optional.empty();
    }
}