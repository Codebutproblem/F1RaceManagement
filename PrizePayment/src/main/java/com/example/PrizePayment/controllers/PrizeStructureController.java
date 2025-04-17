package com.example.PrizePayment.controllers;

import com.example.PrizePayment.dtos.PrizeStructureDTO;
import com.example.PrizePayment.services.PrizeStructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/prize-structures")
public class PrizeStructureController {

    @Autowired
    private PrizeStructureService prizeStructureService;

    @GetMapping
    public ResponseEntity<List<PrizeStructureDTO>> getAllPrizeStructures() {
        return ResponseEntity.ok(prizeStructureService.getAllPrizeStructures());
    }
}
