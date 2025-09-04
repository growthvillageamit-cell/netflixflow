import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check, ThumbsUp } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../hooks/useAuth';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, size = 'medium' }) => {
  const { isInMyList, addToMyList, removeFromMyList } = useAuth();
  const inList = isInMyList(movie.id);

  const sizeClasses = {
    small: 'w-40 h-24',
    medium: 'w-64 h-36',
    large: 'w-80 h-45',
  };

  const handleMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <Link to={`/watch/${movie.id}`}>
      <div className={`${sizeClasses[size]} flex-shrink-0 group relative cursor-pointer`}>
        <div className="relative h-full rounded-lg overflow-hidden bg-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:z-10">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                {movie.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-white/80 mb-2">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.rating}</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              </button>
              
              <button
                onClick={handleMyList}
                className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors"
                title={inList ? 'Remove from My List' : 'Add to My List'}
              >
                {inList ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Plus className="w-4 h-4 text-white" />
                )}
              </button>
              
              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <ThumbsUp className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;