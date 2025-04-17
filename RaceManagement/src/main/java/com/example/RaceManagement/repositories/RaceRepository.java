package com.example.RaceManagement.repositories;

import com.example.RaceManagement.models.Race;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RaceRepository extends JpaRepository<Race, Integer> {

}
