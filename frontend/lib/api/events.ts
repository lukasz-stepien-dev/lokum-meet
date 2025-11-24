import { fetchFromApi, fetchFromApiClient } from '../fetch';
import type { EventDTO, CreateEventRequest, EventCategory } from '@/types/api';

export const eventsApi = {
    async getAll(): Promise<EventDTO[]> {
        return fetchFromApi<EventDTO[]>('/api/events');
    },

    async getById(id: number): Promise<EventDTO> {
        return fetchFromApi<EventDTO>(`/api/events/${id}`);
    },

    async getUpcoming(): Promise<EventDTO[]> {
        return fetchFromApi<EventDTO[]>('/api/events/upcoming');
    },

    async getAvailable(): Promise<EventDTO[]> {
        return fetchFromApi<EventDTO[]>('/api/events/available');
    },

    async getByCategory(category: EventCategory): Promise<EventDTO[]> {
        return fetchFromApi<EventDTO[]>(`/api/events/category/${category}`);
    },

    async search(query: string): Promise<EventDTO[]> {
        return fetchFromApi<EventDTO[]>(`/api/events/search?query=${encodeURIComponent(query)}`);
    },

    async getMyEvents(): Promise<EventDTO[]> {
        return fetchFromApi<EventDTO[]>('/api/events/my-events');
    },

    async create(data: CreateEventRequest): Promise<EventDTO> {
        return fetchFromApi<EventDTO>('/api/events', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(id: number, data: CreateEventRequest): Promise<EventDTO> {
        return fetchFromApi<EventDTO>(`/api/events/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async delete(id: number): Promise<void> {
        return fetchFromApi<void>(`/api/events/${id}`, {
            method: 'DELETE'
        });
    }
};

// Client-side versions for use in components
export const eventsApiClient = {
    async getAll(): Promise<EventDTO[]> {
        return fetchFromApiClient<EventDTO[]>('/api/events');
    },

    async getById(id: number): Promise<EventDTO> {
        return fetchFromApiClient<EventDTO>(`/api/events/${id}`);
    },

    async getUpcoming(): Promise<EventDTO[]> {
        return fetchFromApiClient<EventDTO[]>('/api/events/upcoming');
    },

    async getAvailable(): Promise<EventDTO[]> {
        return fetchFromApiClient<EventDTO[]>('/api/events/available');
    },

    async getByCategory(category: EventCategory): Promise<EventDTO[]> {
        return fetchFromApiClient<EventDTO[]>(`/api/events/category/${category}`);
    },

    async search(query: string): Promise<EventDTO[]> {
        return fetchFromApiClient<EventDTO[]>(`/api/events/search?query=${encodeURIComponent(query)}`);
    },

    async getMyEvents(): Promise<EventDTO[]> {
        return fetchFromApiClient<EventDTO[]>('/api/events/my-events');
    },

    async create(data: CreateEventRequest): Promise<EventDTO> {
        return fetchFromApiClient<EventDTO>('/api/events', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(id: number, data: CreateEventRequest): Promise<EventDTO> {
        return fetchFromApiClient<EventDTO>(`/api/events/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async delete(id: number): Promise<void> {
        return fetchFromApiClient<void>(`/api/events/${id}`, {
            method: 'DELETE'
        });
    }
};

