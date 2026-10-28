package com.curatedculinarycreations.service;

import com.curatedculinarycreations.domain.Customer;
import com.curatedculinarycreations.domain.Reservation;
import com.curatedculinarycreations.domain.ReservationStatus;
import com.curatedculinarycreations.dto.CreateReservationRequest;
import com.curatedculinarycreations.dto.ReservationResponse;
import com.curatedculinarycreations.repository.CustomerRepository;
import com.curatedculinarycreations.repository.ReservationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CustomerRepository customerRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            CustomerRepository customerRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public ReservationResponse createReservation(
            CreateReservationRequest request,
            Authentication authentication
    ) {
        Customer customer = findAuthenticatedCustomer(authentication);

        if (request.reservationDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "Reservation date cannot be in the past"
            );
        }

        if (request.reservationDate().equals(LocalDate.now())
                && !request.reservationTime().isAfter(LocalTime.now())) {
            throw new IllegalArgumentException(
                    "Reservation time must be in the future"
            );
        }

        Reservation reservation = new Reservation();
        reservation.setCustomer(customer);
        reservation.setReservationDate(request.reservationDate());
        reservation.setReservationTime(request.reservationTime());
        reservation.setPartySize(request.partySize());
        reservation.setSpecialRequests(request.specialRequests());
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation saved = reservationRepository.save(reservation);

        return ReservationResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<ReservationResponse> getMyReservations(
            Authentication authentication
    ) {
        Customer customer = findAuthenticatedCustomer(authentication);

        return reservationRepository
                .findByCustomerIdOrderByCreatedAtDesc(customer.getId())
                .stream()
                .map(ReservationResponse::from)
                .toList();
    }

    private Customer findAuthenticatedCustomer(
            Authentication authentication
    ) {
        if (authentication == null
                || authentication.getName() == null) {
            throw new IllegalArgumentException(
                    "An authenticated customer is required"
            );
        }

        return customerRepository
                .findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Authenticated customer could not be found"
                ));
    }
}