import { useFormContext, useWatch } from 'react-hook-form';
import UploadButton from '../../../../components/Button/Upload';
import Input from '../../../../components/Input/Input';
import type { WorkspaceOnboardingData } from '../../../../schemas/workspace';
import { useLogoUpload } from '../../../../hooks/useLogoUpload';

const WorkspaceInfoStep = () => {
  const {
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext<WorkspaceOnboardingData>();

  const logo = useWatch({ name: 'logo' });
  const { inputRef, handleFileChange, handleClick, handleRemove } =
    useLogoUpload(setValue, clearErrors, setError);

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="workspace-logo">
            Workspace Logo
            <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div className="flex gap-4 justify-between">
            <UploadButton
              onClick={handleClick}
              className="px-4 py-2 cursor-pointer font-bold border-2 border-gray-300 rounded-[7px] hover:bg-gray-900 hover:text-white dark:hover:bg-gray-50 dark:hover:text-gray-900 transition-colors block"
              text="Upload Image"
              aria-label="Upload workspace logo"
            />
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, logo)}
              ref={inputRef}
              aria-label="Upload workspace logo"
              id="workspace-logo"
            />
            {logo.previewUrl && (
              <div className="relative">
                <img
                  src={logo.previewUrl}
                  alt="Workspace logo preview"
                  className="w-24 h-24 object-cover rounded border bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(logo)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600 cursor-pointer"
                  aria-label="Remove uploaded logo">
                  ×
                </button>
              </div>
            )}
          </div>
          {errors.logo?.file && (
            <p className="text-red-500 text-xs" role="alert">
              {errors.logo?.file?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="workspace-name">
            Workspace Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your workspace name"
            type="text"
            id="workspace-name"
            className={`text-input px-2 ${errors.name ? 'border-red-500' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'workspace-name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p
              className="text-red-500 text-xs"
              role="alert"
              id="workspace-name-error">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium"
            htmlFor="organization-name">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your organization name"
            type="text"
            id="organization-name"
            className={`text-input px-2 ${
              errors.organizationName ? 'border-red-500' : ''
            }`}
            aria-required="true"
            aria-invalid={!!errors.organizationName}
            aria-describedby={
              errors.organizationName ? 'org-name-error' : undefined
            }
            {...register('organizationName')}
          />
          {errors.organizationName && (
            <p
              className="text-red-500 text-xs"
              role="alert"
              id="org-name-error">
              {errors.organizationName?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium"
            htmlFor="organization-url">
            Organization URL <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="https://"
            type="url"
            id="organization-url"
            className={`text-input px-2 ${
              errors.organizationUrl ? 'border-red-500' : ''
            }`}
            aria-required="true"
            aria-invalid={!!errors.organizationUrl}
            aria-describedby="org-url-hint org-url-error"
            {...register('organizationUrl')}
          />
          {errors.organizationUrl && (
            <p className="text-red-500 text-xs" role="alert" id="org-url-error">
              {errors.organizationUrl?.message}
            </p>
          )}
          <p className="text-gray-500 text-xs" id="org-url-hint">
            Enter the full URL including https://
          </p>
        </div>
      </div>
    </>
  );
};

export default WorkspaceInfoStep;
