import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-center text-lg">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;