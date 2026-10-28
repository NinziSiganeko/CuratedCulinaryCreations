package com.curatedculinarycreations.controller;

import com.curatedculinarycreations.dto.CreateReservationRequest;
import com.curatedculinarycreations.dto.ReservationResponse;
import com.curatedculinarycreations.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(
            ReservationService reservationService
    ) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationResponse createReservation(
            @Valid @RequestBody CreateReservationRequest request,
            Authentication authentication
    ) {
        return reservationService.createReservation(
                request,
                authentication
        );
    }

    @GetMapping("/my")
    public List<ReservationResponse> getMyReservations(
            Authentication authentication
    ) {
        return reservationService.getMyReservations(authentication);
    }
}