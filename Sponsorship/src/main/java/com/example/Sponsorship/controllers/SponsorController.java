package com.example.Sponsorship.controllers;

import com.example.Sponsorship.dtos.SponsorDTO;
import com.example.Sponsorship.services.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sponsors")
public class SponsorController {

    @Autowired
    private SponsorService sponsorService;

    @GetMapping
    public ResponseEntity<List<SponsorDTO>> getAllSponsors() {
        return ResponseEntity.ok(sponsorService.getAllSponsors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SponsorDTO> getSponsorById(@PathVariable Integer id) {
        return sponsorService.getSponsorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SponsorDTO> createSponsor(@RequestBody SponsorDTO sponsorDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sponsorService.createSponsor(sponsorDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SponsorDTO> updateSponsor(@PathVariable Integer id, @RequestBody SponsorDTO sponsorDTO) {
        return sponsorService.updateSponsor(id, sponsorDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}