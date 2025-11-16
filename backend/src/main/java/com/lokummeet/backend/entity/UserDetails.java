package com.lokummeet.backend.entity;


import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {
    private final String username;
    private final String password;
    private final Collection<GrantedAuthority> authorities;
    public UserDetails(User user) {
        this.username = user.getEmail();
        this.password = user.getPasswordHash();
        this.authorities = new HashSet<>(user.getUserRoles());
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
