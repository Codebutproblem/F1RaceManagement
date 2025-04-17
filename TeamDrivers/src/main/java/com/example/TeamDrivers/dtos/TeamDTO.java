package com.example.TeamDrivers.dtos;

import com.example.TeamDrivers.models.Driver;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamDTO {
    private Integer teamId;
    private String teamName;
    private String teamPrincipal;
    private String nationality;
    private String headquarters;
    private Integer foundingYear;
    private String bankAccount;
    private String bankDetails;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
