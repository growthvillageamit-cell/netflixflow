import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Plus, Check, ThumbsUp, ThumbsDown, Share2, Download } from 'lucide-react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovies } from '../hooks/useMovies';
import { useAuth } from '../hooks/useAuth';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, categories, loading } = useMovies();
  const { isInMyList, addToMyList, removeFromMyList } = useAuth();
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!id) {
    return <div className="bg-black min-h-screen text-white">Movie not found</div>;
  }

  const movie = getMovieById(id);
  
  if (!movie) {
    return <div className="bg-black min-h-screen text-white">Movie not found</div>;
  }

  const inList = isInMyList(movie.id);
  const relatedMovies = categories[0]?.movies.filter(m => m.id !== movie.id).slice(0, 6) || [];

  const handleMyList = () => {
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${movie.backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        
        <div className="relative pt-24 px-6 h-full flex items-center">
          <div className="max-w-3xl space-y-6">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Browse
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-white/80">
              <span className="bg-gray-600 px-2 py-1 rounded text-sm">{movie.rating}</span>
              <span className="text-lg">{movie.year}</span>
              <span className="text-lg">{movie.duration}</span>
            </div>
            
            <p className="text-xl text-white/90 leading-relaxed">
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
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play</span>
              </button>
              
              <button
                onClick={handleMyList}
                className="flex items-center space-x-2 bg-gray-600/60 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600/80 transition-all duration-200"
              >
                {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{inList ? 'Remove from List' : 'Add to List'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 -mt-32 relative z-10">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About {movie.title}</h2>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-500">Director:</span> {movie.director}</p>
                <p><span className="text-gray-500">Cast:</span> {movie.cast.join(', ')}</p>
                <p><span className="text-gray-500">Genres:</span> {movie.genre.join(', ')}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">More like this</h3>
              <div className="flex items-center space-x-4 mb-4">
                <button className="p-3 border-2 border-gray-600 rounded-full hover:border-white transition-colors">
                  <ThumbsUp className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 border-2 border-gray-600 rounded-full hover:border-white transition-colors">
                  <ThumbsDown className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 border-2 border-gray-600 rounded-full hover:border-white transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 border-2 border-gray-600 rounded-full hover:border-white transition-colors">
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Content */}
        {relatedMovies.length > 0 && (
          <ContentRow title="More Like This" movies={relatedMovies} />
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 text-white/60" />
                <p className="text-xl">Trailer for {movie.title}</p>
                <p className="text-gray-400 mt-2">Video player would be integrated here</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;