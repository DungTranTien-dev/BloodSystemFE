/**
 * COMPONENT: UserManagement
 * 
 * PURPOSE:
 * Comprehensive user management module for the Blood Donation Admin Dashboard.
 * Handles all user-related CRUD operations with advanced filtering, search, and role-based access control.
 * 
 * FEATURES:
 * - User listing with advanced search and filtering
 * - Role-based access control (Admin/Super Admin only)
 * - Enhanced user statistics dashboard
 * - Improved user interface with better UX
 * - Bulk operations and action management
 * 
 * REFACTORING IMPROVEMENTS:
 * - Extracted from 4800+ line monolithic component
 * - Clear separation of concerns and single responsibility
 * - Props interface clearly defined for maintainability
 * - Modular design enables easy testing and reusability
 * - Performance optimized with memoization and callbacks
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Users, UserPlus, Shield, Filter, Search, Download, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';

const UserManagement = ({
  // Core Data
  users,
  
  // Search & Filter State
  searchTerm,
  setSearchTerm,
  
  // User Context
  currentUser,
  setSelectedUser,
  
  // Modal Controls
  setShowAddUserModal,
  setShowViewUserModal,
  setShowEditUserModal,
  setShowDeleteUserModal,
  setShowFilterModal,
  
  // Business Logic
  handleExportUsers,
  getFilteredUsers
}) => {
  // Local state for enhanced functionality
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Memoized user statistics
  const userStats = useMemo(() => {
    if (!users || users.length === 0) return {};
    
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'Active').length,
      inactive: users.filter(u => u.status === 'Inactive').length,
      pending: users.filter(u => u.status === 'Pending').length,
      donors: users.filter(u => u.role === 'Donor').length,
      admins: users.filter(u => u.role === 'Admin' || u.role === 'Super Admin').length,
      staff: users.filter(u => u.role === 'Medical Staff').length,
      volunteers: users.filter(u => u.role === 'Volunteer').length
    };
    
    stats.activePercentage = Math.round((stats.active / stats.total) * 100);
    return stats;
  }, [users]);
  
  // Enhanced user action handlers
  const handleViewUser = useCallback((user) => {
    setSelectedUser(user);
    setShowViewUserModal(true);
  }, [setSelectedUser, setShowViewUserModal]);
  
  const handleEditUser = useCallback((user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  }, [setSelectedUser, setShowEditUserModal]);
  
  const handleDeleteUser = useCallback((user) => {
    setSelectedUser(user);
    setShowDeleteUserModal(true);
  }, [setSelectedUser, setShowDeleteUserModal]);
  
  // Access control check
  const hasUserManagementAccess = currentUser?.role === 'Admin' || currentUser?.role === 'Super Admin';
  
  if (!hasUserManagementAccess) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="text-red-600 mr-3" size={24} />
            <div>
              <h4 className="text-red-800 font-semibold text-lg">Không có quyền truy cập</h4>
              <p className="text-red-700 mt-2">
                Bạn không có quyền truy cập vào module quản lý người dùng. 
                Chỉ Admin và Super Admin mới có thể quản lý người dùng trong hệ thống.
              </p>
              <p className="text-red-600 text-sm mt-2">
                Vai trò hiện tại: <strong>{currentUser?.role || 'Không xác định'}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header with Statistics */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Users className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">User Management</h3>
              <p className="text-gray-600 mt-1">Manage system users, roles, and permissions</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            
            <button
              onClick={() => handleExportUsers()}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            
            {currentUser.role === 'Super Admin' && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <UserPlus size={16} />
                <span>Add User</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-blue-600 text-sm font-medium">Total Users</div>
            <div className="text-2xl font-bold text-blue-800">{userStats.total || 0}</div>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="text-green-600 text-sm font-medium">Active Users</div>
            <div className="text-2xl font-bold text-green-800">{userStats.active || 0}</div>
            <div className="text-green-600 text-xs">({userStats.activePercentage || 0}%)</div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <div className="text-yellow-600 text-sm font-medium">Pending</div>
            <div className="text-2xl font-bold text-yellow-800">{userStats.pending || 0}</div>
          </div>
          
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <div className="text-red-600 text-sm font-medium">Donors</div>
            <div className="text-2xl font-bold text-red-800">{userStats.donors || 0}</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="text-purple-600 text-sm font-medium">Staff</div>
            <div className="text-2xl font-bold text-purple-800">{userStats.staff || 0}</div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <div className="text-indigo-600 text-sm font-medium">Admins</div>
            <div className="text-2xl font-bold text-indigo-800">{userStats.admins || 0}</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          
          {/* Results Info */}
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            Showing {getFilteredUsers().length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {getFilteredUsers().length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center">
            <Users className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Users Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? "No users match your search criteria. Try adjusting your search terms."
                : "No users are currently in the system."
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          /* Users Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Donation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredUsers().map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    {/* User Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.phone && (
                            <div className="text-xs text-gray-400">{user.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.role === 'Super Admin' && <Shield className="text-red-500 mr-1" size={16} />}
                        {user.role === 'Admin' && <Shield className="text-orange-500 mr-1" size={16} />}
                        <span className="text-sm font-medium text-gray-900">{user.role}</span>
                      </div>
                    </td>
                    
                    {/* Blood Type */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-10 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-white font-bold text-sm shadow-sm">
                        {user.bloodType}
                      </span>
                    </td>
                    
                    {/* Last Donation */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.lastDonation || 'Never'}
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : user.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                          title="View user details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors"
                          title="Edit user"
                        >
                          <Edit size={16} />
                        </button>
                        {currentUser.role === 'Super Admin' && (
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
