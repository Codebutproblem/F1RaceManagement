package com.example.RaceManagement.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RaceResultDTO {
    private Integer id;
    private Integer raceId;
    private Integer driverId;
    private Integer teamId;
    private String driverName;
    private String teamName;
    private Integer position;
    private Integer points;
    private String status;
    private Boolean fastestLap;
    private Double fastestLapTime;
}