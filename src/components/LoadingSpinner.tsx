
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div 
      role="status"
      aria-label="Loading news articles"
      className="flex flex-col items-center justify-center"
      data-testid="spinner"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
      <span className="text-gray-600">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;