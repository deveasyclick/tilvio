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
};

const baseButtonStyle =
  'text-dark dark:text-white border-2 border-gray-300 px-6 py-2 cursor-pointer font-bold rounded-md dark:hover:bg-gray-50 dark:hover:text-gray-900 hover:bg-gray-900 hover:text-white';
const MultiStepForm = ({
  steps,
  onSubmit,
  currentStep,
  prev,
  next,
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
          <button
            className={`px-6 py-2 cursor-pointer font-bold rounded-md text-white bg-primary-500 hover:bg-primary-600`}
            type="submit">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
