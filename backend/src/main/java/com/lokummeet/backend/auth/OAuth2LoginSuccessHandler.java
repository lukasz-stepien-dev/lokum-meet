package com.lokummeet.backend.auth;

import com.lokummeet.backend.service.ConfigService;
import com.lokummeet.backend.entity.ConnectedAccount;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.ConnectedAccountRepository;
import com.lokummeet.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;


import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@AllArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final ConfigService configService;
    private final ConnectedAccountRepository connectedAccountRepository;

    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("Authentication: {}", authentication);
        final DefaultOidcUser oidcUser = (DefaultOidcUser) authentication.getPrincipal();
        final OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        final String provider = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();
        final String subject = oidcUser.getName();

        final Optional<ConnectedAccount> connectedAccount = connectedAccountRepository.
                findByProviderAndSubject(provider, subject);
        if (connectedAccount.isPresent()) {
            final User user = connectedAccount.get().getUser();
            authenticate(user, request, response);
            return;
        }

        final User user = userService.getOrCreate(oidcUser);
        final User connectedUser = userService.connect(provider, subject, user);
        authenticate(connectedUser, request, response);
    }

    public void authenticate(User user,HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<GrantedAuthority> authorities = Collections.emptyList();
        final AppAuthenticationToken token = new AppAuthenticationToken(user, authorities);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(token);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, request, response);
        response.sendRedirect(configService.getFrontendUrl());
    }
}
