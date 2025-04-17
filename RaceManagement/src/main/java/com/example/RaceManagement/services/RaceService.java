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

    public RaceDTO createRace(RaceDTO raceDTO) {
        Race race = convertToEntity(raceDTO);
        return convertToDTO(raceRepository.save(race));
    }

    public Optional<RaceDTO> updateRace(RaceDTO raceDTO) {
        if (!raceRepository.existsById(raceDTO.getRaceId())) {
            return Optional.empty();
        }
        Race race = convertToEntity(raceDTO);
        return Optional.of(convertToDTO(raceRepository.save(race)));
    }

    public boolean deleteRace(Integer id) {
        if (!raceRepository.existsById(id)) {
            return false;
        }
        raceRepository.deleteById(id);
        return true;
    }

    private RaceDTO convertToDTO(Race race) {
        return RaceDTO.builder()
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

    private Race convertToEntity(RaceDTO raceDTO) {
        return Race.builder()
                .raceId(raceDTO.getRaceId())
                .raceName(raceDTO.getRaceName())
                .raceYear(raceDTO.getRaceYear())
                .raceDate(raceDTO.getRaceDate())
                .country(raceDTO.getCountry())
                .location(raceDTO.getLocation())
                .circuitName(raceDTO.getCircuitName())
                .status(raceDTO.getStatus())
                .build();
    }
}