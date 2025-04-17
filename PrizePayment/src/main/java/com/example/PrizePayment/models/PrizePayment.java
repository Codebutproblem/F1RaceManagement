package com.example.PrizePayment.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "prize_payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrizePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @Column(nullable = false)
    private Integer raceId;

    @Column(nullable = false)
    private Integer driverId;

    @Column(nullable = false)
    private Integer teamId;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(length = 50)
    private String status = "Pending";

    @Column(length = 100)
    private String prizeCategory;

    private Integer position;

    @CreationTimestamp
    private Timestamp createdAt;
}