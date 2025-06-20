import { useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import { HTTP_METHODS } from '../types/http';
import type { TileResponse } from '@/types/tile';

const API_URL = `${getConfig('apiBaseUrl')}/tiles`;

export const useFilterTiles = (filter: string) => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useQuery<TileResponse>({
    queryKey: ['tiles', filter],
    queryFn: () =>
      fetchWithAuth<TileResponse>(`${API_URL}?${filter}`, {
        method: HTTP_METHODS.GET,
      }),
  });
};
