import axios from 'axios';
import type {   MovieResponse, PopularMovieListResponse, TopRatedMovieListResponse, MovieDetails } from '../types';


const BASE_URL = 'https://api.themoviedb.org/3';
// Currently for demo purposes only. In a real application, store this securely.
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWU1NzczMzk3YzI3MzkxNWZkYTA2ZWZkMTVlZDY3YyIsIm5iZiI6MTc2MzQwNjI0Ni4wMiwic3ViIjoiNjkxYjcxYTY5NDg3OTg5ZmY0NjA5YTg2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oq3XcVMHj6UlxKr-FUBUXckgxoy5I_ZowX-7iXvTKPk'


const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});


export const getNowPlayingMovieList  = async (pageNum : number) => {
  return apiClient.get<MovieResponse>('/movie/now_playing', {
    params: {
      include_adult: false,
        include_video: false,
        language: 'en-US',
        page: pageNum,
        sort_by: 'popularity.desc',
    }
  });
}

export const getPopularMovies  = async (pageNum : number) => {
  return apiClient.get<PopularMovieListResponse>('/movie/popular', {
    params: {
      include_adult: false,
        include_video: false,
        language: 'en-US',
        page: pageNum,
        sort_by: 'popularity.desc',
    }
  });
}

export const getTopRatedMovies  = async (pageNum : number) => {
  return apiClient.get<TopRatedMovieListResponse>('/movie/top_rated', {
    params: {
      include_adult: false,
        include_video: false,
        language: 'en-US',
        page: pageNum,
        sort_by: 'popularity.desc',
    }
  });
}


export const getUpcomingMovies  = async (pageNum : number) => {
  return apiClient.get<MovieResponse>('/movie/upcoming', {
    params: {
      include_adult: false,
        include_video: false,
        language: 'en-US',
        page: pageNum,
        sort_by: 'popularity.desc',
    }
  });
}

export const getMovieDetails = async (movieId: number) => {
  return apiClient.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos',
      language: 'en-US',
    }
  });
}

export const searchMovies = async (query: string, pageNum: number = 1) => {
  return apiClient.get<MovieResponse>('/search/movie', {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: pageNum,
    }
  });
}
