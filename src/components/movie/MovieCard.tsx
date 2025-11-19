import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import type { Movie } from '../../types';
import { getImageUrl } from '../../utils/helpers';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onFavoriteToggle,
  isFavorite = false 
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(movie);
  };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative bg-dark-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-dark-700">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors z-10"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <AiFillHeart 
              className={`w-5 h-5 ${isFavorite ? 'text-red-500' : 'text-white'}`}
            />
          </button>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg flex items-center gap-1">
          <AiFillStar className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-white">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-1 line-clamp-1 group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Link>
  );
};
