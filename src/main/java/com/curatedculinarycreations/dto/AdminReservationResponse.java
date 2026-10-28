package com.curatedculinarycreations.dto;

import com.curatedculinarycreations.domain.Reservation;
import com.curatedculinarycreations.domain.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record AdminReservationResponse(
        Long id,
        Long customerId,
        String customerName,
        String customerEmail,
        LocalDate reservationDate,
        LocalTime reservationTime,
        int partySize,
        ReservationStatus status,
        String specialRequests,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static AdminReservationResponse from(
            Reservation reservation
    ) {
        return new AdminReservationResponse(
                reservation.getId(),
                reservation.getCustomer().getId(),
                reservation.getCustomer().getFullName(),
                reservation.getCustomer().getEmail(),
                reservation.getReservationDate(),
                reservation.getReservationTime(),
                reservation.getPartySize(),
                reservation.getStatus(),
                reservation.getSpecialRequests(),
                reservation.getCreatedAt(),
                reservation.getUpdatedAt()
        );
    }
}
