package com.lokummeet.backend.config;

import io.github.bucket4j.BandwidthBuilder;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import io.github.bucket4j.local.LocalBucketBuilder;
import io.github.bucket4j.local.SynchronizationStrategy;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class BucketFilter implements Filter {
    static final int TOKEN_CAPACITY = 50;
    private static final long overdraft = 50;
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket newBucket(String ip) {
        return Bucket.builder()
                .addLimit(limit ->
                        limit.capacity(TOKEN_CAPACITY).refillGreedy(TOKEN_CAPACITY, Duration.ofSeconds(1))
                ).build();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, jakarta.servlet.ServletException {
        final String ip = request.getRemoteAddr();
        final Bucket requestBucket = buckets.computeIfAbsent(ip, this::newBucket);

        if (!requestBucket.tryConsume(1)) {
            final HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            httpServletResponse.sendError(HttpStatus.TOO_MANY_REQUESTS.value(), "Too many requests");
            return;
        }

        chain.doFilter(request, response);
    }
}
