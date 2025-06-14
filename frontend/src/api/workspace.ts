import { useMutation } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import type { Workspace } from '../types/workspace';
import { getConfig } from '../config';

const API_URL = `${getConfig('apiBaseUrl')}/workspaces`;

export const useCreateWorkspace = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (workspace: Partial<Workspace>) =>
      fetchWithAuth<Workspace>(API_URL, {
        method: 'POST',
        body: JSON.stringify(workspace),
      }),
  });
};
