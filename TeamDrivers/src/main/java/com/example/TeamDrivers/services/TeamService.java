package com.example.TeamDrivers.services;

import com.example.TeamDrivers.dtos.TeamDTO;
import com.example.TeamDrivers.models.Team;
import com.example.TeamDrivers.repositories.TeamRepository;
import com.example.TeamDrivers.utils.ConvertUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public TeamDTO getTeamById(Integer id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Team not found with id: " + id));
        return ConvertUtils.convertToTeamDTO(team);
    }

    public TeamDTO createTeam(TeamDTO teamDTO) {
        Team team = ConvertUtils.convertToTeam(teamDTO);
        Team savedTeam = teamRepository.save(team);
        return ConvertUtils.convertToTeamDTO(savedTeam);
    }

    public TeamDTO updateTeam(Integer id, TeamDTO teamDTO) {
        if (!teamRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Team not found with id: " + id);
        }

        Team team = ConvertUtils.convertToTeam(teamDTO);
        team.setTeamId(id);
        Team updatedTeam = teamRepository.save(team);
        return ConvertUtils.convertToTeamDTO(updatedTeam);
    }

    public void deleteTeam(Integer id) {
        if (!teamRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Team not found with id: " + id);
        }
        teamRepository.deleteById(id);
    }
}