import { fetchFromApi } from '../fetch';
import type { AuthResponse, RegisterRequest, LoginRequest, UserDTO, UpdateProfileRequest } from '@/types/api';

export const authApi = {
    async register(data: RegisterRequest): Promise<AuthResponse> {
        return fetchFromApi<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            skipAuth: true
        });
    },

    async login(data: LoginRequest): Promise<AuthResponse> {
        return fetchFromApi<AuthResponse>('/auth/generateToken', {
            method: 'POST',
            body: JSON.stringify(data),
            skipAuth: true
        });
    },

    async getProfile(): Promise<UserDTO> {
        return fetchFromApi<UserDTO>('/auth/user/profile');
    },

    async updateProfile(data: UpdateProfileRequest): Promise<UserDTO> {
        return fetchFromApi<UserDTO>('/auth/user/profile', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
};

