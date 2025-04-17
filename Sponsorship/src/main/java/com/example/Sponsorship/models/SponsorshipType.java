package com.example.Sponsorship.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sponsorship_types")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SponsorshipType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer typeId;

    private String typeName;
    private String description;
    private String visibilityLevel;
}