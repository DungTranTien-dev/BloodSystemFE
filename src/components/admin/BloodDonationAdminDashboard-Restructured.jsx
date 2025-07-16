import React from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  Users, 
  Droplets, 
  FileText, 
  Calendar, 
  Bell, 
  BarChart3, 
  Settings,
  Shield
} from 'lucide-react';

// Import modules
import UserManagement from './modules/UserManagement';
import BloodInventory from './modules/BloodInventory';
import BloodRequestsManagement from './modules/BloodRequestsManagement';
import EventManagement from './modules/EventManagement';
import NotificationSystem from './modules/NotificationSystem';
import Reports from './modules/Reports';
import SystemSettings from './modules/SystemSettings';
import Authentication from './modules/Authentication';

// Import hooks
import { useAdminDashboard } from './hooks/useAdminDashboard';

const BloodDonationAdminDashboard = () => {
  const {
    // State
    activeSection,
    setActiveSection,
    currentUser,
    setCurrentUser,
    users,
    roles,
    bloodInventory,
    bloodRequests,
    events,
    notifications,
    
    // Selected items
    selectedUser,
    setSelectedUser,
    selectedRole,
    setSelectedRole,
    selectedBloodUnit,
    setSelectedBloodUnit,
    selectedBloodRequest,
    setSelectedBloodRequest,
    selectedEvent,
    setSelectedEvent,

    // Form state
    newUser,
    setNewUser,
    newRole,
    setNewRole,
    newBloodUnit,
    setNewBloodUnit,
    newEvent,
    setNewEvent,
    notification,
    setNotification,
    customReport,
    setCustomReport,
    systemSettings,
    setSystemSettings,
    lastBackupTime,
    systemLogs,

    // Filter state
    filters,
    setFilters,
    bloodRequestFilters,
    setBloodRequestFilters,
    searchTerm,
    setSearchTerm,
    bloodRequestSearchTerm,
    setBloodRequestSearchTerm,

    // Modal state
    showCreateRoleModal,
    setShowCreateRoleModal,
    showViewRoleModal,
    setShowViewRoleModal,
    showEditRoleModal,
    setShowEditRoleModal,
    showDeleteRoleModal,
    setShowDeleteRoleModal,
    showAddUserModal,
    setShowAddUserModal,
    showViewUserModal,
    setShowViewUserModal,
    showEditUserModal,
    setShowEditUserModal,
    showDeleteUserModal,
    setShowDeleteUserModal,
    showFilterModal,
    setShowFilterModal,
    showAddBloodModal,
    setShowAddBloodModal,
    showCreateEventModal,
    setShowCreateEventModal,
    showSendNotificationModal,
    setShowSendNotificationModal,
    showEventDetailsModal,
    setShowEventDetailsModal,
    showBloodRequestDetailsModal,
    setShowBloodRequestDetailsModal,
    showUpdateBloodModal,
    setShowUpdateBloodModal,
    showBloodHistoryModal,
    setShowBloodHistoryModal,
    showBloodRequestFilterModal,
    setShowBloodRequestFilterModal,
    showReportFilterModal,
    setShowReportFilterModal,
    showCustomReportModal,
    setShowCustomReportModal,
    showSettingsModal,
    setShowSettingsModal,
    showNotificationHistoryModal,
    setShowNotificationHistoryModal,

    // Filter functions
    getFilteredUsers,
    getFilteredBloodRequests,

    // Handler functions
    handleExportUsers,
    handleExportBloodRequests,
    handleExportAllReports,
    handleGenerateCustomReport,
    handleSaveSettings,
    handleBackupNow,
    handleRestoreBackup,
    handleViewSystemLogs
  } = useAdminDashboard();

  const menuItems = [
    { id: 'users', label: 'User Management', icon: Users, color: 'blue' },
    { id: 'blood', label: 'Blood Inventory', icon: Droplets, color: 'red' },
    { id: 'requests', label: 'Blood Requests', icon: FileText, color: 'green' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'purple' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'orange' },
    { id: 'reports', label: 'Reports', icon: BarChart3, color: 'indigo' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' },
    { id: 'auth', label: 'Authentication', icon: Shield, color: 'red' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <UserManagement
            users={users}
            filteredUsers={getFilteredUsers()}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentUser={currentUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setShowAddUserModal={setShowAddUserModal}
            setShowViewUserModal={setShowViewUserModal}
            setShowEditUserModal={setShowEditUserModal}
            setShowDeleteUserModal={setShowDeleteUserModal}
            setShowFilterModal={setShowFilterModal}
            handleExportUsers={handleExportUsers}
            getFilteredUsers={getFilteredUsers}
          />
        );
      
      case 'blood':
        return (
          <BloodInventory
            bloodInventory={bloodInventory}
            setShowAddBloodModal={setShowAddBloodModal}
            setShowUpdateBloodModal={setShowUpdateBloodModal}
            setShowBloodHistoryModal={setShowBloodHistoryModal}
            setSelectedBloodUnit={setSelectedBloodUnit}
            currentUser={currentUser}
          />
        );
      
      case 'requests':
        return (
          <BloodRequestsManagement
            bloodRequests={bloodRequests}
            filteredBloodRequests={getFilteredBloodRequests()}
            bloodRequestSearchTerm={bloodRequestSearchTerm}
            setBloodRequestSearchTerm={setBloodRequestSearchTerm}
            setShowBloodRequestFilterModal={setShowBloodRequestFilterModal}
            setShowBloodRequestDetailsModal={setShowBloodRequestDetailsModal}
            setSelectedBloodRequest={setSelectedBloodRequest}
            handleExportBloodRequests={handleExportBloodRequests}
            getFilteredBloodRequests={getFilteredBloodRequests}
          />
        );
      
      case 'events':
        return (
          <EventManagement
            events={events}
            setShowCreateEventModal={setShowCreateEventModal}
            setShowEventDetailsModal={setShowEventDetailsModal}
            setSelectedEvent={setSelectedEvent}
          />
        );
      
      case 'notifications':
        return (
          <NotificationSystem
            notifications={notifications}
            setShowSendNotificationModal={setShowSendNotificationModal}
            setShowNotificationHistoryModal={setShowNotificationHistoryModal}
          />
        );
      
      case 'reports':
        return (
          <Reports
            setShowCustomReportModal={setShowCustomReportModal}
            handleExportAllReports={handleExportAllReports}
            handleGenerateCustomReport={handleGenerateCustomReport}
          />
        );
      
      case 'settings':
        return (
          <SystemSettings
            setShowSettingsModal={setShowSettingsModal}
            handleBackupNow={handleBackupNow}
            handleRestoreBackup={handleRestoreBackup}
            handleViewSystemLogs={handleViewSystemLogs}
            lastBackupTime={lastBackupTime}
            systemLogs={systemLogs}
          />
        );
      
      case 'auth':
        return (
          <Authentication
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            roles={roles}
            setShowCreateRoleModal={setShowCreateRoleModal}
            setShowViewRoleModal={setShowViewRoleModal}
            setShowEditRoleModal={setShowEditRoleModal}
            setShowDeleteRoleModal={setShowDeleteRoleModal}
            setSelectedRole={setSelectedRole}
          />
        );
      
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                  <Droplets className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Blood Donation System</h1>
                  <p className="text-sm text-gray-600">Admin Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield size={16} />
                  <span>Welcome, {currentUser.name}</span>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Note: Modal components would be imported separately and rendered conditionally here */}
      {/* This is a simplified version - in a real implementation, you'd import and render all modals */}
    </div>
  );
};

export default BloodDonationAdminDashboard;
