package com.example.PrizePayment.repositories;

import com.example.PrizePayment.models.PrizePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrizePaymentRepository extends JpaRepository<PrizePayment, Integer> {
    List<PrizePayment> findByRaceId(Integer raceId);
    List<PrizePayment> findByRecipientId(Integer recipientId);
}