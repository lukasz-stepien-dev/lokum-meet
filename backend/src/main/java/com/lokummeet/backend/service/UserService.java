package com.lokummeet.backend.service;

import com.lokummeet.backend.entity.ConnectedAccount;
import com.lokummeet.backend.entity.User;
import com.lokummeet.backend.repository.ConnectedAccountRepository;
import com.lokummeet.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConnectedAccountRepository connectedAccountRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, final ConnectedAccountRepository connectedAccountRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.connectedAccountRepository = connectedAccountRepository;
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User userInfo = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(userInfo.getEmail())
                .password(userInfo.getPasswordHash())
                .authorities(userInfo.getUserRoles())
                .build();
    }

    public ResponseEntity<Object> addUser(User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    public User connect(String provider, String subject, User user) {
        final ConnectedAccount newConnectedAccount = new ConnectedAccount(provider, subject, user);
        user.addConnectedAccount(newConnectedAccount);
        connectedAccountRepository.save(newConnectedAccount);
        return userRepository.saveAndFlush(user);
    }

    public User getOrCreate(DefaultOidcUser oidcUser) {
        return userRepository.findByEmail(oidcUser.getEmail())
                .orElseGet(() -> userRepository.saveAndFlush(User.fromOidc(oidcUser)));
    }
}
