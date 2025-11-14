import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface MovieRowProps {
  movies: Movie[];
  categoryTitle: string;
}

const MovieRow = ({ movies, categoryTitle }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      setTimeout(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  };

  return (
    <div className="space-y-4 relative group">
      <h2 className="text-2xl font-bold px-4 md:px-8">{categoryTitle}</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 rounded-none bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        {/* Movie Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard key={`${movie.id}-${movie.title || movie.name}`} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 rounded-none bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
