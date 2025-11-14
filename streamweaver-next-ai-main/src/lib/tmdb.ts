import { Movie, MovieDetails, TMDBResponse } from '@/types/movie';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'demo_key';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'original') => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const tmdbApi = {
  getTrending: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getTopRated: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getPopularTVShows: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );
    return response.json();
  },

  getTVDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );
    return response.json();
  },
};
