package com.lokummeet.backend.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;


@Slf4j
public class OAuth2AuthenticationEntrypoint implements AuthenticationEntryPoint {
    @Override
    public void commence(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final AuthenticationException authException)
        throws IOException, ServletException {
        log.debug("OAuth2AuthenticationEntrypoint.commence, authException: {}", authException.toString());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().println("{ \"error\": " + authException.getMessage() + " \" }");
        response.getWriter().flush();
    }
}
