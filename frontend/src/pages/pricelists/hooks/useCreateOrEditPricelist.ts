import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DEFAULT_PRICELIST_ITEMS } from '../constants';
import {
  CreatePriceListSchema,
  type CreatePriceList,
} from '@/schemas/pricelists';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAddPriceList, useEditPriceList } from '@/api/pricelists';
import { useEffect, useState } from 'react';
import type { CreateOrEditPricelistDialogMode } from '../types';
import type { PriceList } from '@/types/pricelist';

const useCreateOrEditPricelist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<CreateOrEditPricelistDialogMode>('');
  const [pricelistToEdit, setPricelistToEdit] = useState<PriceList | null>();
  const { mutate: createPricelist, status: createStatus } = useAddPriceList();
  const { mutate: editPricelist, status: editStatus } = useEditPriceList();

  const createOrEditPricelistForm = useForm<CreatePriceList>({
    resolver: zodResolver(CreatePriceListSchema),
    defaultValues: {
      name: pricelistToEdit?.name ?? '',
      price_list_items:
        mode == 'create'
          ? DEFAULT_PRICELIST_ITEMS
          : (pricelistToEdit?.priceListItems ?? []),
    },
  });

  useEffect(() => {
    if (mode === 'edit' && pricelistToEdit) {
      createOrEditPricelistForm.reset({
        name: pricelistToEdit.name,
        price_list_items: pricelistToEdit.priceListItems,
      });
    } else {
      createOrEditPricelistForm.reset({
        name: '',
        price_list_items: DEFAULT_PRICELIST_ITEMS,
      });
    }
  }, [mode, pricelistToEdit, createOrEditPricelistForm]);

  const queryClient = useQueryClient();

  const handleAddPricelist = async (data: CreatePriceList) => {
    createOrEditPricelistForm.clearErrors();
    try {
      createPricelist(data, {
        onSuccess: async () => {
          toast.success('Pricelist created successfully!');
          queryClient.invalidateQueries({ queryKey: ['pricelists'] });
          setDialogOpen(false);
          createOrEditPricelistForm.reset();
        },
        onError: (err) => {
          console.error('Failed to create pricelist:', err);
          createOrEditPricelistForm.setError('root', {
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
      createOrEditPricelistForm.setError('root', {
        message: 'An unexpected error occurred. Please try again.',
        type: 'server',
      });
    }
  };

  const handleEditPricelist = async (data: Partial<PriceList>) => {
    createOrEditPricelistForm.clearErrors();
    if (!pricelistToEdit) {
      console.log('No pricelist to edit');
      return;
    }

    try {
      editPricelist(
        { ...data, id: pricelistToEdit.id },
        {
          onSuccess: async () => {
            toast.success('Pricelist edited successfully!');
            queryClient.invalidateQueries({ queryKey: ['pricelists'] });
            setDialogOpen(false);
            createOrEditPricelistForm.reset();
          },
          onError: (err) => {
            console.error('Failed to edit pricelist:', err);
            createOrEditPricelistForm.setError('root', {
              message:
                err instanceof Error
                  ? err.message
                  : 'Failed to edit pricelist. Please try again.',
              type: 'server',
            });
          },
        },
      );
    } catch (err) {
      console.error('Error submitting form:', err);
      createOrEditPricelistForm.setError('root', {
        message: 'An unexpected error occurred. Please try again.',
        type: 'server',
      });
    }
  };

  const handleDialogOpen = (mode: CreateOrEditPricelistDialogMode) => {
    setDialogOpen(true);
    setMode(mode);
  };
  const onEditPricelist = (pricelist: PriceList) => {
    handleDialogOpen('edit');
    setPricelistToEdit(pricelist);
  };

  const handleDialogToggle = (isOpen: boolean) => {
    setDialogOpen(isOpen);

    if (!isOpen) {
      // ✅ Cleanup logic goes here
      createOrEditPricelistForm.reset();
      setPricelistToEdit(null);
      setMode('');
    }
  };

  const onAddPricelist = () => {
    handleDialogOpen('create');
  };
  const isCreateMode = mode === 'create';
  return {
    handleAddOrEditPricelist: isCreateMode
      ? handleAddPricelist
      : handleEditPricelist,
    createPricelistDialogOpen: dialogOpen,
    mutationStatus: isCreateMode ? createStatus : editStatus,
    createOrEditPricelistForm,
    mode,
    onEditPricelist,
    pricelistToEdit,
    onAddPricelist,
    handleDialogToggle,
  };
};

export default useCreateOrEditPricelist;
