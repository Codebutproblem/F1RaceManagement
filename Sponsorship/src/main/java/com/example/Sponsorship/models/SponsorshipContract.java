package com.example.Sponsorship.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "sponsorship_contracts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SponsorshipContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contractId;

    @ManyToOne
    @JoinColumn(name = "sponsor_id", nullable = false)
    private Sponsor sponsor;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private SponsorshipType sponsorshipType;

    private Integer seasonYear;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal contractValue;

    @Column(columnDefinition = "TEXT")
    private String paymentTerms;

    private String status;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}
