import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
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
            <AiOutlineSearch className="mx-auto h-24 w-24 text-gray-400 mb-4" />
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
