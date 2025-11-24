import { fetchFromApi, fetchFromApiClient } from '../fetch';
import type { InstitutionDTO, CreateInstitutionRequest, InstitutionCategory } from '@/types/api';

export const institutionsApi = {
    async getAll(): Promise<InstitutionDTO[]> {
        return fetchFromApi<InstitutionDTO[]>('/api/institutions');
    },

    async getVerified(): Promise<InstitutionDTO[]> {
        return fetchFromApi<InstitutionDTO[]>('/api/institutions/verified');
    },

    async getById(id: number): Promise<InstitutionDTO> {
        return fetchFromApi<InstitutionDTO>(`/api/institutions/${id}`);
    },

    async getByCategory(category: InstitutionCategory): Promise<InstitutionDTO[]> {
        return fetchFromApi<InstitutionDTO[]>(`/api/institutions/category/${category}`);
    },

    async create(data: CreateInstitutionRequest): Promise<InstitutionDTO> {
        return fetchFromApi<InstitutionDTO>('/api/institutions', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(id: number, data: CreateInstitutionRequest): Promise<InstitutionDTO> {
        return fetchFromApi<InstitutionDTO>(`/api/institutions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async delete(id: number): Promise<void> {
        return fetchFromApi<void>(`/api/institutions/${id}`, {
            method: 'DELETE'
        });
    }
};

// Client-side versions
export const institutionsApiClient = {
    async getAll(): Promise<InstitutionDTO[]> {
        return fetchFromApiClient<InstitutionDTO[]>('/api/institutions');
    },

    async getVerified(): Promise<InstitutionDTO[]> {
        return fetchFromApiClient<InstitutionDTO[]>('/api/institutions/verified');
    },

    async getById(id: number): Promise<InstitutionDTO> {
        return fetchFromApiClient<InstitutionDTO>(`/api/institutions/${id}`);
    },

    async getByCategory(category: InstitutionCategory): Promise<InstitutionDTO[]> {
        return fetchFromApiClient<InstitutionDTO[]>(`/api/institutions/category/${category}`);
    },

    async create(data: CreateInstitutionRequest): Promise<InstitutionDTO> {
        return fetchFromApiClient<InstitutionDTO>('/api/institutions', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async update(id: number, data: CreateInstitutionRequest): Promise<InstitutionDTO> {
        return fetchFromApiClient<InstitutionDTO>(`/api/institutions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async delete(id: number): Promise<void> {
        return fetchFromApiClient<void>(`/api/institutions/${id}`, {
            method: 'DELETE'
        });
    }
};

