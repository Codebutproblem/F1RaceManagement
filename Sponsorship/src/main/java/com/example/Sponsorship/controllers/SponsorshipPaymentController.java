package com.example.Sponsorship.controllers;

import com.example.Sponsorship.dtos.SponsorshipPaymentDTO;
import com.example.Sponsorship.services.SponsorshipPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sponsorship-payments")
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
}