package com.curatedculinarycreations.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateReservationRequest(

        @NotNull(message = "Reservation date is required")
        @FutureOrPresent(message = "Reservation date cannot be in the past")
        LocalDate reservationDate,

        @NotNull(message = "Reservation time is required")
        LocalTime reservationTime,

        @Min(value = 1, message = "At least one guest is required")
        @Max(value = 8, message = "Online reservations currently allow up to 8 guests")
        int partySize,

        @Size(max = 500, message = "Special requests cannot exceed 500 characters")
        String specialRequests

) {
}