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

export const escapeHtml = (text: string): string => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
};

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
    return /^[\+]?[\d\s\-\(\)]{9,15}$/.test(phone);
};

export const validateUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return ["http:", "https:"].includes(urlObj.protocol);
    } catch {
        return false;
    }
};
