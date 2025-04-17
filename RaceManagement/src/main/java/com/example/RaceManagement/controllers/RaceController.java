package com.example.RaceManagement.controllers;

import com.example.RaceManagement.dtos.RaceDTO;
import com.example.RaceManagement.services.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/races")
public class RaceController {

    @Autowired
    private RaceService raceService;

    @GetMapping
    public ResponseEntity<List<RaceDTO>> getAllRaces(){
        return ResponseEntity.ok(raceService.getAllRaces());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaceDTO> getRaceById(@PathVariable Integer id){
        return raceService.getRaceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
