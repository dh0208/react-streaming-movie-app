import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useInput } from '../../hooks/useInput';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';
import type { RegisterCredentials } from '../../types';

interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<void>;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onSwitchToLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const name = useInput('', (value) => {
    if (!value) return 'Name is required';
    if (!validateName(value)) return 'Name must be at least 2 characters';
    return '';
  });

  const email = useInput('', (value) => {
    if (!value) return 'Email is required';
    if (!validateEmail(value)) return 'Invalid email address';
    return '';
  });

  const password = useInput('', (value) => {
    if (!value) return 'Password is required';
    const validation = validatePassword(value);
    return validation.isValid ? '' : validation.message;
  });

  const confirmPassword = useInput('', (value) => {
    if (!value) return 'Please confirm your password';
    if (value !== password.value) return 'Passwords do not match';
    return '';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    name.setTouched(true);
    email.setTouched(true);
    password.setTouched(true);
    confirmPassword.setTouched(true);

    const nameError = validateName(name.value) ? '' : 'Invalid name';
    const emailError = validateEmail(email.value) ? '' : 'Invalid email';
    const passwordValidation = validatePassword(password.value);
    const passwordError = passwordValidation.isValid ? '' : passwordValidation.message;
    const confirmError = password.value === confirmPassword.value ? '' : 'Passwords do not match';

    if (nameError || emailError || passwordError || confirmError) {
      name.setError(nameError);
      email.setError(emailError);
      password.setError(passwordError);
      confirmPassword.setError(confirmError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await onSubmit({
        name: name.value,
        email: email.value,
        password: password.value,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={name.value}
        onChange={name.handleChange}
        onBlur={name.handleBlur}
        error={name.touched ? name.error : ''}
        autoComplete="name"
      />

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
        placeholder="Create a password"
        value={password.value}
        onChange={password.handleChange}
        onBlur={password.handleBlur}
        error={password.touched ? password.error : ''}
        autoComplete="new-password"
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword.value}
        onChange={confirmPassword.handleChange}
        onBlur={confirmPassword.handleBlur}
        error={confirmPassword.touched ? confirmPassword.error : ''}
        autoComplete="new-password"
      />

      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

