package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorDTO;
import com.example.Sponsorship.dtos.SponsorshipContractDTO;
import com.example.Sponsorship.dtos.SponsorshipTypeDTO;
import com.example.Sponsorship.models.Sponsor;
import com.example.Sponsorship.models.SponsorshipContract;
import com.example.Sponsorship.models.SponsorshipType;
import com.example.Sponsorship.repositories.SponsorshipContractRepository;
import com.example.Sponsorship.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SponsorshipContractService {

    private final SponsorshipContractRepository contractRepository;

    private final SponsorService sponsorService;

    private final SponsorshipTypeService sponsorshipTypeService;

    @Autowired
    public SponsorshipContractService(SponsorshipContractRepository contractRepository, SponsorService sponsorService, SponsorshipTypeService sponsorshipTypeService) {
        this.contractRepository = contractRepository;
        this.sponsorService = sponsorService;
        this.sponsorshipTypeService = sponsorshipTypeService;
    }

    public List<SponsorshipContractDTO> getAllContracts() {
        return contractRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SponsorshipContractDTO> getContractById(Integer id) {
        return contractRepository.findById(id).map(ConvertUtils::convertToDTO);
    }

    public SponsorshipContractDTO createContract(SponsorshipContractDTO dto) {
        Sponsor sponsor = sponsorService.getSponsorById(dto.getSponsorId())
                .map(ConvertUtils::convertToEntity)
                .orElseThrow(() -> new IllegalArgumentException("Sponsor ID không hợp lệ"));

        SponsorshipType sponsorshipType = sponsorshipTypeService.getSponsorshipTypeById(dto.getSponsorshipTypeId())
                .map(ConvertUtils::convertToEntity)
                .orElseThrow(() -> new IllegalArgumentException("Sponsorship Type ID không hợp lệ"));

        SponsorshipContract contract = SponsorshipContract.builder()
                .sponsor(sponsor)
                .sponsorshipType(sponsorshipType)
                .seasonYear(dto.getSeasonYear())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .contractValue(dto.getContractValue())
                .paymentTerms(dto.getPaymentTerms())
                .status(dto.getStatus())
                .build();

        return ConvertUtils.convertToDTO(contractRepository.save(contract));
    }

    public Optional<SponsorshipContractDTO> updateContract(Integer id, SponsorshipContractDTO sponsorshipContractDTO) {
        Optional<SponsorshipContract> contract = contractRepository.findById(id);

        if (contract.isPresent()) {
            SponsorshipContract existingContract = contract.get();
            Integer seasonYear = sponsorshipContractDTO.getSeasonYear();
            if(seasonYear != null){
                existingContract.setSeasonYear(seasonYear);
            }

            LocalDate startDate = sponsorshipContractDTO.getStartDate();
            if(startDate != null){
                existingContract.setStartDate(startDate);
            }

            LocalDate endDate = sponsorshipContractDTO.getEndDate();
            if (endDate != null){
                existingContract.setEndDate(endDate);
            }

            BigDecimal contractValue = sponsorshipContractDTO.getContractValue();
            if (contractValue != null){
                existingContract.setContractValue(contractValue);
            }

            String paymentTerms = sponsorshipContractDTO.getPaymentTerms();
            if (paymentTerms != null && !paymentTerms.isEmpty()){
                existingContract.setPaymentTerms(paymentTerms);
            }

            String status = sponsorshipContractDTO.getStatus();
            if (status != null && !status.isEmpty()){
                existingContract.setStatus(status);
            }

            return Optional.of(ConvertUtils.convertToDTO(contractRepository.save(existingContract)));
        }

        return Optional.empty();
    }

    public boolean deleteContract(Integer id) {
        if (contractRepository.existsById(id)) {
            contractRepository.deleteById(id);
            return true;
        }
        return false;
    }
}