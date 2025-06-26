import React from 'react';

const TestRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Test Route Working!
        </h1>
        <p className="text-gray-600 mb-8">
          This confirms that the routing system is functioning properly.
        </p>
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </a>
          <div>
            <a 
              href="/admin/dashboard" 
              className="text-blue-600 hover:underline mr-4"
            >
              Admin Dashboard
            </a>
            <a 
              href="/admin/donor-list" 
              className="text-blue-600 hover:underline"
            >
              Donor List
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRoute;
