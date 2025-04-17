package com.example.Sponsorship.services;

import com.example.Sponsorship.dtos.SponsorshipPaymentDTO;
import com.example.Sponsorship.models.SponsorshipContract;
import com.example.Sponsorship.models.SponsorshipPayment;
import com.example.Sponsorship.repositories.SponsorshipPaymentRepository;
import com.example.Sponsorship.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SponsorshipPaymentService {

    @Autowired
    private SponsorshipPaymentRepository paymentRepository;

    public List<SponsorshipPaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SponsorshipPaymentDTO> getPaymentById(Integer id) {
        return paymentRepository.findById(id).map(ConvertUtils::convertToDTO);
    }

    public SponsorshipPaymentDTO createPayment(SponsorshipPaymentDTO paymentDTO) {
        SponsorshipContract contract = new SponsorshipContract();
        contract.setContractId(paymentDTO.getContractId());
        SponsorshipPayment payment = SponsorshipPayment.builder()
                .amount(paymentDTO.getAmount())
                .paymentDate(paymentDTO.getPaymentDate())
                .paymentMethod(paymentDTO.getPaymentMethod())
                .notes(paymentDTO.getNotes())
                .transactionReference(paymentDTO.getTransactionReference())
                .contract(contract)
                .build();
        SponsorshipPayment savedPayment = paymentRepository.save(payment);
        return ConvertUtils.convertToDTO(savedPayment);
    }

    @Transactional
    public Optional<SponsorshipPaymentDTO> updatePayment(Integer id, SponsorshipPaymentDTO paymentDTO) {
        Optional<SponsorshipPayment> paymentOptional = paymentRepository.findById(id);

        if (paymentOptional.isPresent()) {
            SponsorshipPayment payment = paymentOptional.get();
            SponsorshipContract contract = new SponsorshipContract();
            contract.setContractId(paymentDTO.getContractId());

            if (paymentDTO.getAmount() != null) {
                payment.setAmount(paymentDTO.getAmount());
            }
            if (paymentDTO.getPaymentDate() != null) {
                payment.setPaymentDate(paymentDTO.getPaymentDate());
            }
            if (paymentDTO.getPaymentMethod() != null) {
                payment.setPaymentMethod(paymentDTO.getPaymentMethod());
            }
            if (paymentDTO.getTransactionReference() != null) {
                payment.setTransactionReference(paymentDTO.getTransactionReference());
            }
            if (paymentDTO.getContractId() != null) {
                payment.setContract(contract);
            }
            if(paymentDTO.getNotes() != null){
                payment.setNotes(payment.getNotes());
            }

            SponsorshipPayment updatedPayment = paymentRepository.save(payment);
            return Optional.of(ConvertUtils.convertToDTO(updatedPayment));
        }

        return Optional.empty();
    }

    public List<SponsorshipPaymentDTO> getPaymentsByContractId(Integer contractId) {
        return paymentRepository.findByContractContractId(contractId)
                .stream()
                .map(ConvertUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public boolean deletePayment(Integer id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}