import { useFormContext } from 'react-hook-form';
import type { WorkspaceOnboardingData } from '../../../../schemas/workspace';

export default function OnboardReview() {
  const { getValues } = useFormContext<WorkspaceOnboardingData>();
  const values = getValues();

  return (
    <div>
      <div className="space-y-2">
        <div>
          <strong>Name:</strong> {values.name || <em>Not provided</em>}
        </div>
        <div>
          <strong>Organization Name:</strong>{' '}
          {values.organizationName || <em>Not provided</em>}
        </div>
        <div>
          <strong>Organization URL:</strong>{' '}
          {values.organizationUrl || <em>Not provided</em>}
        </div>
        <div>
          <strong>Email:</strong> {values.email || <em>Not provided</em>}
        </div>
        <div>
          <strong>Phone:</strong> {values.phone || <em>Not provided</em>}
        </div>
        <div>
          <strong>State:</strong> {values.state || <em>Not provided</em>}
        </div>
        <div>
          <strong>City:</strong> {values.city || <em>Not provided</em>}
        </div>
        <div>
          <strong>Address:</strong> {values.address || <em>Not provided</em>}
        </div>
        <div>
          <strong>Logo:</strong>{' '}
          {values.logo ? (
            <img src={values.logo} alt="Logo" className="h-12" />
          ) : (
            <em>Not provided</em>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Please review your information before submitting. You can go back to
        edit if needed.
      </p>
    </div>
  );
}
