/**
 * Dashboard API Service
 * 
 * Handles all backend communications for admin dashboard functionality
 * including statistics, metrics, real-time data, and dashboard widgets
 * 
 * @author Blood System Development Team
 * @version 1.0.0
 */

import api from '../config/axios';

// ===========================
// DASHBOARD STATISTICS
// ===========================

/**
 * Get comprehensive dashboard statistics
 * Returns real-time metrics for admin overview
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/api/dashboard/statistics');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Fallback mock data for development
    return {
      success: true,
      data: {
        bloodGroups: {
          total: 8,
          listed: 6,
          active: 8,
          trend: '+2.5%',
          trendDirection: 'up'
        },
        users: {
          total: 1247,
          donors: 856,
          staff: 23,
          admins: 8,
          activeToday: 145,
          trend: '+12.3%',
          trendDirection: 'up'
        },
        bloodInventory: {
          totalUnits: 2340,
          availableUnits: 1890,
          expiringSoon: 45,
          criticalLevels: 3,
          trend: '-3.2%',
          trendDirection: 'down'
        },
        donations: {
          today: 12,
          thisWeek: 89,
          thisMonth: 356,
          total: 15678,
          trend: '+8.7%',
          trendDirection: 'up'
        },
        requests: {
          pending: 23,
          approved: 145,
          rejected: 12,
          total: 180,
          trend: '+15.2%',
          trendDirection: 'up'
        },
        events: {
          upcoming: 8,
          active: 3,
          completed: 45,
          total: 56,
          trend: '+22.1%',
          trendDirection: 'up'
        }
      }
    };
  } catch (error) {
    console.error('Dashboard stats fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch dashboard statistics'
    };
  }
};

/**
 * Get blood type distribution for dashboard charts
 */
