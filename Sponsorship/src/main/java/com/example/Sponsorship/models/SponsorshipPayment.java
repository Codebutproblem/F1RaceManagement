package com.example.Sponsorship.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "sponsorship_payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SponsorshipPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "contract_id", nullable = false)
    private SponsorshipContract contract;

    private BigDecimal amount;

    private LocalDate paymentDate;
    private String paymentMethod;
    private String transactionReference;

    @Column(columnDefinition = "TEXT")
    private String notes;
}