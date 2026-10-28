package com.curatedculinarycreations.service;

import com.curatedculinarycreations.domain.Customer;
import com.curatedculinarycreations.domain.Role;
import com.curatedculinarycreations.dto.AuthResponse;
import com.curatedculinarycreations.dto.LoginRequest;
import com.curatedculinarycreations.dto.RegisterRequest;
import com.curatedculinarycreations.repository.CustomerRepository;
import com.curatedculinarycreations.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String email = normalizeEmail(request.email());

        if (customerRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "An account with this email already exists."
            );
        }

        Customer customer = new Customer();
        customer.setFullName(request.fullName().trim());
        customer.setEmail(email);
        customer.setPassword(
                passwordEncoder.encode(request.password())
        );

        // Public registration must never grant admin privileges.
        customer.setRole(Role.CUSTOMER);

        Customer savedCustomer = customerRepository.save(customer);

        return createAuthResponse(savedCustomer);
    }

    public AuthResponse login(LoginRequest request) {

        String email = normalizeEmail(request.email());

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.password()
                        )
                );

        Customer customer = (Customer) authentication.getPrincipal();

        return createAuthResponse(customer);
    }

    private AuthResponse createAuthResponse(Customer customer) {

        String token = jwtService.generateToken(customer);

        return new AuthResponse(
                token,
                "Bearer",
                customer.getId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getRole().name()
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
