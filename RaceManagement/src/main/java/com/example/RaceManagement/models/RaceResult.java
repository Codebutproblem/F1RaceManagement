package com.example.RaceManagement.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "race_results")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RaceResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Integer resultId;

    @ManyToOne
    @JoinColumn(name = "race_id", nullable = false)
    private Race race;

    @Column(name = "driver_id", nullable = false)
    private Integer driverId;

    @Column(name = "team_id", nullable = false)
    private Integer teamId;

    @Column(name = "finish_position")
    private Integer finishPosition;

    @Column(name = "points")
    private Integer points;

    @Column(name = "fastest_lap")
    private Boolean fastestLap;

    @CreationTimestamp
    private Timestamp createdAt;
}