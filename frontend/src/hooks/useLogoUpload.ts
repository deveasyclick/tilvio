import { useRef } from 'react';
import {
  UseFormSetValue,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import { WorkspaceOnboardingData } from '../schemas/workspace';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const useLogoUpload = (
  setValue: UseFormSetValue<WorkspaceOnboardingData>,
  clearErrors: UseFormClearErrors<WorkspaceOnboardingData>,
  setError: UseFormSetError<WorkspaceOnboardingData>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currentLogo?: { previewUrl: string },
  ) => {
    const file = e.target.files?.[0];

    // Cleanup previous object URL if it exists
    if (currentLogo?.previewUrl && currentLogo.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(currentLogo.previewUrl);
    }

    if (!file) {
      setValue(
        'logo',
        { file: null, previewUrl: '' },
        { shouldValidate: true },
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('logo', { message: 'File size must be less than 2MB' });
      return;
    }

    clearErrors('logo');
    const url = URL.createObjectURL(file);
    setValue('logo', { file, previewUrl: url }, { shouldValidate: true });
  };

  const handleClick = () => {
    clearErrors('logo');
    inputRef.current?.click();
  };

  const handleRemove = (currentLogo?: { previewUrl: string }) => {
    if (currentLogo?.previewUrl && currentLogo.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(currentLogo.previewUrl);
    }

    setValue('logo', { file: null, previewUrl: '' }, { shouldValidate: true });
  };

  return {
    inputRef,
    handleFileChange,
    handleClick,
    handleRemove,
    MAX_FILE_SIZE,
  };
};
