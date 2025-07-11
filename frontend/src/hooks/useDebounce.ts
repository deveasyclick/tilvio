import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup on value change or unmount
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
