import React from 'react';
import type { MovieDetails as MovieDetailsType } from '../../types';
import { getImageUrl, formatDate, formatRuntime, formatCurrency } from '../../utils/helpers';

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
  onPlayTrailer?: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onFavoriteToggle,
  isFavorite,
  onPlayTrailer,
}) => {
  const director = movie.credits?.crew.find(person => person.job === 'Director');
  const hasTrailer = movie.videos?.results.some(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="absolute inset-0 h-[500px] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-dark-900/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-64 md:w-80 rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-xl text-gray-300 italic mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-white">{movie.vote_average.toFixed(1)}</span>
              </div>

              <span className="text-gray-300">{formatDate(movie.release_date)}</span>
              {movie.runtime > 0 && (
                <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
              )}
              <span className="px-3 py-1 bg-dark-700 rounded-lg text-gray-300 uppercase text-sm">
                {movie.status}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {hasTrailer && onPlayTrailer && (
                <button
                  onClick={onPlayTrailer}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play Trailer
                </button>
              )}
              
              <button
                onClick={onFavoriteToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-dark-700 hover:bg-dark-600 text-white'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {director && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Director</h3>
                  <p className="text-white">{director.name}</p>
                </div>
              )}
              {movie.budget > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Budget</h3>
                  <p className="text-white">{formatCurrency(movie.budget)}</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Revenue</h3>
                  <p className="text-white">{formatCurrency(movie.revenue)}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Language</h3>
                <p className="text-white uppercase">{movie.original_language}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cast */}
        {movie.credits && movie.credits.cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.credits.cast.slice(0, 12).map((person) => (
                <div key={person.id} className="text-center">
                  <div className="aspect-square rounded-lg overflow-hidden bg-dark-700 mb-2">
                    <img
                      src={getImageUrl(person.profile_path, 'w185')}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white font-medium text-sm line-clamp-1">{person.name}</p>
                  <p className="text-gray-400 text-xs line-clamp-1">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

