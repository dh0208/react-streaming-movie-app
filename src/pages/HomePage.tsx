import React from 'react';
import { Layout } from '../components/layout/Layout';
import { MovieSection } from '../components/movie/MovieSection';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites(user?.id || null);

  const popular = usePopularMovies();
  const nowPlaying = useNowPlayingMovies();
  const upcoming = useNowPlayingMovies();
  const topRated = useUpcomingMovies();

  const isLoading = popular.loading && nowPlaying.loading && upcoming.loading && topRated.loading;
  const hasError = popular.error || nowPlaying.error || upcoming.error || topRated.error;

  if (isLoading) {
    return (
      <Layout>
        <Loading text="Loading movies..." />
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <ErrorMessage
          message={hasError}
          onRetry={() => window.location.reload()}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to MovieStream
          </h1>
          <p className="text-xl text-gray-400">
            Discover millions of movies and TV shows
          </p>
        </div>

        {/* Movie Sections */}
        <MovieSection
          title="Popular Movies"
          movies={popular.movies.slice(0, 20)}
          onFavoriteToggle={toggleFavorite}
          isFavorite={isFavorite}
        />

        <MovieSection
          title="Now Playing"
          movies={nowPlaying.movies.slice(0, 20)}
          onFavoriteToggle={toggleFavorite}
          isFavorite={isFavorite}
        />

        <MovieSection
          title="Upcoming Movies"
          movies={upcoming.movies.slice(0, 20)}
          onFavoriteToggle={toggleFavorite}
          isFavorite={isFavorite}
        />

        <MovieSection
          title="Top Rated"
          movies={topRated.movies.slice(0, 20)}
          onFavoriteToggle={toggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
    </Layout>
  );
};

