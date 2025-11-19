import React from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import type { AuthProvider } from '../../types';

interface SocialLoginButtonProps {
  provider: Exclude<AuthProvider, 'email'>;
  onLogin: (provider: AuthProvider, profile: { email: string; name: string; avatar?: string }) => void;
}

const socialConfig = {
  google: {
    name: 'Google',
    icon: FaGoogle,
    bgColor: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
  },
  facebook: {
    name: 'Facebook',
    icon: FaFacebook,
    bgColor: 'bg-[#1877F2] hover:bg-[#166fe5] text-white',
  },
  apple: {
    name: 'Apple',
    icon: FaApple,
    bgColor: 'bg-black hover:bg-gray-900 text-white',
  },
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onLogin }) => {
  const config = socialConfig[provider];
  const IconComponent = config.icon;

  const handleClick = () => {
    // Simulate social login - in production, this would open OAuth flow
    const mockProfile = {
      email: `user@${provider}.com`,
      name: `${config.name} User`,
      avatar: undefined,
    };
    onLogin(provider, mockProfile);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${config.bgColor}`}
    >
      <IconComponent className="w-5 h-5" />
      <span>Continue with {config.name}</span>
    </button>
  );
};
