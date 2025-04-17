package com.example.RaceManagement.dtos;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Data
@Builder
public class RaceDTO {
    private Integer raceId;
    private String raceName;
    private String circuitName;
    private String location;
    private String country;
    private LocalDate raceDate;
    private Integer raceYear;
    private String status;
}
