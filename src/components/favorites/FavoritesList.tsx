import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import type { Movie } from '../../types';
import { MovieGrid } from '../movie/MovieGrid';
import { Loading } from '../common/Loading';

interface FavoritesListProps {
  favorites: Movie[];
  loading: boolean;
  onFavoriteToggle: (movie: Movie) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  loading,
  onFavoriteToggle,
}) => {
  if (loading) {
    return <Loading text="Loading your favorites..." />;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <AiOutlineHeart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">No favorites yet</h3>
        <p className="text-gray-400 mb-8">
          Start adding movies to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          My Favorites <span className="text-gray-400">({favorites.length})</span>
        </h2>
      </div>
      <MovieGrid
        movies={favorites}
        onFavoriteToggle={onFavoriteToggle}
        isFavorite={(id: number) => favorites.some(f => f.id === id)}
      />
    </div>
  );
};
