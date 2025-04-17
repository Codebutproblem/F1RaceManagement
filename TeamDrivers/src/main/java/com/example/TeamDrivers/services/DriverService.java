package com.example.TeamDrivers.services;

import com.example.TeamDrivers.dtos.DriverDTO;
import com.example.TeamDrivers.models.Driver;
import com.example.TeamDrivers.repositories.DriverRepository;
import com.example.TeamDrivers.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    @Autowired
    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToDriverDTO)
                .collect(Collectors.toList());
    }
}
