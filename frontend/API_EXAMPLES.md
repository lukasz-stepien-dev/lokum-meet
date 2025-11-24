# API Usage Examples

This document provides practical examples of using the Lokum Meet API in different scenarios.

## Table of Contents

1. [Authentication](#authentication)
2. [Events](#events)
3. [Event Attendees](#event-attendees)
4. [Institutions](#institutions)
5. [Error Handling](#error-handling)

## Authentication

### Register a New User

```typescript
import { authApi } from '@/lib/api';

const handleRegister = async () => {
    try {
        const response = await authApi.register({
            username: "John Doe",
            email: "john@example.com",
            password: "SecurePass123",
            birthDate: "2000-01-01",
            bio: "Hello, I'm John!",
            userRoles: ["ROLE_USER"]
        });
        
        // Store token
        await login(response.token);
        
        console.log("User registered:", response.username);
        // Redirect to dashboard
    } catch (error) {
        if (error instanceof ApiError) {
            console.error("Registration failed:", error.details);
        }
    }
};
```

### Login

```typescript
import { authApi } from '@/lib/api';
import { login } from '@/app/actions/auth';

const handleLogin = async () => {
    try {
        const response = await authApi.login({
            username: "john@example.com", // Can use email or username
            password: "SecurePass123"
        });
        
        // Store token in cookie
        await login(response.token);
        
        console.log("Logged in as:", response.username);
        // Redirect to dashboard
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                console.error("Invalid credentials");
            }
        }
    }
};
```

### Get User Profile

```typescript
import { authApi } from '@/lib/api';

const loadUserProfile = async () => {
    try {
        const user = await authApi.getProfile();
        
        console.log("Username:", user.username);
        console.log("Email:", user.email);
        console.log("Age:", user.age);
        console.log("Bio:", user.bio);
        console.log("Verified:", user.isVerified);
        
        return user;
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            // Not authenticated, redirect to login
            router.push('/login');
        }
    }
};
```

### Update Profile

```typescript
import { authApi } from '@/lib/api';

const updateUserProfile = async () => {
    try {
        const updatedUser = await authApi.updateProfile({
            username: "John Smith",
            bio: "Updated bio",
            avatarUrl: "https://example.com/avatar.jpg"
        });
        
        console.log("Profile updated:", updatedUser.username);
    } catch (error) {
        console.error("Update failed:", error);
    }
};
```

## Events

### Get All Events

```typescript
import { eventsApiClient } from '@/lib/api';

const loadAllEvents = async () => {
    try {
        const events = await eventsApiClient.getAll();
        console.log(`Found ${events.length} events`);
        return events;
    } catch (error) {
        console.error("Failed to load events:", error);
    }
};
```

### Get Upcoming Events

```typescript
import { eventsApiClient } from '@/lib/api';

const loadUpcomingEvents = async () => {
    try {
        const events = await eventsApiClient.getUpcoming();
        
        events.forEach(event => {
            console.log(`${event.title} - ${event.dateEvent}`);
            console.log(`Capacity: ${event.currentCapacity}/${event.maxCapacity}`);
        });
        
        return events;
    } catch (error) {
        console.error("Failed to load upcoming events:", error);
    }
};
```

### Get Events by Category

```typescript
import { eventsApiClient } from '@/lib/api';
import { EventCategory } from '@/types/api';

const loadSportsEvents = async () => {
    try {
        const category: EventCategory = 'SPORTS';
        const events = await eventsApiClient.getByCategory(category);
        
        console.log(`Found ${events.length} sports events`);
        return events;
    } catch (error) {
        console.error("Failed to load sports events:", error);
    }
};
```

### Search Events

```typescript
import { eventsApiClient } from '@/lib/api';

const searchEvents = async (query: string) => {
    try {
        const events = await eventsApiClient.search(query);
        
        console.log(`Search "${query}" returned ${events.length} results`);
        return events;
    } catch (error) {
        console.error("Search failed:", error);
    }
};

// Usage
searchEvents("football");
```

### Create Event

```typescript
import { eventsApiClient } from '@/lib/api';

const createNewEvent = async () => {
    try {
        const newEvent = await eventsApiClient.create({
            title: "Football Tournament",
            description: "Join us for an exciting football tournament!",
            location: "City Stadium",
            dateEvent: "2024-12-15",
            startTime: "2024-12-15T10:00:00",
            endTime: "2024-12-15T18:00:00",
            maxCapacity: 100,
            category: "SPORTS",
            imageUrl: "https://example.com/event.jpg",
            approvedInstitutionId: 1,
            minAge: 13,
            maxAge: 150
        });
        
        console.log("Event created:", newEvent.id);
        return newEvent;
    } catch (error) {
        if (error instanceof ApiError) {
            console.error("Failed to create event:", error.details);
        }
    }
};
```

### Update Event

```typescript
import { eventsApiClient } from '@/lib/api';

const updateEvent = async (eventId: number) => {
    try {
        const updated = await eventsApiClient.update(eventId, {
            title: "Updated Event Title",
            description: "Updated description",
            location: "New Location",
            dateEvent: "2024-12-20",
            startTime: "2024-12-20T14:00:00",
            endTime: "2024-12-20T18:00:00",
            maxCapacity: 150,
            category: "SPORTS",
            minAge: 13,
            maxAge: 150
        });
        
        console.log("Event updated:", updated.title);
    } catch (error) {
        console.error("Failed to update event:", error);
    }
};
```

### Delete Event

```typescript
import { eventsApiClient } from '@/lib/api';

const deleteEvent = async (eventId: number) => {
    try {
        await eventsApiClient.delete(eventId);
        console.log("Event deleted successfully");
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 403) {
                console.error("You don't have permission to delete this event");
            }
        }
    }
};
```

## Event Attendees

### Join Event

```typescript
import { eventAttendeesApiClient } from '@/lib/api';

const joinEvent = async (eventId: number) => {
    try {
        await eventAttendeesApiClient.join(eventId);
        console.log("Successfully joined event");
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 400) {
                console.error("Event is full or you're already joined");
            }
        }
    }
};
```

### Leave Event

```typescript
import { eventAttendeesApiClient } from '@/lib/api';

const leaveEvent = async (eventId: number) => {
    try {
        await eventAttendeesApiClient.leave(eventId);
        console.log("Successfully left event");
    } catch (error) {
        console.error("Failed to leave event:", error);
    }
};
```

### Get Event Attendees

```typescript
import { eventAttendeesApiClient } from '@/lib/api';

const getAttendees = async (eventId: number) => {
    try {
        const attendees = await eventAttendeesApiClient.getEventAttendees(eventId);
        
        console.log(`Event has ${attendees.length} attendees:`);
        attendees.forEach(attendee => {
            console.log(`- ${attendee.username} (joined: ${attendee.joinedAt})`);
        });
        
        return attendees;
    } catch (error) {
        console.error("Failed to load attendees:", error);
    }
};
```

### Get My Joined Events

```typescript
import { eventAttendeesApiClient } from '@/lib/api';

const getMyJoinedEvents = async () => {
    try {
        const myEvents = await eventAttendeesApiClient.getMyEvents();
        
        console.log(`You're attending ${myEvents.length} events`);
        return myEvents;
    } catch (error) {
        console.error("Failed to load your events:", error);
    }
};
```

## Institutions

### Get All Institutions

```typescript
import { institutionsApiClient } from '@/lib/api';

const loadInstitutions = async () => {
    try {
        const institutions = await institutionsApiClient.getAll();
        console.log(`Found ${institutions.length} institutions`);
        return institutions;
    } catch (error) {
        console.error("Failed to load institutions:", error);
    }
};
```

### Get Verified Institutions

```typescript
import { institutionsApiClient } from '@/lib/api';

const loadVerifiedInstitutions = async () => {
    try {
        const institutions = await institutionsApiClient.getVerified();
        
        institutions.forEach(inst => {
            console.log(`${inst.name} - ${inst.category}`);
        });
        
        return institutions;
    } catch (error) {
        console.error("Failed to load verified institutions:", error);
    }
};
```

### Create Institution

```typescript
import { institutionsApiClient } from '@/lib/api';

const createInstitution = async () => {
    try {
        const newInstitution = await institutionsApiClient.create({
            name: "Sports Club Warsaw",
            email: "contact@sportsclub.pl",
            category: "SPORTS_CLUB",
            description: "A premier sports club in Warsaw",
            logoUrl: "https://example.com/logo.png",
            websiteUrl: "https://sportsclub.pl"
        });
        
        console.log("Institution created:", newInstitution.id);
        console.log("Status:", newInstitution.verificationStatus);
        
        return newInstitution;
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 403) {
                console.error("You need ROLE_INSTITUTION or ROLE_ADMIN to create institutions");
            }
        }
    }
};
```

## Error Handling

### Complete Error Handling Example

```typescript
import { eventsApiClient } from '@/lib/api';
import { ApiError } from '@/lib/fetch';

const robustEventLoader = async (eventId: number) => {
    try {
        const event = await eventsApiClient.getById(eventId);
        return { success: true, data: event, error: null };
    } catch (error) {
        if (error instanceof ApiError) {
            // Handle specific HTTP status codes
            switch (error.status) {
                case 400:
                    return { 
                        success: false, 
                        data: null, 
                        error: "Invalid request" 
                    };
                case 401:
                    return { 
                        success: false, 
                        data: null, 
                        error: "Please login to continue" 
                    };
                case 403:
                    return { 
                        success: false, 
                        data: null, 
                        error: "You don't have permission" 
                    };
                case 404:
                    return { 
                        success: false, 
                        data: null, 
                        error: "Event not found" 
                    };
                case 500:
                    return { 
                        success: false, 
                        data: null, 
                        error: "Server error, please try again later" 
                    };
                default:
                    return { 
                        success: false, 
                        data: null, 
                        error: `Error: ${error.details}` 
                    };
            }
        }
        
        // Handle network errors
        return { 
            success: false, 
            data: null, 
            error: "Network error, please check your connection" 
        };
    }
};
```

### React Component Example

```typescript
'use client';

import { useState, useEffect } from 'react';
import { eventsApiClient } from '@/lib/api';
import { EventDTO } from '@/types/api';
import { ApiError } from '@/lib/fetch';

export default function EventsList() {
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await eventsApiClient.getUpcoming();
            setEvents(data);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.details as string);
            } else {
                setError("Failed to load events");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {events.map(event => (
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    );
}
```

## Tips and Best Practices

1. **Always handle errors** - Use try-catch blocks and check for ApiError
2. **Use loading states** - Show loading indicators during API calls
3. **Validate before submitting** - Client-side validation improves UX
4. **Use the correct API variant** - Use `*Api` for server components, `*ApiClient` for client components
5. **Check authentication** - Handle 401 errors by redirecting to login
6. **Provide user feedback** - Show success/error messages after actions
7. **Refresh data after mutations** - Reload data after create/update/delete operations

