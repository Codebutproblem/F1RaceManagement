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

    public List<PrizePaymentDTO> getPaymentsByRecipientId(Integer recipientId) {
        return prizePaymentRepository.findByRecipientId(recipientId).stream()
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
                .amount(prizePayment.getAmount())
                .recipientType(prizePayment.getRecipientType())
                .paymentDate(prizePayment.getPaymentDate())
                .recipientId(prizePayment.getRecipientId())
                .notes(prizePayment.getNotes())
                .paymentMethod(prizePayment.getPaymentMethod())
                .build();
    }

    private PrizePayment convertToEntity(PrizePaymentDTO dto) {
        PrizePayment payment = new PrizePayment();
        payment.setPaymentId(dto.getPaymentId());
        payment.setRaceId(dto.getRaceId());
        payment.setAmount(dto.getAmount());
        payment.setRecipientType(dto.getRecipientType());
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setRecipientId(dto.getRecipientId());
        payment.setNotes(dto.getNotes());
        payment.setPaymentMethod(dto.getPaymentMethod());
        return payment;
    }
}