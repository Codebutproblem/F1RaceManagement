package com.example.Sponsorship.dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class SponsorshipContractDTO {
    private Integer contractId;
    private Integer sponsorId;
    private Integer typeId;
    private Integer seasonYear;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal contractValue;
    private String paymentTerms;
    private String status;
    private String sponsorName;
    private String sponsorshipTypeName;
}
