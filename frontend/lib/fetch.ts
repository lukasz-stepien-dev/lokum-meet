const IS_SERVER = typeof window === 'undefined';
const BASE_URL = IS_SERVER ? 'http://backend:8080' : 'http://localhost:8080';

export async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
}