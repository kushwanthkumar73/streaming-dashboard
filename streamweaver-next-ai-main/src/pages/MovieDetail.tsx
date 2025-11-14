import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbApi, getImageUrl } from '@/lib/tmdb';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => tmdbApi.getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 container mx-auto px-4">
          <Skeleton className="h-[70vh] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Movie not found</h1>
          <Link to="/">
            <Button className="mt-4">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const title = movie.title || movie.name;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
          <div className="flex gap-8 items-end">
            <img
              src={posterUrl}
              alt={title}
              className="hidden md:block w-64 rounded-lg shadow-2xl"
            />
            
            <div className="flex-1 space-y-4 pb-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              
              <h1 className="text-5xl md:text-7xl font-bold">{title}</h1>
              
              {movie.tagline && (
                <p className="text-xl text-muted-foreground italic">"{movie.tagline}"</p>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}</span>
                </span>
                <span className="text-muted-foreground">
                  {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}
                </span>
                {movie.runtime && (
                  <span className="text-muted-foreground">{movie.runtime} min</span>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Play className="w-5 h-5" fill="currentColor" />
                  Play
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Plus className="w-5 h-5" />
                  My List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-secondary rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">Status</h3>
              <p className="text-foreground">{movie.status}</p>
            </div>
            
            {movie.budget && movie.budget > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">Budget</h3>
                <p className="text-foreground">
                  ${movie.budget.toLocaleString()}
                </p>
              </div>
            )}
            
            {movie.revenue && movie.revenue > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">Revenue</h3>
                <p className="text-foreground">
                  ${movie.revenue.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
