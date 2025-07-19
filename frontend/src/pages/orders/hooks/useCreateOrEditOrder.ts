import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateOrderSchema, type CreateOrder } from '@/schemas/order';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAddOrder, useEditOrder } from '@/api/order';
import { useEffect, useState } from 'react';
import type { CreateOrEditOrderDialogMode } from '../types';
import type { Order } from '@/types/order';

const useCreateOrEditOrder = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<CreateOrEditOrderDialogMode>('');
  const [orderToEdit, setOrderToEdit] = useState<Order | null>();
  const { mutate: createOrder, status: createStatus } = useAddOrder();
  const { mutate: editOrder, status: editStatus } = useEditOrder();

  const createOrEditOrderForm = useForm<CreateOrder>({
    resolver: zodResolver(CreateOrderSchema),
  });

  useEffect(() => {
    if (mode === 'edit' && orderToEdit) {
      createOrEditOrderForm.reset({
        title: orderToEdit.title,
        //order_items: orderToEdit.orderItems,
      });
    } else {
      createOrEditOrderForm.reset({
        title: '',
        //order_items: [],
      });
    }
  }, [mode, orderToEdit, createOrEditOrderForm]);

  const queryClient = useQueryClient();

  const handleAddOrder = async (data: CreateOrder) => {
    createOrEditOrderForm.clearErrors();
    try {
      createOrder(data, {
        onSuccess: async () => {
          toast.success('Order created successfully!');
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          setDialogOpen(false);
          createOrEditOrderForm.reset();
        },
        onError: (err) => {
          console.error('Failed to create order:', err);
          createOrEditOrderForm.setError('root', {
            message:
              err instanceof Error
                ? err.message
                : 'Failed to create order. Please try again.',
            type: 'server',
          });
        },
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      createOrEditOrderForm.setError('root', {
        message: 'An unexpected error occurred. Please try again.',
        type: 'server',
      });
    }
  };

  const handleEditOrder = async (data: Partial<Order>) => {
    createOrEditOrderForm.clearErrors();
    if (!orderToEdit) {
      console.log('No order to edit');
      return;
    }

    try {
      editOrder(
        { ...data, id: orderToEdit.id },
        {
          onSuccess: async () => {
            toast.success('Order edited successfully!');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setDialogOpen(false);
            createOrEditOrderForm.reset();
          },
          onError: (err) => {
            console.error('Failed to edit order:', err);
            createOrEditOrderForm.setError('root', {
              message:
                err instanceof Error
                  ? err.message
                  : 'Failed to edit order. Please try again.',
              type: 'server',
            });
          },
        },
      );
    } catch (err) {
      console.error('Error submitting form:', err);
      createOrEditOrderForm.setError('root', {
        message: 'An unexpected error occurred. Please try again.',
        type: 'server',
      });
    }
  };

  const handleDialogOpen = (mode: CreateOrEditOrderDialogMode) => {
    setDialogOpen(true);
    setMode(mode);
  };
  const onEditOrder = (order: Order) => {
    handleDialogOpen('edit');
    setOrderToEdit(order);
  };

  const handleDialogToggle = (isOpen: boolean) => {
    setDialogOpen(isOpen);

    if (!isOpen) {
      // ✅ Cleanup logic goes here
      createOrEditOrderForm.reset();
      setOrderToEdit(null);
      setMode('');
    }
  };

  const onAddOrder = () => {
    handleDialogOpen('create');
  };
  const isCreateMode = mode === 'create';
  return {
    handleAddOrEditOrder: isCreateMode ? handleAddOrder : handleEditOrder,
    createOrderDialogOpen: dialogOpen,
    mutationStatus: isCreateMode ? createStatus : editStatus,
    createOrEditOrderForm,
    mode,
    onEditOrder,
    orderToEdit,
    onAddOrder,
    handleDialogToggle,
  };
};

export default useCreateOrEditOrder;
