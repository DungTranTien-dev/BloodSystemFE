/**
 * Admin Management API Service
 * 
 * Handles all backend communications for admin management functionality
 * including user management, system settings, notifications, and admin operations
 * 
 * @author Blood System Development Team
 * @version 1.0.0
 */

import api from '../config/axios';

// ===========================
// USER MANAGEMENT
// ===========================

/**
 * Get all users with filtering and pagination
 */
export const getAllUsers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/admin/users?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock user data for development
    return {
      success: true,
      data: {
        users: [
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1234567890',
            role: 'Donor',
            bloodType: 'O+',
            status: 'Active',
            lastDonation: '2024-05-15',
            donationCount: 8,
            eligibleToDonate: true,
            createdAt: '2023-08-15',
            lastLogin: '2024-06-20'
          },
          {
            id: 2,
            name: 'Mary Johnson',
            email: 'mary.johnson@email.com',
            phone: '+1234567891',
            role: 'Donor',
            bloodType: 'A-',
            status: 'Active',
            lastDonation: '2024-06-01',
            donationCount: 12,
            eligibleToDonate: false,
            createdAt: '2023-06-20',
            lastLogin: '2024-06-21'
          },
          {
            id: 3,
            name: 'Dr. Sarah Wilson',
            email: 'sarah.wilson@hospital.com',
            phone: '+1234567892',
            role: 'Medical Staff',
            bloodType: 'B+',
            status: 'Active',
            lastDonation: null,
            donationCount: 0,
            eligibleToDonate: true,
            createdAt: '2023-09-10',
            lastLogin: '2024-06-21'
          },
          {
            id: 4,
            name: 'Admin User',
            email: 'admin@bloodsystem.com',
            phone: '+1234567893',
            role: 'Admin',
            bloodType: 'AB+',
            status: 'Active',
            lastDonation: null,
            donationCount: 0,
            eligibleToDonate: false,
            createdAt: '2023-01-01',
            lastLogin: '2024-06-21'
          },
          {
            id: 5,
            name: 'Robert Brown',
            email: 'robert.brown@email.com',
            phone: '+1234567894',
            role: 'Donor',
            bloodType: 'O-',
            status: 'Inactive',
            lastDonation: '2023-12-20',
            donationCount: 3,
            eligibleToDonate: true,
            createdAt: '2023-10-05',
            lastLogin: '2024-05-15'
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalUsers: 5,
          pageSize: 10
        },
        summary: {
          totalUsers: 5,
          activeUsers: 4,
          inactiveUsers: 1,
          donors: 3,
          staff: 1,
          admins: 1
        }
      }
    };
  } catch (error) {
    console.error('Users fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch users'
    };
  }
};

