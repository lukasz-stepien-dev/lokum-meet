// API Types for Lokum Meet Backend

export interface AuthResponse {
    token: string;
    email: string;
    username: string;
    userId: number;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    birthDate: string;
    bio?: string;
    userRoles?: string[];
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    birthDate: string;
    age: number;
    avatarUrl?: string;
    bio?: string;
    isVerified: boolean;
    userRoles: string[];
    createdAt: string;
}

export interface UpdateProfileRequest {
    username?: string;
    bio?: string;
    avatarUrl?: string;
}

export type EventCategory = 'FILM_CLUB' | 'HOBBY_GROUP' | 'SPORTS' | 'STUDY_CIRCLE' | 'SOCIAL' | 'OTHER';

export interface EventDTO {
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
    imageUrl?: string;
    createdById: number;
    createdByUsername: string;
    approvedInstitutionId?: number;
    approvedInstitutionName?: string;
    minAge: number;
    maxAge: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEventRequest {
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    dateEvent: string;
    maxCapacity: number;
    category: EventCategory;
    imageUrl?: string;
    approvedInstitutionId?: number;
    minAge?: number;
    maxAge?: number;
}

export interface EventAttendee {
    id: number;
    eventId: number;
    userId: number;
    username: string;
    joinedAt: string;
}

export type InstitutionCategory = 'SCHOOL' | 'UNIVERSITY' | 'NGO' | 'SPORTS_CLUB' | 'CULTURAL_CENTER' | 'LIBRARY' | 'OTHER';
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface InstitutionDTO {
    id: number;
    name: string;
    email: string;
    category: InstitutionCategory;
    description?: string;
    logoUrl?: string;
    websiteUrl?: string;
    verificationStatus: VerificationStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateInstitutionRequest {
    name: string;
    email: string;
    category: InstitutionCategory;
    description?: string;
    logoUrl?: string;
    websiteUrl?: string;
}

export interface ApiError {
    timestamp: string;
    status: number;
    error: string;
    message: string | Record<string, string>;
    path: string;
}

