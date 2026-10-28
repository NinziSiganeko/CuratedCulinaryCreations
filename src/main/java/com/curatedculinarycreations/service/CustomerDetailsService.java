
package com.curatedculinarycreations.service;

import com.curatedculinarycreations.domain.Customer;
import com.curatedculinarycreations.repository.CustomerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;

    public CustomerDetailsService(
            CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        String normalizedEmail = email.trim().toLowerCase();

        return customerRepository
                .findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "No account found for that email address."
                        )
                );
    }
}
