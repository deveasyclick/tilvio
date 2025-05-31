import type React from 'react';
import IconWrapper from '../../../components/IconWrapper/IconWrapper';

type StepStatus = 'completed' | 'current' | 'upcoming';

type StepIndicatorProps = { id: number; label: string; status: StepStatus };

const statusBgColor: Record<StepStatus, string> = {
  completed: 'bg-green-500',
  current: 'bg-blue-500',
  upcoming: 'bg-gray-600',
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  id,
  label,
  status = 'upcoming',
}) => {
  const bgColor = statusBgColor[status] || statusBgColor['upcoming'];
  return (
    <section className="flex items-center mb-2">
      <span
        className={`inline-flex items-center justify-center rounded-full mr-2 text-white p-2 h-8 w-8 ${bgColor}`}
        aria-current={status === 'current' ? 'step' : undefined}>
        {status === 'completed' ? (
          <IconWrapper name="checkMarkCircle" size="20" />
        ) : (
          id
        )}
      </span>
      <p className="inline-block align-middle">{label}</p>
    </section>
  );
};

export default StepIndicator;
