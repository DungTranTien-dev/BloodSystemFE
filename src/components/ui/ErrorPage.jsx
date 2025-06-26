import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">
            {error?.status || '404'}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {error?.status === 404 ? 'Page Not Found' : 'Something went wrong'}
          </h2>
          <p className="text-gray-600 mb-8">
            {error?.statusText || error?.message || 'The page you are looking for does not exist.'}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Go Back Home
          </Link>
          
          <div>
            <button 
              onClick={() => window.history.back()} 
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
