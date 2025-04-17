package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorshipContractDTO;
import com.example.Sponsorship.models.Sponsor;
import com.example.Sponsorship.models.SponsorshipContract;
import com.example.Sponsorship.models.SponsorshipType;
import com.example.Sponsorship.repositories.SponsorshipContractRepository;
import com.example.Sponsorship.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SponsorshipContractService {

    @Autowired
    private SponsorshipContractRepository contractRepository;

    public List<SponsorshipContractDTO> getAllContracts() {
        return contractRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SponsorshipContractDTO> getContractById(Integer id) {
        return contractRepository.findById(id).map(ConvertUtils::convertToDTO);
    }

    public SponsorshipContractDTO createContract(SponsorshipContractDTO contractDTO) {
        Sponsor sponsor = new Sponsor();
        SponsorshipType type = new SponsorshipType();
        sponsor.setSponsorId(contractDTO.getSponsorId());
        type.setTypeId(contractDTO.getTypeId());
        SponsorshipContract contract = SponsorshipContract.builder()
                .sponsor(sponsor)
                .sponsorshipType(type)
                .startDate(contractDTO.getStartDate())
                .endDate(contractDTO.getEndDate())
                .contractValue(contractDTO.getContractValue())
                .status(contractDTO.getStatus())
                .paymentTerms(contractDTO.getPaymentTerms())
                .seasonYear(contractDTO.getSeasonYear())
                .build();
        SponsorshipContract savedContract = contractRepository.save(contract);
        return ConvertUtils.convertToDTO(savedContract);
    }

    @Transactional
    public Optional<SponsorshipContractDTO> updateContract(Integer id, SponsorshipContractDTO contractDTO) {
        Optional<SponsorshipContract> contractOptional = contractRepository.findById(id);

        if (contractOptional.isPresent()) {
            Sponsor sponsor = new Sponsor();
            SponsorshipType type = new SponsorshipType();
            sponsor.setSponsorId(contractDTO.getSponsorId());
            type.setTypeId(contractDTO.getTypeId());
            SponsorshipContract contract = contractOptional.get();

            if (contractDTO.getSponsorId() != null) {
                contract.setSponsor(sponsor);
            }
            if (contractDTO.getTypeId() != null) {
                contract.setSponsorshipType(type);
            }
            if (contractDTO.getStartDate() != null) {
                contract.setStartDate(contractDTO.getStartDate());
            }
            if (contractDTO.getEndDate() != null) {
                contract.setEndDate(contractDTO.getEndDate());
            }
            if (contractDTO.getContractValue() != null) {
                contract.setContractValue(contractDTO.getContractValue());
            }
            if (contractDTO.getStatus() != null) {
                contract.setStatus(contractDTO.getStatus());
            }
            if (contractDTO.getPaymentTerms() != null) {
                contract.setPaymentTerms(contractDTO.getPaymentTerms());
            }
            if (contractDTO.getSeasonYear() != null) {
                contract.setSeasonYear(contractDTO.getSeasonYear());
            }

            SponsorshipContract updatedContract = contractRepository.save(contract);
            return Optional.of(ConvertUtils.convertToDTO(updatedContract));
        }

        return Optional.empty();
    }

    @Transactional
    public boolean deleteContract(Integer id) {
        if (contractRepository.existsById(id)) {
            contractRepository.deleteById(id);
            return true;
        }
        return false;
    }
}