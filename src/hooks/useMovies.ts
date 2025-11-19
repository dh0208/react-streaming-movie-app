import { useState, useEffect, useCallback } from 'react';
import { getNowPlayingMovieList, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getMovieDetails, searchMovies } from '../services/tmdb';
import type { Movie, MovieDetails } from '../types';

export const useNowPlayingMovies = (
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
       const response = await getNowPlayingMovieList(page);
        console.log("response",response)
      
      setMovies(prev => page === 1 ? response?.data?.results : [...prev, ...response.data?.results]);
      setHasMore(page < response?.data?.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies,page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies();
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
        const response = await getMovieDetails(movieId);
        setMovie(response.data);
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

    const searchQuery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await searchMovies(query);
        setMovies(response.data?.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search movies');
      } finally {
        setLoading(false);
      }
    };

    searchQuery();
  }, [query]);

  return { movies, loading, error };
};


export const usePopularMovies= (
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPopularMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
       const response = await getPopularMovies(page);
      
      setMovies(prev => page === 1 ? response?.data?.results : [...prev, ...response.data?.results]);
      setHasMore(page < response?.data?.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies,page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPopularMovies();
    }
  }, [loading, hasMore, page, loadPopularMovies]);

  return { movies, loading, error, hasMore, loadMore };
};

export const useTopRatedMovies= (
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadTopRatedMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
       const response = await getTopRatedMovies(page);
      
      setMovies(prev => page === 1 ? response?.data?.results : [...prev, ...response.data?.results]);
      setHasMore(page < response?.data?.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadTopRatedMovies();
  }, [loadTopRatedMovies,page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadTopRatedMovies();
    }
  }, [loading, hasMore, page, loadTopRatedMovies]);

  return { movies, loading, error, hasMore, loadMore };
};

export const useUpcomingMovies= (
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadUpcomingMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
       const response = await getUpcomingMovies(page);
      
      setMovies(prev => page === 1 ? response?.data?.results : [...prev, ...response.data?.results]);
      setHasMore(page < response?.data?.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadUpcomingMovies();
  }, [loadUpcomingMovies,page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadUpcomingMovies();
    }
  }, [loading, hasMore, page, loadUpcomingMovies]);

  return { movies, loading, error, hasMore, loadMore };
};
