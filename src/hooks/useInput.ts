import { useState, useCallback, type ChangeEvent } from 'react';

interface UseInputReturn {
  value: string;
  error: string;
  touched: boolean;
  setValue: (value: string) => void;
  setError: (error: string) => void;
  setTouched: (touched: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: () => void;
  reset: () => void;
}

export const useInput = (
  initialValue: string = '',
  validator?: (value: string) => string
): UseInputReturn => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (touched && validator) {
      setError(validator(newValue));
    }
  }, [touched, validator]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
  }, [value, validator]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError('');
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    setValue,
    setError,
    setTouched,
    handleChange,
    handleBlur,
    reset,
  };
};

