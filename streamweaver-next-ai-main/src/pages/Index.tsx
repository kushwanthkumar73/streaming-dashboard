import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '@/lib/tmdb';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { data: trending, isLoading: trendingLoading } = useQuery({
    queryKey: ['trending'],
    queryFn: tmdbApi.getTrending,
  });

  const { data: popularMovies, isLoading: popularMoviesLoading } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: tmdbApi.getPopularMovies,
  });

  const { data: topRated, isLoading: topRatedLoading } = useQuery({
    queryKey: ['topRated'],
    queryFn: tmdbApi.getTopRated,
  });

  const { data: tvShows, isLoading: tvShowsLoading } = useQuery({
    queryKey: ['tvShows'],
    queryFn: tmdbApi.getPopularTVShows,
  });

  const isLoading = trendingLoading || popularMoviesLoading || topRatedLoading || tvShowsLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {isLoading ? (
        <div className="pt-16">
          <Skeleton className="h-[80vh] w-full" />
        </div>
      ) : (
        <>
          {trending && trending.length > 0 && (
            <HeroBanner movie={trending[0]} />
          )}

          <div className="relative -mt-32 space-y-12 pb-12">
            {trending && trending.length > 0 && (
              <MovieRow movies={trending} categoryTitle="Trending Now" />
            )}
            
            {popularMovies && popularMovies.length > 0 && (
              <MovieRow movies={popularMovies} categoryTitle="Popular Movies" />
            )}
            
            {topRated && topRated.length > 0 && (
              <MovieRow movies={topRated} categoryTitle="Top Rated" />
            )}
            
            {tvShows && tvShows.length > 0 && (
              <MovieRow movies={tvShows} categoryTitle="Popular TV Shows" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
