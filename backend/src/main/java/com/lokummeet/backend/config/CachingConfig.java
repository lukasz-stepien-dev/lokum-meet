package com.lokummeet.backend.config;

import lombok.experimental.FieldNameConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Objects;

@Slf4j
@CacheConfig
@Configuration
@EnableCaching
public class CachingConfig {
    private final CacheManager cacheManager;

    public CachingConfig(final CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @Scheduled(fixedRate = 5000)
    public void clearCache() {
        cacheManager.getCacheNames().forEach(cacheName -> Objects.requireNonNull(cacheManager.getCache(cacheName)).clear());
    }

    @FieldNameConstants(onlyExplicitlyIncluded = true)
    public enum CacheName {
        @FieldNameConstants.Include SOME_EXAMPLE_CACHE
    }
}
