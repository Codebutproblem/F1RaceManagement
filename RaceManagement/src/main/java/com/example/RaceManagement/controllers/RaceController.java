package com.example.RaceManagement.controllers;

import com.example.RaceManagement.dtos.RaceDTO;
import com.example.RaceManagement.services.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/races")
public class RaceController {

    @Autowired
    private RaceService raceService;

    @GetMapping
    public ResponseEntity<List<RaceDTO>> getAllRaces() {
        return ResponseEntity.ok(raceService.getAllRaces());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaceDTO> getRaceById(@PathVariable Integer id) {
        return raceService.getRaceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RaceDTO> createRace(@RequestBody RaceDTO raceDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(raceService.createRace(raceDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RaceDTO> updateRace(@PathVariable Integer id, @RequestBody RaceDTO raceDTO) {
        raceDTO.setRaceId(id);
        return raceService.updateRace(raceDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRace(@PathVariable Integer id) {
        if (raceService.deleteRace(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
