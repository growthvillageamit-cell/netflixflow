import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovies } from '../hooks/useMovies';

const Home: React.FC = () => {
  const { categories, loading, getFeaturedMovie } = useMovies();

  if (loading) {
    return <LoadingSpinner />;
  }

  const featuredMovie = getFeaturedMovie();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      {featuredMovie && <Hero movie={featuredMovie} />}
      
      <div className="relative -mt-32 z-10 space-y-8">
        {categories.map((category) => (
          <ContentRow
            key={category.id}
            title={category.name}
            movies={category.movies}
          />
        ))}
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default Home;