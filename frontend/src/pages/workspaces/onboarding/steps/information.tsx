import { useFormContext } from 'react-hook-form';
import UploadButton from '../../../../components/Button/Upload';
import Input from '../../../../components/Input/Input';
import type { WorkspaceOnboardingData } from '../../../../schemas/workspace';

const WorkspaceInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WorkspaceOnboardingData>();
  return (
    <>
      <div className="mb-6">
        <label className="mb-2" htmlFor="workspace-logo">
          Workspace Logo
        </label>
        <UploadButton className="display-block mb-2">Upload Image</UploadButton>
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="workspace-name">
          Workspace Name
        </label>
        <Input
          placeholder="Workspace Name"
          type="text"
          id="workspace-name"
          className="px-2"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="organization-name">
          Organization Name
        </label>
        <Input
          placeholder="Organization Name"
          type="text"
          id="organization-name"
          className="px-2"
          {...register('organizationName')}
        />
        {errors.organizationName && (
          <p className="text-red-500 text-xs italic">
            {errors.organizationName?.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="organization-url">
          Organization Url
        </label>
        <Input
          placeholder="https://"
          type="text"
          id="organization-url"
          className="px-2"
          {...register('organizationUrl')}
        />
        {errors.organizationUrl && (
          <p className="text-red-500 text-xs italic">
            {errors.organizationUrl?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default WorkspaceInfoStep;
