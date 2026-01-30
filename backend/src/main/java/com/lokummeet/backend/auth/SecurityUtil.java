package com.lokummeet.backend.auth;

import com.lokummeet.backend.ApiException;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SecurityUtil {
    private final UserRepository userRepository;

    public SecurityUtil(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
        final Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User user) {
            return user;
        } else {
            log.error("User requested but not found in SecurityContextHolder");
            throw ApiException.builder().status(401).message("Authentication required").build();
        }
    }

    public User getManagedUser() {
        final User user = getAuthenticatedUser();
        if (user == null) {
            throw ApiException.builder().status(401).message("Authentication required").build();
        }
        return userRepository.findById(user.getId())
                .orElseThrow(() ->
                        ApiException.builder().status(401).message("Authenticated user not found  in database").build());
    }
}
