import React from 'react';
import Button from '../../Button/Button';
import IconWrapper from '../../IconWrapper/IconWrapper';

type MultiStepFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  steps: Array<{
    component: React.ComponentType;
    label: string;
    description?: string;
  }>;
  currentStep: number;
  prev: () => void;
  next: () => void;
  isSubmitting?: boolean;
  error?: string;
};

const baseButtonStyle =
  'text-dark dark:text-white border-2 border-gray-300 px-6 py-2 cursor-pointer font-bold rounded-md dark:hover:bg-gray-50 dark:hover:text-gray-900 hover:bg-gray-900 hover:text-white';
const MultiStepForm = ({
  steps,
  onSubmit,
  currentStep,
  prev,
  next,
  isSubmitting,
  error,
  ...attributes
}: MultiStepFormProps) => {
  const { component: CurrentStep, label, description } = steps[currentStep];

  return (
    <form onSubmit={onSubmit} {...attributes}>
      <small className="text-md md:hidden">
        {currentStep + 1}/{steps.length}
      </small>
      <h2 className="mb-2">{label}</h2>
      <p className="mb-6">{description}</p>
      <CurrentStep />

      <div className="flex justify-between mt-10">
        {currentStep > 0 && (
          <Button className={baseButtonStyle} type="button" onClick={prev}>
            <IconWrapper name="arrowLeft" className="w-4 h-4 inline mr-2" />
            Back
          </Button>
        )}

        {currentStep < steps.length - 1 && (
          <Button className={baseButtonStyle} type="button" onClick={next}>
            Next
            <IconWrapper name="arrowRight" className="w-4 h-4 inline ml-2" />
          </Button>
        )}

        {currentStep === steps.length - 1 && (
          <div className="flex flex-col items-end gap-2">
            <Button
              className={`px-6 py-2 cursor-pointer font-bold rounded-md text-white bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <IconWrapper name="loader" className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        )}
      </div>
      {error && (
        <p
          className="text-sm text-red-600 dark:text-red-400 pt-4 text-center"
          role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

export default MultiStepForm;