/**
 * Get user details by ID
 */
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/admin/users/${userId}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'User not found'
    };
  } catch (error) {
    console.error('User fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Create new user
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/api/admin/users', userData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create user'
    };
  } catch (error) {
    console.error('User creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Update user information
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/api/admin/users/${userId}`, userData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to update user'
    };
  } catch (error) {
    console.error('User update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/admin/users/${userId}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to delete user'
    };
  } catch (error) {
    console.error('User deletion failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Change user status (activate/deactivate)
 */
export const changeUserStatus = async (userId, status) => {
  try {
    const response = await api.patch(`/api/admin/users/${userId}/status`, { status });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to change user status'
    };
  } catch (error) {
    console.error('User status change failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Bulk operations on users
 */
export const bulkUserOperation = async (operation, userIds, data = {}) => {
  try {
    const response = await api.post('/api/admin/users/bulk', {
      operation,
      userIds,
      data
    });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Bulk operation failed'
    };
  } catch (error) {
    console.error('Bulk operation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// SYSTEM SETTINGS
// ===========================

/**
 * Get system settings
 */
export const getSystemSettings = async () => {
  try {
    const response = await api.get('/api/admin/settings');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock system settings
    return {
      success: true,
      data: {
        general: {
          systemName: 'Blood Bank Management System',
          systemVersion: '1.0.0',
          timezone: 'UTC+7',
          language: 'en',
          dateFormat: 'DD/MM/YYYY',
          currency: 'USD'
        },
        email: {
          smtpHost: 'smtp.gmail.com',
          smtpPort: 587,
          smtpUser: 'system@bloodbank.com',
          smtpPassword: '***hidden***',
          emailEnabled: true,
          notificationEmails: ['admin@bloodbank.com']
        },
        notifications: {
          lowStockAlert: true,
          lowStockThreshold: 10,
          expiryAlert: true,
          expiryDays: 7,
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true
        },
        security: {
          passwordMinLength: 8,
          passwordRequireSpecial: true,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          twoFactorAuth: false
        },
        backup: {
          autoBackup: true,
          backupFrequency: 'daily',
          backupRetention: 30,
          lastBackup: '2024-06-21T02:00:00Z'
        }
      }
    };
  } catch (error) {
    console.error('System settings fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Update system settings
 */
export const updateSystemSettings = async (settings) => {
  try {
    const response = await api.put('/api/admin/settings', settings);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to update system settings'
    };
  } catch (error) {
    console.error('System settings update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// NOTIFICATIONS
// ===========================

/**
 * Get all notifications
 */
export const getNotifications = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/admin/notifications?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock notifications
    return {
      success: true,
      data: [
        {
          id: 1,
          type: 'alert',
          title: 'Low Blood Stock Alert',
          message: 'O- blood type is running low (only 12 units remaining)',
          priority: 'high',
          read: false,
          createdAt: '2024-06-21T10:30:00Z',
          actionRequired: true,
          actionUrl: '/admin/inventory'
        },
        {
          id: 2,
          type: 'info',
          title: 'New Donor Registration',
          message: '5 new donors registered today',
          priority: 'medium',
          read: true,
          createdAt: '2024-06-21T09:15:00Z',
          actionRequired: false,
          actionUrl: '/admin/users'
        },
        {
          id: 3,
          type: 'warning',
          title: 'Blood Units Expiring Soon',
          message: '15 units of blood will expire in the next 3 days',
          priority: 'high',
          read: false,
          createdAt: '2024-06-21T08:00:00Z',
          actionRequired: true,
          actionUrl: '/admin/inventory'
        }
      ]
    };
  } catch (error) {
    console.error('Notifications fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Mark notification as read
 */
export const markNotificationRead = async (notificationId) => {
  try {
    const response = await api.patch(`/api/admin/notifications/${notificationId}/read`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to mark notification as read'
    };
  } catch (error) {
    console.error('Notification update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Send notification to users
 */
export const sendNotification = async (notificationData) => {
  try {
    const response = await api.post('/api/admin/notifications/send', notificationData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to send notification'
    };
  } catch (error) {
    console.error('Notification send failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// AUDIT LOGS
// ===========================

/**
 * Get audit logs
 */
export const getAuditLogs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/admin/audit-logs?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock audit logs
    return {
      success: true,
      data: [
        {
          id: 1,
          action: 'user_created',
          performedBy: 'Admin User',
          target: 'user:john.smith@email.com',
          details: 'Created new donor account',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0...',
          timestamp: '2024-06-21T10:30:00Z',
          severity: 'info'
        },
        {
          id: 2,
          action: 'blood_request_approved',
          performedBy: 'Medical Staff',
          target: 'request:REQ-2024-001',
          details: 'Approved blood request for 3 units of O+',
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0...',
          timestamp: '2024-06-21T09:45:00Z',
          severity: 'info'
        },
        {
          id: 3,
          action: 'settings_updated',
          performedBy: 'Super Admin',
          target: 'system:notification_settings',
          details: 'Updated email notification settings',
          ipAddress: '192.168.1.102',
          userAgent: 'Mozilla/5.0...',
          timestamp: '2024-06-21T08:15:00Z',
          severity: 'warning'
        }
      ]
    };
  } catch (error) {
    console.error('Audit logs fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// BACKUP & RESTORE
// ===========================

/**
 * Create system backup
 */
export const createBackup = async (backupOptions = {}) => {
  try {
    const response = await api.post('/api/admin/backup', backupOptions);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create backup'
    };
  } catch (error) {
    console.error('Backup creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get backup history
 */
export const getBackupHistory = async () => {
  try {
    const response = await api.get('/api/admin/backup/history');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock backup history
    return {
      success: true,
      data: [
        {
          id: 1,
          filename: 'backup_2024-06-21_02-00-00.sql',
          size: '45.2 MB',
          type: 'automated',
          status: 'completed',
          createdAt: '2024-06-21T02:00:00Z',
          createdBy: 'System'
        },
        {
          id: 2,
          filename: 'backup_2024-06-20_02-00-00.sql',
          size: '44.8 MB',
          type: 'automated',
          status: 'completed',
          createdAt: '2024-06-20T02:00:00Z',
          createdBy: 'System'
        },
        {
          id: 3,
          filename: 'manual_backup_2024-06-19_15-30-00.sql',
          size: '44.5 MB',
          type: 'manual',
          status: 'completed',
          createdAt: '2024-06-19T15:30:00Z',
          createdBy: 'Admin User'
        }
      ]
    };
  } catch (error) {
    console.error('Backup history fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Restore from backup
 */
export const restoreBackup = async (backupId) => {
  try {
    const response = await api.post(`/api/admin/backup/${backupId}/restore`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to restore backup'
    };
  } catch (error) {
    console.error('Backup restore failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// SYSTEM MONITORING
// ===========================

/**
 * Get system health status
 */
export const getSystemHealth = async () => {
  try {
    const response = await api.get('/api/admin/system/health');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock system health data
    return {
      success: true,
      data: {
        overall: 'healthy',
        database: {
          status: 'healthy',
          connections: 25,
          maxConnections: 100,
          responseTime: '12ms'
        },
        server: {
          status: 'healthy',
          cpu: 35.5,
          memory: 68.2,
          disk: 45.8,
          uptime: '15 days, 4 hours'
        },
        services: {
          emailService: 'healthy',
          notificationService: 'healthy',
          backupService: 'healthy',
          reportingService: 'healthy'
        },
        lastChecked: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('System health fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// DATA EXPORT/IMPORT
// ===========================

/**
 * Export user data
 */
export const exportUserData = async (format = 'xlsx', filters = {}) => {
  try {
    const response = await api.post(`/api/admin/export/users/${format}`, filters, {
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      filename: `users_export_${new Date().toISOString().split('T')[0]}.${format}`
    };
  } catch (error) {
    console.error('User data export failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Import user data
 */
export const importUserData = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/admin/import/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to import user data'
    };
  } catch (error) {
    console.error('User data import failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export default {
  // User Management
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserStatus,
  bulkUserOperation,
  
  // System Settings
  getSystemSettings,
  updateSystemSettings,
  
  // Notifications
  getNotifications,
  markNotificationRead,
  sendNotification,
  
  // Audit Logs
  getAuditLogs,
  
  // Backup & Restore
  createBackup,
  getBackupHistory,
  restoreBackup,
  
  // System Monitoring
  getSystemHealth,
  
  // Data Export/Import
  exportUserData,
  importUserData
};
