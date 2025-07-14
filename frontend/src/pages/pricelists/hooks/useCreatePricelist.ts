import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DEFAULT_PRICELIST_ITEMS } from '../constants';
import {
  CreatePriceListSchema,
  type CreatePriceList,
} from '@/schemas/pricelists';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAddPriceList } from '@/api/pricelists';
import { useState } from 'react';

const useCreatePricelist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: createPricelist, status } = useAddPriceList();
  const createPricelistForm = useForm<CreatePriceList>({
    resolver: zodResolver(CreatePriceListSchema),
    defaultValues: {
      name: '',
      price_list_items: DEFAULT_PRICELIST_ITEMS,
    },
  });
  const queryClient = useQueryClient();

  const handleAddPricelist = async (data: CreatePriceList) => {
    createPricelistForm.clearErrors();
    try {
      createPricelist(data, {
        onSuccess: async () => {
          toast.success('Pricelist created successfully!');
          queryClient.invalidateQueries({ queryKey: ['pricelists'] });
          setDialogOpen(false);
          createPricelistForm.reset();
        },
        onError: (err) => {
          console.error('Failed to create pricelist:', err);
          createPricelistForm.setError('root', {
            message:
              err instanceof Error
                ? err.message
                : 'Failed to create pricelist. Please try again.',
            type: 'server',
          });
        },
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      createPricelistForm.setError('root', {
        message: 'An unexpected error occurred. Please try again.',
        type: 'server',
      });
    }
  };

  return {
    handleAddPricelist,
    createPricelistDialogOpen: dialogOpen,
    setCreatePricelistDialogOpen: setDialogOpen,
    createPricelistStatus: status,
    createPricelistForm,
  };
};

export default useCreatePricelist;
