import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 pt-8 border-t border-dark-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MovieStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

