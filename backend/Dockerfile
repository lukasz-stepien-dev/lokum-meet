# Multi-stage build for Spring Boot application
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy pom.xml and download dependencies (layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline -DskipTests

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# The JAR will be named backend-0.0.1-SNAPSHOT.jar based on your pom.xml
# Rename it to a consistent name
RUN cp /build/target/backend-*.jar /build/target/app.jar

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the JAR from builder stage
COPY --from=builder /build/target/app.jar app.jar

# Expose application port
EXPOSE 8080

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
