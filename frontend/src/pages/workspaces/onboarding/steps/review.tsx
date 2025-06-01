import { useFormContext } from 'react-hook-form';
import type { WorkspaceOnboardingData } from '../../../../schemas/workspace';

export default function OnboardReview() {
  const { getValues } = useFormContext<WorkspaceOnboardingData>();
  const values = getValues();

  const renderField = (
    label: string,
    value: string | undefined | null,
    required = true,
  ) => (
    <div className="flex items-start space-x-2 py-2">
      <div className="w-1/3">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && !value && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
      <div className="w-2/3">
        {value ? (
          <span className="text-gray-900 dark:text-gray-100">{value}</span>
        ) : (
          <em className="text-gray-500">
            Not provided{required && ' (Required)'}
          </em>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {/* Organization Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Organization Information
          </h3>
          <div className="space-y-1">
            {values.logo && (
              <div className="mb-4 flex justify-center">
                <img
                  src={values.logo.previewUrl}
                  alt="Organization Logo"
                  className="h-24 w-auto object-contain rounded-lg border border-gray-200 dark:border-gray-700 p-2"
                />
              </div>
            )}
            {renderField('Workspace Name', values.name)}
            {renderField('Organization Name', values.organizationName)}
            {renderField('Organization URL', values.organizationUrl, false)}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Contact Information
          </h3>
          <div className="space-y-1">
            {renderField('Email', values.email)}
            {renderField('Phone', values.phone)}
          </div>
        </div>

        {/* Address Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Address Information
          </h3>
          <div className="space-y-1">
            {renderField('Address', values.address)}
            {renderField('City', values.city)}
            {renderField('State', values.state)}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Please review your information carefully before submitting. Fields
          marked with <span className="text-red-500">*</span> are required and
          must be provided. You can go back to edit if needed.
        </p>
      </div>
    </div>
  );
}
