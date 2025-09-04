import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovies } from '../hooks/useMovies';

const Browse: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { movies, loading } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState('all');

  if (loading) {
    return <LoadingSpinner />;
  }

  const getPageTitle = () => {
    switch (type) {
      case 'tv': return 'TV Shows';
      case 'movies': return 'Movies';
      case 'new': return 'New & Popular';
      default: return 'Browse';
    }
  };

  const genres = ['all', ...Array.from(new Set(movies.flatMap(movie => movie.genre)))];

  const filteredMovies = movies.filter(movie => {
    if (selectedGenre !== 'all') {
      return movie.genre.includes(selectedGenre);
    }
    return true;
  });

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <div className="pt-24 px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">{getPageTitle()}</h1>
          
          {/* Genre Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre === 'all' ? 'All Genres' : genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="aspect-video">
              <MovieCard movie={movie} size="medium" />
            </div>
          ))}
        </div>
        
        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No content found for this genre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;