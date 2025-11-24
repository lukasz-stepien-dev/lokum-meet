import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sanitizeInput = (input: string): string => {
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<[^>]+>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .replace(/data:/gi, "")
        .trim();
};

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return ["http:", "https:"].includes(urlObj.protocol);
    } catch {
        return false;
    }
};

export const formatDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatTime = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatDateTime = (date: string | Date): string => {
    return `${formatDate(date)} at ${formatTime(date)}`;
};

export const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
        FILM_CLUB: 'Film Club',
        HOBBY_GROUP: 'Hobby Group',
        SPORTS: 'Sports',
        STUDY_CIRCLE: 'Study Circle',
        SOCIAL: 'Social',
        OTHER: 'Other',
        SCHOOL: 'School',
        UNIVERSITY: 'University',
        NGO: 'NGO',
        SPORTS_CLUB: 'Sports Club',
        CULTURAL_CENTER: 'Cultural Center',
        LIBRARY: 'Library'
    };
    return labels[category] || category;
};

export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};



