import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials, AuthProvider } from '../types';
import { AuthService } from '../services/api';
import { StorageService } from '../services/storage';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  socialLogin: (provider: AuthProvider, profile: { email: string; name: string; avatar?: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const currentUser = StorageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const user = await AuthService.login(credentials);
    StorageService.setCurrentUser(user);
    setUser(user);
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    const user = await AuthService.register(credentials);
    StorageService.setCurrentUser(user);
    setUser(user);
  }, []);

  const socialLogin = useCallback(async (
    provider: AuthProvider,
    profile: { email: string; name: string; avatar?: string }
  ) => {
    const user = await AuthService.socialLogin(provider, profile);
    StorageService.setCurrentUser(user);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    socialLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

