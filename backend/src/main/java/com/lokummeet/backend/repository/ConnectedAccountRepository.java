package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.ConnectedAccount;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConnectedAccountRepository extends CrudRepository<ConnectedAccount, Long> {
    @Query("SELECT a FROM ConnectedAccount a WHERE a.provider = :provider AND a.subject = :subject")
    Optional<ConnectedAccount> findByProviderAndSubject(@Param("Provider") String provider, @Param("Subject") String subject);
}
