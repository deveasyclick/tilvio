import { useMutation } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import configs from '../config';
import type { Workspace } from '../types/workspace';

const API_URL = configs.apiBaseUrl;

export const useCreateWorkspace = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (workspace: Partial<Workspace>) =>
      fetchWithAuth<Workspace>(`${API_URL}/workspaces`, {
        method: 'POST',
        body: JSON.stringify(workspace),
      }),
  });
};
