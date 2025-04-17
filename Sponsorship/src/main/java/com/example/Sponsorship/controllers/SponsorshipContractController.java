package com.example.Sponsorship.controllers;

import com.example.Sponsorship.dtos.SponsorshipContractDTO;
import com.example.Sponsorship.services.SponsorshipContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
public class SponsorshipContractController {

    @Autowired
    private SponsorshipContractService contractService;

    @GetMapping
    public ResponseEntity<List<SponsorshipContractDTO>> getAllContracts() {
        return ResponseEntity.ok(contractService.getAllContracts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SponsorshipContractDTO> getContractById(@PathVariable Integer id) {
        return contractService.getContractById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SponsorshipContractDTO> createContract(@RequestBody SponsorshipContractDTO contractDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contractService.createContract(contractDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SponsorshipContractDTO> updateContract(@PathVariable Integer id, @RequestBody SponsorshipContractDTO contractDTO) {
        return contractService.updateContract(id, contractDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContract(@PathVariable Integer id) {
        return contractService.deleteContract(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}