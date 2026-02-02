package com.lokummeet.backend.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class OAuth2LogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication)
            throws IOException, ServletException {
        final Cookie sessionCookie = new Cookie("JSESSIONID", null);
        sessionCookie.setMaxAge(0);
        sessionCookie.setPath("/");
        sessionCookie.setHttpOnly(true);
        sessionCookie.setSecure(true);

        final Cookie csrfCookie = new Cookie("XSRF-TOKEN", null);
        csrfCookie.setMaxAge(0);
        csrfCookie.setPath("/");
        csrfCookie.setHttpOnly(true);
        csrfCookie.setSecure(true);

        response.addCookie(sessionCookie);
        response.addCookie(csrfCookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
