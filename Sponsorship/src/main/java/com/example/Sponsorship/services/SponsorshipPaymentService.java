package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorshipPaymentDTO;
import com.example.Sponsorship.models.SponsorshipContract;
import com.example.Sponsorship.models.SponsorshipPayment;
import com.example.Sponsorship.repositories.SponsorshipPaymentRepository;
import com.example.Sponsorship.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SponsorshipPaymentService {

    private final SponsorshipPaymentRepository paymentRepository;
    private final SponsorshipContractService contractService;

    @Autowired
    public SponsorshipPaymentService(SponsorshipPaymentRepository paymentRepository,
                                    SponsorshipContractService contractService) {
        this.paymentRepository = paymentRepository;
        this.contractService = contractService;
    }

    public List<SponsorshipPaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SponsorshipPaymentDTO> getPaymentById(Integer id) {
        return paymentRepository.findById(id).map(ConvertUtils::convertToDTO);
    }

    public SponsorshipPaymentDTO createPayment(SponsorshipPaymentDTO dto) {
        SponsorshipContract contract = contractService.getContractById(dto.getContractId())
                .map(contractDTO -> {
                    SponsorshipContract newContract = new SponsorshipContract();
                    newContract.setContractId(contractDTO.getContractId());
                    return newContract;
                })
                .orElseThrow(() -> new IllegalArgumentException("Contract ID không hợp lệ"));

        SponsorshipPayment payment = SponsorshipPayment.builder()
                .contract(contract)
                .amount(dto.getAmount())
                .paymentDate(dto.getPaymentDate())
                .paymentMethod(dto.getPaymentMethod())
                .transactionReference(dto.getTransactionReference())
                .notes(dto.getNotes())
                .build();

        return ConvertUtils.convertToDTO(paymentRepository.save(payment));
    }
}