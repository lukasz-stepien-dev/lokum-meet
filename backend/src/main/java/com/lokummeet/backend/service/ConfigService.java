package com.lokummeet.backend.service;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Getter
@Service
public class ConfigService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${next.public.url}")
    private String frontendUrl;

    @Value("${COOKIE_DOMAIN:localhost}")
    private String cookieDomain;
}
