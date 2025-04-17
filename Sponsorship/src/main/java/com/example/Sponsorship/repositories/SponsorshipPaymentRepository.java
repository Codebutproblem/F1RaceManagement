package com.example.Sponsorship.repositories;

import com.example.Sponsorship.models.SponsorshipPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SponsorshipPaymentRepository extends JpaRepository<SponsorshipPayment, Integer> {
    // Change this method name to use contract.contractId instead of contractId
    List<SponsorshipPayment> findByContractContractId(Integer contractId);
}