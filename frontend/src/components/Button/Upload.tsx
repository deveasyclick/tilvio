import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { WorkspaceOnboardingData } from '../../schemas/workspace';

type UploadButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  accept?: string;
};

const UploadButton: React.FC<UploadButtonProps> = ({
  children,
  className,
  accept = 'image/*',
}) => {
  const { register, setValue } = useFormContext<WorkspaceOnboardingData>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref, onChange, ...rest } = register('logo');

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClick = () => {
    setError(null);
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Cleanup old preview
    }

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const urlImage = URL.createObjectURL(file);
      setPreviewUrl(urlImage);
      setValue('logo', file, { shouldValidate: true });
      onChange(e); // Trigger RHF's onChange
    } catch (err) {
      setError('Failed to preview image');
      console.error('Preview generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4 md:justify-between">
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleClick}
          className={`px-4 py-2 cursor-pointer font-bold border-2 border-gray-300 rounded-[7px] hover:bg-gray-900 hover:text-white dark:hover:bg-gray-50 dark:hover:text-gray-900 transition-colors ${className || ''}`}
          disabled={isLoading}>
          {isLoading ? 'Loading...' : children}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <small className="text-gray-500">
          Supported: JPG, PNG files up to 2MB
        </small>
        <input
          type="file"
          accept={accept}
          className="hidden"
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onChange={handleFileChange}
          {...rest}
        />
      </div>
      <div className="flex-shrink-0">
        {previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Logo preview"
              className="w-24 h-24 object-cover rounded border bg-gray-50"
            />
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                setValue('logo', '');
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600">
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadButton;
