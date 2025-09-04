import React from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../hooks/useAuth';

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const { isInMyList, addToMyList, removeFromMyList } = useAuth();
  const inList = isInMyList(movie.id);

  const handleMyList = () => {
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${movie.backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      
      <div className="relative pt-32 pb-16 px-6 max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-white/80">
            <span className="bg-gray-600 px-2 py-1 rounded text-sm">{movie.rating}</span>
            <span className="text-lg">{movie.year}</span>
            <span className="text-lg">{movie.duration}</span>
          </div>
          
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((g) => (
              <span key={g} className="bg-red-600/20 text-white px-3 py-1 rounded-full text-sm">
                {g}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-600/60 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600/80 transition-all duration-200 transform hover:scale-105">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
            
            <button
              onClick={handleMyList}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
              title={inList ? 'Remove from My List' : 'Add to My List'}
            >
              {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;