package com.example.RaceManagement.services;

import com.example.RaceManagement.dtos.RaceResultDTO;
import com.example.RaceManagement.models.Race;
import com.example.RaceManagement.models.RaceResult;
import com.example.RaceManagement.repositories.RaceRepository;
import com.example.RaceManagement.repositories.RaceResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RaceResultService {

    @Autowired
    private RaceResultRepository resultRepository;

    @Autowired
    private RaceRepository raceRepository;

    public List<RaceResultDTO> getAllResults() {
        return resultRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<RaceResultDTO> getResultsByRaceId(Integer raceId) {
        return resultRepository.findByRaceRaceId(raceId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<RaceResultDTO> getResultById(Integer id) {
        return resultRepository.findById(id)
                .map(this::convertToDTO);
    }

    public RaceResultDTO createResult(RaceResultDTO resultDTO) {
        RaceResult result = convertToEntity(resultDTO);
        return convertToDTO(resultRepository.save(result));
    }

    public Optional<RaceResultDTO> updateResult(RaceResultDTO resultDTO) {
        if (!resultRepository.existsById(resultDTO.getId())) {
            return Optional.empty();
        }
        RaceResult result = convertToEntity(resultDTO);
        return Optional.of(convertToDTO(resultRepository.save(result)));
    }

    public boolean deleteResult(Integer id) {
        if (!resultRepository.existsById(id)) {
            return false;
        }
        resultRepository.deleteById(id);
        return true;
    }

    private RaceResultDTO convertToDTO(RaceResult result) {
        return RaceResultDTO.builder()
                .id(result.getResultId())
                .raceId(result.getRace().getRaceId())
                .driverId(result.getDriverId())
                .teamId(result.getTeamId())
                .position(result.getFinishPosition())
                .points(result.getPoints())
                .fastestLap(result.getFastestLap())
                .build();
    }

    private RaceResult convertToEntity(RaceResultDTO dto) {
        // Find the race by ID to establish the relationship correctly
        Race race = raceRepository.findById(dto.getRaceId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid race ID: " + dto.getRaceId()));

        return RaceResult.builder()
                .resultId(dto.getId())
                .race(race)  // Set the Race entity object, not just the ID
                .driverId(dto.getDriverId())
                .finishPosition(dto.getPosition())
                .points(dto.getPoints())
                .fastestLap(dto.getFastestLap())
                .teamId(dto.getTeamId())
                .build();
    }
}