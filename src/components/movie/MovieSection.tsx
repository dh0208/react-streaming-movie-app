import React, { useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import type { Movie } from '../../types';
import { MovieCard } from './MovieCard';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onFavoriteToggle?: (movie: Movie) => void;
  isFavorite?: (movieId: number) => boolean;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  onFavoriteToggle,
  isFavorite,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
            aria-label="Scroll left"
          >
            <IoChevronBack className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
            aria-label="Scroll right"
          >
            <IoChevronForward className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable Movie List */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-40 sm:w-48 snap-start">
            <MovieCard
              movie={movie}
              onFavoriteToggle={onFavoriteToggle}
              isFavorite={isFavorite?.(movie.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
