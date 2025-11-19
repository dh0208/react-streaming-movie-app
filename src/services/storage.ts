import type { User } from '../types';

const STORAGE_KEYS = {
  USERS: 'movieapp_users',
  CURRENT_USER: 'movieapp_current_user',
  FAVORITES: 'movieapp_favorites',
} as const;

export const StorageService = {
  // User Management
  getUsers(): User[] {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  findUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  // Session Management
  setCurrentUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  clearCurrentUser(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Favorites Management
  getFavorites(userId: string): number[] {
    const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}`;
    const favorites = localStorage.getItem(favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite(userId: string, movieId: number): void {
    const favorites = this.getFavorites(userId);
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}`;
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
  },

  removeFavorite(userId: string, movieId: number): void {
    let favorites = this.getFavorites(userId);
    favorites = favorites.filter(id => id !== movieId);
    const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}`;
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  },

  isFavorite(userId: string, movieId: number): boolean {
    const favorites = this.getFavorites(userId);
    return favorites.includes(movieId);
  },
  // Favorites as full movie objects (stored per-user)
  getFavoriteMovies(userId: string) {
    const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}_objects`;
    const favorites = localStorage.getItem(favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavoriteMovie(userId: string, movie: any) {
    const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}_objects`;
    const favorites = this.getFavoriteMovies(userId);
    const exists = favorites.some((m: any) => m.id === movie.id);
    if (!exists) {
      favorites.push(movie);
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
    // keep ID list in sync for quick checks
    this.addFavorite(userId, movie.id);
  },

  updateFavoriteMovie(userId: string, movie: any) {
    const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}_objects`;
    const favorites = this.getFavoriteMovies(userId).map((m: any) => (m.id === movie.id ? movie : m));
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  },

  removeFavoriteMovie(userId: string, movieId: number) {
    const favoritesKey = `${STORAGE_KEYS.FAVORITES}_${userId}_objects`;
    let favorites = this.getFavoriteMovies(userId);
    favorites = favorites.filter((m: any) => m.id !== movieId);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    // keep ID list in sync
    this.removeFavorite(userId, movieId);
  },
};

