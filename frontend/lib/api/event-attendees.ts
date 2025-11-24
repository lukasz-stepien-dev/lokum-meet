import { fetchFromApi, fetchFromApiClient } from '../fetch';
import type { EventAttendee } from '@/types/api';

export const eventAttendeesApi = {
    async join(eventId: number): Promise<void> {
        return fetchFromApi<void>(`/api/event-attendees/join/${eventId}`, {
            method: 'POST'
        });
    },

    async leave(eventId: number): Promise<void> {
        return fetchFromApi<void>(`/api/event-attendees/leave/${eventId}`, {
            method: 'DELETE'
        });
    },

    async getEventAttendees(eventId: number): Promise<EventAttendee[]> {
        return fetchFromApi<EventAttendee[]>(`/api/event-attendees/event/${eventId}`);
    },

    async getMyEvents(): Promise<EventAttendee[]> {
        return fetchFromApi<EventAttendee[]>('/api/event-attendees/my-events');
    }
};

// Client-side versions
export const eventAttendeesApiClient = {
    async join(eventId: number): Promise<void> {
        return fetchFromApiClient<void>(`/api/event-attendees/join/${eventId}`, {
            method: 'POST'
        });
    },

    async leave(eventId: number): Promise<void> {
        return fetchFromApiClient<void>(`/api/event-attendees/leave/${eventId}`, {
            method: 'DELETE'
        });
    },

    async getEventAttendees(eventId: number): Promise<EventAttendee[]> {
        return fetchFromApiClient<EventAttendee[]>(`/api/event-attendees/event/${eventId}`);
    },

    async getMyEvents(): Promise<EventAttendee[]> {
        return fetchFromApiClient<EventAttendee[]>('/api/event-attendees/my-events');
    }
};

