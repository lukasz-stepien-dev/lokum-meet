# Lokum Meet Frontend - API Integration Guide

This document describes how the frontend integrates with the Lokum Meet backend API.

## Overview

The frontend is a Next.js 16 application built with TypeScript, React 19, and Tailwind CSS. It integrates with the Spring Boot backend API for all data operations.

## API Client Structure

### Core Files

- **`/lib/fetch.ts`** - Base HTTP client with authentication and error handling
- **`/lib/api/`** - API client modules organized by domain
- **`/types/api.ts`** - TypeScript types matching backend DTOs

### API Modules

#### Authentication (`/lib/api/auth.ts`)
```typescript
authApi.register(data)      // Register new user
authApi.login(data)          // Login and get JWT token
authApi.getProfile()         // Get current user profile
authApi.updateProfile(data)  // Update user profile
```

#### Events (`/lib/api/events.ts`)
```typescript
eventsApi.getAll()                    // Get all events
eventsApi.getById(id)                 // Get event by ID
eventsApi.getUpcoming()               // Get upcoming events
eventsApi.getAvailable()              // Get events with available capacity
eventsApi.getByCategory(category)     // Get events by category
eventsApi.search(query)               // Search events
eventsApi.getMyEvents()               // Get user's created events
eventsApi.create(data)                // Create new event
eventsApi.update(id, data)            // Update event
eventsApi.delete(id)                  // Delete event
```

#### Event Attendees (`/lib/api/event-attendees.ts`)
```typescript
eventAttendeesApi.join(eventId)              // Join an event
eventAttendeesApi.leave(eventId)             // Leave an event
eventAttendeesApi.getEventAttendees(eventId) // Get event attendees
eventAttendeesApi.getMyEvents()              // Get user's joined events
```

#### Institutions (`/lib/api/institutions.ts`)
```typescript
institutionsApi.getAll()                 // Get all institutions
institutionsApi.getVerified()            // Get verified institutions only
institutionsApi.getById(id)              // Get institution by ID
institutionsApi.getByCategory(category)  // Get institutions by category
institutionsApi.create(data)             // Create new institution
institutionsApi.update(id, data)         // Update institution
institutionsApi.delete(id)               // Delete institution
```

## Authentication Flow

1. **Login/Register** - User submits credentials
2. **Token Received** - Backend returns JWT token
3. **Token Storage** - Token stored in HTTP-only cookie via server action
4. **Authenticated Requests** - Token automatically included in Authorization header
5. **Token Validation** - Backend validates token on each request

### Example: Login
```typescript
const response = await authApi.login({
    username: email,
    password: password,
});
await login(response.token); // Server action to set cookie
```

## Error Handling

All API calls use the `ApiError` class for consistent error handling:

```typescript
try {
    const data = await eventsApi.getAll();
} catch (error) {
    if (error instanceof ApiError) {
        console.error(error.status);    // HTTP status code
        console.error(error.details);   // Error message(s)
        console.error(error.path);      // API endpoint
    }
}
```

## Type Safety

All API responses are typed using TypeScript interfaces:

```typescript
interface EventDTO {
    id: number;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    dateEvent: string;
    maxCapacity: number;
    currentCapacity: number;
    category: EventCategory;
    // ... more fields
}
```

## Server vs Client Components

### Server Components
Use `fetchFromApi` for server-side rendering:
```typescript
// app/page.tsx (server component)
import { eventsApi } from '@/lib/api';

export default async function Page() {
    const events = await eventsApi.getAll();
    // ...
}
```

### Client Components
Use `*ApiClient` versions for client-side fetching:
```typescript
// app/dashboard/page.tsx (client component)
'use client';
import { eventsApiClient } from '@/lib/api';

const loadEvents = async () => {
    const events = await eventsApiClient.getAll();
    // ...
};
```

## Environment Configuration

### Backend URLs
- **Development**: `http://localhost:8080` (client), `http://backend:8080` (server)
- **Production**: Configure in environment variables

### CORS
Backend is configured to allow requests from:
- `http://localhost:3000`
- `http://frontend:3000`
- `http://lokum-meet.dying-zarah.internal:3000`
- `https://lokum-meet.dying-zarah.internal:3000`

## Pages and API Usage

### `/login` - Login Page
- Uses `authApi.login()`
- Stores JWT token in cookie
- Redirects to dashboard on success

### `/register` - Registration Page
- Uses `authApi.register()`
- Auto-login after successful registration

### `/dashboard` - Events Dashboard
- Uses `eventsApiClient.getUpcoming()`
- Uses `eventAttendeesApiClient.join()` to join events
- Displays events with filtering by category

### `/event/[id]` - Event Details
- Uses `eventsApiClient.getById(id)`
- Uses `eventAttendeesApiClient.getEventAttendees(id)`
- Join/leave event functionality

### `/create-event` - Create Event
- Uses `institutionsApiClient.getVerified()` for institution dropdown
- Uses `eventsApiClient.create()` to create event

### `/profile` - User Profile
- Uses `authApi.getProfile()` to load profile
- Uses `authApi.updateProfile()` to save changes

### `/create-institution` - Create Institution
- Uses `institutionsApiClient.create()`
- Requires admin/institution role

## Utility Functions

### `/lib/utils.ts`
```typescript
sanitizeInput(input)          // Sanitize user input
validateEmail(email)          // Validate email format
validateUrl(url)              // Validate URL format
formatDate(date)              // Format date for display
formatTime(date)              // Format time for display
getCategoryLabel(category)    // Get human-readable category label
getInitials(name)             // Get initials from name
```

## Event Categories

```typescript
type EventCategory = 
    | 'FILM_CLUB' 
    | 'HOBBY_GROUP' 
    | 'SPORTS' 
    | 'STUDY_CIRCLE' 
    | 'SOCIAL' 
    | 'OTHER';
```

## Institution Categories

```typescript
type InstitutionCategory = 
    | 'SCHOOL' 
    | 'UNIVERSITY' 
    | 'NGO' 
    | 'SPORTS_CLUB' 
    | 'CULTURAL_CENTER' 
    | 'LIBRARY' 
    | 'OTHER';
```

## Security Features

1. **Input Sanitization** - All user inputs are sanitized before submission
2. **XSS Protection** - HTML tags and scripts are stripped from inputs
3. **CSRF Protection** - HTTP-only cookies prevent CSRF attacks
4. **Authentication** - JWT tokens for secure authentication
5. **Validation** - Client-side and server-side validation

## Testing the Integration

1. **Start Backend**: Run Spring Boot application on port 8080
2. **Start Frontend**: Run `pnpm dev` on port 3000
3. **Register User**: Create account at `/register`
4. **Login**: Login at `/login`
5. **Browse Events**: View events at `/dashboard`
6. **Create Event**: Create event at `/create-event`
7. **Join Event**: Join event from dashboard or detail page

## Troubleshooting

### CORS Errors
- Ensure backend CORS configuration includes frontend URL
- Check browser console for specific CORS error

### 401 Unauthorized
- Check if JWT token is present in cookie
- Verify token hasn't expired (30 min default)
- Re-login if necessary

### Network Errors
- Ensure backend is running on port 8080
- Check backend logs for errors
- Verify API endpoints match documentation

## Future Enhancements

- [ ] Add real-time updates with WebSockets
- [ ] Implement file upload for event images
- [ ] Add pagination for events list
- [ ] Add advanced search and filtering
- [ ] Add user notifications
- [ ] Add event reminders
- [ ] Add social features (comments, ratings)

