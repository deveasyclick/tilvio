import { useEffect, useState } from 'react';
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
import StepIndicator from '../components/StepIndicator';

const STORAGE_KEY = 'WorkspaceOnboardingFormData';

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

  const next = async () => {
    setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => s - 1);

  // Load initial data from localStorage or empty
  const savedData =
    typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
  const defaultValues = savedData ? JSON.parse(savedData) : {};

  const methods = useForm<WorkspaceOnboardingData>({
    resolver: zodResolver(workspaceOnboardingSchema),
    defaultValues,
  });

  // Persist form data to localStorage on every change
  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleSubmit = (data: WorkspaceOnboardingData) => {
    // Final submit: call your API here
    console.log('Submitting onboarding data:', data);

    // Clear saved data on successful submit
    localStorage.removeItem(STORAGE_KEY);
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
          />
        </FormProvider>
      </section>
    </main>
  );
}
