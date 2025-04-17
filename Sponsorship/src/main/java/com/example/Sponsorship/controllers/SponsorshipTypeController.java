package com.example.Sponsorship.controllers;

import com.example.Sponsorship.dtos.SponsorshipTypeDTO;
import com.example.Sponsorship.services.SponsorshipTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sponsorship-types")
public class SponsorshipTypeController {

    @Autowired
    private SponsorshipTypeService sponsorshipTypeService;

    @GetMapping
    public ResponseEntity<List<SponsorshipTypeDTO>> getAllSponsorshipTypes() {
        return ResponseEntity.ok(sponsorshipTypeService.getAllSponsorshipTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SponsorshipTypeDTO> getSponsorshipTypeById(@PathVariable Integer id) {
        return sponsorshipTypeService.getSponsorshipTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SponsorshipTypeDTO> createSponsorshipType(@RequestBody SponsorshipTypeDTO sponsorshipTypeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sponsorshipTypeService.createSponsorshipType(sponsorshipTypeDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SponsorshipTypeDTO> updateSponsorshipType(@PathVariable Integer id, @RequestBody SponsorshipTypeDTO sponsorshipTypeDTO) {
        return sponsorshipTypeService.updateSponsorshipType(id, sponsorshipTypeDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSponsorshipType(@PathVariable Integer id) {
        return sponsorshipTypeService.deleteSponsorshipType(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}