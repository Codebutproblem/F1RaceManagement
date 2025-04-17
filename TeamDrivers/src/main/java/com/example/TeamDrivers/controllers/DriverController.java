package com.example.TeamDrivers.controllers;

import com.example.TeamDrivers.dtos.DriverDTO;
import com.example.TeamDrivers.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    @Autowired
    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    public ResponseEntity<List<DriverDTO>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriverDTO> getDriverById(@PathVariable Integer id) {
        return ResponseEntity.ok(driverService.getDriverById(id));
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<DriverDTO>> getDriversByTeamId(@PathVariable Integer teamId) {
        return ResponseEntity.ok(driverService.getDriversByTeamId(teamId));
    }

    @PostMapping
    public ResponseEntity<DriverDTO> createDriver(@RequestBody DriverDTO driverDTO) {
        return new ResponseEntity<>(driverService.createDriver(driverDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DriverDTO> updateDriver(@PathVariable Integer id, @RequestBody DriverDTO driverDTO) {
        return ResponseEntity.ok(driverService.updateDriver(id, driverDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Integer id) {
        driverService.deleteDriver(id);
        return ResponseEntity.noContent().build();
    }
}