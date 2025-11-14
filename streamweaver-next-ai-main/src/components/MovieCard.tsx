import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const title = movie.title || movie.name;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative flex-shrink-0 w-48 transition-transform duration-300 hover:scale-110 hover:z-10"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted">
        <img
          src={imageError ? '/placeholder.svg' : posterUrl}
          alt={title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
