export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  runtime?: number;
  genres?: { id: number; name: string }[];
  production_companies?: { id: number; name: string; logo_path: string | null }[];
  tagline?: string;
  status?: string;
  budget?: number;
  revenue?: number;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
