package com.example.Sponsorship.repositories;

import com.example.Sponsorship.models.SponsorshipType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SponsorshipTypeRepository extends JpaRepository<SponsorshipType, Integer> {
}