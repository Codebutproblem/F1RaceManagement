package com.example.Sponsorship.utils;

import com.example.Sponsorship.dtos.SponsorDTO;
import com.example.Sponsorship.dtos.SponsorshipContractDTO;
import com.example.Sponsorship.dtos.SponsorshipPaymentDTO;
import com.example.Sponsorship.dtos.SponsorshipTypeDTO;
import com.example.Sponsorship.models.Sponsor;
import com.example.Sponsorship.models.SponsorshipContract;
import com.example.Sponsorship.models.SponsorshipPayment;
import com.example.Sponsorship.models.SponsorshipType;

public final class ConvertUtils {

    public static SponsorDTO convertToDTO(Sponsor sponsor) {
        return SponsorDTO.builder()
                .sponsorId(sponsor.getSponsorId())
                .sponsorName(sponsor.getSponsorName())
                .contactEmail(sponsor.getContactEmail())
                .contactPhone(sponsor.getContactPhone())
                .contactPerson(sponsor.getContactPerson())
                .industry(sponsor.getIndustry())
                .build();
    }

    public static SponsorshipTypeDTO convertToDTO(SponsorshipType sponsorshipType) {
        return SponsorshipTypeDTO.builder()
                .typeId(sponsorshipType.getTypeId())
                .description(sponsorshipType.getDescription())
                .typeName(sponsorshipType.getTypeName())
                .visibilityLevel(sponsorshipType.getVisibilityLevel())
                .build();
    }

    public static SponsorshipContractDTO convertToDTO(SponsorshipContract sponsorshipContract){
        return SponsorshipContractDTO.builder()
                .contractId(sponsorshipContract.getContractId())
                .sponsorId(sponsorshipContract.getSponsor().getSponsorId())
                .typeId(sponsorshipContract.getSponsorshipType().getTypeId())
                .endDate(sponsorshipContract.getEndDate())
                .startDate(sponsorshipContract.getStartDate())
                .paymentTerms(sponsorshipContract.getPaymentTerms())
                .status(sponsorshipContract.getStatus())
                .contractValue(sponsorshipContract.getContractValue())
                .sponsorName(sponsorshipContract.getSponsor().getSponsorName())
                .sponsorshipTypeName(sponsorshipContract.getSponsorshipType().getTypeName())
                .seasonYear(sponsorshipContract.getSeasonYear())
                .build();
    }

    public static SponsorshipPaymentDTO convertToDTO(SponsorshipPayment sponsorshipPayment){
        return SponsorshipPaymentDTO.builder()
                .paymentId(sponsorshipPayment.getPaymentId())
                .contractId(sponsorshipPayment.getContract().getContractId())
                .amount(sponsorshipPayment.getAmount())
                .paymentDate(sponsorshipPayment.getPaymentDate())
                .paymentMethod(sponsorshipPayment.getPaymentMethod())
                .transactionReference(sponsorshipPayment.getTransactionReference())
                .notes(sponsorshipPayment.getNotes())
                .build();
    }

    public static Sponsor convertToEntity(SponsorDTO sponsorDTO) {
        return Sponsor.builder()
                .sponsorId(sponsorDTO.getSponsorId())
                .sponsorName(sponsorDTO.getSponsorName())
                .contactEmail(sponsorDTO.getContactEmail())
                .contactPhone(sponsorDTO.getContactPhone())
                .contactPerson(sponsorDTO.getContactPerson())
                .industry(sponsorDTO.getIndustry())
                .build();
    }

    public static SponsorshipType convertToEntity(SponsorshipTypeDTO sponsorshipTypeDTO) {
        return SponsorshipType.builder()
                .typeId(sponsorshipTypeDTO.getTypeId())
                .description(sponsorshipTypeDTO.getDescription())
                .typeName(sponsorshipTypeDTO.getTypeName())
                .visibilityLevel(sponsorshipTypeDTO.getVisibilityLevel())
                .build();
    }
}
