import { useState, useEffect } from 'react';
import { Movie, Category } from '../types';
import { movies, categories } from '../data/movies';

export const useMovies = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllMovies(movies);
      setAllCategories(categories);
      setLoading(false);
    }, 1000);
  }, []);

  const getFeaturedMovie = () => {
    return allMovies.find(movie => movie.featured) || allMovies[0];
  };

  const getMovieById = (id: string) => {
    return allMovies.find(movie => movie.id === id);
  };

  const searchMovies = (query: string) => {
    if (!query.trim()) return allMovies;
    
    return allMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      movie.cast.some(c => c.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return {
    movies: allMovies,
    categories: allCategories,
    loading,
    getFeaturedMovie,
    getMovieById,
    searchMovies,
  };
};