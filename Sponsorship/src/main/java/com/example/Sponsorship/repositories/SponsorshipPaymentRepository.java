package com.example.Sponsorship.repositories;

import com.example.Sponsorship.models.SponsorshipPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SponsorshipPaymentRepository extends JpaRepository<SponsorshipPayment, Integer> {
}