import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  type CreatePriceList,
  type CreatePriceListItem,
} from '@/schemas/pricelists';
import {
  DEFAULT_PRICELIST_ITEMS,
  TILES_DESCRIPTIONS,
  TILES_DIMENSIONS,
} from '../constants';
import type { MutationStatus } from '@tanstack/react-query';
import IconWrapper from '@/components/IconWrapper/IconWrapper';
import type { CreateOrEditPricelistDialogMode } from '../types';

type FormColumn = ColumnDef<CreatePriceListItem> & {
  accessorKey: keyof CreatePriceListItem;
};

// Table column definitions
const columns: FormColumn[] = [
  {
    accessorKey: 'dimension',
    header: 'Dimension',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground">
        {row.getValue('dimension')}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground">
        {row.getValue('description')}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground">
        {row.getValue('price')}
      </div>
    ),
  },
];

interface CreatePriceListDialogProps {
  handleAddOrEditPriceList: (data: CreatePriceList) => void;
  open: boolean;
  status: MutationStatus;
  onOpenDialog: (open: boolean) => void;
  mode: CreateOrEditPricelistDialogMode;
}

// The item is a default item if the index is less than the length of the default items
const isDefaultItem = (index: number) => index < DEFAULT_PRICELIST_ITEMS.length;
const CreatePriceListDialog: React.FC<CreatePriceListDialogProps> = ({
  handleAddOrEditPriceList,
  open,
  status,
  onOpenDialog,
  mode,
}) => {
  const form = useFormContext<CreatePriceList>();

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'price_list_items',
  });

  const table = useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddItem = () => {
    append({ description: '', dimension: '', price: 0 });
  };

  const isPending = status === 'pending';
  return (
    <Dialog open={open} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Pricelist' : 'Edit Pricelist'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleAddOrEditPriceList)}
            className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricelist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pricelist name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}>
                  Add Item
                </Button>
              </div>

              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </TableHead>
                      ))}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {fields.length ? (
                    fields.map((field, index) => (
                      <TableRow key={field.id}>
                        {columns.map((col) => (
                          <TableCell key={col.accessorKey as string}>
                            <FormField
                              control={control}
                              name={
                                `price_list_items.${index}.${col.accessorKey}` as const
                              }
                              render={({ field }) => (
                                <FormControl>
                                  {col.accessorKey === 'dimension' ? (
                                    <select
                                      {...field}
                                      className="w-full rounded border px-2 py-1 text-sm text-foreground">
                                      {TILES_DIMENSIONS.map((dimension) => (
                                        <option
                                          key={dimension}
                                          value={dimension}>
                                          {dimension}
                                        </option>
                                      ))}
                                    </select>
                                  ) : col.accessorKey === 'description' ? (
                                    <select
                                      {...field}
                                      className="w-full rounded border px-2 py-1 text-sm text-foreground">
                                      {TILES_DESCRIPTIONS.map((description) => (
                                        <option
                                          key={description}
                                          value={description}>
                                          {description}
                                        </option>
                                      ))}
                                    </select>
                                  ) : col.accessorKey === 'price' ? (
                                    <Input
                                      type="number"
                                      {...field}
                                      placeholder="Enter price"
                                      value={field.value ?? ''}
                                      onChange={(e) =>
                                        field.onChange(
                                          e.target.value === ''
                                            ? ''
                                            : +e.target.value,
                                        )
                                      }
                                    />
                                  ) : null}
                                </FormControl>
                              )}
                            />
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={isDefaultItem(index)}
                            onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="text-center text-sm text-muted-foreground">
                        No items added yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {form.formState.errors.root && (
              <p className="text-sm text-red-500 bg-red-50 p-2 rounded text-center">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}>
              Save Pricelist
              {isPending && (
                <IconWrapper name="loader" width={24} height={24} />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePriceListDialog;
