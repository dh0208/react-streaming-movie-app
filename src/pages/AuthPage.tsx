import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { SocialLoginButton } from '../components/auth/SocialLoginButton';
import type { LoginCredentials, RegisterCredentials, AuthProvider } from '../types';

export const AuthPage: React.FC = () => {
  const { isAuthenticated, login, register, socialLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (credentials: LoginCredentials) => {
    await login(credentials);
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    await register(credentials);
  };

  const handleSocialLogin = async (
    provider: AuthProvider,
    profile: { email: string; name: string; avatar?: string }
  ) => {
    await socialLogin(provider, profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <h1 className="text-3xl font-bold text-white">MovieStream</h1>
          </div>
          <p className="text-gray-400">Discover and track your favorite movies</p>
        </div>

        {/* Auth Card */}
        <div className="bg-dark-800 rounded-xl shadow-2xl p-8 border border-dark-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <SocialLoginButton provider="google" onLogin={handleSocialLogin} />
            <SocialLoginButton provider="facebook" onLogin={handleSocialLogin} />
            <SocialLoginButton provider="apple" onLogin={handleSocialLogin} />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-800 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Forms */}
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSubmit={handleRegister} onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

