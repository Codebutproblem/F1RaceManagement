package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.context.annotation.Primary;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "races")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Race {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "race_id")
    private Integer raceId;

    @Column(name = "race_name", nullable = false, length = 100)
    private String raceName;

    @Column(name = "circuit_name", length = 100)
    private String circuitName;

    @Column(name = "location", length = 100)
    private String location;

    @Column(name = "country", length = 50)
    private String country;

    @Column(name = "race_date")
    private LocalDate raceDate;

    @Column(name = "race_year")
    private Integer raceYear;

    @Column(name = "status", length = 20)
    private String status;

    @CreationTimestamp
    private Timestamp createdAt;
}