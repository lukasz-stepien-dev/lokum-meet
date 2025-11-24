# Lokum Meet Backend - Setup Guide

## Prerequisites

Before running the application, ensure you have:

1. **Java 21** - JDK 21 or higher installed
2. **Maven** - Apache Maven 3.6+ installed
3. **PostgreSQL** - PostgreSQL 12+ installed and running

## Database Setup

### Option 1: Local PostgreSQL Installation

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql@14
   brew services start postgresql@14
   
   # Windows
   # Download installer from https://www.postgresql.org/download/windows/
   ```

2. **Start PostgreSQL service**:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   
   # macOS
   brew services start postgresql@14
   
   # Windows - PostgreSQL runs as a service automatically
   ```

3. **Create the database**:
   ```bash
   # Switch to postgres user
   sudo -u postgres psql
   
   # Or on Windows/macOS, just run:
   psql -U postgres
   
   # In PostgreSQL shell, run:
   CREATE DATABASE community_events_dev;
   CREATE USER postgres WITH PASSWORD 'postgres123';
   GRANT ALL PRIVILEGES ON DATABASE community_events_dev TO postgres;
   \q
   ```

### Option 2: Docker PostgreSQL

```bash
docker run --name lokum-postgres \
  -e POSTGRES_DB=community_events_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -p 5432:5432 \
  -d postgres:14
```

### Option 3: Docker Compose (Full Stack)

Create a `docker-compose.yml` in the backend directory:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    container_name: lokum-postgres
    environment:
      POSTGRES_DB: community_events_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## Application Configuration

The application uses different configuration profiles:

### Local Development (default)
- Database: `localhost:5432`
- File: `application.properties`

### Docker Deployment
- Database: `postgres:5432` (Docker hostname)
- File: `application-docker.properties`
- Enable with: `--spring.profiles.active=docker`

## Running the Application

### Option 1: Using Maven

```bash
# From the backend directory
./mvnw spring-boot:run
```

### Option 2: Using IDE (IntelliJ IDEA)

1. Open the project in IntelliJ IDEA
2. Wait for Maven to download dependencies
3. Right-click on `BackendApplication.java`
4. Select "Run 'BackendApplication'"

### Option 3: Build JAR and Run

```bash
# Build the JAR
./mvnw clean package -DskipTests

# Run the JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Option 4: Docker Container

```bash
# Build the Docker image
docker build -t lokum-meet-backend .

# Run with Docker (connect to external PostgreSQL)
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=docker \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/community_events_dev \
  --network=host \
  lokum-meet-backend
```

## Verifying the Application

### Check if the application started successfully:

1. **Look for this in the console**:
   ```
   Started BackendApplication in X.XXX seconds
   ```

2. **Check the health endpoint**:
   ```bash
   curl http://localhost:8080/actuator/health
   ```

3. **Access Swagger UI**:
   ```
   http://localhost:8080/swagger-ui.html
   ```

4. **Check OpenAPI documentation**:
   ```
   http://localhost:8080/v3/api-docs
   ```

## Testing the API

### 1. Register a new user:

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "birthDate": "2000-01-01",
    "bio": "Test user bio"
  }'
```

### 2. Login and get JWT token:

```bash
curl -X POST http://localhost:8080/auth/generateToken \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "password123"
  }'
```

### 3. Create an event (with JWT token):

```bash
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "Test Event",
    "description": "This is a test event",
    "location": "Test Location",
    "startTime": "2025-12-01T10:00:00",
    "endTime": "2025-12-01T12:00:00",
    "dateEvent": "2025-12-01",
    "maxCapacity": 50,
    "category": "SOCIAL",
    "minAge": 18,
    "maxAge": 100
  }'
```

### 4. Get all events (public):

```bash
curl http://localhost:8080/api/events
```

## Troubleshooting

### Problem: "Connection refused" or "Unknown host: postgres"

**Solution**: Make sure PostgreSQL is running and accessible:

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Test connection
psql -U postgres -d community_events_dev -h localhost
```

### Problem: "Unable to determine Dialect"

**Solution**: This error is already fixed in the updated `application.properties`. The dialect is now explicitly set:
```properties
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### Problem: Database authentication failed

**Solution**: 
1. Check your PostgreSQL user and password
2. Update `application.properties` with correct credentials
3. Grant proper permissions:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE community_events_dev TO postgres;
   ```

### Problem: Port 8080 already in use

**Solution**: Change the port in `application.properties`:
```properties
server.port=8081
```

Or kill the process using port 8080:
```bash
# Linux/macOS
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Problem: IDE shows "Cannot resolve symbol" errors

**Solution**:
1. Invalidate IDE caches: `File → Invalidate Caches → Invalidate and Restart`
2. Run Maven clean: `./mvnw clean install`
3. Refresh Maven project in IDE

## Database Schema

The application will automatically create all necessary tables on first startup thanks to:
```properties
spring.jpa.hibernate.ddl-auto=update
```

Tables created:
- `users` - User accounts
- `events` - Event listings
- `event_attendees` - Event participation
- `institutions` - Organizations
- `user_institutions` - User-institution relationships
- `user_preferences` - User preferences
- `audit_logs` - System audit trail

## Development Tips

### Hot Reload

The application includes Spring DevTools for automatic restart on code changes:
```properties
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true
```

### SQL Logging

To see all SQL queries, it's already enabled in `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Debug Mode

Run with debug logging:
```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--logging.level.root=DEBUG
```

### Test Without Database

For testing controllers without database, use H2 in-memory database:
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```

## Production Deployment

### Environment Variables

For production, use environment variables instead of hardcoded values:

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://your-prod-host:5432/your_db
export SPRING_DATASOURCE_USERNAME=your_user
export SPRING_DATASOURCE_PASSWORD=your_password
export SECURITY_JWT_SECRET_KEY=your-long-secret-key
```

### Build Production JAR

```bash
./mvnw clean package -DskipTests
```

The JAR will be in `target/backend-0.0.1-SNAPSHOT.jar`

### Production Recommendations

1. **Change JWT secret key** - Generate a new, secure random key
2. **Use HTTPS** - Configure SSL/TLS certificates
3. **Disable SQL logging** - Set `spring.jpa.show-sql=false`
4. **Enable actuator security** - Protect management endpoints
5. **Set up monitoring** - Use Spring Boot Actuator with Prometheus/Grafana
6. **Database backups** - Regular automated backups
7. **Use connection pooling** - HikariCP is already configured

## API Documentation

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs
- **Full API Documentation**: See `API_DOCUMENTATION.md`

## Support

For issues or questions:
1. Check the logs in the console
2. Review the `IMPLEMENTATION_SUMMARY.md` file
3. Check `API_DOCUMENTATION.md` for endpoint details

---

**Happy Coding! 🚀**

