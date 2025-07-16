/**
 * Custom Hook: useAdminDashboard
 * 
 * PURPOSE:
 * Central state management hook for the Blood Donation Admin Dashboard.
 * Manages all state, data, and business logic for the entire dashboard application.
 * 
 * FEATURES:
 * - Centralized state management for all modules
 * - Sample data management
 * - Filter and search functionality
 * - Modal state management
 * - User authentication and role management
 * - Loading states for async operations
 * 
 * REFACTORING NOTES:
 * - Extracted from monolithic component to promote reusability
 * - Follows React hooks patterns for state management
 * - Separates concerns between UI and business logic
 * - Enables easier testing and maintenance
 * 
 * TODO:
 * - Connect to real API endpoints
 * - Add error handling and retry logic
 * - Implement data persistence
 * - Add real-time updates via WebSocket
 */

import { useState } from 'react';
import { toast } from 'react-toastify';

export const useAdminDashboard = () => {
  // ===========================================
  // UI STATE MANAGEMENT
  // ===========================================
  
  // Module navigation state
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Modal visibility states
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showViewRoleModal, setShowViewRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddBloodModal, setShowAddBloodModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showSendNotificationModal, setShowSendNotificationModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showBloodRequestDetailsModal, setShowBloodRequestDetailsModal] = useState(false);
  const [showUpdateBloodModal, setShowUpdateBloodModal] = useState(false);
  const [showBloodHistoryModal, setShowBloodHistoryModal] = useState(false);
  const [showBloodRequestFilterModal, setShowBloodRequestFilterModal] = useState(false);
  const [showReportFilterModal, setShowReportFilterModal] = useState(false);
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationHistoryModal, setShowNotificationHistoryModal] = useState(false);
  
  // Loading states for async operations
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isSubmittingBlood, setIsSubmittingBlood] = useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [isUpdatingBlood, setIsUpdatingBlood] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  
  // Selected items for operations
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBloodRequest, setSelectedBloodRequest] = useState(null);
  const [selectedBloodUnit, setSelectedBloodUnit] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  
  // ===========================================
  // SEARCH AND FILTER STATES
  // ===========================================
  
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodRequestSearchTerm, setBloodRequestSearchTerm] = useState('');
  
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    bloodType: '',
    dateRange: {
      from: '',
      to: ''
    }
  });
  
  const [bloodRequestFilters, setBloodRequestFilters] = useState({
    hospital: '',
    bloodType: '',
    urgency: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // ===========================================
  // FORM DATA STATES
  // ===========================================
  
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Donor',
    bloodType: 'A+',
    address: '',
    dateOfBirth: '',
    gender: 'male',
    emergencyContact: '',
    medicalConditions: '',
    status: 'Active'
  });
  
  const [newBloodUnit, setNewBloodUnit] = useState({
    type: 'A+',
    units: '',
    expiryDate: '',
    donor: '',
    collectionDate: '',
    location: '',
    status: 'Good'
  });
  
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    target: '',
    description: '',
    organizer: '',
    contactInfo: '',
    status: 'Planning'
  });
  
  const [newNotification, setNewNotification] = useState({
    type: 'email',
    title: '',
    message: '',
    targetAudience: 'all',
    urgency: 'normal',
    scheduledDate: '',
    isScheduled: false
  });
  
  const [customReport, setCustomReport] = useState({
    type: 'Donation Analysis',
    fromDate: '',
    toDate: '',
    format: 'CSV',
    includeCharts: true,
    groupBy: 'date'
  });
  
  const [systemSettings, setSystemSettings] = useState({
    systemName: 'Blood Donation Management System',
    language: 'Vietnamese',
    timezone: 'Asia/Ho_Chi_Minh',
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    sessionTimeout: '30',
    maxLoginAttempts: '5'
  });
  
  const [updateBloodUnit, setUpdateBloodUnit] = useState({
    type: 'A+',
    units: '',
    expiryDate: '',
    donor: '',
    collectionDate: '',
    location: '',
    status: 'Good'
  });
  
  // ===========================================
  // USER AUTHENTICATION
  // ===========================================
  
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin Nguyễn Văn A',
    role: 'Super Admin',
    avatar: '/api/placeholder/40/40'
  });
  
  // Role-based access control
  const isSuperAdmin = currentUser.role === 'Super Admin';
  const isAdmin = currentUser.role === 'Admin' || isSuperAdmin;
  
  // ===========================================
  // SAMPLE DATA (TODO: Replace with API calls)
  // ===========================================
  
  const [dashboardStats, setDashboardStats] = useState({
    totalDonors: 1245,
    totalDonations: 3456,
    bloodUnits: 789,
    activeEvents: 12,
    lowStockTypes: ['A+', 'O-']
  });
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn B', email: 'b@email.com', role: 'Donor', status: 'Active', bloodType: 'A+', lastDonation: '2024-01-15' },
    { id: 2, name: 'Trần Thị C', email: 'c@email.com', role: 'Volunteer', status: 'Active', bloodType: 'O+', lastDonation: '2024-01-10' },
    { id: 3, name: 'Lê Văn D', email: 'd@email.com', role: 'Medical Staff', status: 'Pending', bloodType: 'B+', lastDonation: '2024-01-20' }
  ]);
  
  const [bloodInventory, setBloodInventory] = useState([
    { type: 'A+', units: 45, expiryDate: '2024-02-15', status: 'Good' },
    { type: 'A-', units: 23, expiryDate: '2024-02-20', status: 'Good' },
    { type: 'B+', units: 67, expiryDate: '2024-02-10', status: 'Good' },
    { type: 'B-', units: 12, expiryDate: '2024-02-25', status: 'Low' },
    { type: 'AB+', units: 34, expiryDate: '2024-02-18', status: 'Good' },
    { type: 'AB-', units: 8, expiryDate: '2024-02-12', status: 'Critical' },
    { type: 'O+', units: 89, expiryDate: '2024-02-22', status: 'Good' },
    { type: 'O-', units: 15, expiryDate: '2024-02-14', status: 'Low' }
  ]);
  
  const [events, setEvents] = useState([
    { id: 1, name: 'Hiến máu tại Đại học ABC', date: '2024-02-20', location: 'Hà Nội', registered: 150, target: 200, status: 'Active' },
    { id: 2, name: 'Chiến dịch hiến máu cộng đồng', date: '2024-02-25', location: 'TP.HCM', registered: 89, target: 150, status: 'Active' },
    { id: 3, name: 'Hiến máu tại công ty XYZ', date: '2024-03-01', location: 'Đà Nẵng', registered: 45, target: 100, status: 'Planning' }
  ]);
  
  const [bloodRequests, setBloodRequests] = useState([
    { id: 1, hospital: 'Bệnh viện Bạch Mai', bloodType: 'A+', units: 5, urgency: 'High', status: 'Processing', requestDate: '2024-01-25' },
    { id: 2, hospital: 'Bệnh viện Chợ Rẫy', bloodType: 'O-', units: 3, urgency: 'Critical', status: 'Approved', requestDate: '2024-01-24' },
    { id: 3, hospital: 'Bệnh viện Đà Nẵng', bloodType: 'B+', units: 8, urgency: 'Medium', status: 'Pending', requestDate: '2024-01-23' }
  ]);
  
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      name: 'Super Admin', 
      userCount: 2, 
      permissions: ['All'], 
      description: 'Full system access',
      users: [
        { id: 1, name: 'Admin Nguyễn Văn A', email: 'admin@system.com', status: 'Active' },
        { id: 2, name: 'Admin Trần Văn B', email: 'admin2@system.com', status: 'Active' }
      ]
    },
    { 
      id: 2, 
      name: 'Admin', 
      userCount: 5, 
      permissions: ['User Management', 'Blood Inventory', 'Reports'], 
      description: 'Administrative access',
      users: [
        { id: 3, name: 'Manager A', email: 'manager1@system.com', status: 'Active' },
        { id: 4, name: 'Manager B', email: 'manager2@system.com', status: 'Active' },
        { id: 5, name: 'Manager C', email: 'manager3@system.com', status: 'Inactive' },
        { id: 6, name: 'Manager D', email: 'manager4@system.com', status: 'Active' },
        { id: 7, name: 'Manager E', email: 'manager5@system.com', status: 'Pending' }
      ]
    },
    { 
      id: 3, 
      name: 'Medical Staff', 
      userCount: 15, 
      permissions: ['Blood Inventory', 'Blood Requests', 'Events'], 
      description: 'Medical operations access',
      users: Array.from({length: 15}, (_, i) => ({
        id: i + 8,
        name: `Doctor ${String.fromCharCode(65 + i)}`,
        email: `doctor${i+1}@hospital.com`,
        status: i % 3 === 0 ? 'Inactive' : 'Active'
      }))
    },
    { 
      id: 4, 
      name: 'Volunteer', 
      userCount: 45, 
      permissions: ['Events', 'Basic View'], 
      description: 'Limited volunteer access',
      users: Array.from({length: 45}, (_, i) => ({
        id: i + 23,
        name: `Volunteer ${i + 1}`,
        email: `volunteer${i+1}@volunteers.org`,
        status: i % 4 === 0 ? 'Pending' : 'Active'
      }))
    }
  ]);
  
  // Available permissions for role management
  const availablePermissions = [
    'User Management',
    'Blood Inventory', 
    'Blood Requests',
    'Event Management',
    'Reports',
    'System Settings',
    'Notifications',
    'Medical Records',
    'Basic View'
  ];
  
  // ===========================================
  // COMPUTED VALUES AND FILTER FUNCTIONS
  // ===========================================
  
  /**
   * Filter users based on search term and filters
   * @returns {Array} Filtered users array
   */
  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesStatus = !filters.status || user.status === filters.status;
      const matchesBloodType = !filters.bloodType || user.bloodType === filters.bloodType;
      
      return matchesSearch && matchesRole && matchesStatus && matchesBloodType;
    });
  };
  
  /**
   * Filter blood requests based on search term and filters
   * @returns {Array} Filtered blood requests array
   */
  const getFilteredBloodRequests = () => {
    return bloodRequests.filter(request => {
      const matchesSearch = request.hospital.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase()) ||
                           request.bloodType.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase());
      
      const matchesHospital = !bloodRequestFilters.hospital || 
                             request.hospital.toLowerCase().includes(bloodRequestFilters.hospital.toLowerCase());
      const matchesBloodType = !bloodRequestFilters.bloodType || request.bloodType === bloodRequestFilters.bloodType;
      const matchesUrgency = !bloodRequestFilters.urgency || request.urgency === bloodRequestFilters.urgency;
      const matchesStatus = !bloodRequestFilters.status || request.status === bloodRequestFilters.status;
      
      return matchesSearch && matchesHospital && matchesBloodType && matchesUrgency && matchesStatus;
    });
  };
  
  /**
   * Get active filter count for user filters
   * @returns {number} Number of active filters
   */
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.role) count++;
    if (filters.status) count++;
    if (filters.bloodType) count++;
    if (filters.dateRange.from) count++;
    if (filters.dateRange.to) count++;
    return count;
  };
  
  /**
   * Get active filter count for blood request filters
   * @returns {number} Number of active filters
   */
  const getActiveBloodRequestFilterCount = () => {
    let count = 0;
    if (bloodRequestFilters.hospital) count++;
    if (bloodRequestFilters.bloodType) count++;
    if (bloodRequestFilters.urgency) count++;
    if (bloodRequestFilters.status) count++;
    if (bloodRequestFilters.dateFrom) count++;
    if (bloodRequestFilters.dateTo) count++;
    return count;
  };
  
  /**
   * Clear all user filters and search
   */
  const clearFilters = () => {
    setFilters({
      role: '',
      status: '',
      bloodType: '',
      dateRange: { from: '', to: '' }
    });
    setSearchTerm('');
  };
  
  /**
   * Clear all blood request filters and search
   */
  const clearBloodRequestFilters = () => {
    setBloodRequestFilters({
      hospital: '',
      bloodType: '',
      urgency: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    setBloodRequestSearchTerm('');
  };
  
  // ===========================================
  // RETURN ALL STATE AND FUNCTIONS
  // ===========================================
  
  return {
    // UI State
    activeModule,
    setActiveModule,
    sidebarOpen,
    setSidebarOpen,
    
    // Modal States
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
    
    // Loading States
    isAddingUser,
    setIsAddingUser,
    isEditingUser,
    setIsEditingUser,
    isDeletingUser,
    setIsDeletingUser,
    isSubmittingBlood,
    setIsSubmittingBlood,
    isSubmittingEvent,
    setIsSubmittingEvent,
    isSendingNotification,
    setIsSendingNotification,
    isUpdatingBlood,
    setIsUpdatingBlood,
    isGeneratingReport,
    setIsGeneratingReport,
    isSavingSettings,
    setIsSavingSettings,
    
    // Selected Items
    selectedUser,
    setSelectedUser,
    selectedEvent,
    setSelectedEvent,
    selectedBloodRequest,
    setSelectedBloodRequest,
    selectedBloodUnit,
    setSelectedBloodUnit,
    selectedRole,
    setSelectedRole,
    
    // Search and Filters
    searchTerm,
    setSearchTerm,
    bloodRequestSearchTerm,
    setBloodRequestSearchTerm,
    filters,
    setFilters,
    bloodRequestFilters,
    setBloodRequestFilters,
    
    // Form Data
    newRole,
    setNewRole,
    newUser,
    setNewUser,
    newBloodUnit,
    setNewBloodUnit,
    newEvent,
    setNewEvent,
    newNotification,
    setNewNotification,
    customReport,
    setCustomReport,
    systemSettings,
    setSystemSettings,
    updateBloodUnit,
    setUpdateBloodUnit,
    
    // User Authentication
    currentUser,
    setCurrentUser,
    isSuperAdmin,
    isAdmin,
    
    // Data
    dashboardStats,
    setDashboardStats,
    users,
    setUsers,
    bloodInventory,
    setBloodInventory,
    events,
    setEvents,
    bloodRequests,
    setBloodRequests,
    roles,
    setRoles,
    availablePermissions,
    
    // Computed Functions
    getFilteredUsers,
    getFilteredBloodRequests,
    getActiveFilterCount,
    getActiveBloodRequestFilterCount,
    clearFilters,
    clearBloodRequestFilters
  };
};

export default useAdminDashboard;
