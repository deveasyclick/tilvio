import IconWrapper from '@/components/IconWrapper/IconWrapper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { PriceListItem } from '@/types/pricelist';

interface PriceListDialogProps {
  priceListItems: PriceListItem[];
}

const PriceListDialog: React.FC<PriceListDialogProps> = ({
  priceListItems: items,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" className="cursor-pointer hover:no-underline">
          View Items
          <IconWrapper name="eye" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2">
              <div className="text-sm font-medium text-muted-foreground">
                {item.dimension}
              </div>
              <div className="text-sm font-semibold">
                ₦{Number(item.price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceListDialog;
