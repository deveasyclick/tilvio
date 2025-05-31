import { useFormContext } from 'react-hook-form';
import Input from '../../../../components/Input/Input';
import type { WorkspaceOnboardingData } from '../../../../schemas/workspace';

const WorkspaceAddressStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WorkspaceOnboardingData>();
  return (
    <>
      <div className="mb-6">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <Input
          placeholder="Primary Email"
          type="email"
          id="email"
          className="px-2"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="phone">
          Phone Number
        </label>
        <Input
          placeholder="+234 xxxx xxx xxx"
          type="text"
          id="phone"
          className="px-2"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs italic">{errors.phone?.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="city">
          City
        </label>
        <Input
          placeholder="city"
          type="text"
          id="city"
          className="px-2"
          {...register('city')}
        />
        {errors.city && (
          <p className="text-red-500 text-xs italic">{errors.city?.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="state">
          State
        </label>
        <Input
          placeholder="state"
          type="text"
          id="state"
          className="px-2"
          {...register('state')}
        />
        {errors.state && (
          <p className="text-red-500 text-xs italic">{errors.state?.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-2" htmlFor="address">
          Office address
        </label>
        <Input
          placeholder="address"
          type="text"
          id="address"
          className="px-2"
          {...register('address')}
        />
        {errors.address && (
          <p className="text-red-500 text-xs italic">
            {errors.address?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default WorkspaceAddressStep;
