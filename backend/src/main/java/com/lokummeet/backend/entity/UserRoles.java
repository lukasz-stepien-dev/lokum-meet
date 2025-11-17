package com.lokummeet.backend.entity;

import org.springframework.security.core.GrantedAuthority;

public enum UserRoles implements GrantedAuthority {
    ROLE_USER,
    ROLE_INSTITUTION,
    ROLE_ADMIN ;

    @Override
    public String getAuthority() {
        return name();
    }
}
