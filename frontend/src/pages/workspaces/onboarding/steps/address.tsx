import { useFormContext } from 'react-hook-form';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/Select/Select';
import { COUNTRIES } from '../../../../constants/countries';
import type { WorkspaceOnboardingData } from '../../../../schemas/workspace';

const WorkspaceAddressStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WorkspaceOnboardingData>();

  return (
    <div className="space-y-6">
      {/* Email field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter your primary email"
          type="email"
          id="email"
          className={`text-input px-2 ${errors.email ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs" role="alert" id="email-error">
            {errors.email?.message}
          </p>
        )}
      </div>

      {/* Phone field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="phone">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="+234 xxx xxx xxxx"
          type="tel"
          id="phone"
          className={`text-input px-2 ${errors.phone ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby="phone-hint phone-error"
          {...register('phone')}
        />
        {errors.phone ? (
          <p className="text-red-500 text-xs" role="alert" id="phone-error">
            {errors.phone?.message}
          </p>
        ) : (
          <p className="text-gray-500 text-xs" id="phone-hint">
            Enter your phone number in international format
          </p>
        )}
      </div>

      {/* Address field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="address">
          Office Address <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter your complete office address"
          type="text"
          id="address"
          className={`text-input px-2 ${errors.address ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
          {...register('address')}
        />
        {errors.address && (
          <p className="text-red-500 text-xs" role="alert" id="address-error">
            {errors.address?.message}
          </p>
        )}
      </div>

      {/* Country field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="country">
          Country <span className="text-red-500">*</span>
        </label>
        <Select
          id="country"
          className={`text-input px-2 ${errors.country ? 'border-red-500' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.country}
          aria-describedby={errors.country ? 'country-error' : undefined}
          {...register('country')}>
          <option value="">Select your country</option>
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </Select>
        {errors.country && (
          <p className="text-red-500 text-xs" role="alert" id="country-error">
            {errors.country?.message}
          </p>
        )}
      </div>

      {/* City and State fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="city">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your city"
            type="text"
            id="city"
            className={`text-input px-2 ${errors.city ? 'border-red-500' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
            {...register('city')}
          />
          {errors.city && (
            <p className="text-red-500 text-xs" role="alert" id="city-error">
              {errors.city?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="state">
            State <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your state"
            type="text"
            id="state"
            className={`text-input px-2 ${errors.state ? 'border-red-500' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? 'state-error' : undefined}
            {...register('state')}
          />
          {errors.state && (
            <p className="text-red-500 text-xs" role="alert" id="state-error">
              {errors.state?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceAddressStep;
