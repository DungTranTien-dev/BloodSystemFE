import React, { useState, useEffect } from 'react';
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
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
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
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
              <Plus size={16} />
              <span>Add User</span>
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
            {users.map(user => (
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
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Eye size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
            <Plus size={16} />
            <span>Add Blood Unit</span>
          </button>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
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
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
                Update
              </button>
              <button className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded text-sm hover:shadow-lg hover:shadow-gray-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
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
        <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
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
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded text-sm hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
                View Details
              </button>
              <button className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-2 rounded text-sm hover:shadow-lg hover:shadow-gray-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
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
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
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
            {bloodRequests.map(request => (
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
                    <button className="text-green-600 hover:text-green-900">
                      <CheckCircle size={16} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const NotificationSystem = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notification System</h3>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
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
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600">
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
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600">
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
            <button className="w-full bg-purple-500 text-white px-4 py-2 rounded mt-3 hover:bg-purple-600">
              Send Push
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h4 className="font-semibold">Recent Notifications</h4>
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
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
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
            <button className={`w-full mt-3 bg-${report.color}-500 text-white px-4 py-2 rounded hover:bg-${report.color}-600`}>
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
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={16} />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
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
            <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
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
              <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Backup Now
              </button>
              <button className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
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
          <button className="w-full mt-3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
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
    </div>
  );
};

export default BloodDonationAdminDashboard;
