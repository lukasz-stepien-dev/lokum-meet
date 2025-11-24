const IS_SERVER = typeof window === 'undefined';
const BASE_URL = IS_SERVER ? 'http://backend:8080' : 'http://localhost:8080';

export class ApiError extends Error {
    constructor(
        public status: number,
        public error: string,
        public details: string | Record<string, string>,
        public path: string
    ) {
        super(typeof details === 'string' ? details : JSON.stringify(details));
        this.name = 'ApiError';
    }
}

async function getAuthToken(): Promise<string | undefined> {
    if (IS_SERVER) {
        // Dynamically import cookies only on server side
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        return cookieStore.get('authToken')?.value;
    } else {
        // Client-side: get from document.cookie
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return value;
            }
        }
    }
    return undefined;
}

export async function fetchFromApi<T = any>(
    endpoint: string,
    options: RequestInit & { skipAuth?: boolean } = {}
): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers as Record<string, string> || {})
    };

    // Add auth token if not skipped
    if (!skipAuth) {
        const token = await getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers
    });

    // Handle no content responses
    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
        if (isJson) {
            const errorData = await response.json();
            throw new ApiError(
                response.status,
                errorData.error || 'Request failed',
                errorData.message || 'Unknown error',
                errorData.path || endpoint
            );
        } else {
            throw new ApiError(
                response.status,
                'Request failed',
                `Request failed with status ${response.status}`,
                endpoint
            );
        }
    }

    if (isJson) {
        return response.json();
    }

    return response.text() as T;
}

// Client-side only fetch (for use in components)
export async function fetchFromApiClient<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {})
    };

    // Get token from cookie on client side
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            headers['Authorization'] = `Bearer ${value}`;
            break;
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    // Handle no content responses
    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
        if (isJson) {
            const errorData = await response.json();
            throw new ApiError(
                response.status,
                errorData.error || 'Request failed',
                errorData.message || 'Unknown error',
                errorData.path || endpoint
            );
        } else {
            throw new ApiError(
                response.status,
                'Request failed',
                `Request failed with status ${response.status}`,
                endpoint
            );
        }
    }

    if (isJson) {
        return response.json();
    }

    return response.text() as T;
}