package com.example.Sponsorship.repositories;

import com.example.Sponsorship.models.SponsorshipContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SponsorshipContractRepository extends JpaRepository<SponsorshipContract, Integer> {
}