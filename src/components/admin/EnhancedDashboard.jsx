/**
 * Enhanced Dashboard Component with Backend Integration
 * 
 * Comprehensive admin dashboard with real-time data, analytics, and reporting
 * Integrates with all backend API services for full functionality
 * 
 * @author Blood System Development Team
 * @version 2.0.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertTriangle, 
  Download, 
  Refresh,
  Bell,
  BarChart3,
  Activity,
  Heart,
  Droplets,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Filter
} from 'lucide-react';
import { useDashboardIntegration, useNotificationManagement } from '../hooks/useDashboardIntegration';

const EnhancedDashboard = () => {
  // ===========================
  // HOOKS & STATE
  // ===========================
  const {
    dashboardData,
    loading,
    errors,
    lastUpdated,
    refreshData,
    getKPIMetrics,
    generateReport,
    exportReport,
    getUpcomingEvents
  } = useDashboardIntegration();

  const {
    notifications,
    unreadCount,
    acknowledgeNotification,
    dismissNotification
  } = useNotificationManagement();

  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showNotifications, setShowNotifications] = useState(false);
  const [reportType, setReportType] = useState('analytics');
  const [kpiData, setKpiData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // ===========================
  // DATA PROCESSING
  // ===========================
  
  const statisticsCards = useMemo(() => {
    if (!dashboardData.statistics) return [];

    const stats = dashboardData.statistics;
    return [
      {
        id: 'total-donors',
        title: 'Total Donors',
        value: stats.users?.donors || 0,
        change: stats.users?.trend || '+0%',
        changeType: stats.users?.trendDirection === 'up' ? 'increase' : 'decrease',
        icon: Users,
        color: 'blue',
        description: 'Registered blood donors'
      },
      {
        id: 'blood-units',
        title: 'Blood Units Available',
        value: stats.bloodInventory?.availableUnits || 0,
        change: stats.bloodInventory?.trend || '+0%',
        changeType: stats.bloodInventory?.trendDirection === 'up' ? 'increase' : 'decrease',
        icon: Droplets,
        color: 'red',
        description: 'Units ready for distribution'
      },
      {
        id: 'today-donations',
        title: 'Today\'s Donations',
        value: stats.donations?.today || 0,
        change: stats.donations?.trend || '+0%',
        changeType: stats.donations?.trendDirection === 'up' ? 'increase' : 'decrease',
        icon: Heart,
        color: 'green',
        description: 'Donations collected today'
      },
      {
        id: 'pending-requests',
        title: 'Pending Requests',
        value: stats.requests?.pending || 0,
        change: stats.requests?.trend || '+0%',
        changeType: stats.requests?.trendDirection === 'up' ? 'increase' : 'decrease',
        icon: Clock,
        color: 'yellow',
        description: 'Awaiting approval'
      },
      {
        id: 'upcoming-events',
        title: 'Upcoming Events',
        value: stats.events?.upcoming || 0,
        change: stats.events?.trend || '+0%',
        changeType: stats.events?.trendDirection === 'up' ? 'increase' : 'decrease',
        icon: Calendar,
        color: 'purple',
        description: 'Scheduled blood drives'
      },
      {
        id: 'active-users',
        title: 'Active Users Today',
        value: stats.users?.activeToday || 0,
        change: '+12.3%',
        changeType: 'increase',
        icon: Activity,
        color: 'indigo',
        description: 'Users active in system'
      }
    ];
  }, [dashboardData.statistics]);

  const criticalAlerts = useMemo(() => {
    const alerts = [];
    
    if (dashboardData.statistics?.bloodInventory?.criticalLevels > 0) {
      alerts.push({
        id: 'critical-stock',
        type: 'critical',
        title: 'Critical Blood Stock',
        message: `${dashboardData.statistics.bloodInventory.criticalLevels} blood types below critical level`,
        icon: AlertTriangle,
        actionLabel: 'View Inventory'
      });
    }

    if (dashboardData.statistics?.bloodInventory?.expiringSoon > 0) {
      alerts.push({
        id: 'expiring-soon',
        type: 'warning',
        title: 'Units Expiring Soon',
        message: `${dashboardData.statistics.bloodInventory.expiringSoon} units expire in 7 days`,
        icon: Clock,
        actionLabel: 'View Details'
      });
    }

    return alerts;
  }, [dashboardData.statistics]);

  // ===========================
  // EVENT HANDLERS
  // ===========================

  const handleRefresh = async () => {
    await refreshData(['all']);
    await loadKPIMetrics();
    await loadUpcomingEvents();
  };

  const handleTimeRangeChange = async (range) => {
    setSelectedTimeRange(range);
    await refreshData(['trends']);
    await loadKPIMetrics();
  };

  const handleExportReport = async (format) => {
    const result = await exportReport(reportType, format, {
      period: selectedTimeRange,
      timestamp: new Date().toISOString()
    });

    if (result.success) {
      // Success handled by the hook (download initiated)
      console.log('Report exported successfully');
    } else {
      console.error('Export failed:', result.error);
      // Show error message to user
    }
  };

  const handleNotificationAction = async (notification, action) => {
    if (action === 'acknowledge') {
      await acknowledgeNotification(notification.id, 'current-user-id');
    } else if (action === 'dismiss') {
      await dismissNotification(notification.id);
    }
  };

  // ===========================
  // DATA LOADING
  // ===========================

  const loadKPIMetrics = async () => {
    const result = await getKPIMetrics(selectedTimeRange);
    if (result.success) {
      setKpiData(result.data);
    }
  };

  const loadUpcomingEvents = async () => {
    const result = await getUpcomingEvents(5);
    if (result.success) {
      setUpcomingEvents(result.data.events || []);
    }
  };

  // ===========================
  // EFFECTS
  // ===========================

  useEffect(() => {
    loadKPIMetrics();
    loadUpcomingEvents();
  }, [selectedTimeRange]);

  // ===========================
  // UTILITY FUNCTIONS
  // ===========================

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-50',
      red: 'bg-red-500 text-red-50',
      green: 'bg-green-500 text-green-50',
      yellow: 'bg-yellow-500 text-yellow-50',
      purple: 'bg-purple-500 text-purple-50',
      indigo: 'bg-indigo-500 text-indigo-50'
    };
    return colors[color] || colors.blue;
  };

  const formatLastUpdated = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Blood Bank Management System - Overview & Analytics
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded-full ${
                              notification.severity === 'critical' ? 'bg-red-100 text-red-600' :
                              notification.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <AlertTriangle size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {!notification.acknowledgedBy && (
                              <button
                                onClick={() => handleNotificationAction(notification, 'acknowledge')}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading.dashboard}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Refresh size={16} className={loading.dashboard ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Healthy</span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Export Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Export:</span>
                <button
                  onClick={() => handleExportReport('pdf')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleExportReport('excel')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-400' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <alert.icon size={20} className={
                      alert.type === 'critical' ? 'text-red-600' :
                      alert.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    } />
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                  <button className={`px-3 py-1 text-sm rounded ${
                    alert.type === 'critical' ? 'bg-red-600 text-white hover:bg-red-700' :
                    alert.type === 'warning' ? 'bg-yellow-600 text-white hover:bg-yellow-700' :
                    'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {alert.actionLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {statisticsCards.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{stat.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Blood Type Distribution Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Blood Type Distribution</h3>
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            
            {loading.dashboard ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : dashboardData.bloodDistribution ? (
              <div className="space-y-3">
                {dashboardData.bloodDistribution.map((item) => (
                  <div key={item.bloodType} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium">{item.bloodType}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{item.count} units</span>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                No data available
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <Activity size={20} className="text-gray-400" />
            </div>
            
            {loading.dashboard ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : dashboardData.recentActivities ? (
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'donation' ? 'bg-green-100 text-green-600' :
                      activity.type === 'request' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'user' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'admin' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'donation' && <Heart size={14} />}
                      {activity.type === 'request' && <Droplets size={14} />}
                      {activity.type === 'user' && <Users size={14} />}
                      {activity.type === 'admin' && <CheckCircle size={14} />}
                      {activity.type === 'system' && <Activity size={14} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                No activities recorded
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Blood Drive Events</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No upcoming events scheduled
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{event.location?.name}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      {event.registered}/{event.capacity} registered
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Display */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <XCircle size={20} className="text-red-600" />
              <h4 className="text-red-800 font-semibold">Errors Detected</h4>
            </div>
            <div className="mt-2 space-y-1">
              {Object.entries(errors).map(([context, error]) => (
                <p key={context} className="text-sm text-red-700">
                  {context}: {error}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDashboard;
