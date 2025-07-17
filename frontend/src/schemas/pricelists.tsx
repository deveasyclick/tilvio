import { z } from 'zod';

export const CreatePriceListItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  dimension: z.string().min(1, 'Dimension is required'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(1, 'Price must be greater than 0'),
});

export const CreatePriceListSchema = z.object({
  name: z.string().min(1, 'Pricelist name is required'),
  price_list_items: z.array(CreatePriceListItemSchema).min(1, {
    message: 'At least one item is required',
  }),
});

export type CreatePriceListItem = z.infer<typeof CreatePriceListItemSchema>;
export type CreatePriceList = z.infer<typeof CreatePriceListSchema>;
