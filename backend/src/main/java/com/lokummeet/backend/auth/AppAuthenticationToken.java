package com.lokummeet.backend.auth;

import com.lokummeet.backend.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;

public class AppAuthenticationToken implements Authentication {

    @Serial
    private static final long serialVersionUID = 2641880265803745820L;

    private final User user;
    private final boolean authenticated;
    private final Collection<? extends GrantedAuthority> authorities;
    private WebAuthenticationDetails details;

    public AppAuthenticationToken(User user, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.authenticated = true;
        this.authorities = (authorities != null) ? authorities : Collections.emptyList();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return details;
    }

    @Override
    public User getPrincipal() {
        return user;
    }

    @Override
    public boolean isAuthenticated() {
        return authenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        throw new UnsupportedOperationException("Use constructor to set authenticated to true");
    }

    @Override
    public String getName() {
        return user.getEmail();
    }
}
