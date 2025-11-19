import React from 'react';
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import type { MovieDetails as MovieDetailsType } from '../../types';
import { getImageUrl, formatDate, formatRuntime, formatCurrency } from '../../utils/helpers';

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onFavoriteToggle: (movie: MovieDetailsType) => void;
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
          <div className="flex-shrink-0 lg:block hidden">
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
                <AiFillStar className="w-5 h-5 text-white" />
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
                  <FaPlay className="w-5 h-5" />
                  Play Trailer
                </button>
              )}
              
              <button
                onClick={() => onFavoriteToggle(movie)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-dark-700 hover:bg-dark-600 text-white'
                }`}
              >
                {isFavorite ? (
                  <AiFillHeart className="w-5 h-5" />
                ) : (
                  <AiOutlineHeart className="w-5 h-5" />
                )}
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
