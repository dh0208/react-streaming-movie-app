import axios from 'axios';
import type {   MovieResponse, PopularMovieListResponse, TopRatedMovieListResponse, MovieDetails } from '../types';


const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = ''


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
