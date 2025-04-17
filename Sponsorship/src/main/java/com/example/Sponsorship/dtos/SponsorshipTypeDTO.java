package com.example.Sponsorship.dtos;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SponsorshipTypeDTO {
    private Integer typeId;
    private String typeName;
    private String description;
    private String visibilityLevel;
}
