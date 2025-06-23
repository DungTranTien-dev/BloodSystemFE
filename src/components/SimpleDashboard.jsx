import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleDashboard = () => {
  const navigate = useNavigate();
    return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {/* Header with Back Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Admin Dashboard (Simple Version)
            </h1>
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto justify-center"
            >
              ← Back to Admin Panel
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Total Donors</h3>
              <p className="text-3xl font-bold text-red-600">150</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Blood Units</h3>
              <p className="text-3xl font-bold text-blue-600">320</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Requests</h3>
              <p className="text-3xl font-bold text-green-600">45</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">Hospitals</h3>
              <p className="text-3xl font-bold text-purple-600">12</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/admin/add-donor')}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors w-full"
              >
                Add New Donor
              </button>              <button 
                onClick={() => navigate('/admin/donors')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full"
              >
                View Donor List
              </button>
              <button 
                onClick={() => navigate('/admin/blood-requests')}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors w-full"
              >
                Blood Requests
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors w-full">
                Process Requests
              </button>
            </div>
          </div>          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Navigation</h3>            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
              <a href="/admin" className="text-blue-600 hover:underline font-semibold block text-center p-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                Admin Panel
              </a>
              <a href="/admin/dashboard" className="text-blue-600 hover:underline block text-center p-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                Dashboard
              </a>
              <a href="/admin/donors" className="text-blue-600 hover:underline block text-center p-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                Donor List
              </a>
              <a href="/admin/blood-requests" className="text-purple-600 hover:underline block text-center p-2 bg-white rounded border hover:bg-purple-50 transition-colors">
                Blood Requests
              </a>
              <a href="/admin/add-donor" className="text-blue-600 hover:underline block text-center p-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                Add Donor
              </a>
              <a href="/" className="text-blue-600 hover:underline block text-center p-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;