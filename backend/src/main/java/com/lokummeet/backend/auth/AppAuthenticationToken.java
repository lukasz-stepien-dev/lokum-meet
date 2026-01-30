package com.lokummeet.backend.auth;

import com.lokummeet.backend.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.io.Serial;
import java.util.Collection;

public class AppAuthenticationToken implements Authentication {

    @Serial
    private static final Long serialVersionUID = 2641880265803745820L;

    private final User user;
    private final boolean authenticated;
    private Collection<GrantedAuthority> authorities;
    private WebAuthenticationDetails details;

    public AppAuthenticationToken(User user) {
        this.user = user;
        this.authenticated = true;
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
