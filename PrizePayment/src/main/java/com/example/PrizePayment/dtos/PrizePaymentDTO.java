// PrizePaymentDTO.java
package com.example.PrizePayment.dtos;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class PrizePaymentDTO {
    private Integer paymentId;
    private Integer raceId;
    private Integer driverId;
    private Integer teamId;
    private BigDecimal amount;
    private String status;
    private String prizeCategory;
    private Integer position;
}