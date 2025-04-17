package com.example.RaceManagement.controllers;

import com.example.RaceManagement.dtos.RaceResultDTO;
import com.example.RaceManagement.services.RaceResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class RaceResultController {

    @Autowired
    private RaceResultService resultService;

    @GetMapping
    public ResponseEntity<List<RaceResultDTO>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }

    @GetMapping("/race/{raceId}")
    public ResponseEntity<List<RaceResultDTO>> getResultsByRace(@PathVariable Integer raceId) {
        return ResponseEntity.ok(resultService.getResultsByRaceId(raceId));
    }

    @PostMapping
    public ResponseEntity<RaceResultDTO> createResult(@RequestBody RaceResultDTO resultDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resultService.createResult(resultDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RaceResultDTO> updateResult(@PathVariable Integer id,
                                                     @RequestBody RaceResultDTO resultDTO) {
        resultDTO.setId(id);
        return resultService.updateResult(resultDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Integer id) {
        if (resultService.deleteResult(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}