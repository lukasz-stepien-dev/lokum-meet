package com.lokummeet.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Getter
@Service
public class ConfigService {

    @Value("${google.client.id}")
    private String googleClientId;

    @Value("${next.public.url}")
    private String frontendUrl;

    @Value("${COOKIE_DOMAIN:localhost}")
    private String cookieDomain;
}
