# Lokum Meet Backend

A comprehensive community events platform backend built with Spring Boot 3.5.7 and Java 21.

## 🚀 Quick Start

### Prerequisites
- Java 21+
- PostgreSQL 12+
- Maven 3.6+

### 1. Setup Database
  -e POSTGRES_PASSWORD=postgres123 \
  -p 5432:5432 \
  -d postgres:14
```

### 2. Run Application
```bash
./mvnw spring-boot:run
```

### 3. Access API
- **Application**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/v3/api-docs

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup and troubleshooting guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Full API reference with examples
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Implementation details and features

## ✨ Features

### Core Functionality
- ✅ User registration and authentication (JWT)
- ✅ Event creation and management
- ✅ Event participation (join/leave)
- ✅ Institution management
- ✅ Search and filtering
- ✅ Role-based access control

### API Endpoints
- **Authentication**: Registration, Login, Profile management
- **Events**: CRUD operations, Search, Filter by category/date
- **Event Participation**: Join, Leave, Get attendees
- **Institutions**: Manage organizations with verification

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.5.7
- **Language**: Java 21
- **Database**: PostgreSQL
- **Security**: JWT Authentication
- **Documentation**: SpringDoc OpenAPI (Swagger)
- **Build Tool**: Maven

## 📋 Quick API Examples

### Register User
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "birthDate": "2000-01-01"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/auth/generateToken \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john@example.com",
    "password": "password123"
  }'
```

### Create Event
```bash
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Community Meetup",
    "description": "Monthly community gathering",
    "location": "Community Center",
    "startTime": "2025-12-01T18:00:00",
    "endTime": "2025-12-01T20:00:00",
    "dateEvent": "2025-12-01",
    "maxCapacity": 50,
    "category": "SOCIAL"
  }'
```

## 🔧 Configuration

### Database (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/community_events_dev
spring.datasource.username=postgres
spring.datasource.password=postgres123
```

### Profiles
- **default** - Local development (localhost database)
- **docker** - Docker deployment (postgres hostname)

## 🧪 Testing

Run tests:
```bash
./mvnw test
```

Build without tests:
```bash
./mvnw clean package -DskipTests
```

## 📦 Build & Deploy

### Build JAR
```bash
./mvnw clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Docker Build
```bash
docker build -t lokum-meet-backend .
docker run -p 8080:8080 lokum-meet-backend
```

## 🛡️ Security

- JWT-based authentication
- Role-based access control (USER, INSTITUTION, ADMIN)
- Password encryption with BCrypt
- CORS configuration for frontend integration
- Method-level security with @PreAuthorize

## 📊 Database Schema

Auto-generated on startup:
- `users` - User accounts and profiles
- `events` - Event listings
- `event_attendees` - Event participation tracking
- `institutions` - Organization/institution data
- `user_institutions` - User-institution relationships
- `user_preferences` - User preferences and settings
- `audit_logs` - System audit trail

## 🚨 Troubleshooting

### Database Connection Error
If you see "Connection refused" or "Unknown host: postgres":
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database exists: `psql -U postgres -l`
- Update credentials in `application.properties`

### Port Already in Use
Change port in `application.properties`:
```properties
server.port=8081
```

See **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for detailed troubleshooting.

## 📝 License

This project is part of the Lokum Meet platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Made with ☕ and Spring Boot**

