/**
 * Main Admin Dashboard Layout
 * 
 * Comprehensive admin interface with integrated dashboard and reporting
 * Uses all backend API services for complete functionality
 * 
 * @author Blood System Development Team
 * @version 2.0.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileBarChart, 
  Users, 
  Droplets, 
  Calendar, 
  Settings,
  Bell,
  LogOut,
  Search,
  Menu,
  X
} from 'lucide-react';

// Import our components
import EnhancedDashboard from '../../components/admin/EnhancedDashboard';
import AdminReports from './AdminReports';
import UserManagement from '../../components/admin/UserManagement';

// Import hooks
import { useNotificationManagement } from '../../hooks/useDashboardIntegration';

const MainAdminDashboard = () => {
  // ===========================
  // STATE MANAGEMENT
  // ===========================
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Notification management
  const { notifications, unreadCount } = useNotificationManagement();

  // ===========================
  // NAVIGATION CONFIGURATION
  // ===========================
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview and real-time metrics'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileBarChart,
      description: 'Analytics and comprehensive reports'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      description: 'Manage donors, staff, and admins'
    },
    {
      id: 'inventory',
      label: 'Blood Inventory',
      icon: Droplets,
      description: 'Stock levels and distribution'
    },
    {
      id: 'events',
      label: 'Events & Campaigns',
      icon: Calendar,
      description: 'Blood drives and marketing'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      description: 'Configuration and preferences'
    }
  ];

  // ===========================
  // EVENT HANDLERS
  // ===========================
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ===========================
  // RENDER HELPERS
  // ===========================
  const renderSidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0`}>
      
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Droplets size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BloodBank</h1>
            <p className="text-xs text-gray-500">Admin Portal</p>
          </div>
        </div>
        
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={`mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
                
                {/* Notification badges */}
                {item.id === 'dashboard' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <Users size={20} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">System Administrator</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h2>
            <p className="text-sm text-gray-600">
              {navigationItems.find(item => item.id === activeSection)?.description}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <EnhancedDashboard />;
      case 'reports':
        return <AdminReports />;
      case 'users':
        return <UserManagement />;
      case 'inventory':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Droplets size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blood Inventory Management</h3>
              <p className="text-gray-600">This section will show comprehensive blood inventory management.</p>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Events & Campaigns</h3>
              <p className="text-gray-600">This section will show blood drive events and marketing campaigns.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Settings size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600">This section will show system configuration and settings.</p>
            </div>
          </div>
        );
      default:
        return <EnhancedDashboard />;
    }
  };

  // ===========================
  // EFFECTS
  // ===========================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ===========================
  // MAIN RENDER
  // ===========================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {renderSidebar()}
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        {renderHeader()}
        
        {/* Content */}
        <main className="min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainAdminDashboard;
