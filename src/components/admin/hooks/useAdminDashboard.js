import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const useAdminDashboard = () => {
  // Modal state
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

  // Main state
  const [activeSection, setActiveSection] = useState('users');
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin User',
    role: 'Super Admin',
    email: 'admin@bloodsystem.com'
  });

  // Data state
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [bloodInventory, setBloodInventory] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Selected items
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedBloodUnit, setSelectedBloodUnit] = useState(null);
  const [selectedBloodRequest, setSelectedBloodRequest] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    department: '',
    status: 'Active'
  });

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [],
    status: 'Active'
  });

  const [newBloodUnit, setNewBloodUnit] = useState({
    bloodType: '',
    units: '',
    expiryDate: '',
    location: ''
  });

  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: ''
  });

  const [notification, setNotification] = useState({
    type: 'email',
    recipients: 'all',
    title: '',
    message: ''
  });

  const [customReport, setCustomReport] = useState({
    type: '',
    startDate: '',
    endDate: '',
    format: 'csv'
  });

  const [systemSettings, setSystemSettings] = useState({
    systemName: 'Blood Donation System',
    adminEmail: 'admin@bloodsystem.com',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    autoBackup: 'daily'
  });

  // Backup and logs state
  const [lastBackupTime, setLastBackupTime] = useState(null);
  const [systemLogs, setSystemLogs] = useState([
    {
      id: 1,
      type: 'User login',
      user: 'admin@system.com',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      details: 'Admin user logged in successfully'
    },
    {
      id: 2,
      type: 'Blood unit added',
      user: 'staff@system.com',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      details: 'Added 5 units of A+ blood type'
    }
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    status: '',
    registrationDate: ''
  });

  const [bloodRequestFilters, setBloodRequestFilters] = useState({
    status: '',
    bloodType: '',
    priority: '',
    hospital: '',
    dateRange: { start: '', end: '' }
  });

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodRequestSearchTerm, setBloodRequestSearchTerm] = useState('');

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Load sample data
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        phone: '+1234567890',
        department: 'IT',
        status: 'Active',
        lastLogin: '2025-01-15T10:30:00Z',
        registrationDate: '2024-01-15T00:00:00Z'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Medical Staff',
        phone: '+1234567891',
        department: 'Medical',
        status: 'Active',
        lastLogin: '2025-01-14T15:45:00Z',
        registrationDate: '2024-02-20T00:00:00Z'
      }
    ]);

    setRoles([
      {
        id: 1,
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        permissions: ['all'],
        status: 'Active',
        users: []
      },
      {
        id: 2,
        name: 'Admin',
        description: 'Administrative access with limited permissions',
        permissions: ['user_management', 'blood_inventory', 'reports'],
        status: 'Active',
        users: []
      },
      {
        id: 3,
        name: 'Medical Staff',
        description: 'Medical staff with blood inventory access',
        permissions: ['blood_inventory', 'blood_requests'],
        status: 'Active',
        users: []
      },
      {
        id: 4,
        name: 'Volunteer',
        description: 'Volunteer with basic access',
        permissions: ['events'],
        status: 'Active',
        users: []
      }
    ]);

    setBloodInventory([
      {
        id: 1,
        bloodType: 'A+',
        units: 25,
        expiryDate: '2025-02-15',
        location: 'Main Storage',
        lastUpdated: '2025-01-15T10:30:00Z'
      },
      {
        id: 2,
        bloodType: 'O-',
        units: 8,
        expiryDate: '2025-01-25',
        location: 'Emergency Storage',
        lastUpdated: '2025-01-14T15:45:00Z'
      }
    ]);

    setBloodRequests([
      {
        id: 1,
        patientName: 'Alice Johnson',
        bloodType: 'A+',
        unitsRequested: 3,
        hospital: 'City General Hospital',
        priority: 'High',
        status: 'Pending',
        requestDate: '2025-01-15T09:00:00Z'
      },
      {
        id: 2,
        patientName: 'Bob Wilson',
        bloodType: 'O-',
        unitsRequested: 2,
        hospital: 'Memorial Hospital',
        priority: 'Normal',
        status: 'Approved',
        requestDate: '2025-01-14T14:30:00Z'
      }
    ]);

    setEvents([
      {
        id: 1,
        name: 'Community Blood Drive',
        date: '2025-02-01',
        time: '9:00 AM - 5:00 PM',
        location: 'Community Center',
        description: 'Annual community blood donation event',
        capacity: 100,
        attendees: 65
      }
    ]);

    setNotifications([
      {
        id: 1,
        type: 'email',
        title: 'Blood Shortage Alert',
        message: 'Critical shortage of O- blood type',
        recipients: 150,
        status: 'Sent',
        sentAt: '2025-01-15T10:00:00Z'
      }
    ]);
  };

  // Filter functions
  const getFilteredUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    if (filters.department) {
      filtered = filtered.filter(user => user.department === filters.department);
    }

    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    return filtered;
  };

  const getFilteredBloodRequests = () => {
    let filtered = bloodRequests;

    if (bloodRequestSearchTerm) {
      filtered = filtered.filter(request =>
        request.patientName.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase()) ||
        request.bloodType.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase()) ||
        request.hospital.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase())
      );
    }

    if (bloodRequestFilters.status) {
      filtered = filtered.filter(request => request.status === bloodRequestFilters.status);
    }

    if (bloodRequestFilters.bloodType) {
      filtered = filtered.filter(request => request.bloodType === bloodRequestFilters.bloodType);
    }

    if (bloodRequestFilters.priority) {
      filtered = filtered.filter(request => request.priority === bloodRequestFilters.priority);
    }

    if (bloodRequestFilters.hospital) {
      filtered = filtered.filter(request => 
        request.hospital.toLowerCase().includes(bloodRequestFilters.hospital.toLowerCase())
      );
    }

    return filtered;
  };

  // Export functions
  const handleExportUsers = () => {
    const csvContent = generateCSV(getFilteredUsers(), [
      'id', 'name', 'email', 'role', 'phone', 'department', 'status', 'lastLogin'
    ]);
    downloadCSV(csvContent, 'users-export.csv');
    toast.success('Users exported successfully!');
  };

  const handleExportBloodRequests = () => {
    const csvContent = generateCSV(getFilteredBloodRequests(), [
      'id', 'patientName', 'bloodType', 'unitsRequested', 'hospital', 'priority', 'status', 'requestDate'
    ]);
    downloadCSV(csvContent, 'blood-requests-export.csv');
    toast.success('Blood requests exported successfully!');
  };

  const handleExportAllReports = () => {
    toast.loading('Generating all reports...', { duration: 2000 });
    setTimeout(() => {
      toast.success('All reports exported successfully!');
    }, 2000);
  };

  // Report functions
  const handleGenerateCustomReport = (reportType = null) => {
    const type = reportType || customReport.type;
    if (!type) {
      toast.error('Please select a report type');
      return;
    }

    toast.loading('Generating report...', { duration: 2000 });
    setTimeout(() => {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${type.replace('-', '_')}_report_${timestamp}.csv`;
      
      // Generate sample report data based on type
      let data = [];
      let headers = [];

      switch (type) {
        case 'blood-inventory':
          data = bloodInventory;
          headers = ['bloodType', 'units', 'expiryDate', 'location'];
          break;
        case 'donor-statistics':
          data = users.filter(u => u.role === 'Volunteer');
          headers = ['name', 'email', 'registrationDate', 'lastLogin'];
          break;
        case 'blood-requests':
          data = bloodRequests;
          headers = ['patientName', 'bloodType', 'unitsRequested', 'hospital', 'status'];
          break;
        default:
          data = [{ message: 'Report data not available' }];
          headers = ['message'];
      }

      const csvContent = generateCSV(data, headers);
      downloadCSV(csvContent, filename);
      toast.success(`${type.replace('-', ' ')} report generated successfully!`);
    }, 2000);
  };

  // Settings functions
  const handleSaveSettings = () => {
    toast.loading('Saving settings...', { duration: 1500 });
    setTimeout(() => {
      // Add log entry for settings save
      const newLog = {
        id: systemLogs.length + 1,
        type: 'Settings updated',
        user: currentUser.email,
        timestamp: new Date().toISOString(),
        details: 'System settings have been updated'
      };
      setSystemLogs(prev => [newLog, ...prev]);
      toast.success('Settings saved successfully!');
    }, 1500);
  };

  const handleBackupNow = () => {
    toast.loading('Creating backup...', { duration: 3000 });
    setTimeout(() => {
      const backupTime = new Date().toISOString();
      setLastBackupTime(backupTime);
      
      // Add log entry for backup
      const newLog = {
        id: systemLogs.length + 1,
        type: 'System backup',
        user: currentUser.email,
        timestamp: backupTime,
        details: 'System backup created successfully'
      };
      setSystemLogs(prev => [newLog, ...prev]);
      toast.success('Backup created successfully!');
    }, 3000);
  };

  const handleRestoreBackup = () => {
    toast.loading('Restoring from backup...', { duration: 3000 });
    setTimeout(() => {
      // Add log entry for restore
      const newLog = {
        id: systemLogs.length + 1,
        type: 'System restore',
        user: currentUser.email,
        timestamp: new Date().toISOString(),
        details: 'System restored from backup successfully'
      };
      setSystemLogs(prev => [newLog, ...prev]);
      toast.success('System restored successfully!');
    }, 3000);
  };

  const handleViewSystemLogs = () => {
    toast.info('Opening system logs...');
    // This would typically open a modal or navigate to logs page
  };

  // Function to add new log entry
  const addSystemLog = (type, details) => {
    const newLog = {
      id: systemLogs.length + 1,
      type,
      user: currentUser.email,
      timestamp: new Date().toISOString(),
      details
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  // Utility functions
  const generateCSV = (data, headers) => {
    const csvHeaders = headers.join(',');
    const csvRows = data.map(item => 
      headers.map(header => {
        const value = item[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    );
    return [csvHeaders, ...csvRows].join('\n');
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    // State
    activeSection,
    setActiveSection,
    currentUser,
    setCurrentUser,
    users,
    setUsers,
    roles,
    setRoles,
    bloodInventory,
    setBloodInventory,
    bloodRequests,
    setBloodRequests,
    events,
    setEvents,
    notifications,
    setNotifications,
    
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
    setLastBackupTime,
    systemLogs,
    setSystemLogs,

    // Filter state
    filters,
    setFilters,
    bloodRequestFilters,
    setBloodRequestFilters,
    searchTerm,
    setSearchTerm,
    bloodRequestSearchTerm,
    setBloodRequestSearchTerm,

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
    handleViewSystemLogs,
    addSystemLog
  };
};
