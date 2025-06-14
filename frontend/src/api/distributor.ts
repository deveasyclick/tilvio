import { useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import type { Distributor } from '../types/distributor';
import { HTTP_METHODS } from '../types/http';

const API_URL = `${getConfig('apiBaseUrl')}/distributors`;

export const useFetchAuthenticatedDistributor = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useQuery<Distributor>({
    queryKey: ['distributor'],
    queryFn: () =>
      fetchWithAuth<Distributor>(`${API_URL}/me`, {
        method: HTTP_METHODS.GET,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
