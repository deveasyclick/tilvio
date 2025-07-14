import { Skeleton } from '../ui/skeleton';

const TableLoader: React.FC = () => {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-5 gap-4 p-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="col-span-5 grid grid-cols-5 gap-4 items-center py-2">
            <Skeleton className="h-4 w-6" /> {/* checkbox placeholder */}
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoader;
