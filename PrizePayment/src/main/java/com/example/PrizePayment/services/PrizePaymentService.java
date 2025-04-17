package com.example.PrizePayment.services;

import com.example.PrizePayment.dtos.PrizePaymentDTO;
import com.example.PrizePayment.models.PrizePayment;
import com.example.PrizePayment.repositories.PrizePaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrizePaymentService {

    @Autowired
    private PrizePaymentRepository prizePaymentRepository;

    public List<PrizePaymentDTO> getAllPrizePayments() {
        return prizePaymentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PrizePaymentDTO> getPaymentsByRaceId(Integer raceId) {
        return prizePaymentRepository.findByRaceId(raceId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PrizePaymentDTO> getPaymentsByDriverId(Integer driverId) {
        return prizePaymentRepository.findByDriverId(driverId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PrizePaymentDTO> getPaymentsByTeamId(Integer teamId) {
        return prizePaymentRepository.findByTeamId(teamId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PrizePaymentDTO createPrizePayment(PrizePaymentDTO prizePaymentDTO) {
        PrizePayment prizePayment = convertToEntity(prizePaymentDTO);
        PrizePayment savedPayment = prizePaymentRepository.save(prizePayment);
        return convertToDTO(savedPayment);
    }

    public PrizePaymentDTO updatePaymentStatus(Integer paymentId, PrizePaymentDTO prizePaymentDTO) {
        PrizePayment prizePayment = prizePaymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Prize payment not found with id: " + paymentId));

        PrizePayment updatedPayment = prizePaymentRepository.save(prizePayment);
        return convertToDTO(updatedPayment);
    }

    private PrizePaymentDTO convertToDTO(PrizePayment prizePayment) {
        return PrizePaymentDTO.builder()
                .paymentId(prizePayment.getPaymentId())
                .raceId(prizePayment.getRaceId())
                .driverId(prizePayment.getDriverId())
                .teamId(prizePayment.getTeamId())
                .amount(prizePayment.getAmount())
                .recipientType(prizePayment.getRecipientType())
                .paymentDate(prizePayment.getPaymentDate())
                .recipientId(prizePayment.getRecipientId())
                .build();
    }

    private PrizePayment convertToEntity(PrizePaymentDTO dto) {
        PrizePayment payment = new PrizePayment();
        payment.setPaymentId(dto.getPaymentId());
        payment.setTeamId(dto.getTeamId());
        payment.setRaceId(dto.getRaceId());
        payment.setDriverId(dto.getDriverId());
        payment.setAmount(dto.getAmount());
        payment.setRecipientType(dto.getRecipientType());
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setRecipientId(dto.getRecipientId());
        return payment;
    }
}