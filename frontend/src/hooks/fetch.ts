import { useAuth } from '@clerk/clerk-react';
import getValidationErrorMessage from '../utils/getValidationErrorMessage';
import { APIError } from '@/utils/apiError';

export function useFetchWithAuth() {
  const { getToken } = useAuth();

  const fetchWithAuth = async <T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> => {
    const token = await getToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorJson = await response.json();
      console.log(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
      console.log('error json', errorJson);
      // Validation errors (structured)
      if (errorJson.errors && Array.isArray(errorJson.errors)) {
        const fieldErrors: Record<string, string> = {};
        for (const err of errorJson.errors) {
          fieldErrors[err.field] = getValidationErrorMessage(err);
        }
        // Handle validation errors (e.g., show in UI or set form errors)
        console.warn('Validation Errors:', fieldErrors);
        throw new APIError('Validation failed', response.status, fieldErrors);
      }

      // Generic server error with message
      if (errorJson.message) {
        throw new APIError(errorJson.message, response.status);
      }

      // Fallback for unknown errors
      throw new Error('An unknown error occurred.');
    }

    return response.json();
  };

  return { fetchWithAuth };
}
