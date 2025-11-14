import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  const title = movie.title || movie.name;
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}
            </span>
          </div>

          <p className="text-lg text-foreground/90 line-clamp-3 max-w-xl">
            {movie.overview}
          </p>

          <div className="flex gap-4 pt-4">
            <Link to={`/movie/${movie.id}`}>
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Play className="w-5 h-5" fill="currentColor" />
                Play
              </Button>
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <Button size="lg" variant="secondary" className="gap-2">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
