import type { User, LoginCredentials, RegisterCredentials, AuthProvider } from '../types';
import { StorageService } from './storage';
import { validateEmail, validatePassword, validateName } from '../utils/validators';
import { generateId } from '../utils/helpers';

// replace the class-based error with a simple factory that returns an Error
export function authError(message: string): Error {
  const e = new Error(message);
  e.name = 'AuthenticationError';
  return e;
}

export const AuthService = {
  async register(credentials: RegisterCredentials): Promise<User> {
    // Validate inputs
    if (!validateName(credentials.name)) {
      throw authError('Name must be at least 2 characters');
    }

    if (!validateEmail(credentials.email)) {
      throw authError('Invalid email address');
    }

    const passwordValidation = validatePassword(credentials.password);
    if (!passwordValidation.isValid) {
      throw authError(passwordValidation.message);
    }

    // Check if user already exists
    const existingUser = StorageService.findUserByEmail(credentials.email);
    if (existingUser) {
      throw authError('Email already registered');
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email: credentials.email,
      name: credentials.name,
      provider: 'email',
      createdAt: new Date().toISOString(),
    };

    // Save user and password separately (in real app, hash password)
    StorageService.saveUser(newUser);
    localStorage.setItem(`password_${newUser.id}`, credentials.password);

    return newUser;
  },

  async login(credentials: LoginCredentials): Promise<User> {
    // Find user
    const user = StorageService.findUserByEmail(credentials.email);
    if (!user) {
      throw authError('Invalid email or password');
    }

    // Verify password
    const storedPassword = localStorage.getItem(`password_${user.id}`);
    if (storedPassword !== credentials.password) {
      throw authError('Invalid email or password');
    }

    return user;
  },

  async socialLogin(provider: AuthProvider, profile: { email: string; name: string; avatar?: string }): Promise<User> {
    // Check if user exists
    let user = StorageService.findUserByEmail(profile.email);

    if (!user) {
      // Create new user for social login
      user = {
        id: generateId(),
        email: profile.email,
        name: profile.name,
        provider: provider,
        avatar: profile.avatar,
        createdAt: new Date().toISOString(),
      };
      StorageService.saveUser(user);
    }

    return user;
  },

  logout(): void {
    StorageService.clearCurrentUser();
  },

  getCurrentUser(): User | null {
    return StorageService.getCurrentUser();
  },
};

