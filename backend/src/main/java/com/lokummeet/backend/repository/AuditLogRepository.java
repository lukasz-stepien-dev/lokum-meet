package com.lokummeet.backend.repository;

import com.lokummeet.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    @Query("SELECT al FROM AuditLog al WHERE al.tableName = :tableName ORDER BY al.createdAt DESC")
    List<AuditLog> findByTableName(@Param("tableName") String tableName);
    
    @Query("SELECT al FROM AuditLog al WHERE al.recordId = :recordId AND al.tableName = :tableName ORDER BY al.createdAt DESC")
    List<AuditLog> findByRecordIdAndTableName(@Param("recordId") Integer recordId, @Param("tableName") String tableName);
}

