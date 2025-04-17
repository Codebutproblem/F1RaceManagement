package com.example.TeamDrivers.utils;

import com.example.TeamDrivers.dtos.DriverDTO;
import com.example.TeamDrivers.dtos.TeamDTO;
import com.example.TeamDrivers.models.Driver;
import com.example.TeamDrivers.models.Team;

import java.util.stream.Collectors;

public final class ConvertUtils {

    public static TeamDTO convertToTeamDTO(Team team) {
        TeamDTO teamDto = new TeamDTO();
        teamDto.setTeamId(team.getTeamId());
        teamDto.setTeamName(team.getTeamName());
        teamDto.setTeamPrincipal(team.getTeamPrincipal());
        teamDto.setTeamPrincipal(team.getTeamPrincipal());
        teamDto.setNationality(team.getNationality());
        teamDto.setHeadquarters(team.getHeadquarters());
        teamDto.setFoundingYear(team.getFoundingYear());
        teamDto.setBankAccount(team.getBankAccount());
        teamDto.setBankDetails(team.getBankDetails());
        teamDto.setCreatedAt(team.getCreatedAt());
        teamDto.setUpdatedAt(team.getUpdatedAt());
        return teamDto;
    }

    public static DriverDTO convertToDriverDTO(Driver driver) {
        DriverDTO driverDto = new DriverDTO();
        driverDto.setDriverId(driver.getDriverId());
        driverDto.setFirstName(driver.getFirstName());
        driverDto.setLastName(driver.getLastName());
        driverDto.setNationality(driver.getNationality());
        driverDto.setDateOfBirth(driver.getDateOfBirth());
        driverDto.setDriverNumber(driver.getDriverNumber());
        driverDto.setBankAccount(driver.getBankAccount());
        driverDto.setBankDetails(driver.getBankDetails());
        driverDto.setActiveStatus(driver.getActiveStatus());
        driverDto.setCreatedAt(driver.getCreatedAt());
        driverDto.setUpdatedAt(driver.getUpdatedAt());
        driverDto.setTeamId(driver.getTeam().getTeamId());
        return driverDto;
    }

    public static Driver convertToDriver(DriverDTO driverDTO){
        Driver driver = new Driver();
        driver.setDriverId(driverDTO.getDriverId());
        driver.setFirstName(driverDTO.getFirstName());
        driver.setLastName(driverDTO.getLastName());
        driver.setNationality(driverDTO.getNationality());
        driver.setDateOfBirth(driverDTO.getDateOfBirth());
        driver.setDriverNumber(driverDTO.getDriverNumber());
        driver.setBankAccount(driverDTO.getBankAccount());
        driver.setBankDetails(driverDTO.getBankDetails());
        driver.setActiveStatus(driverDTO.getActiveStatus());
        driver.setCreatedAt(driverDTO.getCreatedAt());
        driver.setUpdatedAt(driverDTO.getUpdatedAt());
        return driver;
    }

    public static Team convertToTeam(TeamDTO teamDTO){
        Team team = new Team();
        team.setTeamId(teamDTO.getTeamId());
        team.setTeamName(teamDTO.getTeamName());
        team.setTeamPrincipal(teamDTO.getTeamPrincipal());
        team.setNationality(teamDTO.getNationality());
        team.setHeadquarters(teamDTO.getHeadquarters());
        team.setFoundingYear(teamDTO.getFoundingYear());
        team.setBankAccount(teamDTO.getBankAccount());
        team.setBankDetails(teamDTO.getBankDetails());
        team.setCreatedAt(teamDTO.getCreatedAt());
        team.setUpdatedAt(teamDTO.getUpdatedAt());
        return team;
    }
}
