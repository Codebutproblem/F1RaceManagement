package com.example.Sponsorship.controllers;

import com.example.Sponsorship.dtos.SponsorshipPaymentDTO;
import com.example.Sponsorship.services.SponsorshipPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class SponsorshipPaymentController {

    @Autowired
    private SponsorshipPaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<SponsorshipPaymentDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SponsorshipPaymentDTO> getPaymentById(@PathVariable Integer id) {
        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SponsorshipPaymentDTO> createPayment(@RequestBody SponsorshipPaymentDTO paymentDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.createPayment(paymentDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SponsorshipPaymentDTO> updatePayment(
            @PathVariable Integer id,
            @RequestBody SponsorshipPaymentDTO paymentDTO) {
        return paymentService.updatePayment(id, paymentDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/contract/{contractId}")
    public ResponseEntity<List<SponsorshipPaymentDTO>> getPaymentsByContractId(
            @PathVariable Integer contractId) {
        return ResponseEntity.ok(paymentService.getPaymentsByContractId(contractId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Integer id) {
        return paymentService.deletePayment(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}