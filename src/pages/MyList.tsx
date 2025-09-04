import React from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Bookmark } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';
import { useAuth } from '../hooks/useAuth';

const MyList: React.FC = () => {
  const { movies, loading } = useMovies();
  const { user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const myListMovies = movies.filter(movie => user?.myList.includes(movie.id));

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <div className="pt-24 px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My List</h1>
          <p className="text-gray-400">Movies and TV shows you've saved</p>
        </div>

        {myListMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {myListMovies.map((movie) => (
              <div key={movie.id} className="aspect-video">
                <MovieCard movie={movie} size="medium" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Bookmark className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h3 className="text-3xl font-semibold text-gray-400 mb-4">Your list is empty</h3>
            <p className="text-gray-500 text-lg mb-8">Save shows and movies to watch them later</p>
            <Link
              to="/"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              Browse Content
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;