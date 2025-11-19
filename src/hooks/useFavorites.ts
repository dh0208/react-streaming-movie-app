import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';
import type { Movie } from '../types';

interface UseFavoritesReturn {
  favorites: Movie[];
  loading: boolean;
  isFavorite: (movieId: number) => boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  updateFavorite?: (movie: Movie) => void;
}

export const useFavorites = (userId: string | null): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorite movies (full objects) from storage
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setFavoriteIds([]);
      return;
    }

    setLoading(true);
    try {
      const favs = StorageService.getFavoriteMovies(userId) as Movie[];
      setFavorites(favs);
      setFavoriteIds(favs.map((m: Movie) => m.id));
    } catch (err) {
      console.error('Failed to load favorite movies from storage', err);
      setFavorites([]);
      setFavoriteIds([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const isFavorite = useCallback((movieId: number): boolean => {
    return favoriteIds.includes(movieId);
  }, [favoriteIds]);

  const addFavorite = useCallback((movie: Movie) => {
    if (!userId) return;
    StorageService.addFavoriteMovie(userId, movie);
    setFavorites(prev => [...prev, movie]);
    setFavoriteIds(prev => [...prev, movie.id]);
  }, [userId]);

  const removeFavorite = useCallback((movieId: number) => {
    if (!userId) return;
    StorageService.removeFavoriteMovie(userId, movieId);
    setFavorites(prev => prev.filter(m => m.id !== movieId));
    setFavoriteIds(prev => prev.filter(id => id !== movieId));
  }, [userId]);

  const toggleFavorite = useCallback((movie: Movie) => {
    if (!userId) return;
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }, [userId, isFavorite, addFavorite, removeFavorite]);

  const updateFavorite = useCallback((movie: Movie) => {
    if (!userId) return;
    StorageService.updateFavoriteMovie(userId, movie);
    setFavorites(prev => prev.map(m => (m.id === movie.id ? movie : m)));
  }, [userId]);

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    updateFavorite,
  };
};

