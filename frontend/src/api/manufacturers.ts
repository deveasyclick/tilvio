import { useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import { HTTP_METHODS } from '../types/http';
import type { Manufacturer } from '@/types/manufacturer';

const API_URL = `${getConfig('apiBaseUrl')}/manufacturers`;

export const useFindAllManufacturers = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useQuery<Manufacturer[]>({
    queryKey: ['manufacturers'],
    queryFn: () =>
      fetchWithAuth<Manufacturer[]>(`${API_URL}`, {
        method: HTTP_METHODS.GET,
      }),
    staleTime: Infinity,
  });
};
