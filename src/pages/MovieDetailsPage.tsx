import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { MovieDetails } from '../components/movie/MovieDetails';
import { TrailerPlayer } from '../components/movie/TrailerPlayer';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useMovieDetails } from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const movieId = id ? parseInt(id, 10) : null;
  
  const { movie, loading, error } = useMovieDetails(movieId);
  const { isFavorite, toggleFavorite } = useFavorites(user?.id || null);
  const [showTrailer, setShowTrailer] = useState(false);

  if (!movieId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <Layout>
        <Loading text="Loading movie details..." />
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <ErrorMessage
          message={error || 'Movie not found'}
          onRetry={() => window.location.reload()}
        />
      </Layout>
    );
  }

  const trailer = movie.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <Layout>
      <MovieDetails
        movie={movie}
        onFavoriteToggle={toggleFavorite}
        isFavorite={isFavorite(movie.id)}
        onPlayTrailer={trailer ? () => setShowTrailer(true) : undefined}
      />

      {trailer && (
        <TrailerPlayer
          videoKey={trailer.key}
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
          title={`${movie.title} - Trailer`}
        />
      )}
    </Layout>
  );
};

