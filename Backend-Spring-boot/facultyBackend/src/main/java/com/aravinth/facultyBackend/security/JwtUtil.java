package com.aravinth.facultyBackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private String secretKey = "fbe5d3d10c1f82064ab9edefc0da0e9b173167394790919934c06e2d7830ad0d0c5919c4333110b281a27b9a8e91f79889a6999273f2c788e9610e2af1347c87c3273bbe7cfb5880330610b5bbb731c22a9da83b7bb752336e9c6d258c48033d012f8661004eac4060c70cb0324bc42e9c9ec04d3c9b83427988e0d7015a7497";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token) {
        return !isTokenExpired(token);
    }

    public String generateToken(String username, Long userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("id", userId)  // Add user ID as a claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))  // 10 hours expiration
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

}
