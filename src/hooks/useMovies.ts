import { useState, useEffect, useCallback } from 'react';
import { tmdbService } from '../services/tmdb';
import type { Movie, MovieDetails, MovieResponse } from '../types';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const useMovies = (
  fetchFunction: (page: number) => Promise<MovieResponse>
): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction(pageNum);
      
      setMovies(prev => pageNum === 1 ? response.results : [...prev, ...response.results]);
      setHasMore(pageNum < response.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage);
    }
  }, [loading, hasMore, page, loadMovies]);

  return { movies, loading, error, hasMore, loadMore };
};

export const useMovieDetails = (movieId: number | null) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbService.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [movieId]);

  return { movie, loading, error };
};

export const useSearchMovies = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await tmdbService.searchMovies(query);
        setMovies(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search movies');
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  return { movies, loading, error };
};

