// src/hooks/useErrorToast.tsx
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

type ErrorToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
};

const useErrorToast = () => {
  return (options: ErrorToastOptions | string) => {
    const title =
      typeof options === 'string' ? options : (options.title ?? 'Error');
    const description =
      typeof options === 'string' ? undefined : options.description;
    const duration =
      typeof options === 'string' ? 4000 : (options.duration ?? 4000);

    toast.custom(
      () => (
        <Alert variant="destructive" className="shadow-lg w-full max-w-sm">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <div>
            <AlertTitle>{title}</AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
          </div>
        </Alert>
      ),
      { duration },
    );
  };
};

export default useErrorToast;
