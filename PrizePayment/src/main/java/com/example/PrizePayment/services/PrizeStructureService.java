package com.example.PrizePayment.services;

import com.example.PrizePayment.dtos.PrizeStructureDTO;
import com.example.PrizePayment.models.PrizeStructure;
import com.example.PrizePayment.repositories.PrizeStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrizeStructureService {

    @Autowired
    private PrizeStructureRepository prizeStructureRepository;

    // Add methods to interact with the PrizeStructureRepository
    public List<PrizeStructureDTO> getAllPrizeStructures(){
        return prizeStructureRepository.findAll().stream()
                .map(this::convertToDTO).collect(Collectors.toList());
    }

    private PrizeStructureDTO convertToDTO(PrizeStructure prizeStructure){
        return PrizeStructureDTO.builder()
                .structureId(prizeStructure.getStructureId())
                .prizeCategory(prizeStructure.getPrizeCategory())
                .position(prizeStructure.getPosition())
                .amount(prizeStructure.getAmount())
                .applicableYear(prizeStructure.getApplicableYear())
                .build();
    }
}
