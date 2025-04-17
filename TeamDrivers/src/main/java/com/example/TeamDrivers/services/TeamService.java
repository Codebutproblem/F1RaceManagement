package com.example.TeamDrivers.services;

import com.example.TeamDrivers.dtos.TeamDTO;
import com.example.TeamDrivers.repositories.TeamRepository;
import com.example.TeamDrivers.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(ConvertUtils::convertToTeamDTO)
                .collect(Collectors.toList());
    }
}
