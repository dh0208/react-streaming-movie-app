export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { 
  isValid: boolean; 
  message: string 
} => {
  if (password.length < 6) {
    return { 
      isValid: false, 
      message: 'Password must be at least 6 characters' 
    };
  }
  return { isValid: true, message: '' };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

