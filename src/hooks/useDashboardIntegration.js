/**
 * Dashboard Integration Hooks
 * 
 * Custom React hooks for integrating frontend components with backend API services
 * Provides real-time data management, error handling, and state management
 * 
 * @author Blood System Development Team
 * @version 2.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { dashboardApi } from '../service/dashboardApi';
import { reportsApi } from '../service/reportsApi';
import { adminApi } from '../service/adminApi';
import { analyticsApi } from '../service/analyticsApi';
import { notificationsApi } from '../service/notificationsApi';
import { eventsApi } from '../service/eventsApi';

/**
 * Main dashboard integration hook
 * Manages all dashboard data and provides unified interface
 */
export const useDashboardIntegration = () => {
  // ===========================
  // STATE MANAGEMENT
  // ===========================
  const [dashboardData, setDashboardData] = useState({
    statistics: null,
    bloodDistribution: null,
    donationTrends: null,
    recentActivities: null,
    quickActions: null,
    realTimeData: null
  });

  const [loading, setLoading] = useState({
    dashboard: false,
    reports: false,
    analytics: false,
    notifications: false
  });

  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Refs for cleanup and interval management
  const intervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  // ===========================
  // ERROR HANDLING
  // ===========================
  const handleError = useCallback((context, error) => {
    console.error(`Dashboard ${context} error:`, error);
    setErrors(prev => ({
      ...prev,
      [context]: error
    }));
  }, []);

  const clearError = useCallback((context) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[context];
      return newErrors;
    });
  }, []);

  // ===========================
  // DATA FETCHING FUNCTIONS
  // ===========================
  
  /**
   * Load core dashboard statistics
   */
  const loadDashboardStats = useCallback(async () => {
    setLoading(prev => ({ ...prev, dashboard: true }));
    clearError('dashboard');
    
    try {
      const [statsResult, distributionResult, trendsResult, activitiesResult, quickActionsResult] = 
        await Promise.all([
          dashboardApi.getDashboardStats(),
          dashboardApi.getBloodTypeDistribution(),
          dashboardApi.getDonationTrends('7d'),
          dashboardApi.getRecentActivities(10),
          dashboardApi.getQuickActionCounts()
        ]);

      setDashboardData(prev => ({
        ...prev,
        statistics: statsResult.success ? statsResult.data : null,
        bloodDistribution: distributionResult.success ? distributionResult.data : null,
        donationTrends: trendsResult.success ? trendsResult.data : null,
        recentActivities: activitiesResult.success ? activitiesResult.data : null,
        quickActions: quickActionsResult.success ? quickActionsResult.data : null
      }));

      if (!statsResult.success) handleError('dashboard', statsResult.error);
      if (!distributionResult.success) handleError('distribution', distributionResult.error);
      if (!trendsResult.success) handleError('trends', trendsResult.error);
      
      setLastUpdated(new Date());
    } catch (error) {
      handleError('dashboard', error.message);
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  }, [handleError, clearError]);

  /**
   * Load real-time updates
   */
  const loadRealTimeUpdates = useCallback(async () => {
    try {
      const result = await dashboardApi.getRealTimeUpdates();
      if (result.success) {
        setDashboardData(prev => ({
          ...prev,
          realTimeData: result.data
        }));
      }
    } catch (error) {
      console.warn('Real-time update failed:', error);
    }
  }, []);

  /**
   * Refresh specific data sections
   */
  const refreshData = useCallback(async (sections = ['all']) => {
    const refreshPromises = [];

    if (sections.includes('all') || sections.includes('statistics')) {
      refreshPromises.push(loadDashboardStats());
    }

    if (sections.includes('all') || sections.includes('realtime')) {
      refreshPromises.push(loadRealTimeUpdates());
    }

    await Promise.all(refreshPromises);
  }, [loadDashboardStats, loadRealTimeUpdates]);

  // ===========================
  // ANALYTICS INTEGRATION
  // ===========================
  
  /**
   * Get KPI metrics for dashboard
   */
  const getKPIMetrics = useCallback(async (period = '30d') => {
    setLoading(prev => ({ ...prev, analytics: true }));
    try {
      const result = await analyticsApi.getKPIMetrics(period);
      setLoading(prev => ({ ...prev, analytics: false }));
      return result;
    } catch (error) {
      setLoading(prev => ({ ...prev, analytics: false }));
      handleError('analytics', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  /**
   * Get operational metrics
   */
  const getOperationalMetrics = useCallback(async (period = '7d') => {
    try {
      const result = await analyticsApi.getOperationalMetrics(period);
      return result;
    } catch (error) {
      handleError('operational', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  // ===========================
  // NOTIFICATION INTEGRATION
  // ===========================

  /**
   * Get system notifications for dashboard
   */
  const getSystemNotifications = useCallback(async (filters = { limit: 5 }) => {
    setLoading(prev => ({ ...prev, notifications: true }));
    try {
      const result = await notificationsApi.getSystemNotifications(filters);
      setLoading(prev => ({ ...prev, notifications: false }));
      return result;
    } catch (error) {
      setLoading(prev => ({ ...prev, notifications: false }));
      handleError('notifications', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  /**
   * Create system notification
   */
  const createNotification = useCallback(async (notificationData) => {
    try {
      const result = await notificationsApi.createSystemNotification(notificationData);
      if (result.success) {
        // Refresh notifications after creation
        await getSystemNotifications();
      }
      return result;
    } catch (error) {
      handleError('notificationCreate', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError, getSystemNotifications]);

  // ===========================
  // REPORTING INTEGRATION
  // ===========================

  /**
   * Generate dashboard report
   */
  const generateReport = useCallback(async (reportType, filters = {}) => {
    setLoading(prev => ({ ...prev, reports: true }));
    try {
      let result;
      switch (reportType) {
        case 'analytics':
          result = await reportsApi.getAnalyticsData(filters.period);
          break;
        case 'donations':
          result = await reportsApi.getDonationReports(filters);
          break;
        case 'inventory':
          result = await reportsApi.getInventoryReports(filters);
          break;
        case 'donors':
          result = await reportsApi.getDonorReports(filters);
          break;
        case 'requests':
          result = await reportsApi.getRequestReports(filters);
          break;
        case 'financial':
          result = await reportsApi.getFinancialReports(filters);
          break;
        default:
          result = { success: false, error: 'Unknown report type' };
      }
      
      setLoading(prev => ({ ...prev, reports: false }));
      return result;
    } catch (error) {
      setLoading(prev => ({ ...prev, reports: false }));
      handleError('reports', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  /**
   * Export report data
   */
  const exportReport = useCallback(async (reportType, format = 'pdf', filters = {}) => {
    try {
      let result;
      switch (format) {
        case 'pdf':
          result = await reportsApi.exportReportPDF(reportType, filters);
          break;
        case 'excel':
          result = await reportsApi.exportReportExcel(reportType, filters);
          break;
        case 'csv':
          result = await reportsApi.exportReportCSV(reportType, filters);
          break;
        default:
          return { success: false, error: 'Unsupported format' };
      }

      if (result.success) {
        // Create download link
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', result.filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }

      return result;
    } catch (error) {
      handleError('export', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  // ===========================
  // USER MANAGEMENT INTEGRATION
  // ===========================

  /**
   * Get users summary for dashboard
   */
  const getUsersSummary = useCallback(async () => {
    try {
      const result = await adminApi.getAllUsers({ summary: true, limit: 0 });
      return result;
    } catch (error) {
      handleError('users', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  // ===========================
  // EVENT INTEGRATION
  // ===========================

  /**
   * Get upcoming events for dashboard
   */
  const getUpcomingEvents = useCallback(async (limit = 5) => {
    try {
      const result = await eventsApi.getEvents({ 
        status: 'scheduled',
        limit,
        sortBy: 'startDate',
        sortOrder: 'asc'
      });
      return result;
    } catch (error) {
      handleError('events', error.message);
      return { success: false, error: error.message };
    }
  }, [handleError]);

  // ===========================
  // LIFECYCLE MANAGEMENT
  // ===========================

  /**
   * Initialize dashboard data
   */
  const initializeDashboard = useCallback(async () => {
    await loadDashboardStats();
    await loadRealTimeUpdates();
  }, [loadDashboardStats, loadRealTimeUpdates]);

  /**
   * Setup real-time updates
   */
  const setupRealTimeUpdates = useCallback((interval = 30000) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      loadRealTimeUpdates();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loadRealTimeUpdates]);

  // ===========================
  // EFFECTS
  // ===========================

  useEffect(() => {
    // Initialize dashboard on mount
    initializeDashboard();

    // Setup real-time updates
    const cleanup = setupRealTimeUpdates();

    // Cleanup on unmount
    return () => {
      cleanup();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [initializeDashboard, setupRealTimeUpdates]);

  // ===========================
  // RETURN INTERFACE
  // ===========================
  return {
    // Data
    dashboardData,
    loading,
    errors,
    lastUpdated,

    // Core Functions
    refreshData,
    clearError,

    // Analytics
    getKPIMetrics,
    getOperationalMetrics,

    // Notifications
    getSystemNotifications,
    createNotification,

    // Reports
    generateReport,
    exportReport,

    // User Management
    getUsersSummary,

    // Events
    getUpcomingEvents,

    // Lifecycle
    initializeDashboard,
    setupRealTimeUpdates
  };
};

/**
 * Report generation hook
 * Specialized hook for report functionality
 */
export const useReportGeneration = () => {
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportError, setReportError] = useState(null);

  const generateAndLoadReport = useCallback(async (reportType, filters = {}) => {
    setIsGenerating(true);
    setReportError(null);

    try {
      const result = await reportsApi.getAnalyticsData(filters.period || '30d');
      
      if (result.success) {
        setReportData({
          type: reportType,
          data: result.data,
          generatedAt: new Date(),
          filters
        });
      } else {
        setReportError(result.error);
      }
    } catch (error) {
      setReportError(error.message);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearReport = useCallback(() => {
    setReportData(null);
    setReportError(null);
  }, []);

  return {
    reportData,
    isGenerating,
    reportError,
    generateAndLoadReport,
    clearReport
  };
};

/**
 * Notification management hook
 * Specialized hook for notification functionality
 */
export const useNotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadNotifications = useCallback(async (filters = {}) => {
    setIsLoading(true);
    try {
      const result = await notificationsApi.getSystemNotifications(filters);
      if (result.success) {
        setNotifications(result.data);
        setUnreadCount(result.data.filter(n => !n.acknowledgedBy).length);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const acknowledgeNotification = useCallback(async (notificationId, userId) => {
    try {
      const result = await notificationsApi.acknowledgeNotification(notificationId, userId);
      if (result.success) {
        await loadNotifications();
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [loadNotifications]);

  const dismissNotification = useCallback(async (notificationId) => {
    try {
      const result = await notificationsApi.dismissNotification(notificationId);
      if (result.success) {
        await loadNotifications();
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [loadNotifications]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    loadNotifications,
    acknowledgeNotification,
    dismissNotification
  };
};

export default {
  useDashboardIntegration,
  useReportGeneration,
  useNotificationManagement
};
