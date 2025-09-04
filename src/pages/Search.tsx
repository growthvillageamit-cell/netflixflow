import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search as SearchIcon } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { searchMovies, loading } = useMovies();
  const [searchResults, setSearchResults] = useState(searchMovies(''));

  useEffect(() => {
    const results = searchMovies(query);
    setSearchResults(results);
    
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, searchMovies, setSearchParams]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <div className="pt-24 px-6">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies and TV shows..."
              className="w-full bg-gray-900 text-white pl-14 pr-6 py-4 rounded-lg text-xl border-2 border-gray-700 focus:border-red-600 focus:outline-none transition-colors"
              autoFocus
            />
          </div>
        </div>

        {query && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Search results for "{query}" ({searchResults.length} results)
            </h2>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {searchResults.map((movie) => (
              <div key={movie.id} className="aspect-video">
                <MovieCard movie={movie} size="medium" />
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching for something else</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h3 className="text-3xl font-semibold text-gray-400 mb-4">Search Netflix</h3>
            <p className="text-gray-500 text-lg">Find your next favorite show or movie</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;