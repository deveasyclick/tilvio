import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import IconWrapper from '@/components/IconWrapper/IconWrapper';

const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: 'dimension',
    header: 'Dimension',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground">
        {row.getValue('dimension') as string}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Type',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground">
        {row.getValue('description') as string}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="text-sm font-semibold">
        ₦{Number(row.getValue('price') as string).toLocaleString()}
      </div>
    ),
  },
];

interface OrderItem {
  dimension: string;
  description: string;
  price: number;
}

interface OrderDialogProps {
  orderItems: OrderItem[];
}
const OrderDialog: React.FC<OrderDialogProps> = ({ orderItems: items }) => {
  // Initialize table with react-table
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" className="cursor-pointer hover:no-underline">
          <IconWrapper name="eye" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No items available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
