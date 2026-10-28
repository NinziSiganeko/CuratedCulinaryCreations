package com.curatedculinarycreations.security;

import com.curatedculinarycreations.domain.Customer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long expirationMs;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-ms}") long expirationMs) {

        this.signingKey = Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(secret)
        );
        this.expirationMs = expirationMs;
    }

    public String generateToken(Customer customer) {
        Date issuedAt = new Date();
        Date expiresAt = new Date(
                issuedAt.getTime() + expirationMs
        );

        return Jwts.builder()
                .subject(customer.getEmail())
                .claim("role", customer.getRole().name())
                .issuedAt(issuedAt)
                .expiration(expiresAt)
                .signWith(signingKey)
                .compact();
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        Claims claims = extractClaims(token);

        return claims.getSubject().equalsIgnoreCase(
                userDetails.getUsername()
        )
                && claims.getExpiration().after(new Date())
                && userDetails.isEnabled();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
