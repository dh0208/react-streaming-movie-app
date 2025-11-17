import type { Movie, MovieDetails, MovieResponse } from '../types';

const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Fallback to mock data if API key is not set
const USE_MOCK_DATA = API_KEY === 'YOUR_TMDB_API_KEY';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    release_date: '1994-09-23',
    vote_average: 8.7,
    vote_count: 25000,
    genre_ids: [18, 80],
    popularity: 100,
    original_language: 'en',
  },
  {
    id: 2,
    title: 'The Godfather',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    release_date: '1972-03-14',
    vote_average: 8.7,
    vote_count: 18000,
    genre_ids: [18, 80],
    popularity: 95,
    original_language: 'en',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    release_date: '2008-07-18',
    vote_average: 8.5,
    vote_count: 30000,
    genre_ids: [28, 80, 18],
    popularity: 120,
    original_language: 'en',
  },
];

class TMDBService {
  private async fetchFromAPI<T>(endpoint: string): Promise<T> {
    if (USE_MOCK_DATA) {
      // Return mock data for demonstration
      return this.getMockData(endpoint) as T;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.statusText}`);
    }

    return response.json();
  }

  private getMockData(endpoint: string): unknown {
    console.log("endpoint",endpoint)
    // Return mock data based on endpoint
    const mockResponse: MovieResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: mockMovies.length,
    };
    return mockResponse;
  }

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/popular?page=${page}`);
  }

  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/now_playing?page=${page}`);
  }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/upcoming?page=${page}`);
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/top_rated?page=${page}`);
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchFromAPI<MovieResponse>(`/search/movie?query=${encodedQuery}&page=${page}`);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromAPI<MovieDetails>(`/movie/${movieId}?append_to_response=credits,videos`);
  }

  async getMoviesByIds(ids: number[]): Promise<Movie[]> {
    if (USE_MOCK_DATA) {
      return mockMovies.filter(m => ids.includes(m.id));
    }

    const promises = ids.map(id => 
      this.fetchFromAPI<Movie>(`/movie/${id}`).catch(() => null)
    );
    const results = await Promise.all(promises);
    return results.filter((movie): movie is Movie => movie !== null);
  }
}

export const tmdbService = new TMDBService();

