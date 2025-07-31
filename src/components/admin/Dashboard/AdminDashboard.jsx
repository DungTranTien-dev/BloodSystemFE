// Base Admin Dashboard - Refactored Main Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Users, 
  Droplets, 
  Calendar, 
  Bell, 
  Settings, 
  BarChart3,
  Shield,
  Menu,
  X
} from 'lucide-react';

// Import refactored sub-components
import UserManagement from './UserManagement';
import BloodInventory from './BloodInventory';
import EventManagement from './EventManagement';
import NotificationCenter from './NotificationCenter';
import ReportsSection from './ReportsSection';
import SystemSettings from './SystemSettings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [currentUser] = useState({
    name: 'Admin Nguyễn Văn A',
    role: 'Super Admin',
    avatar: '/api/placeholder/40/40'
  });

  // Check if current user is Super Admin
  const isSuperAdmin = currentUser.role === 'Super Admin';

  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3, component: OverviewDashboard },
    { id: 'users', label: 'Quản lý người dùng', icon: Users, component: UserManagement },
    { id: 'blood', label: 'Kho máu', icon: Droplets, component: BloodInventory },
    { id: 'events', label: 'Sự kiện', icon: Calendar, component: EventManagement },
    { id: 'notifications', label: 'Thông báo', icon: Bell, component: NotificationCenter },
    { id: 'reports', label: 'Báo cáo', icon: BarChart3, component: ReportsSection },
    ...(isSuperAdmin ? [
      { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings, component: SystemSettings }
    ] : [])
  ];

  const handleLogout = () => {
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component || OverviewDashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
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
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen transition-all duration-300 overflow-hidden`}>
          <div className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-6">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

// Overview Dashboard Component
const OverviewDashboard = () => {
  const stats = [
    { label: 'Tổng người dùng', value: '1,234', change: '+12%', color: 'blue' },
    { label: 'Đơn vị máu', value: '456', change: '+8%', color: 'red' },
    { label: 'Sự kiện tháng này', value: '23', change: '+15%', color: 'green' },
    { label: 'Yêu cầu chờ duyệt', value: '12', change: '-3%', color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tổng quan hệ thống</h2>
        <p className="text-gray-600">Thống kê tổng quan về hoạt động hiến máu</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`px-2 py-1 text-sm font-medium rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="text-blue-500 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Thêm người dùng</h4>
            <p className="text-sm text-gray-600">Tạo tài khoản mới cho người hiến máu</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Droplets className="text-red-500 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Nhập kho máu</h4>
            <p className="text-sm text-gray-600">Cập nhật đơn vị máu mới vào kho</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="text-green-500 mb-2" size={24} />
            <h4 className="font-medium text-gray-900">Tạo sự kiện</h4>
            <p className="text-sm text-gray-600">Lên lịch chiến dịch hiến máu mới</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
