package com.example.PrizePayment.repositories;

import com.example.PrizePayment.models.PrizeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrizeStructureRepository extends JpaRepository<PrizeStructure, Integer> {
}