import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface ContentRowProps {
  title: string;
  movies: Movie[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;
      
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8 group">
      <h2 className="text-2xl font-bold text-white mb-4 px-6">{title}</h2>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-20 bg-black/50 hover:bg-black/80 text-white rounded-r-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-20 bg-black/50 hover:bg-black/80 text-white rounded-l-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ContentRow;