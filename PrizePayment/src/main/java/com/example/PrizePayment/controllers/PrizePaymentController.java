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

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<PrizePaymentDTO>> getPrizePaymentByDriverId(@PathVariable Integer driverId) {
        return ResponseEntity.ok(prizePaymentService.getPaymentsByDriverId(driverId));
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<PrizePaymentDTO>> getPrizePaymentByTeamId(@PathVariable Integer teamId) {
        return ResponseEntity.ok(prizePaymentService.getPaymentsByTeamId(teamId));
    }

    @PostMapping
    public ResponseEntity<PrizePaymentDTO> createPrizePayment(@RequestBody PrizePaymentDTO prizePaymentDTO) {
        return ResponseEntity.ok(prizePaymentService.createPrizePayment(prizePaymentDTO));
    }
}