package com.example.RaceManagement.services;

import com.example.RaceManagement.dtos.RaceDTO;
import com.example.RaceManagement.models.Race;
import com.example.RaceManagement.repositories.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RaceService {

    @Autowired
    private RaceRepository raceRepository;

    public List<RaceDTO> getAllRaces() {
        return raceRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<RaceDTO> getRaceById(Integer id) {
        return raceRepository.findById(id)
                .map(this::convertToDTO);
    }


    private RaceDTO convertToDTO(Race race){
        return  RaceDTO.builder()
                .raceId(race.getRaceId())
                .raceName(race.getRaceName())
                .raceYear(race.getRaceYear())
                .raceDate(race.getRaceDate())
                .country(race.getCountry())
                .location(race.getLocation())
                .circuitName(race.getCircuitName())
                .status(race.getStatus())
                .build();
    }
}
