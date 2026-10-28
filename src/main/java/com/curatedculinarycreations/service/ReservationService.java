package com.curatedculinarycreations.service;

import com.curatedculinarycreations.domain.Customer;
import com.curatedculinarycreations.domain.Reservation;
import com.curatedculinarycreations.domain.ReservationStatus;
import com.curatedculinarycreations.dto.AdminReservationResponse;
import com.curatedculinarycreations.dto.CreateReservationRequest;
import com.curatedculinarycreations.dto.ReservationResponse;
import com.curatedculinarycreations.repository.CustomerRepository;
import com.curatedculinarycreations.repository.ReservationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

    // CUSTOMER: Create a reservation.
    @Transactional
    public ReservationResponse createReservation(
            CreateReservationRequest request,
            Authentication authentication
    ) {
        Customer customer = findAuthenticatedCustomer(authentication);

        LocalDate today = LocalDate.now();

        if (request.reservationDate().isBefore(today)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Reservation date cannot be in the past."
            );
        }

        if (request.reservationDate().equals(today)
                && !request.reservationTime().isAfter(LocalTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Reservation time must be in the future."
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

    // CUSTOMER: Retrieve only the authenticated customer's reservations.
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

    // ADMIN: Retrieve all reservations.
    @Transactional(readOnly = true)
    public List<AdminReservationResponse> getAllReservations() {
        return reservationRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AdminReservationResponse::from)
                .toList();
    }

    // ADMIN: Retrieve reservations awaiting a decision.
    @Transactional(readOnly = true)
    public List<AdminReservationResponse> getPendingReservations() {
        return reservationRepository
                .findByStatusOrderByCreatedAtDesc(
                        ReservationStatus.PENDING
                )
                .stream()
                .map(AdminReservationResponse::from)
                .toList();
    }

    // ADMIN: Confirm a pending reservation.
    @Transactional
    public AdminReservationResponse confirmReservation(Long id) {
        return updatePendingReservation(
                id,
                ReservationStatus.CONFIRMED
        );
    }

    // ADMIN: Decline a pending reservation.
    @Transactional
    public AdminReservationResponse declineReservation(Long id) {
        return updatePendingReservation(
                id,
                ReservationStatus.DECLINED
        );
    }

    private AdminReservationResponse updatePendingReservation(
            Long id,
            ReservationStatus newStatus
    ) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Reservation not found."
                ));

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Only pending reservations can be confirmed or declined."
            );
        }

        reservation.setStatus(newStatus);

        Reservation saved = reservationRepository.save(reservation);

        return AdminReservationResponse.from(saved);
    }

    private Customer findAuthenticatedCustomer(
            Authentication authentication
    ) {
        if (authentication == null
                || authentication.getName() == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "An authenticated customer is required."
            );
        }

        return customerRepository
                .findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Authenticated customer could not be found."
                ));
    }
}
