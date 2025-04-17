package com.example.Sponsorship.dtos;

import com.example.Sponsorship.models.SponsorshipContract;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class SponsorshipPaymentDTO {
    private Integer paymentId;
    private Integer contractId;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String transactionReference;
    private String notes;
}
