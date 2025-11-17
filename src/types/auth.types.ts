export type AuthProvider = 'email' | 'google' | 'facebook' | 'apple';

export interface User {
  id: string;
  email: string;
  name: string;
  provider: AuthProvider;
  avatar?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

