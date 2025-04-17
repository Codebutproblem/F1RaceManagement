package com.example.Sponsorship.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SponsorDTO {
    private Integer sponsorId;
    private String sponsorName;
    private String industry;
    private String contactPerson;
    private String contactEmail;
    private String contactPhone;
}
