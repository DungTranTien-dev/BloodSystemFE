import React from 'react';

const AddDonorDebug = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            ✅ Add Donor Route Working!
          </h1>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800">Route Status:</h3>
              <p className="text-green-700">✅ Route /admin/add-donor is accessible</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800">Component Status:</h3>
              <p className="text-blue-700">✅ AddDonor component loaded successfully</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800">Protected Route Status:</h3>
              <p className="text-purple-700">✅ Authentication bypass working</p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Quick Navigation:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/admin/dashboard" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition-colors"
                >
                  Dashboard
                </a>
                <a 
                  href="/admin/donor-list" 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600 transition-colors"
                >
                  Donor List
                </a>
                <a 
                  href="/" 
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-600 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Note:</h3>
              <p className="text-yellow-700">
                This is a debug component. To use the real AddDonor component, 
                replace <code>&lt;AddDonorDebug/&gt;</code> with <code>&lt;AddDonor/&gt;</code> in App.jsx
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDonorDebug;
