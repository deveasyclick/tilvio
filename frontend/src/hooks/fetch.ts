import { useAuth } from '@clerk/clerk-react';

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { fetchWithAuth };
}
