import React from 'react';
import { Layout } from '../components/layout/Layout';
import { FavoritesList } from '../components/favorites/FavoritesList';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

export const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const { favorites, loading, toggleFavorite } = useFavorites(user?.id || null);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <FavoritesList
          favorites={favorites}
          loading={loading}
          onFavoriteToggle={toggleFavorite}
        />
      </div>
    </Layout>
  );
};