export const getBloodTypeDistribution = async () => {
  try {
    const response = await api.get('/api/dashboard/blood-distribution');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock data for development
    return {
      success: true,
      data: [
        { bloodType: 'O+', count: 456, percentage: 32.5, color: '#ef4444' },
        { bloodType: 'A+', count: 342, percentage: 24.3, color: '#f97316' },
        { bloodType: 'B+', count: 234, percentage: 16.7, color: '#eab308' },
        { bloodType: 'AB+', count: 123, percentage: 8.8, color: '#22c55e' },
        { bloodType: 'O-', count: 98, percentage: 7.0, color: '#3b82f6' },
        { bloodType: 'A-', count: 76, percentage: 5.4, color: '#8b5cf6' },
        { bloodType: 'B-', count: 45, percentage: 3.2, color: '#ec4899' },
        { bloodType: 'AB-', count: 29, percentage: 2.1, color: '#06b6d4' }
      ]
    };
  } catch (error) {
    console.error('Blood distribution fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get donation trends data for charts
 */
export const getDonationTrends = async (period = '7d') => {
  try {
    const response = await api.get(`/api/dashboard/donation-trends?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock trend data
    const mockData = period === '7d' 
      ? [
          { date: '2024-01-15', donations: 23, requests: 8 },
          { date: '2024-01-16', donations: 19, requests: 12 },
          { date: '2024-01-17', donations: 31, requests: 15 },
          { date: '2024-01-18', donations: 28, requests: 9 },
          { date: '2024-01-19', donations: 35, requests: 18 },
          { date: '2024-01-20', donations: 42, requests: 22 },
          { date: '2024-01-21', donations: 38, requests: 16 }
        ]
      : [
          { date: '2024-01', donations: 856, requests: 234 },
          { date: '2024-02', donations: 923, requests: 267 },
          { date: '2024-03', donations: 1012, requests: 298 },
          { date: '2024-04', donations: 887, requests: 245 },
          { date: '2024-05', donations: 956, requests: 289 },
          { date: '2024-06', donations: 1089, requests: 334 }
        ];
    
    return {
      success: true,
      data: mockData
    };
  } catch (error) {
    console.error('Donation trends fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// REAL-TIME DATA
// ===========================

/**
 * Get real-time dashboard updates
 * Used for live data refresh without full page reload
 */
export const getRealTimeUpdates = async () => {
  try {
    const response = await api.get('/api/dashboard/realtime');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock real-time data
    return {
      success: true,
      data: {
        lastUpdated: new Date().toISOString(),
        activeUsers: Math.floor(Math.random() * 50) + 20,
        pendingRequests: Math.floor(Math.random() * 10) + 5,
        todayDonations: Math.floor(Math.random() * 20) + 10,
        criticalBloodTypes: ['O-', 'AB-'],
        systemStatus: 'healthy',
        notifications: [
          {
            id: 1,
            type: 'urgent',
            message: 'Critical blood level: O- type below minimum threshold',
            timestamp: new Date().toISOString()
          },
          {
            id: 2,
            type: 'info',
            message: 'Blood drive event scheduled for tomorrow',
            timestamp: new Date().toISOString()
          }
        ]
      }
    };
  } catch (error) {
    console.error('Real-time updates fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// ACTIVITY LOGS
// ===========================

/**
 * Get recent system activities for dashboard
 */
export const getRecentActivities = async (limit = 10) => {
  try {
    const response = await api.get(`/api/dashboard/activities?limit=${limit}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock activity data
    return {
      success: true,
      data: [
        {
          id: 1,
          type: 'donation',
          user: 'John Smith',
          action: 'completed blood donation',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          details: { bloodType: 'O+', volume: '500ml' }
        },
        {
          id: 2,
          type: 'request',
          user: 'City Hospital',
          action: 'requested blood units',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          details: { bloodType: 'AB-', units: 3 }
        },
        {
          id: 3,
          type: 'user',
          user: 'Mary Johnson',
          action: 'registered as new donor',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          details: { bloodType: 'A+' }
        },
        {
          id: 4,
          type: 'admin',
          user: 'Admin User',
          action: 'approved blood request',
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          details: { requestId: 'REQ-2024-001' }
        },
        {
          id: 5,
          type: 'system',
          user: 'System',
          action: 'blood inventory updated',
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          details: { operation: 'automated_expiry_check' }
        }
      ]
    };
  } catch (error) {
    console.error('Recent activities fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// QUICK ACTIONS
// ===========================

/**
 * Get quick action counters for dashboard widgets
 */
export const getQuickActionCounts = async () => {
  try {
    const response = await api.get('/api/dashboard/quick-actions');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock quick action data
    return {
      success: true,
      data: {
        pendingApprovals: 15,
        urgentRequests: 3,
        expiringSoon: 8,
        lowStock: 4,
        newDonors: 12,
        scheduledEvents: 2
      }
    };
  } catch (error) {
    console.error('Quick actions fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// DASHBOARD CONFIGURATION
// ===========================

/**
 * Save dashboard widget preferences
 */
export const saveDashboardConfig = async (config) => {
  try {
    const response = await api.post('/api/dashboard/config', config);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to save dashboard configuration'
    };
  } catch (error) {
    console.error('Dashboard config save failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get user's dashboard configuration
 */
export const getDashboardConfig = async () => {
  try {
    const response = await api.get('/api/dashboard/config');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Default configuration
    return {
      success: true,
      data: {
        widgets: ['statistics', 'charts', 'activities', 'quickActions'],
        layout: 'default',
        refreshInterval: 30000, // 30 seconds
        notifications: true,
        theme: 'light'
      }
    };
  } catch (error) {
    console.error('Dashboard config fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// EXPORT FUNCTIONS
// ===========================

/**
 * Export dashboard data as PDF report
 */
export const exportDashboardPDF = async (options = {}) => {
  try {
    const response = await api.post('/api/dashboard/export/pdf', options, {
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Dashboard PDF export failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Export dashboard data as Excel report
 */
export const exportDashboardExcel = async (options = {}) => {
  try {
    const response = await api.post('/api/dashboard/export/excel', options, {
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Dashboard Excel export failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export default {
  getDashboardStats,
  getBloodTypeDistribution,
  getDonationTrends,
  getRealTimeUpdates,
  getRecentActivities,
  getQuickActionCounts,
  saveDashboardConfig,
  getDashboardConfig,
  exportDashboardPDF,
  exportDashboardExcel
};
