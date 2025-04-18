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
    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "recipient_type", nullable = false, length = 10)
    private String recipientType;

    @Column(name = "recipient_id", nullable = false)
    private Integer recipientId;

    @Column(name = "race_id", nullable = false)
    private Integer raceId;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "payment_method", nullable = false, length = 25)
    private String paymentMethod;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}