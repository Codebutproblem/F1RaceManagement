package com.example.TeamDrivers.services;

import com.example.TeamDrivers.dtos.DriverDTO;
import com.example.TeamDrivers.models.Driver;
import com.example.TeamDrivers.repositories.DriverRepository;
import com.example.TeamDrivers.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public DriverDTO getDriverById(Integer id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Driver not found with id: " + id));
        return ConvertUtils.convertToDriverDTO(driver);
    }

    public List<DriverDTO> getDriversByTeamId(Integer teamId) {
        return driverRepository.findByTeamTeamId(teamId)
                .stream()
                .map(ConvertUtils::convertToDriverDTO)
                .collect(Collectors.toList());
    }

    public DriverDTO createDriver(DriverDTO driverDTO) {
        Driver driver = ConvertUtils.convertToDriver(driverDTO);
        Driver savedDriver = driverRepository.save(driver);
        return ConvertUtils.convertToDriverDTO(savedDriver);
    }

    public DriverDTO updateDriver(Integer id, DriverDTO driverDTO) {
        if (!driverRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Driver not found with id: " + id);
        }

        Driver driver = ConvertUtils.convertToDriver(driverDTO);
        driver.setDriverId(id);
        Driver updatedDriver = driverRepository.save(driver);
        return ConvertUtils.convertToDriverDTO(updatedDriver);
    }

    public void deleteDriver(Integer id) {
        if (!driverRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Driver not found with id: " + id);
        }
        driverRepository.deleteById(id);
    }
}