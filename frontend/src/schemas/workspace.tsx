import { z } from 'zod';

export const workspaceOnboardingSchema = z.object({
  name: z.string().min(1, 'Workspace name is required'),
  organizationName: z
    .string()
    .min(1, 'Workspace organization name is required'),
  organizationUrl: z.string().url('Invalid url format').optional(),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Workspace phone number is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Workspace address is required'),
  logo: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type WorkspaceOnboardingData = z.infer<typeof workspaceOnboardingSchema>;
