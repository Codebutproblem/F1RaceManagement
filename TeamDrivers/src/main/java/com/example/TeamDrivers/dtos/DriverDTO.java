package com.example.TeamDrivers.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DriverDTO {
    private Integer driverId;
    private Integer teamId;
    private String firstName;
    private String lastName;
    private String nationality;
    private Date dateOfBirth;
    private Integer driverNumber;
    private String bankAccount;
    private String bankDetails;
    private Boolean activeStatus = true;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
