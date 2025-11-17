import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useInput } from '../../hooks/useInput';
import { validateEmail } from '../../utils/validators';
import type { LoginCredentials } from '../../types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSwitchToRegister }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const email = useInput('', (value) => {
    if (!value) return 'Email is required';
    if (!validateEmail(value)) return 'Invalid email address';
    return '';
  });

  const password = useInput('', (value) => {
    if (!value) return 'Password is required';
    return '';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    email.setTouched(true);
    password.setTouched(true);

    const emailError = validateEmail(email.value) ? '' : 'Invalid email';
    const passwordError = password.value ? '' : 'Password is required';

    if (emailError || passwordError) {
      email.setError(emailError);
      password.setError(passwordError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await onSubmit({
        email: email.value,
        password: password.value,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email.value}
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        error={email.touched ? email.error : ''}
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password.value}
        onChange={password.handleChange}
        onBlur={password.handleBlur}
        error={password.touched ? password.error : ''}
        autoComplete="current-password"
      />

      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

