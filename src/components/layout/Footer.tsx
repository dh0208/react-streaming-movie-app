import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">MovieStream</h3>
            <p className="text-gray-400 text-sm">
              Your premier destination for discovering and exploring movies. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Attribution */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Data Source</h3>
            <p className="text-gray-400 text-sm">
              Movie data provided by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-400 transition-colors"
              >
                The Movie Database (TMDB)
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MovieStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

