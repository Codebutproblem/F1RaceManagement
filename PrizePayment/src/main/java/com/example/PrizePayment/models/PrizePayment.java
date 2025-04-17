package com.example.PrizePayment.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

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

    private Integer driverId;

    private Integer teamId;

    @Column(name = "recipient_id", nullable = false)
    private Integer recipientId;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "recipient_type", nullable = false, length = 10)
    private String recipientType;

    @Column(name = "payment_date")
    private LocalDate paymentDate;
}