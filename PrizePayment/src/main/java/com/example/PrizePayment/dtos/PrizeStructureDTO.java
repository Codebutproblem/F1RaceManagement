package com.example.PrizePayment.dtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PrizeStructureDTO {
    private Integer structureId;
    private String prizeCategory;
    private Integer position;
    private BigDecimal amount;
    private Integer applicableYear;
}
