import React from 'react';
import { Droplets, Plus, Package, TrendingUp, History, Edit } from 'lucide-react';

const BloodInventory = ({
  bloodInventory,
  setShowAddBloodModal,
  setShowUpdateBloodModal,
  setShowBloodHistoryModal,
  setSelectedBloodUnit,
  currentUser
}) => {
  const getTotalUnits = () => {
    return bloodInventory.reduce((total, item) => total + item.units, 0);
  };

  const getLowStockItems = () => {
    return bloodInventory.filter(item => item.units < 10);
  };

  const getExpiringItems = () => {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    return bloodInventory.filter(item => new Date(item.expiryDate) <= oneWeekFromNow);
  };

  const getStatusColor = (units, expiryDate) => {
    const expiry = new Date(expiryDate);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    
    if (expiry <= oneWeekFromNow) return 'bg-red-100 text-red-800';
    if (units < 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (units, expiryDate) => {
    const expiry = new Date(expiryDate);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    
    if (expiry <= oneWeekFromNow) return 'Expiring Soon';
    if (units < 10) return 'Low Stock';
    return 'Good Stock';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
            <Droplets className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Blood Inventory</h3>
            <p className="text-gray-600">Manage blood units and stock levels</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddBloodModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} />
          <span>Add Blood Unit</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Units</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalUnits()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blood Types</p>
              <p className="text-2xl font-bold text-gray-900">{bloodInventory.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Droplets className="text-red-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-red-600">{getLowStockItems().length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">{getExpiringItems().length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <History className="text-orange-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(getLowStockItems().length > 0 || getExpiringItems().length > 0) && (
        <div className="space-y-3">
          {getLowStockItems().length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="text-yellow-600 mr-2" size={16} />
                <span className="text-sm font-medium text-yellow-800">
                  Low Stock Alert: {getLowStockItems().length} blood type(s) running low
                </span>
              </div>
            </div>
          )}
          
          {getExpiringItems().length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <History className="text-red-600 mr-2" size={16} />
                <span className="text-sm font-medium text-red-800">
                  Expiry Alert: {getExpiringItems().length} blood unit(s) expiring within a week
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Blood Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bloodInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{item.bloodType}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.bloodType}</div>
                        <div className="text-sm text-gray-500">Blood Group</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.units}</div>
                    <div className="text-sm text-gray-500">units</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.units, item.expiryDate)}`}>
                      {getStatusText(item.units, item.expiryDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location || 'Main Storage'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBloodUnit(item);
                          setShowUpdateBloodModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Update Stock"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBloodUnit(item);
                          setShowBloodHistoryModal(true);
                        }}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="View History"
                      >
                        <History size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {bloodInventory.length === 0 && (
          <div className="text-center py-12">
            <Droplets className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blood inventory</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding blood units to the inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodInventory;
