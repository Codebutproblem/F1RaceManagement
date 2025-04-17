package com.example.Sponsorship.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "sponsors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sponsor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sponsorId;

    private String sponsorName;
    private String industry;
    private String contactPerson;
    private String contactEmail;
    private String contactPhone;

    @CreationTimestamp
    private Timestamp createdAt;
}