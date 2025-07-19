import { z } from 'zod';

export const CreateOrderItemSchema = z.object({
  name: z.string().min(1, 'Pricelist name is required'),
});

export const CreateOrderSchema = z.object({
  distributorId: z.number(),
  customerId: z.number(),
  workspaceId: z.number(),
  status: z.string(),
  transportFare: z.number().min(0),
  order_items: CreateOrderItemSchema,
  notes: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
});

export type CreateOrderItem = z.infer<typeof CreateOrderItemSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
