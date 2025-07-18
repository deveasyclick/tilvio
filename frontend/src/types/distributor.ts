import type { Workspace } from './workspace';

export type Role = 'distributor' | 'manager';

export interface Distributor {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  state?: string;
  city?: string;
  address?: string;
  role: Role;
  workspaceId: string;
  workspace?: Workspace;
}
