import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  Shield, Users, Droplets, Calendar, Hospital, 
  Bell, BarChart3, Settings, Menu, X, Search,
  Plus, Edit, Trash2, Eye, Download, Filter,
  AlertTriangle, CheckCircle, Clock, Mail,
  Phone, MapPin, Activity, TrendingUp, User
} from 'lucide-react';

const BloodDonationAdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showViewRoleModal, setShowViewRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isSubmittingBlood, setIsSubmittingBlood] = useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [isUpdatingBlood, setIsUpdatingBlood] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBloodRequest, setSelectedBloodRequest] = useState(null);
  const [selectedBloodUnit, setSelectedBloodUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
  const [bloodRequestSearchTerm, setBloodRequestSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
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
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin Nguyễn Văn A',
    role: 'Super Admin',
    avatar: '/api/placeholder/40/40'
  });

  // Check if current user is Super Admin
  const isSuperAdmin = currentUser.role === 'Super Admin';
  const isAdmin = currentUser.role === 'Admin' || isSuperAdmin;

  // Sample data
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

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    ...(isSuperAdmin ? [{ id: 'auth', name: 'Authentication', icon: Shield }] : []),
    ...(isAdmin ? [{ id: 'users', name: 'User Management', icon: Users }] : []),
    { id: 'inventory', name: 'Blood Inventory', icon: Droplets },
    { id: 'events', name: 'Event Management', icon: Calendar },
    { id: 'requests', name: 'Blood Requests', icon: Hospital },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    ...(isSuperAdmin ? [{ id: 'settings', name: 'Settings', icon: Settings }] : [])
  ];

  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gradient-to-b from-red-500 to-pink-600 text-white transition-all duration-300 min-h-screen shadow-xl`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className={`${sidebarOpen ? 'block' : 'hidden'} font-bold text-xl`}>Blood Bank Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-white/20 p-2 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="mt-8">
        {modules.map(module => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center px-4 py-3 hover:bg-white/20 transition-colors ${
                activeModule === module.id ? 'bg-white/20 border-r-4 border-white' : ''
              }`}
            >
              <Icon size={20} />
              <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>{module.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="text-gray-600 hover:text-red-500 cursor-pointer" size={20} />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="text-white" size={16} />
            </div>
            <div>
              <div className="text-sm font-medium">{currentUser.name}</div>
              <div className="text-xs text-gray-500">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardStats.totalDonors}</p>
            </div>
            <Users className="text-red-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardStats.totalDonations}</p>
            </div>
            <Droplets className="text-pink-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blood Units</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardStats.bloodUnits}</p>
            </div>
            <Activity className="text-red-400" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Events</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardStats.activeEvents}</p>
            </div>
            <Calendar className="text-pink-400" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Blood Inventory Status</h3>
          <div className="space-y-3">
            {bloodInventory.slice(0, 6).map((blood, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  {blood.type}
                </div>
                  <span className="font-medium">{blood.units} units</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  blood.status === 'Good' ? 'bg-green-100 text-green-800' :
                  blood.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {blood.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Blood Requests</h3>
          <div className="space-y-3">
            {bloodRequests.slice(0, 5).map((request, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{request.hospital}</div>
                  <div className="text-sm text-gray-600">{request.bloodType} - {request.units} units</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.urgency}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">{request.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UserManagement = () => (
    <div className="space-y-6">
      {!isAdmin && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="text-red-600 mr-2" size={20} />
            <div>
              <h4 className="text-red-800 font-medium">Không có quyền truy cập</h4>
              <p className="text-red-700 text-sm mt-1">
                Bạn không có quyền truy cập vào module quản lý người dùng. 
                Chỉ Admin và Super Admin mới có thể quản lý người dùng.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isAdmin && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                />
              </div>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 relative"
              >
                <Filter size={16} />
                <span>Filter</span>
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
              {getActiveFilterCount() > 0 && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X size={16} />
                  <span>Clear</span>
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus size={16} />
              <span>Add User</span>
            </button>
          </div>

          {/* Filter Results Summary */}
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
            <div className="text-sm text-gray-600">
              Showing {getFilteredUsers().length} of {users.length} users
              {(searchTerm || getActiveFilterCount() > 0) && (
                <span className="ml-2 text-blue-600">
                  (filtered results)
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Total: {users.length} users
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Quick filters:</span>
            <button
              onClick={() => setFilters({...filters, status: 'Active'})}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.status === 'Active' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active Users
            </button>
            <button
              onClick={() => setFilters({...filters, role: 'Donor'})}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.role === 'Donor' 
                  ? 'bg-red-100 text-red-800 border border-red-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Donors Only
            </button>
            <button
              onClick={() => setFilters({...filters, role: 'Admin'})}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.role === 'Admin' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admins Only
            </button>
            <button
              onClick={() => setFilters({...filters, bloodType: 'O-'})}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.bloodType === 'O-' 
                  ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Universal Donors (O-)
            </button>
          </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Donation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredUsers().length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <Users className="text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm || getActiveFilterCount() > 0 
                        ? "No users match your search criteria. Try adjusting your filters."
                        : "No users available in the system."
                      }
                    </p>
                    {(searchTerm || getActiveFilterCount() > 0) && (
                      <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              getFilteredUsers().map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.bloodType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastDonation}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setShowViewUserModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                      title="View user details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setNewUser({...user}); // Pre-fill form with current user data
                        setShowEditUserModal(true);
                      }}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                      title="Edit user"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteUserModal(true);
                      }}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
        </>
      )}
    </div>
  );

  const BloodInventory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Blood Inventory Overview</h3>
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertTriangle size={16} />
            <span>Low stock: {dashboardStats.lowStockTypes.join(', ')}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowAddBloodModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus size={16} />
            <span>Add Blood Unit</span>
          </button>
          <button 
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bloodInventory.map((blood, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {blood.type}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                blood.status === 'Good' ? 'bg-green-100 text-green-800' :
                blood.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {blood.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Units:</span>
                <span className="font-semibold">{blood.units}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry:</span>
                <span className="text-sm">{blood.expiryDate}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => handleUpdateBloodUnit(blood)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Update
              </button>
              <button 
                onClick={() => handleViewBloodHistory(blood)}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg hover:shadow-gray-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EventManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Blood Donation Events</h3>
        <button 
          onClick={() => setShowCreateEventModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'Active' ? 'bg-green-100 text-green-800' :
                event.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status}
              </span>
              <div className="flex space-x-1">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Registrations</span>
                <span>{event.registered}/{event.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full" 
                  style={{ width: `${(event.registered / event.target) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => handleViewEventDetails(event)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded text-sm hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                View Details
              </button>
              <button 
                onClick={() => handleManageEvent(event)}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-2 rounded text-sm hover:shadow-lg hover:shadow-gray-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BloodRequests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Blood Requests Management</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowBloodRequestFilterModal(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 relative"
          >
            <Filter size={16} />
            <span>Filter</span>
            {getActiveBloodRequestFilterCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getActiveBloodRequestFilterCount()}
              </span>
            )}
          </button>
          <button 
            onClick={handleExportBloodRequests}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Summary */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by hospital, patient, or blood type..."
            value={bloodRequestSearchTerm}
            onChange={(e) => setBloodRequestSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Summary */}
        {(getActiveBloodRequestFilterCount() > 0 || bloodRequestSearchTerm) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-800 font-medium">
                  {getFilteredBloodRequests().length} of {bloodRequests.length} requests shown
                </span>
                {getActiveBloodRequestFilterCount() > 0 && (
                  <span className="text-xs text-blue-600">
                    ({getActiveBloodRequestFilterCount()} filter{getActiveBloodRequestFilterCount() > 1 ? 's' : ''} active)
                  </span>
                )}
              </div>
              <button 
                onClick={clearBloodRequestFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredBloodRequests().length > 0 ? (
              getFilteredBloodRequests().map(request => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Hospital size={20} className="text-blue-500 mr-3" />
                    <div className="text-sm font-medium text-gray-900">{request.hospital}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {request.bloodType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.units}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requestDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleProcessBloodRequest(request)}
                      className="text-green-600 hover:text-green-900" 
                      title="Approve Request"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button 
                      onClick={() => handleViewBloodRequestDetails(request)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => toast.info(`Rejecting request from ${request.hospital}`)}
                      className="text-red-600 hover:text-red-900"
                      title="Reject Request"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Hospital className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {getActiveBloodRequestFilterCount() > 0 || bloodRequestSearchTerm ? 'No matching requests found' : 'No blood requests yet'}
                      </h3>
                      <p className="text-gray-500">
                        {getActiveBloodRequestFilterCount() > 0 || bloodRequestSearchTerm 
                          ? 'Try adjusting your search or filters to find what you\'re looking for.' 
                          : 'Blood requests from hospitals will appear here.'
                        }
                      </p>
                    </div>
                    {(getActiveBloodRequestFilterCount() > 0 || bloodRequestSearchTerm) && (
                      <button
                        onClick={clearBloodRequestFilters}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Clear filters and search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const NotificationSystem = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notification System</h3>
        <button 
          onClick={() => setShowSendNotificationModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} />
          <span>Send Notification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Email Campaigns</h4>
            <Mail className="text-blue-500" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sent today:</span>
              <span className="font-medium">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Open rate:</span>
              <span className="font-medium">68%</span>
            </div>
            <button 
              onClick={() => setShowSendNotificationModal(true)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 transition-colors"
            >
              Create Campaign
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">SMS Alerts</h4>
            <Phone className="text-green-500" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sent today:</span>
              <span className="font-medium">567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Success rate:</span>
              <span className="font-medium">92%</span>
            </div>
            <button 
              onClick={() => setShowSendNotificationModal(true)}
              className="w-full bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 transition-colors"
            >
              Send SMS
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Push Notifications</h4>
            <Bell className="text-purple-500" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active users:</span>
              <span className="font-medium">2,345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Engagement:</span>
              <span className="font-medium">45%</span>
            </div>
            <button 
              onClick={() => setShowSendNotificationModal(true)}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded mt-3 hover:bg-purple-600 transition-colors"
            >
              Send Push
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h4 className="font-semibold">Recent Notifications</h4>
          <button 
            onClick={handleViewNotificationHistory}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All History
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { type: 'Email', title: 'Blood donation reminder', recipients: 1234, status: 'Sent', time: '2 hours ago' },
            { type: 'SMS', title: 'Emergency blood request', recipients: 567, status: 'Delivered', time: '4 hours ago' },
            { type: 'Push', title: 'New donation event', recipients: 2345, status: 'Sent', time: '1 day ago' }
          ].map((notification, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.type === 'Email' ? 'bg-blue-500' :
                    notification.type === 'SMS' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-500">{notification.type} • {notification.recipients} recipients</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{notification.time}</div>
                  <div className="text-sm font-medium text-green-600">{notification.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Reports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reports & Analytics</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowReportFilterModal(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button 
            onClick={handleExportAllReports}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <Download size={16} />
            <span>Export All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Donation Report', count: '1,234', trend: '+12%', color: 'blue' },
          { title: 'User Report', count: '2,567', trend: '+8%', color: 'green' },
          { title: 'Inventory Report', count: '789', trend: '-5%', color: 'red' },
          { title: 'Event Report', count: '45', trend: '+15%', color: 'purple' }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">{report.title}</h4>
              <TrendingUp className={`text-${report.color}-500`} size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{report.count}</div>
            <div className={`text-sm ${report.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {report.trend} from last month
            </div>
            <button 
              onClick={() => handleViewReportDetails(report.title)}
              className={`w-full mt-3 bg-${report.color}-500 text-white px-4 py-2 rounded hover:bg-${report.color}-600 transition-colors`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">Quick Reports</h4>
          <div className="space-y-3">
            {[
              'Daily Donation Summary',
              'Weekly Blood Inventory',
              'Monthly User Statistics',
              'Event Performance Report',
              'Hospital Request Analysis'
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">{report}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewReportDetails(report)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Report Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleDownloadQuickReport(report)}
                    className="text-green-600 hover:text-green-800"
                    title="Download Report"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">Custom Reports</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Donation Analysis</option>
                <option>User Demographics</option>
                <option>Inventory Trends</option>
                <option>Event Performance</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input type="date" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input type="date" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            </div>
            <button 
              onClick={() => setShowCustomReportModal(true)}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">System Settings</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">General Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
              <input 
                type="text" 
                value="Blood Donation Management System"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
              <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Vietnamese</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>UTC+7 (Ho Chi Minh)</option>
                <option>UTC+0 (London)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">Security Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Two-Factor Authentication</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Password Policy</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Session Timeout</span>
              <select className="p-1 border rounded text-sm">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">Backup & Recovery</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto Backup</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Daily</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Backup</span>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => toast.success('Backup started successfully!')}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Backup Now
              </button>
              <button 
                onClick={() => toast.info('Restore functionality will be available soon')}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Restore
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">System Logs</h4>
          <div className="space-y-3">
            {[
              { action: 'User login', user: 'admin@system.com', time: '2 minutes ago' },
              { action: 'Blood unit added', user: 'staff@system.com', time: '15 minutes ago' },
              { action: 'Event created', user: 'manager@system.com', time: '1 hour ago' }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="text-sm font-medium">{log.action}</div>
                  <div className="text-xs text-gray-500">{log.user}</div>
                </div>
                <div className="text-xs text-gray-500">{log.time}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="w-full mt-3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Components
  const CreateRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create New Role</h3>
          <button 
            onClick={() => setShowCreateRoleModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter role name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
              placeholder="Enter role description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availablePermissions.map(permission => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newRole.permissions.includes(permission)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewRole({...newRole, permissions: [...newRole.permissions, permission]});
                      } else {
                        setNewRole({...newRole, permissions: newRole.permissions.filter(p => p !== permission)});
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setShowCreateRoleModal(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const id = roles.length + 1;
              setRoles([...roles, { 
                id, 
                name: newRole.name, 
                userCount: 0, 
                permissions: newRole.permissions,
                description: newRole.description,
                users: []
              }]);
              setNewRole({ name: '', description: '', permissions: [] });
              setShowCreateRoleModal(false);
            }}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );

  // User validation function
  const validateUser = (user) => {
    const errors = [];
    
    if (!user.name.trim()) {
      errors.push('Full name is required');
    }
    
    if (!user.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!user.phone.trim()) {
      errors.push('Phone number is required');
    } else if (!/^[0-9+\-\s()]{10,}$/.test(user.phone)) {
      errors.push('Please enter a valid phone number');
    }
    
    // Check for duplicate email
    if (users.some(existingUser => existingUser.email.toLowerCase() === user.email.toLowerCase())) {
      errors.push('Email already exists in the system');
    }
    
    return errors;
  };

  // Handle add user
  const handleAddUser = async () => {
    const validationErrors = validateUser(newUser);
    
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        toast.error(error);
      });
      return;
    }
    
    setIsAddingUser(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUserWithId = {
        id: users.length + 1,
        ...newUser,
        lastDonation: null,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, newUserWithId]);
      
      // Reset form
      setNewUser({
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
      
      setShowAddUserModal(false);
      toast.success(`User "${newUser.name}" has been added successfully!`);
      
    } catch (error) {
      toast.error('Failed to add user. Please try again.');
    } finally {
      setIsAddingUser(false);
    }
  };

  // Handle edit user
  const handleEditUser = async () => {
    const validationErrors = validateUser(newUser);
    
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        toast.error(error);
      });
      return;
    }
    
    setIsEditingUser(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in the list
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...newUser, id: selectedUser.id, lastDonation: user.lastDonation, createdAt: user.createdAt }
          : user
      ));
      
      setShowEditUserModal(false);
      setSelectedUser(null);
      toast.success(`User "${newUser.name}" has been updated successfully!`);
      
    } catch (error) {
      toast.error('Failed to update user. Please try again.');
    } finally {
      setIsEditingUser(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    setIsDeletingUser(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove user from the list
      setUsers(users.filter(user => user.id !== selectedUser.id));
      
      setShowDeleteUserModal(false);
      setSelectedUser(null);
      toast.success(`User "${selectedUser.name}" has been deleted successfully!`);
      
    } catch (error) {
      toast.error('Failed to delete user. Please try again.');
    } finally {
      setIsDeletingUser(false);
    }
  };

  // Blood Unit handlers
  const handleAddBloodUnit = async () => {
    try {
      setIsSubmittingBlood(true);
      
      // Validate blood unit data
      if (!newBloodUnit.type || !newBloodUnit.units || !newBloodUnit.expiryDate || !newBloodUnit.donor) {
        toast.error('Please fill in all required blood unit fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const bloodUnit = {
        id: Date.now(),
        ...newBloodUnit,
        createdAt: new Date().toISOString(),
        addedBy: 'Current User'
      };
      
      setShowAddBloodModal(false);
      setNewBloodUnit({
        type: 'A+',
        units: '',
        expiryDate: '',
        donor: '',
        collectionDate: '',
        location: '',
        status: 'Good'
      });
      toast.success('Blood unit added successfully!');
      
    } catch (error) {
      toast.error('Failed to add blood unit. Please try again.');
    } finally {
      setIsSubmittingBlood(false);
    }
  };

  // Event handlers
  const handleCreateEvent = async () => {
    try {
      setIsSubmittingEvent(true);
      
      // Validate event data
      if (!newEvent.name || !newEvent.date || !newEvent.location) {
        toast.error('Please fill in all required event fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const event = {
        id: Date.now(),
        ...newEvent,
        createdAt: new Date().toISOString(),
        createdBy: 'Current User'
      };
      
      setShowCreateEventModal(false);
      setNewEvent({
        name: '',
        date: '',
        location: '',
        target: '',
        description: '',
        organizer: '',
        contactInfo: '',
        status: 'Planning'
      });
      toast.success('Event created successfully!');
      
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Notification handlers
  const handleSendNotification = async () => {
    try {
      setIsSendingNotification(true);
      
      // Validate notification data
      if (!newNotification.title || !newNotification.message) {
        toast.error('Please fill in all required notification fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const notification = {
        id: Date.now(),
        ...newNotification,
        sentAt: newNotification.isScheduled ? newNotification.scheduledDate : new Date().toISOString(),
        sentBy: 'Current User'
      };
      
      setShowSendNotificationModal(false);
      setNewNotification({
        type: 'email',
        title: '',
        message: '',
        targetAudience: 'all',
        urgency: 'normal',
        scheduledDate: '',
        isScheduled: false
      });
      toast.success('Notification sent successfully!');
      
    } catch (error) {
      toast.error('Failed to send notification. Please try again.');
    } finally {
      setIsSendingNotification(false);
    }
  };

  // Export Report handler
  const handleExportReport = () => {
    try {
      // Create CSV content
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Blood Type,Units Available,Expiry Date,Status\n"
        + bloodInventory.map(blood => 
            `${blood.type},${blood.units},${blood.expiryDate || 'N/A'},${blood.status}`
          ).join("\n");
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `blood_inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Report exported successfully!');
    } catch (error) {
      toast.error('Failed to export report. Please try again.');
    }
  };

  // Event Details handler
  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleManageEvent = (event) => {
    setSelectedEvent(event);
    toast.info(`Managing event: ${event.name}`);
  };

  // Blood Request Details handler
  const handleViewBloodRequestDetails = (request) => {
    setSelectedBloodRequest(request);
    setShowBloodRequestDetailsModal(true);
  };

  const handleProcessBloodRequest = (request) => {
    setSelectedBloodRequest(request);
    toast.info(`Processing blood request for ${request.patient}`);
  };

  // Blood Inventory handlers
  const handleUpdateBloodUnit = (bloodUnit) => {
    setSelectedBloodUnit(bloodUnit);
    setUpdateBloodUnit({
      type: bloodUnit.type,
      units: bloodUnit.units,
      expiryDate: bloodUnit.expiryDate,
      donor: bloodUnit.donor || '',
      collectionDate: bloodUnit.collectionDate || '',
      location: bloodUnit.location || '',
      status: bloodUnit.status
    });
    setShowUpdateBloodModal(true);
  };

  const handleSaveBloodUpdate = async () => {
    try {
      setIsUpdatingBlood(true);
      
      // Validate blood unit data
      if (!updateBloodUnit.type || !updateBloodUnit.units || !updateBloodUnit.expiryDate) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the blood inventory
      const updatedInventory = bloodInventory.map(blood => 
        blood.type === selectedBloodUnit.type ? updateBloodUnit : blood
      );
      
      setShowUpdateBloodModal(false);
      setSelectedBloodUnit(null);
      toast.success('Blood unit updated successfully!');
      
    } catch (error) {
      toast.error('Failed to update blood unit. Please try again.');
    } finally {
      setIsUpdatingBlood(false);
    }
  };

  const handleViewBloodHistory = (bloodUnit) => {
    setSelectedBloodUnit(bloodUnit);
    setShowBloodHistoryModal(true);
  };

  // Blood Request handlers
  const handleExportBloodRequests = () => {
    try {
      const filteredRequests = getFilteredBloodRequests();
      
      // Create CSV content
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Hospital,Patient,Blood Type,Units,Urgency,Status,Request Date,Contact Person\n"
        + filteredRequests.map(request => 
            `"${request.hospital}","${request.patient}","${request.bloodType}","${request.units}","${request.urgency}","${request.status}","${request.requestDate}","${request.contactPerson || 'N/A'}"`
          ).join("\n");
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `blood_requests_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Exported ${filteredRequests.length} blood requests successfully!`);
    } catch (error) {
      toast.error('Failed to export blood requests. Please try again.');
    }
  };

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
    toast.success('Filters cleared successfully!');
  };

  const getActiveBloodRequestFilterCount = () => {
    return Object.values(bloodRequestFilters).filter(value => value !== '').length + 
           (bloodRequestSearchTerm ? 1 : 0);
  };

  // Reports handlers
  const handleGenerateCustomReport = async () => {
    try {
      setIsGeneratingReport(true);
      
      if (!customReport.fromDate || !customReport.toDate) {
        toast.error('Please select date range for the report');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate report data based on type
      let reportData = [];
      let filename = '';
      
      switch (customReport.type) {
        case 'Donation Analysis':
          reportData = [
            ['Date', 'Donations', 'Units Collected', 'Blood Type', 'Location'],
            ['2025-07-15', '25', '450ml', 'O+', 'City Hospital'],
            ['2025-07-14', '18', '320ml', 'A+', 'Central Clinic']
          ];
          filename = 'donation_analysis_report';
          break;
        case 'User Demographics':
          reportData = [
            ['Age Group', 'Gender', 'Blood Type', 'Count', 'Percentage'],
            ['18-25', 'Male', 'O+', '150', '25%'],
            ['26-35', 'Female', 'A+', '120', '20%']
          ];
          filename = 'user_demographics_report';
          break;
        default:
          reportData = [['Data', 'Value'], ['Sample', '100']];
          filename = 'custom_report';
      }

      // Create CSV
      const csvContent = "data:text/csv;charset=utf-8," + 
        reportData.map(row => row.join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShowCustomReportModal(false);
      toast.success('Custom report generated successfully!');
      
    } catch (error) {
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleExportAllReports = () => {
    try {
      const reports = [
        { name: 'Donation Report', data: 'Sample donation data...' },
        { name: 'User Report', data: 'Sample user data...' },
        { name: 'Inventory Report', data: 'Sample inventory data...' },
        { name: 'Event Report', data: 'Sample event data...' }
      ];

      reports.forEach(report => {
        const csvContent = "data:text/csv;charset=utf-8," + 
          `Report: ${report.name}\nData: ${report.data}\nGenerated: ${new Date().toISOString()}`;
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${report.name.toLowerCase().replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      
      toast.success('All reports exported successfully!');
    } catch (error) {
      toast.error('Failed to export reports. Please try again.');
    }
  };

  const handleViewReportDetails = (reportType) => {
    toast.info(`Viewing details for ${reportType}`);
  };

  const handleDownloadQuickReport = (reportName) => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," + 
        `Report: ${reportName}\nGenerated: ${new Date().toISOString()}\nData: Sample data for ${reportName}`;
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${reportName.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`${reportName} downloaded successfully!`);
    } catch (error) {
      toast.error('Failed to download report. Please try again.');
    }
  };

  // Settings handlers
  const handleSaveSettings = async () => {
    try {
      setIsSavingSettings(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSettingsModal(false);
      toast.success('Settings saved successfully!');
      
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleResetSettings = () => {
    setSystemSettings({
      systemName: 'Blood Donation Management System',
      language: 'Vietnamese',
      timezone: 'Asia/Ho_Chi_Minh',
      emailNotifications: true,
      smsNotifications: false,
      autoBackup: true,
      sessionTimeout: '30',
      maxLoginAttempts: '5'
    });
    toast.success('Settings reset to defaults!');
  };

  // Notification handlers
  const handleViewNotificationHistory = () => {
    setShowNotificationHistoryModal(true);
  };

  // Filter and search users
  const getFilteredUsers = () => {
    let filteredUsers = users;

    // Apply search filter
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (filters.role) {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role);
    }

    // Apply status filter
    if (filters.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // Apply blood type filter
    if (filters.bloodType) {
      filteredUsers = filteredUsers.filter(user => user.bloodType === filters.bloodType);
    }

    // Apply date range filter (if lastDonation exists)
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredUsers = filteredUsers.filter(user => {
        if (!user.lastDonation) return false;
        
        const donationDate = new Date(user.lastDonation);
        const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
        const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;

        if (fromDate && donationDate < fromDate) return false;
        if (toDate && donationDate > toDate) return false;
        
        return true;
      });
    }

    return filteredUsers;
  };

  // Filter and search blood requests
  const getFilteredBloodRequests = () => {
    let filteredRequests = bloodRequests;

    // Apply search filter
    if (bloodRequestSearchTerm) {
      filteredRequests = filteredRequests.filter(request =>
        request.hospital.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase()) ||
        request.patient.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase()) ||
        request.bloodType.toLowerCase().includes(bloodRequestSearchTerm.toLowerCase())
      );
    }

    // Apply hospital filter
    if (bloodRequestFilters.hospital) {
      filteredRequests = filteredRequests.filter(request =>
        request.hospital.toLowerCase().includes(bloodRequestFilters.hospital.toLowerCase())
      );
    }

    // Apply blood type filter
    if (bloodRequestFilters.bloodType) {
      filteredRequests = filteredRequests.filter(request =>
        request.bloodType === bloodRequestFilters.bloodType
      );
    }

    // Apply urgency filter
    if (bloodRequestFilters.urgency) {
      filteredRequests = filteredRequests.filter(request =>
        request.urgency === bloodRequestFilters.urgency
      );
    }

    // Apply status filter
    if (bloodRequestFilters.status) {
      filteredRequests = filteredRequests.filter(request =>
        request.status === bloodRequestFilters.status
      );
    }

    // Apply date range filter
    if (bloodRequestFilters.dateFrom) {
      filteredRequests = filteredRequests.filter(request => {
        const requestDate = new Date(request.requestDate);
        const fromDate = new Date(bloodRequestFilters.dateFrom);
        return requestDate >= fromDate;
      });
    }

    if (bloodRequestFilters.dateTo) {
      filteredRequests = filteredRequests.filter(request => {
        const requestDate = new Date(request.requestDate);
        const toDate = new Date(bloodRequestFilters.dateTo);
        return requestDate <= toDate;
      });
    }

    return filteredRequests;
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      role: '',
      status: '',
      bloodType: '',
      dateRange: {
        from: '',
        to: ''
      }
    });
    setSearchTerm('');
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.role) count++;
    if (filters.status) count++;
    if (filters.bloodType) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    return count;
  };

  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Add New User</h3>
          <button 
            onClick={() => {
              setShowAddUserModal(false);
              setNewUser({
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
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={newUser.dateOfBirth}
                  onChange={(e) => setNewUser({...newUser, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={newUser.gender}
                  onChange={(e) => setNewUser({...newUser, gender: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <select
                  value={newUser.bloodType}
                  onChange={(e) => setNewUser({...newUser, bloodType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={newUser.address}
                onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* System Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">System Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="Donor">Donor</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Medical Staff">Medical Staff</option>
                  {isSuperAdmin && <option value="Admin">Admin</option>}
                  {isSuperAdmin && <option value="Super Admin">Super Admin</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency & Medical Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Emergency & Medical Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
              <input
                type="text"
                value={newUser.emergencyContact}
                onChange={(e) => setNewUser({...newUser, emergencyContact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Emergency contact name and phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                value={newUser.medicalConditions}
                onChange={(e) => setNewUser({...newUser, medicalConditions: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Any medical conditions, allergies, or medications"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowAddUserModal(false);
                setNewUser({
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
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
              disabled={isAddingUser}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                isAddingUser 
                  ? 'bg-gray-400 cursor-not-allow' 
                  : 'bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5'
              } text-white`}
            >
              {isAddingUser ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding...</span>
                </div>
              ) : (
                'Add User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ViewUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
          <button 
            onClick={() => {
              setShowViewUserModal(false);
              setSelectedUser(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {selectedUser && (
          <div className="space-y-6">
            {/* User Avatar and Basic Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h4>
                <p className="text-gray-600">{selectedUser.email}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  selectedUser.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedUser.status}
                </span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Personal Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.dateOfBirth || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{selectedUser.gender || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.bloodType}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.address || 'Not provided'}</p>
              </div>
            </div>

            {/* System Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700 border-b pb-2">System Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.role}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Donation</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.lastDonation || 'Never donated'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Created</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedUser.createdAt || 'Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Emergency & Medical Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Emergency & Medical Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.emergencyContact || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.medicalConditions || 'None reported'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                onClick={() => {
                  setShowViewUserModal(false);
                  setNewUser({...selectedUser});
                  setShowEditUserModal(true);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit User
              </button>
              <button
                onClick={() => {
                  setShowViewUserModal(false);
                  setSelectedUser(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ViewRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">View Role: {selectedRole?.name}</h3>
          <button 
            onClick={() => setShowViewRoleModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {selectedRole && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Role Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Name:</strong> {selectedRole.name}</p>
                  <p><strong>Description:</strong> {selectedRole.description}</p>
                  <p><strong>Total Users:</strong> {selectedRole.userCount}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Permissions</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.permissions.map(permission => (
                      <span key={permission} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Users in this Role ({selectedRole.users.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedRole.users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{user.name}</td>
                        <td className="px-4 py-2 text-sm">{user.email}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' :
                            user.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => {
                              setSelectedRole({...selectedRole, selectedUser: user});
                              setShowEditRoleModal(true);
                              setShowViewRoleModal(false);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowViewRoleModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const EditUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
          <button 
            onClick={() => {
              setShowEditUserModal(false);
              setSelectedUser(null);
              setNewUser({
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
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={newUser.dateOfBirth}
                  onChange={(e) => setNewUser({...newUser, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={newUser.gender}
                  onChange={(e) => setNewUser({...newUser, gender: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <select
                  value={newUser.bloodType}
                  onChange={(e) => setNewUser({...newUser, bloodType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={newUser.address}
                onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* System Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">System Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="Donor">Donor</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Medical Staff">Medical Staff</option>
                  {isSuperAdmin && <option value="Admin">Admin</option>}
                  {isSuperAdmin && <option value="Super Admin">Super Admin</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency & Medical Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Emergency & Medical Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
              <input
                type="text"
                value={newUser.emergencyContact}
                onChange={(e) => setNewUser({...newUser, emergencyContact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Emergency contact name and phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                value={newUser.medicalConditions}
                onChange={(e) => setNewUser({...newUser, medicalConditions: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
                placeholder="Any medical conditions, allergies, or medications"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowEditUserModal(false);
                setSelectedUser(null);
                setNewUser({
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
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleEditUser();
              }}
              disabled={isEditingUser}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditingUser ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const DeleteUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-red-600">Delete User</h3>
          <button 
            onClick={() => {
              setShowDeleteUserModal(false);
              setSelectedUser(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <div>
              <p className="text-gray-900 font-medium">Are you sure you want to delete this user?</p>
              <p className="text-gray-600 text-sm">This action cannot be undone.</p>
            </div>
          </div>
          
          {selectedUser && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-900">{selectedUser.name}</p>
              <p className="text-sm text-gray-600">{selectedUser.email}</p>
              <p className="text-sm text-gray-600">Role: {selectedUser.role}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setShowDeleteUserModal(false);
              setSelectedUser(null);
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUser}
            disabled={isDeletingUser}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeletingUser ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );

  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Filter Users</h3>
          <button 
            onClick={() => setShowFilterModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={filters.role}
              onChange={(e) => setFilters({...filters, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Roles</option>
              <option value="Donor">Donor</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Medical Staff">Medical Staff</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Blood Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
            <select
              value={filters.bloodType}
              onChange={(e) => setFilters({...filters, bloodType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Blood Types</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Donation Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => setFilters({
                    ...filters, 
                    dateRange: {...filters.dateRange, from: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) => setFilters({
                    ...filters, 
                    dateRange: {...filters.dateRange, to: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800 font-medium">
                  {getActiveFilterCount()} filter(s) applied
                </span>
                <button 
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all
                </button>
              </div>
              <div className="text-xs text-blue-700 mt-1">
                {getFilteredUsers().length} of {users.length} users match your criteria
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowFilterModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowFilterModal(false);
              toast.success(`Filter applied! Showing ${getFilteredUsers().length} users.`);
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  // Add Blood Unit Modal
  const AddBloodUnitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Add New Blood Unit</h3>
          <button
            onClick={() => setShowAddBloodModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Blood Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Blood Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={newBloodUnit.type}
                  onChange={(e) => setNewBloodUnit({...newBloodUnit, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units (ml) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newBloodUnit.units}
                  onChange={(e) => setNewBloodUnit({...newBloodUnit, units: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter units in ml"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newBloodUnit.donor}
                  onChange={(e) => setNewBloodUnit({...newBloodUnit, donor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter donor name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Collection Location</label>
                <input
                  type="text"
                  value={newBloodUnit.location}
                  onChange={(e) => setNewBloodUnit({...newBloodUnit, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter collection location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Date
                </label>
                <input
                  type="date"
                  value={newBloodUnit.collectionDate}
                  onChange={(e) => setNewBloodUnit({...newBloodUnit, collectionDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={newBloodUnit.expiryDate}
                  onChange={(e) => setNewBloodUnit({...newBloodUnit, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={newBloodUnit.status}
                onChange={(e) => setNewBloodUnit({...newBloodUnit, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Good">Good</option>
                <option value="Expired">Expired</option>
                <option value="Used">Used</option>
                <option value="Quarantine">Quarantine</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowAddBloodModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddBloodUnit}
            disabled={isSubmittingBlood}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmittingBlood ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Blood Unit...
              </>
            ) : (
              'Add Blood Unit'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Create Event Modal
  const CreateEventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Create New Event</h3>
          <button
            onClick={() => setShowCreateEventModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Event Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Event Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEvent.name}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter event location"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <input
                  type="text"
                  value={newEvent.target}
                  onChange={(e) => setNewEvent({...newEvent, target: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., General Public, Students, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                <input
                  type="text"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter organizer name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
              <input
                type="text"
                value={newEvent.contactInfo}
                onChange={(e) => setNewEvent({...newEvent, contactInfo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Phone number or email for contact"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="4"
                placeholder="Enter event description and details"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={newEvent.status}
                onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowCreateEventModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateEvent}
            disabled={isSubmittingEvent}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmittingEvent ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Event...
              </>
            ) : (
              'Create Event'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Send Notification Modal
  const SendNotificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Send Notification</h3>
          <button
            onClick={() => setShowSendNotificationModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Notification Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Notification Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push Notification</option>
                  <option value="system">System Alert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                <select
                  value={newNotification.urgency}
                  onChange={(e) => setNewNotification({...newNotification, urgency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select
                value={newNotification.targetAudience}
                onChange={(e) => setNewNotification({...newNotification, targetAudience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Users</option>
                <option value="donors">Donors Only</option>
                <option value="volunteers">Volunteers Only</option>
                <option value="staff">Medical Staff Only</option>
                <option value="admins">Admins Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter notification title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="5"
                placeholder="Enter notification message"
                required
              />
            </div>

            {/* Schedule Section */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="scheduleNotification"
                  checked={newNotification.isScheduled}
                  onChange={(e) => setNewNotification({...newNotification, isScheduled: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="scheduleNotification" className="text-sm font-medium text-gray-700">
                  Schedule for later
                </label>
              </div>

              {newNotification.isScheduled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newNotification.scheduledDate}
                    onChange={(e) => setNewNotification({...newNotification, scheduledDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowSendNotificationModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSendNotification}
            disabled={isSendingNotification}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSendingNotification ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {newNotification.isScheduled ? 'Scheduling...' : 'Sending...'}
              </>
            ) : (
              newNotification.isScheduled ? 'Schedule Notification' : 'Send Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Event Details Modal
  const EventDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Event Details</h3>
          <button
            onClick={() => setShowEventDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedEvent && (
          <div className="space-y-6">
            {/* Event Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-700">{selectedEvent.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedEvent.status === 'Active' ? 'bg-green-100 text-green-800' :
                  selectedEvent.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedEvent.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <p className="text-gray-900">{selectedEvent.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-gray-900">{selectedEvent.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered</label>
                  <p className="text-gray-900">{selectedEvent.registered} people</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                  <p className="text-gray-900">{selectedEvent.target} people</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Progress</label>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full"
                    style={{ width: `${(selectedEvent.registered / selectedEvent.target) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {((selectedEvent.registered / selectedEvent.target) * 100).toFixed(1)}% of target reached
                </p>
              </div>

              {selectedEvent.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900">{selectedEvent.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowEventDetailsModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowEventDetailsModal(false);
              handleManageEvent(selectedEvent);
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Manage Event
          </button>
        </div>
      </div>
    </div>
  );

  // Blood Request Details Modal
  const BloodRequestDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Blood Request Details</h3>
          <button
            onClick={() => setShowBloodRequestDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedBloodRequest && (
          <div className="space-y-6">
            {/* Request Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-700">Request from {selectedBloodRequest.hospital}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedBloodRequest.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedBloodRequest.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedBloodRequest.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <p className="text-gray-900">{selectedBloodRequest.patient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type Required</label>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                      {selectedBloodRequest.bloodType}
                    </div>
                    <span className="text-gray-900">{selectedBloodRequest.bloodType}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units Required</label>
                  <p className="text-gray-900">{selectedBloodRequest.units} units</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedBloodRequest.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                    selectedBloodRequest.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedBloodRequest.urgency}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Request Date</label>
                  <p className="text-gray-900">{selectedBloodRequest.requestDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required By</label>
                  <p className="text-gray-900">{selectedBloodRequest.requiredBy || 'ASAP'}</p>
                </div>
              </div>

              {selectedBloodRequest.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical Notes</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBloodRequest.notes}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                <p className="text-gray-900">{selectedBloodRequest.contactPerson || 'Not provided'}</p>
                <p className="text-gray-600 text-sm">{selectedBloodRequest.contactPhone || 'Phone not provided'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowBloodRequestDetailsModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              toast.info(`Rejecting request from ${selectedBloodRequest.hospital}`);
              setShowBloodRequestDetailsModal(false);
            }}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Reject Request
          </button>
          <button
            onClick={() => {
              handleProcessBloodRequest(selectedBloodRequest);
              setShowBloodRequestDetailsModal(false);
            }}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Approve Request
          </button>
        </div>
      </div>
    </div>
  );

  // Update Blood Unit Modal
  const UpdateBloodUnitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Update Blood Unit</h3>
          <button
            onClick={() => setShowUpdateBloodModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedBloodUnit && (
          <div className="space-y-6">
            {/* Current Info Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-700 mb-2">Current Blood Unit Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Blood Type:</span>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                      {selectedBloodUnit.type}
                    </div>
                    <span className="font-medium">{selectedBloodUnit.type}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Current Units:</span>
                  <div className="font-medium">{selectedBloodUnit.units} ml</div>
                </div>
              </div>
            </div>

            {/* Update Form */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Update Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={updateBloodUnit.type}
                    onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Units (ml) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={updateBloodUnit.units}
                    onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, units: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter units in ml"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donor Name
                  </label>
                  <input
                    type="text"
                    value={updateBloodUnit.donor}
                    onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, donor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter donor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Location</label>
                  <input
                    type="text"
                    value={updateBloodUnit.location}
                    onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter collection location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collection Date
                  </label>
                  <input
                    type="date"
                    value={updateBloodUnit.collectionDate}
                    onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, collectionDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={updateBloodUnit.expiryDate}
                    onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={updateBloodUnit.status}
                  onChange={(e) => setUpdateBloodUnit({...updateBloodUnit, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Good">Good</option>
                  <option value="Low">Low</option>
                  <option value="Expired">Expired</option>
                  <option value="Used">Used</option>
                  <option value="Quarantine">Quarantine</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowUpdateBloodModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveBloodUpdate}
            disabled={isUpdatingBlood}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isUpdatingBlood ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update Blood Unit'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Blood History Modal
  const BloodHistoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Blood Unit History</h3>
          <button
            onClick={() => setShowBloodHistoryModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedBloodUnit && (
          <div className="space-y-6">
            {/* Blood Unit Info */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {selectedBloodUnit.type}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Blood Type {selectedBloodUnit.type}</h4>
                  <p className="text-gray-600">Current Units: {selectedBloodUnit.units} ml</p>
                </div>
              </div>
            </div>

            {/* History Timeline */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Activity History</h4>
              
              <div className="space-y-4">
                {[
                  {
                    date: '2025-07-16 10:30 AM',
                    action: 'Blood Unit Created',
                    details: `Added ${selectedBloodUnit.units}ml of ${selectedBloodUnit.type} blood`,
                    user: 'Dr. Smith',
                    type: 'create'
                  },
                  {
                    date: '2025-07-15 02:15 PM',
                    action: 'Collection Completed',
                    details: `Blood collected from donor: ${selectedBloodUnit.donor || 'Anonymous Donor'}`,
                    user: 'Nurse Johnson',
                    type: 'collection'
                  },
                  {
                    date: '2025-07-15 09:00 AM',
                    action: 'Donor Screening',
                    details: 'Donor passed all health screenings and eligibility checks',
                    user: 'Medical Staff',
                    type: 'screening'
                  },
                  {
                    date: '2025-07-14 04:30 PM',
                    action: 'Appointment Scheduled',
                    details: 'Donation appointment scheduled and confirmed',
                    user: 'Reception',
                    type: 'schedule'
                  }
                ].map((history, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      history.type === 'create' ? 'bg-green-500' :
                      history.type === 'collection' ? 'bg-blue-500' :
                      history.type === 'screening' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}>
                      {history.type === 'create' ? '📋' :
                       history.type === 'collection' ? '🩸' :
                       history.type === 'screening' ? '🔍' : '📅'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-800">{history.action}</h5>
                        <span className="text-sm text-gray-500">{history.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{history.details}</p>
                      <p className="text-xs text-gray-500 mt-2">By: {history.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Checks */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Quality & Safety Checks</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { check: 'Blood Type Verification', status: 'Passed', date: '2025-07-15' },
                  { check: 'Contamination Test', status: 'Passed', date: '2025-07-15' },
                  { check: 'HIV/AIDS Screening', status: 'Passed', date: '2025-07-15' },
                  { check: 'Hepatitis B/C Test', status: 'Passed', date: '2025-07-15' },
                  { check: 'Storage Temperature', status: 'Monitored', date: 'Ongoing' },
                  { check: 'Expiry Date Check', status: 'Valid', date: selectedBloodUnit.expiryDate }
                ].map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                    <div>
                      <h6 className="font-medium text-gray-800">{check.check}</h6>
                      <p className="text-xs text-gray-500">Date: {check.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      check.status === 'Passed' ? 'bg-green-100 text-green-800' :
                      check.status === 'Valid' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowBloodHistoryModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowBloodHistoryModal(false);
              handleUpdateBloodUnit(selectedBloodUnit);
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Update Blood Unit
          </button>
        </div>
      </div>
    </div>
  );

  // Blood Request Filter Modal
  const BloodRequestFilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Filter Blood Requests</h3>
          <button
            onClick={() => setShowBloodRequestFilterModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Quick Filters */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-700">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Critical', field: 'urgency', value: 'Critical' },
                { label: 'High Priority', field: 'urgency', value: 'High' },
                { label: 'Pending', field: 'status', value: 'Pending' },
                { label: 'Processing', field: 'status', value: 'Processing' },
                { label: 'O-', field: 'bloodType', value: 'O-' },
                { label: 'O+', field: 'bloodType', value: 'O+' }
              ].map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setBloodRequestFilters({
                    ...bloodRequestFilters,
                    [filter.field]: bloodRequestFilters[filter.field] === filter.value ? '' : filter.value
                  })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    bloodRequestFilters[filter.field] === filter.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Filters */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Detailed Filters</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital</label>
                <input
                  type="text"
                  value={bloodRequestFilters.hospital}
                  onChange={(e) => setBloodRequestFilters({...bloodRequestFilters, hospital: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hospital name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <select
                  value={bloodRequestFilters.bloodType}
                  onChange={(e) => setBloodRequestFilters({...bloodRequestFilters, bloodType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Blood Types</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                <select
                  value={bloodRequestFilters.urgency}
                  onChange={(e) => setBloodRequestFilters({...bloodRequestFilters, urgency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Urgency Levels</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={bloodRequestFilters.status}
                  onChange={(e) => setBloodRequestFilters({...bloodRequestFilters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Approved">Approved</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <h5 className="text-md font-medium text-gray-700">Request Date Range</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={bloodRequestFilters.dateFrom}
                    onChange={(e) => setBloodRequestFilters({...bloodRequestFilters, dateFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={bloodRequestFilters.dateTo}
                    onChange={(e) => setBloodRequestFilters({...bloodRequestFilters, dateTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          {getActiveBloodRequestFilterCount() > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800 font-medium">
                  {getActiveBloodRequestFilterCount()} filter(s) applied
                </span>
                <button 
                  onClick={clearBloodRequestFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all
                </button>
              </div>
              <div className="text-xs text-blue-700 mt-1">
                {getFilteredBloodRequests().length} of {bloodRequests.length} requests match your criteria
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={() => setShowBloodRequestFilterModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowBloodRequestFilterModal(false);
              toast.success(`Filter applied! Showing ${getFilteredBloodRequests().length} requests.`);
            }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  const EditRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit User: {selectedRole?.selectedUser?.name}</h3>
          <button 
            onClick={() => setShowEditRoleModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {selectedRole?.selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={selectedRole.selectedUser.name}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={selectedRole.selectedUser.email}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedRole.selectedUser.status}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={selectedRole.name}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setShowEditRoleModal(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Update user logic here
              setShowEditRoleModal(false);
            }}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const DeleteRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-red-600">Delete Role</h3>
          <button 
            onClick={() => setShowDeleteRoleModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {selectedRole && (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600" size={32} />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete the role <strong>"{selectedRole.name}"</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone. All users with this role will need to be reassigned.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-2" size={16} />
                  <span className="text-sm text-yellow-800">
                    <strong>{selectedRole.userCount} users</strong> currently have this role
                  </span>
                </div>
              </div>
            </div>
            
            {selectedRole.userCount > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Users with this role:</p>
                <div className="max-h-32 overflow-y-auto">
                  {selectedRole.users.slice(0, 5).map(user => (
                    <div key={user.id} className="text-sm text-gray-700 py-1">
                      • {user.name} ({user.email})
                    </div>
                  ))}
                  {selectedRole.users.length > 5 && (
                    <div className="text-sm text-gray-500 py-1">
                      ... and {selectedRole.users.length - 5} more users
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setShowDeleteRoleModal(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedRole) {
                // Remove the role from the roles array
                setRoles(roles.filter(role => role.id !== selectedRole.id));
                setShowDeleteRoleModal(false);
                setSelectedRole(null);
              }
            }}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30"
          >
            Delete Role
          </button>
        </div>
      </div>
    </div>
  );

  // Reports Modal Components
  const ReportFilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filter Reports</h3>
          <button 
            onClick={() => setShowReportFilterModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="From Date"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="date"
                placeholder="To Date"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">All Types</option>
              <option value="donation">Donation Reports</option>
              <option value="user">User Reports</option>
              <option value="inventory">Inventory Reports</option>
              <option value="event">Event Reports</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button 
            onClick={() => setShowReportFilterModal(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.success('Filters applied successfully!');
              setShowReportFilterModal(false);
            }}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  const CustomReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Generate Custom Report</h3>
          <button 
            onClick={() => setShowCustomReportModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              name="type"
              value={customReport.type}
              onChange={(e) => setCustomReport({...customReport, type: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Report Type</option>
              <option value="blood-inventory">Blood Inventory Report</option>
              <option value="donor-statistics">Donor Statistics</option>
              <option value="blood-requests">Blood Requests Summary</option>
              <option value="blood-usage">Blood Usage Analysis</option>
              <option value="hospital-statistics">Hospital Statistics</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                name="startDate"
                value={customReport.startDate}
                onChange={(e) => setCustomReport({...customReport, startDate: e.target.value})}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="date"
                name="endDate"
                value={customReport.endDate}
                onChange={(e) => setCustomReport({...customReport, endDate: e.target.value})}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
            <select
              name="format"
              value={customReport.format}
              onChange={(e) => setCustomReport({...customReport, format: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setShowCustomReportModal(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleGenerateCustomReport();
              setShowCustomReportModal(false);
            }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );

  // System Settings Modal
  const SystemSettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">System Settings</h3>
          <button 
            onClick={() => setShowSettingsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>
            <input
              type="text"
              name="systemName"
              value={systemSettings.systemName}
              onChange={(e) => setSystemSettings({...systemSettings, systemName: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <input
              type="email"
              name="adminEmail"
              value={systemSettings.adminEmail}
              onChange={(e) => setSystemSettings({...systemSettings, adminEmail: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Settings</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={systemSettings.emailNotifications}
                  onChange={(e) => setSystemSettings({...systemSettings, emailNotifications: e.target.checked})}
                  className="mr-2"
                />
                Email Notifications
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={systemSettings.smsNotifications}
                  onChange={(e) => setSystemSettings({...systemSettings, smsNotifications: e.target.checked})}
                  className="mr-2"
                />
                SMS Notifications
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={systemSettings.pushNotifications}
                  onChange={(e) => setSystemSettings({...systemSettings, pushNotifications: e.target.checked})}
                  className="mr-2"
                />
                Push Notifications
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto Backup</label>
            <select
              name="autoBackup"
              value={systemSettings.autoBackup}
              onChange={(e) => setSystemSettings({...systemSettings, autoBackup: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setShowSettingsModal(false)}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSaveSettings();
              setShowSettingsModal(false);
            }}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/30"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  // Notification History Modal
  const NotificationHistoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notification History</h3>
          <button 
            onClick={() => setShowNotificationHistoryModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Filter Options */}
          <div className="flex space-x-4 mb-4">
            <select className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">All Types</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push Notification</option>
            </select>
            <select className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">All Status</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
            <input
              type="date"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          {/* Notification List */}
          <div className="space-y-2">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        index % 3 === 0 ? 'bg-blue-100 text-blue-800' :
                        index % 3 === 1 ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {index % 3 === 0 ? 'Email' : index % 3 === 1 ? 'SMS' : 'Push'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        index % 4 === 0 ? 'bg-green-100 text-green-800' :
                        index % 4 === 1 ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {index % 4 === 0 ? 'Sent' : index % 4 === 1 ? 'Failed' : 'Pending'}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">Blood Donation Campaign #{index + 1}</h4>
                    <p className="text-sm text-gray-600">Sent to {Math.floor(Math.random() * 1000)} recipients</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">Resend</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-4">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-red-600 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowNotificationHistoryModal(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const Authentication = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Authentication & Authorization</h3>
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
      
      {!isSuperAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-600 mr-2" size={20} />
            <div>
              <h4 className="text-yellow-800 font-medium">Giới hạn quyền hạn</h4>
              <p className="text-yellow-700 text-sm mt-1">
                Với role "{currentUser.role}", bạn chỉ có thể xem thông tin roles. 
                Chỉ Super Admin mới có thể tạo/sửa/xóa roles hệ thống.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">Role Management</h4>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm text-gray-500">{role.userCount} users • {role.permissions.length} permissions</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setShowViewRoleModal(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                    title="View Users"
                  >
                    <Eye size={16} />
                  </button>
                  {isSuperAdmin && (
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setShowEditRoleModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Role"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {isSuperAdmin && (
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setShowDeleteRoleModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Role"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isSuperAdmin && (
            <button 
              onClick={() => setShowCreateRoleModal(true)}
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Add New Role
            </button>
          )}
          {!isSuperAdmin && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-center">
              <p className="text-sm text-gray-600">
                <Shield size={16} className="inline mr-1" />
                Chỉ Super Admin mới có thể tạo/sửa/xóa roles
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-4">Active Sessions</h4>
          <div className="space-y-3">
            {[
              { user: 'admin@system.com', device: 'Chrome on Windows', location: 'Ho Chi Minh City', time: 'Active now' },
              { user: 'staff@system.com', device: 'Firefox on Mac', location: 'Ha Noi', time: '5 minutes ago' },
              { user: 'manager@system.com', device: 'Safari on iPhone', location: 'Da Nang', time: '15 minutes ago' }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{session.user}</div>
                  <div className="text-sm text-gray-500">{session.device} • {session.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{session.time}</div>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Terminate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'auth':
        return <Authentication />;
      case 'users':
        return <UserManagement />;
      case 'inventory':
        return <BloodInventory />;
      case 'events':
        return <EventManagement />;
      case 'requests':
        return <BloodRequests />;
      case 'notifications':
        return <NotificationSystem />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Modals */}
      {showCreateRoleModal && <CreateRoleModal />}
      {showViewRoleModal && <ViewRoleModal />}
      {showEditRoleModal && <EditRoleModal />}
      {showDeleteRoleModal && <DeleteRoleModal />}
      {showAddUserModal && <AddUserModal />}
      {showViewUserModal && <ViewUserModal />}
      {showEditUserModal && <EditUserModal />}
      {showDeleteUserModal && <DeleteUserModal />}
      {showFilterModal && <FilterModal />}
      {showAddBloodModal && <AddBloodUnitModal />}
      {showCreateEventModal && <CreateEventModal />}
      {showSendNotificationModal && <SendNotificationModal />}
      {showEventDetailsModal && <EventDetailsModal />}
      {showBloodRequestDetailsModal && <BloodRequestDetailsModal />}
      {showUpdateBloodModal && <UpdateBloodUnitModal />}
      {showBloodHistoryModal && <BloodHistoryModal />}
      {showBloodRequestFilterModal && <BloodRequestFilterModal />}
      {showReportFilterModal && <ReportFilterModal />}
      {showCustomReportModal && <CustomReportModal />}
      {showSettingsModal && <SystemSettingsModal />}
      {showNotificationHistoryModal && <NotificationHistoryModal />}
    </div>
  );
};

export default BloodDonationAdminDashboard;
