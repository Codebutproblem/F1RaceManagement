package com.example.PrizePayment.controllers;

import com.example.PrizePayment.dtos.PrizePaymentDTO;
import com.example.PrizePayment.services.PrizePaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prize-payments")
public class PrizePaymentController {

    @Autowired
    private PrizePaymentService prizePaymentService;

    @GetMapping
    public ResponseEntity<List<PrizePaymentDTO>> getAllPrizePayments() {
        return ResponseEntity.ok(prizePaymentService.getAllPrizePayments());
    }

    @GetMapping("/race/{raceId}")
    public ResponseEntity<List<PrizePaymentDTO>> getPrizePaymentByRaceId(@PathVariable Integer raceId) {
        return ResponseEntity.ok(prizePaymentService.getPaymentsByRaceId(raceId));
    }

    @GetMapping("/recipient/{recipientId}")
    public ResponseEntity<List<PrizePaymentDTO>> getPrizePaymentByRecipientId(@PathVariable Integer recipientId) {
        return ResponseEntity.ok(prizePaymentService.getPaymentsByRecipientId(recipientId));
    }

    @PostMapping
    public ResponseEntity<PrizePaymentDTO> createPrizePayment(@RequestBody PrizePaymentDTO prizePaymentDTO) {
        return ResponseEntity.ok(prizePaymentService.createPrizePayment(prizePaymentDTO));
    }
}