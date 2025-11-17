import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { MovieGrid } from '../components/movie/MovieGrid';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useSearchMovies } from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites(user?.id || null);
  const { movies, loading, error } = useSearchMovies(query);

  if (!query) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">Search for movies</h3>
            <p className="text-gray-400">Use the search bar above to find your favorite movies</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Search Results
        </h1>
        <p className="text-gray-400 mb-8">
          Showing results for "{query}"
        </p>

        {loading && <Loading text="Searching..." />}
        
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {movies.length > 0 ? (
              <>
                <p className="text-gray-400 mb-6">{movies.length} movies found</p>
                <MovieGrid
                  movies={movies}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={isFavorite}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-400">No movies found for "{query}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

