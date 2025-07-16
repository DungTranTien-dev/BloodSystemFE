/**
 * BLOOD INVENTORY MODULE - ENHANCED VERSION
 * 
 * PURPOSE:
 * Comprehensive blood inventory management system for tracking blood stock levels,
 * managing inventory alerts, and handling blood expiration dates.
 * 
 * FEATURES:
 * - Real-time inventory tracking by blood type
 * - Expiration date monitoring and alerts
 * - Low stock notifications
 * - Blood unit details and batch tracking
 * - Inventory import/export functionality
 * - Visual inventory dashboard with charts
 * 
 * REFACTORING BENEFITS:
 * - Modular component structure
 * - Reusable inventory utilities
 * - Consistent data formatting
 * - Efficient state management
 * - Performance-optimized rendering
 */

import React, { useState, useEffect, useMemo } from 'react';
import { StatusBadge, SearchInput, UserAvatar } from '../../shared';
import { 
  getBloodTypeIcon, 
  formatDate, 
  getInventoryStatus,
  filterInventoryData,
  exportToCSV,
  calculateDaysUntilExpiry,
  BLOOD_TYPES,
  INVENTORY_THRESHOLDS
} from '../../../utils/adminDashboardUtils';

const BloodInventoryEnhanced = () => {
  // State management for inventory data
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('bloodType');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample inventory data (replace with API call)
  useEffect(() => {
    const mockInventory = [
      {
        id: 1,
        bloodType: 'O+',
        units: 45,
        expiryDate: '2024-02-15',
        batchNumber: 'BT001',
        donatedDate: '2024-01-01',
        location: 'Storage A-1',
        donor: { name: 'Anonymous', id: 'D001' }
      },
      {
        id: 2,
        bloodType: 'A+',
        units: 23,
        expiryDate: '2024-02-20',
        batchNumber: 'BT002',
        donatedDate: '2024-01-05',
        location: 'Storage A-2',
        donor: { name: 'Anonymous', id: 'D002' }
      },
      {
        id: 3,
        bloodType: 'B-',
        units: 8,
        expiryDate: '2024-02-10',
        batchNumber: 'BT003',
        donatedDate: '2023-12-28',
        location: 'Storage B-1',
        donor: { name: 'Anonymous', id: 'D003' }
      },
      {
        id: 4,
        bloodType: 'AB+',
        units: 12,
        expiryDate: '2024-02-25',
        batchNumber: 'BT004',
        donatedDate: '2024-01-10',
        location: 'Storage B-2',
        donor: { name: 'Anonymous', id: 'D004' }
      },
      {
        id: 5,
        bloodType: 'O-',
        units: 5,
        expiryDate: '2024-02-08',
        batchNumber: 'BT005',
        donatedDate: '2023-12-25',
        location: 'Storage C-1',
        donor: { name: 'Anonymous', id: 'D005' }
      }
    ];

    // Simulate API loading delay
    setTimeout(() => {
      setInventory(mockInventory);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort inventory data
  useEffect(() => {
    let filtered = filterInventoryData(inventory, {
      searchTerm,
      bloodType: selectedBloodType,
      status: statusFilter
    });

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredInventory(filtered);
  }, [inventory, searchTerm, selectedBloodType, statusFilter, sortField, sortOrder]);

  // Calculate inventory statistics
  const inventoryStats = useMemo(() => {
    const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
    const lowStockItems = inventory.filter(item => 
      item.units <= INVENTORY_THRESHOLDS.LOW_STOCK
    ).length;
    const expiringItems = inventory.filter(item => 
      calculateDaysUntilExpiry(item.expiryDate) <= INVENTORY_THRESHOLDS.EXPIRY_WARNING
    ).length;
    const criticalItems = inventory.filter(item => 
      item.units <= INVENTORY_THRESHOLDS.CRITICAL || 
      calculateDaysUntilExpiry(item.expiryDate) <= INVENTORY_THRESHOLDS.EXPIRY_CRITICAL
    ).length;

    return {
      totalUnits,
      lowStockItems,
      expiringItems,
      criticalItems,
      totalBatches: inventory.length
    };
  }, [inventory]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Handle export
  const handleExport = () => {
    const exportData = filteredInventory.map(item => ({
      'Blood Type': item.bloodType,
      'Units': item.units,
      'Batch Number': item.batchNumber,
      'Expiry Date': formatDate(item.expiryDate),
      'Days Until Expiry': calculateDaysUntilExpiry(item.expiryDate),
      'Status': getInventoryStatus(item).status,
      'Location': item.location,
      'Donated Date': formatDate(item.donatedDate)
    }));

    exportToCSV(exportData, 'blood-inventory');
  };

  // Get status for inventory item
  const getItemStatus = (item) => {
    const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
    const { status, color, priority } = getInventoryStatus(item);
    
    return { status, color, priority, daysUntilExpiry };
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Blood Inventory Management
            </h1>
            <p className="text-gray-600">
              Monitor blood stock levels, track expiration dates, and manage inventory alerts
            </p>
          </div>
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                     flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalUnits}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Batches</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalBatches}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-900">{inventoryStats.lowStockItems}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-900">{inventoryStats.expiringItems}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Items</p>
                <p className="text-2xl font-bold text-red-900">{inventoryStats.criticalItems}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by batch number, location, or donor ID..."
              className="w-full"
            />
          </div>

          {/* Blood Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {BLOOD_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="normal">Normal</option>
              <option value="low">Low Stock</option>
              <option value="expiring">Expiring Soon</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('bloodType')}
                >
                  <div className="flex items-center gap-1">
                    Blood Type
                    {sortField === 'bloodType' && (
                      <svg className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                           fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('units')}
                >
                  <div className="flex items-center gap-1">
                    Units Available
                    {sortField === 'units' && (
                      <svg className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                           fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch Info
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('expiryDate')}
                >
                  <div className="flex items-center gap-1">
                    Expiry Date
                    {sortField === 'expiryDate' && (
                      <svg className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} 
                           fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const { status, color, daysUntilExpiry } = getItemStatus(item);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getBloodTypeIcon(item.bloodType).color}`}>
                            {item.bloodType}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {item.bloodType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {getBloodTypeIcon(item.bloodType).description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {item.units} units
                      </div>
                      <div className="text-sm text-gray-500">
                        Available
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        #{item.batchNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        Donated: {formatDate(item.donatedDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(item.expiryDate)}
                      </div>
                      <div className={`text-sm ${daysUntilExpiry <= 7 ? 'text-red-600' : daysUntilExpiry <= 14 ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {daysUntilExpiry} days left
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={status}
                        color={color}
                        size="sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 transition-colors">
                          Use
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors">
                          Dispose
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredInventory.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodInventoryEnhanced;
