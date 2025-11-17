import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';
import { tmdbService } from '../services/tmdb';
import type { Movie } from '../types';

interface UseFavoritesReturn {
  favorites: Movie[];
  loading: boolean;
  isFavorite: (movieId: number) => boolean;
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movieId: number) => void;
}

export const useFavorites = (userId: string | null): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorite IDs from storage
  useEffect(() => {
    if (userId) {
      const ids = StorageService.getFavorites(userId);
      setFavoriteIds(ids);
    }
  }, [userId]);

  // Load favorite movies details
  useEffect(() => {
    if (favoriteIds.length === 0) {
      setFavorites([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const movies = await tmdbService.getMoviesByIds(favoriteIds);
        setFavorites(movies);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [favoriteIds]);

  const isFavorite = useCallback((movieId: number): boolean => {
    return favoriteIds.includes(movieId);
  }, [favoriteIds]);

  const addFavorite = useCallback((movieId: number) => {
    if (!userId) return;
    
    StorageService.addFavorite(userId, movieId);
    setFavoriteIds(prev => [...prev, movieId]);
  }, [userId]);

  const removeFavorite = useCallback((movieId: number) => {
    if (!userId) return;
    
    StorageService.removeFavorite(userId, movieId);
    setFavoriteIds(prev => prev.filter(id => id !== movieId));
  }, [userId]);

  const toggleFavorite = useCallback((movieId: number) => {
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};

