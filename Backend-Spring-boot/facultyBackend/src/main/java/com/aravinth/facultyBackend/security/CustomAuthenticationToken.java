package com.aravinth.facultyBackend.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomAuthenticationToken extends AbstractAuthenticationToken {

    private final UserDetails principal;
    private final Object credentials;

    public CustomAuthenticationToken(UserDetails principal, Object credentials) {
        super(principal.getAuthorities());
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
