# Lokum Meet Backend API

## Overview
This is the backend API for Lokum Meet - a community events platform built with Spring Boot.

## Technology Stack
- Java 21
- Spring Boot 3.5.7
- Spring Security with JWT Authentication
- PostgreSQL Database
- Maven
- Lombok
- ModelMapper
- MinIO (for file storage)
- Springdoc OpenAPI (API Documentation)

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "birthDate": "2000-01-01",
  "bio": "string",
  "userRoles": ["ROLE_USER"]
}

Response: 201 Created
{
  "token": "jwt_token",
  "email": "string",
  "username": "string",
  "userId": 1
}
```

#### Login
```
POST /auth/generateToken
Content-Type: application/json

{
  "username": "user@email.com",
  "password": "password"
}

Response: 200 OK
{
  "token": "jwt_token",
  "email": "string",
  "username": "string",
  "userId": 1
}
```

#### Get User Profile
```
GET /auth/user/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "username": "string",
  "email": "string",
  "birthDate": "2000-01-01",
  "age": 24,
  "avatarUrl": "string",
  "bio": "string",
  "isVerified": false,
  "userRoles": ["ROLE_USER"],
  "createdAt": "timestamp"
}
```

#### Update User Profile
```
PUT /auth/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "string",
  "bio": "string",
  "avatarUrl": "string"
}

Response: 200 OK - Returns updated UserDTO
```

### Event Endpoints

#### Get All Events
```
GET /api/events

Response: 200 OK
[
  {
    "id": 1,
    "title": "string",
    "description": "string",
    "location": "string",
    "startTime": "2024-12-01T10:00:00",
    "endTime": "2024-12-01T12:00:00",
    "dateEvent": "2024-12-01",
    "maxCapacity": 50,
    "currentCapacity": 10,
    "category": "SPORTS",
    "imageUrl": "string",
    "createdById": 1,
    "createdByUsername": "string",
    "approvedInstitutionId": 1,
    "approvedInstitutionName": "string",
    "minAge": 13,
    "maxAge": 150,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

#### Get Event by ID
```
GET /api/events/{id}

Response: 200 OK - Returns EventDTO
```

#### Get Upcoming Events
```
GET /api/events/upcoming

Response: 200 OK - Returns List<EventDTO>
```

#### Get Available Events (with capacity)
```
GET /api/events/available

Response: 200 OK - Returns List<EventDTO>
```

#### Get Events by Category
```
GET /api/events/category/{category}
Categories: FILM_CLUB, HOBBY_GROUP, SPORTS, STUDY_CIRCLE, SOCIAL, OTHER

Response: 200 OK - Returns List<EventDTO>
```

#### Search Events
```
GET /api/events/search?query=search_term

Response: 200 OK - Returns List<EventDTO>
```

#### Get My Created Events
```
GET /api/events/my-events
Authorization: Bearer {token}

Response: 200 OK - Returns List<EventDTO>
```

#### Create Event
```
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "location": "string",
  "startTime": "2024-12-01T10:00:00",
  "endTime": "2024-12-01T12:00:00",
  "dateEvent": "2024-12-01",
  "maxCapacity": 50,
  "category": "SPORTS",
  "imageUrl": "string",
  "approvedInstitutionId": 1,
  "minAge": 13,
  "maxAge": 150
}

Response: 201 Created - Returns EventDTO
```

#### Update Event
```
PUT /api/events/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  ... same fields as create ...
}

Response: 200 OK - Returns EventDTO
```

#### Delete Event
```
DELETE /api/events/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

### Event Attendee Endpoints

#### Join Event
```
POST /api/event-attendees/join/{eventId}
Authorization: Bearer {token}

Response: 200 OK
```

#### Leave Event
```
DELETE /api/event-attendees/leave/{eventId}
Authorization: Bearer {token}

Response: 204 No Content
```

#### Get Event Attendees
```
GET /api/event-attendees/event/{eventId}

Response: 200 OK - Returns List<EventAttendee>
```

#### Get My Joined Events
```
GET /api/event-attendees/my-events
Authorization: Bearer {token}

Response: 200 OK - Returns List<EventAttendee>
```

### Institution Endpoints

#### Get All Institutions
```
GET /api/institutions

Response: 200 OK - Returns List<InstitutionDTO>
```

#### Get Verified Institutions
```
GET /api/institutions/verified

Response: 200 OK - Returns List<InstitutionDTO>
```

#### Get Institution by ID
```
GET /api/institutions/{id}

Response: 200 OK - Returns InstitutionDTO
```

#### Get Institutions by Category
```
GET /api/institutions/category/{category}
Categories: SCHOOL, UNIVERSITY, NGO, SPORTS_CLUB, CULTURAL_CENTER, LIBRARY, OTHER

Response: 200 OK - Returns List<InstitutionDTO>
```

#### Create Institution
```
POST /api/institutions
Authorization: Bearer {token}
Roles: ROLE_ADMIN, ROLE_INSTITUTION

{
  "name": "string",
  "email": "string",
  "category": "UNIVERSITY",
  "description": "string",
  "logoUrl": "string",
  "websiteUrl": "string"
}

Response: 201 Created - Returns InstitutionDTO
```

#### Update Institution
```
PUT /api/institutions/{id}
Authorization: Bearer {token}
Roles: ROLE_ADMIN, ROLE_INSTITUTION

Response: 200 OK - Returns InstitutionDTO
```

#### Delete Institution
```
DELETE /api/institutions/{id}
Authorization: Bearer {token}
Roles: ROLE_ADMIN

Response: 204 No Content
```

## Error Responses

All error responses follow this format:
```json
{
  "timestamp": "2024-11-24T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Error message",
  "path": "/api/endpoint"
}
```

Validation errors:
```json
{
  "timestamp": "2024-11-24T10:00:00Z",
  "status": 400,
  "error": "Validation Failed",
  "message": {
    "fieldName": "error message",
    "anotherField": "error message"
  },
  "path": "/api/endpoint"
}
```

## Database Configuration

The application uses PostgreSQL. Configure database connection in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://postgres:5432/community_events_dev
spring.datasource.username=postgres
spring.datasource.password=postgres123
```

## JWT Configuration

JWT secret key is configured in `application.properties`:
```properties
security.jwt.secret-key=your_secret_key_here
```

Token expiration is set to 30 minutes by default.

## Running the Application

### Using Maven:
```bash
./mvnw spring-boot:run
```

### Using Docker:
```bash
docker build -t lokum-meet-backend .
docker run -p 8080:8080 lokum-meet-backend
```

## API Documentation

Once the application is running, you can access the auto-generated API documentation at:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## CORS Configuration

The application is configured to allow CORS from:
- http://localhost:3000
- http://frontend:3000
- http://lokum-meet.dying-zarah.internal:3000
- https://lokum-meet.dying-zarah.internal:3000

## User Roles

- `ROLE_USER` - Regular user (can create events, join events)
- `ROLE_INSTITUTION` - Institution admin (can manage institutions)
- `ROLE_ADMIN` - System admin (full access)

## Event Categories

- FILM_CLUB
- HOBBY_GROUP
- SPORTS
- STUDY_CIRCLE
- SOCIAL
- OTHER

## Institution Categories

- SCHOOL
- UNIVERSITY
- NGO
- SPORTS_CLUB
- CULTURAL_CENTER
- LIBRARY
- OTHER

## Verification Status

Institutions have verification status:
- PENDING - Awaiting verification
- APPROVED - Verified institution
- REJECTED - Verification rejected

