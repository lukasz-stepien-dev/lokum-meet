package com.lokummeet.backend.config;

import com.lokummeet.backend.auth.OAuth2AuthenticationEntrypoint;
import com.lokummeet.backend.auth.OAuth2LoginSuccessHandler;
import com.lokummeet.backend.auth.OAuth2LogoutSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final HeaderWriterLogoutHandler clearSiteData = new HeaderWriterLogoutHandler(
            new ClearSiteDataHeaderWriter(ClearSiteDataHeaderWriter.Directive.ALL)
    );

    public SecurityConfig(UserDetailsService userDetailsService,
                          PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler, OAuth2LogoutSuccessHandler oAuth2LogoutSuccessHandler) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers("/api/auth/logout").permitAll()
                        .requestMatchers("/logout").permitAll()
                        .requestMatchers("/api/auth/me").permitAll()
                        .requestMatchers("/api/auth/**").hasAuthority("OIDC_USER")
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2LoginSuccessHandler))
                .logout(logout -> logout
                        .permitAll()
                        .addLogoutHandler(clearSiteData)
                        .clearAuthentication(true)
                        .invalidateHttpSession(true)
                        .logoutSuccessHandler(oAuth2LogoutSuccessHandler))
                .exceptionHandling(exceptionHandlingConfigurer -> {
                    exceptionHandlingConfigurer.authenticationEntryPoint(
                            new OAuth2AuthenticationEntrypoint()
                    );
                });
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}