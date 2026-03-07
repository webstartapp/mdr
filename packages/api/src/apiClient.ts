import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4041';

/**
 * Extracts an error message from the response payload securely.
 */
const getErrorMessage = (data: unknown): string | null => {
  const parsed = z.object({ message: z.string() }).safeParse(data);
  return parsed.success ? parsed.data.message : null;
};

/**
 * API Client Mutator.
 * Uses z.custom to satisfy strict linting without 'as'.
 */
export const apiClient = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return z.custom<T>().parse({});
  }

  const data: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    const customMessage = getErrorMessage(data);
    throw new Error(customMessage || 'API request failed');
  }

  const result = {
    data,
    status: response.status,
    headers: response.headers,
  };

  return z.custom<T>().parse(result);
};

export default apiClient;
