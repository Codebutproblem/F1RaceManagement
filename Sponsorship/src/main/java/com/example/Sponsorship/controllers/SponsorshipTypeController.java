package com.example.Sponsorship.controllers;

import com.example.Sponsorship.dtos.SponsorshipTypeDTO;
import com.example.Sponsorship.models.SponsorshipType;
import com.example.Sponsorship.services.SponsorshipTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}