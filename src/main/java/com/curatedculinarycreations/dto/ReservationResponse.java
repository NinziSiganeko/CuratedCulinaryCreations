package com.curatedculinarycreations.dto;

import com.curatedculinarycreations.domain.Reservation;
import com.curatedculinarycreations.domain.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record ReservationResponse(
        Long id,
        LocalDate reservationDate,
        LocalTime reservationTime,
        int partySize,
        ReservationStatus status,
        String specialRequests,
        LocalDateTime createdAt
) {

    public static ReservationResponse from(
            Reservation reservation
    ) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getReservationDate(),
                reservation.getReservationTime(),
                reservation.getPartySize(),
                reservation.getStatus(),
                reservation.getSpecialRequests(),
                reservation.getCreatedAt()
        );
    }
}