import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { registerSchema, type RegisterFormData } from '../../utils/schemas';
import type { RegisterCredentials } from '../../types';

interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<void>;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onSwitchToLogin }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitHandler = async (data: RegisterFormData) => {
    setErrorMessage('');
    try {
      const { confirmPassword, ...credentials } = data;
      await onSubmit(credentials);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        {...register('name')}
        error={errors.name?.message}
        autoComplete="name"
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        {...register('email')}
        error={errors.email?.message}
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        {...register('password')}
        error={errors.password?.message}
        autoComplete="new-password"
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
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
