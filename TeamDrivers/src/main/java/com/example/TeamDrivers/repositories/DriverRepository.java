package com.example.TeamDrivers.repositories;

import com.example.TeamDrivers.models.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    List<Driver> findByTeamTeamId(Integer teamId);
}