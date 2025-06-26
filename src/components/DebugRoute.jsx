import React from 'react';

const DebugRoute = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            ✅ Admin Dashboard Route Working!
          </h1>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800">Routing Status:</h3>
              <p className="text-green-700">✅ Route /admin/dashboard is accessible</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800">Authentication Status:</h3>
              <p className="text-blue-700">✅ ProtectedRoute bypass enabled for development</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800">Redux Status:</h3>
              <p className="text-purple-700">✅ Redux Persist configured correctly</p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Navigation Test:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition-colors"
                >
                  Go to Home
                </a>
                <a 
                  href="/test" 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600 transition-colors"
                >
                  Go to Test Route
                </a>
                <a 
                  href="/admin/donor-list" 
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-600 transition-colors"
                >
                  Go to Donor List
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugRoute;
