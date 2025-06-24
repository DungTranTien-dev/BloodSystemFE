import React from 'react';

// Simple functional fallback component since ErrorBoundary must be a class
const SimpleErrorFallback = ({ error, resetError }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please refresh the page or try again later.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Refresh Page
        </button>
        
        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-gray-700 font-medium">
              Error Details (Development Only)
            </summary>
            <div className="mt-2 p-4 bg-gray-100 rounded text-sm">
              <p className="font-bold text-red-600">Error:</p>
              <pre className="whitespace-pre-wrap">{error.toString()}</pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

// For compatibility, export both
export default SimpleErrorFallback;
export { SimpleErrorFallback };
