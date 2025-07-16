import React from 'react';
import { Shield, Users, UserCheck, UserX, Eye, Edit, Trash2 } from 'lucide-react';

const Authentication = ({
  currentUser,
  setCurrentUser,
  roles,
  setShowCreateRoleModal,
  setShowViewRoleModal,
  setShowEditRoleModal,
  setShowDeleteRoleModal,
  setSelectedRole
}) => {
  const getRoleStats = () => {
    return roles.map(role => ({
      ...role,
      userCount: role.users?.length || 0
    }));
  };

  const getTotalUsers = () => {
    return roles.reduce((total, role) => total + (role.users?.length || 0), 0);
  };

  const canManageRole = (role) => {
    if (currentUser.role === 'Super Admin') return true;
    if (currentUser.role === 'Admin' && role.name !== 'Super Admin') return true;
    return false;
  };

  const getRoleColor = (roleName) => {
    const colors = {
      'Super Admin': 'bg-red-100 text-red-800',
      'Admin': 'bg-purple-100 text-purple-800',
      'Medical Staff': 'bg-blue-100 text-blue-800',
      'Volunteer': 'bg-green-100 text-green-800'
    };
    return colors[roleName] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Authentication & Authorization</h3>
            <p className="text-gray-600">Manage user roles and permissions</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            <Shield size={16} />
            <span>Current Role: {currentUser.role}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Test Role:</label>
            <select
              value={currentUser.role}
              onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
              className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Medical Staff">Medical Staff</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Permission Status */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Current Permissions</h4>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(currentUser.role)}`}>
            {currentUser.role}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${currentUser.role === 'Super Admin' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-700">Create/Edit/Delete Roles</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${['Super Admin', 'Admin'].includes(currentUser.role) ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-700">Manage Users</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${['Super Admin', 'Admin', 'Medical Staff'].includes(currentUser.role) ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-700">Access Blood Inventory</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${['Super Admin', 'Admin'].includes(currentUser.role) ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-700">Generate Reports</span>
          </div>
        </div>
      </div>

      {/* Role Management */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">Role Management</h4>
        {currentUser.role === 'Super Admin' && (
          <button
            onClick={() => setShowCreateRoleModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Shield size={16} />
            <span>Create Role</span>
          </button>
        )}
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalUsers()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.filter(r => r.status === 'Active').length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserCheck className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.filter(r => r.status === 'Inactive').length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <UserX className="text-red-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getRoleStats().map((role) => (
                <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                          <Shield className="text-white" size={16} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                        <div className="text-sm text-gray-500">Role</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{role.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{role.userCount}</div>
                    <div className="text-sm text-gray-500">users</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      role.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRole(role);
                          setShowViewRoleModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {canManageRole(role) && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedRole(role);
                              setShowEditRoleModal(true);
                            }}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Edit Role"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRole(role);
                              setShowDeleteRoleModal(true);
                            }}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete Role"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {roles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first role.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
