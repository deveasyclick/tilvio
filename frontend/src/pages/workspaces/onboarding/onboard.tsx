import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MultiStepForm from '../../../components/Forms/MultiStep/MultiStepForm';
import OnboardDistributor from './steps/address';
import OnboardWorkspace from './steps/information';
import OnboardReview from './steps/review';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  workspaceOnboardingSchema,
  type WorkspaceOnboardingData,
} from '../../../schemas/workspace';
import { useCreateWorkspace } from '../../../api/workspace';
import StepIndicator from '../components/StepIndicator';
import { useFetchAuthenticatedDistributor } from '../../../api/distributor';

const STORAGE_KEY = 'WorkspaceOnboardingFormData';
const STEP_VALIDATION_FIELDS = [
  // Step 0: Workspace Information
  ['name', 'organizationName', 'organizationUrl', 'logo'],
  // Step 1: Address Information
  ['email', 'phone', 'state', 'city', 'address'],
  // Step 2: Review - no validation needed
  [],
] as const;

// Helper to determine step status
const getStepStatus = (
  current: number,
  idx: number,
): 'current' | 'upcoming' | 'completed' => {
  if (idx === current) return 'current';
  if (idx > current) return 'upcoming';
  return 'completed';
};

export default function WorkspaceOnboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { refetch } = useFetchAuthenticatedDistributor();
  const next = async () => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step] || [];
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => setStep((s) => s - 1);

  // Load initial data from localStorage or empty
  const savedData =
    typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
  const parsedData = savedData ? JSON.parse(savedData) : {};
  const defaultValues = {
    ...parsedData,
    logo: parsedData.logo || { file: null, previewUrl: '/placeholder.svg' },
  };

  const methods = useForm<WorkspaceOnboardingData>({
    resolver: zodResolver(workspaceOnboardingSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Persist form data to localStorage on every change
  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const { mutate: createWorkspace, isPending } = useCreateWorkspace();
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (data: WorkspaceOnboardingData) => {
    setError(undefined);
    try {
      const formData = {
        ...data,
        logo: '',
      };

      createWorkspace(formData, {
        onSuccess: async () => {
          // Clear saved data
          localStorage.removeItem(STORAGE_KEY);
          // Refetch distributor to preload workspace
          await refetch();
          // Redirect to dashboard
          navigate('/');
        },
        onError: (err) => {
          console.error('Failed to create workspace:');
          console.log(err);
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to create workspace. Please try again.',
          );
        },
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const steps = [
    {
      component: OnboardWorkspace,
      label: 'Workspace Information',
      description: '',
    },
    {
      component: OnboardDistributor,
      label: 'Workspace Address',
    },
    {
      component: OnboardReview,
      label: 'Review & Submit',
      description: 'Review all information before submitting.',
    },
  ];

  return (
    <main className="flex w-full md:w-3/4 justify-self-center">
      <section className="w-2/5 hidden md:block">
        {steps.map(({ label }, index) => (
          <StepIndicator
            label={label}
            key={index}
            id={index + 1}
            status={getStepStatus(step, index)}
          />
        ))}
      </section>
      <section className="w-full md:w-3/5">
        <FormProvider {...methods}>
          <MultiStepForm
            steps={steps}
            next={next}
            prev={prev}
            currentStep={step}
            onSubmit={methods.handleSubmit(handleSubmit)}
            isSubmitting={isPending}
            error={error}
          />
        </FormProvider>
      </section>
    </main>
  );
}
