package com.example.PrizePayment.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;

@Entity
@Table(name = "prize_structures")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrizeStructure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer structureId;

    @Column(nullable = false, length = 50)
    private String prizeCategory;

    private Integer position;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    private Integer applicableYear;
}
