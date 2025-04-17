package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.RaceResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RaceResultRepository extends JpaRepository<RaceResult, Integer> {
    List<RaceResult> findByRaceRaceId(Integer raceId);
}