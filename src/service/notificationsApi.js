/**
 * Notifications API Service
 * 
 * Handles all backend communications for notification and communication functionality
 * including alerts, messaging, email campaigns, and system notifications
 * 
 * @author Blood System Development Team
 * @version 1.0.0
 */

import api from '../config/axios';

// ===========================
// SYSTEM NOTIFICATIONS
// ===========================

/**
 * Get all system notifications
 */
export const getSystemNotifications = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/notifications/system?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock system notifications
    return {
      success: true,
      data: [
        {
          id: 1,
          type: 'alert',
          category: 'inventory',
          title: 'Critical Blood Stock Alert',
          message: 'O- blood type has dropped below critical level (8 units remaining)',
          severity: 'critical',
          priority: 'high',
          status: 'active',
          actionRequired: true,
          actionUrl: '/admin/inventory',
          createdAt: '2024-06-21T10:30:00Z',
          expiresAt: '2024-06-22T10:30:00Z',
          acknowledgedBy: null,
          acknowledgedAt: null,
          metadata: {
            bloodType: 'O-',
            currentStock: 8,
            minimumThreshold: 15,
            affectedRequests: 3
          }
        },
        {
          id: 2,
          type: 'warning',
          category: 'expiry',
          title: 'Blood Units Expiring Soon',
          message: '12 units of blood will expire in the next 48 hours',
          severity: 'warning',
          priority: 'medium',
          status: 'active',
          actionRequired: true,
          actionUrl: '/admin/inventory/expiring',
          createdAt: '2024-06-21T08:00:00Z',
          expiresAt: '2024-06-23T23:59:59Z',
          acknowledgedBy: null,
          acknowledgedAt: null,
          metadata: {
            expiringUnits: 12,
            timeframe: '48 hours',
            estimatedValue: '$2,400'
          }
        },
        {
          id: 3,
          type: 'info',
          category: 'donations',
          title: 'Daily Collection Target Achieved',
          message: 'Successfully collected 35 units today, exceeding target by 5 units',
          severity: 'info',
          priority: 'low',
          status: 'active',
          actionRequired: false,
          actionUrl: null,
          createdAt: '2024-06-21T18:00:00Z',
          expiresAt: '2024-06-22T06:00:00Z',
          acknowledgedBy: 'Admin User',
          acknowledgedAt: '2024-06-21T18:15:00Z',
          metadata: {
            collectedUnits: 35,
            targetUnits: 30,
            efficiency: 116.7
          }
        },
        {
          id: 4,
          type: 'success',
          category: 'requests',
          title: 'Emergency Request Fulfilled',
          message: 'Emergency blood request from City Hospital has been successfully fulfilled',
          severity: 'info',
          priority: 'medium',
          status: 'acknowledged',
          actionRequired: false,
          actionUrl: '/admin/requests',
          createdAt: '2024-06-21T14:30:00Z',
          expiresAt: null,
          acknowledgedBy: 'Medical Staff',
          acknowledgedAt: '2024-06-21T14:35:00Z',
          metadata: {
            requestId: 'REQ-2024-001',
            hospital: 'City Hospital',
            bloodType: 'AB-',
            units: 2,
            responseTime: '15 minutes'
          }
        }
      ]
    };
  } catch (error) {
    console.error('System notifications fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch notifications'
    };
  }
};

/**
 * Acknowledge notification
 */
export const acknowledgeNotification = async (notificationId, userId) => {
  try {
    const response = await api.patch(`/api/notifications/${notificationId}/acknowledge`, {
      userId,
      acknowledgedAt: new Date().toISOString()
    });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to acknowledge notification'
    };
  } catch (error) {
    console.error('Notification acknowledgment failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Dismiss notification
 */
export const dismissNotification = async (notificationId) => {
  try {
    const response = await api.patch(`/api/notifications/${notificationId}/dismiss`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to dismiss notification'
    };
  } catch (error) {
    console.error('Notification dismissal failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Create system notification
 */
export const createSystemNotification = async (notificationData) => {
  try {
    const response = await api.post('/api/notifications/system', notificationData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create notification'
    };
  } catch (error) {
    console.error('Notification creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// USER NOTIFICATIONS
// ===========================

/**
 * Send notification to specific users
 */
export const sendUserNotification = async (notification) => {
  try {
    const response = await api.post('/api/notifications/users', notification);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to send user notification'
    };
  } catch (error) {
    console.error('User notification send failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Send bulk notification to user groups
 */
export const sendBulkNotification = async (notificationData) => {
  try {
    const response = await api.post('/api/notifications/bulk', notificationData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to send bulk notification'
    };
  } catch (error) {
    console.error('Bulk notification send failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get user notification history
 */
export const getUserNotificationHistory = async (userId, filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/notifications/users/${userId}/history?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock user notification history
    return {
      success: true,
      data: [
        {
          id: 1,
          type: 'reminder',
          title: 'Donation Reminder',
          message: 'Your next eligible donation date is approaching',
          channel: 'email',
          status: 'delivered',
          sentAt: '2024-06-20T10:00:00Z',
          readAt: '2024-06-20T10:15:00Z',
          metadata: {
            nextEligibleDate: '2024-06-25',
            lastDonation: '2024-04-25'
          }
        },
        {
          id: 2,
          type: 'appreciation',
          title: 'Thank You for Your Donation',
          message: 'Thank you for your recent blood donation. Your contribution saves lives!',
          channel: 'sms',
          status: 'delivered',
          sentAt: '2024-06-15T14:30:00Z',
          readAt: null,
          metadata: {
            donationDate: '2024-06-15',
            bloodType: 'O+',
            units: 1
          }
        }
      ]
    };
  } catch (error) {
    console.error('User notification history fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// EMAIL CAMPAIGNS
// ===========================

/**
 * Create email campaign
 */
export const createEmailCampaign = async (campaignData) => {
  try {
    const response = await api.post('/api/notifications/campaigns/email', campaignData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create email campaign'
    };
  } catch (error) {
    console.error('Email campaign creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get email campaigns
 */
export const getEmailCampaigns = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/notifications/campaigns/email?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock email campaigns
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Monthly Donor Newsletter',
          subject: 'Your Impact This Month - Blood Donation Update',
          type: 'newsletter',
          status: 'sent',
          targetAudience: 'active_donors',
          recipientCount: 542,
          openRate: 68.3,
          clickRate: 12.7,
          scheduledAt: '2024-06-01T09:00:00Z',
          sentAt: '2024-06-01T09:00:00Z',
          createdBy: 'Marketing Team',
          template: 'monthly_newsletter'
        },
        {
          id: 2,
          name: 'Blood Drive Invitation',
          subject: 'Join Our Community Blood Drive - June 25th',
          type: 'event',
          status: 'scheduled',
          targetAudience: 'eligible_donors',
          recipientCount: 1247,
          openRate: null,
          clickRate: null,
          scheduledAt: '2024-06-23T08:00:00Z',
          sentAt: null,
          createdBy: 'Event Coordinator',
          template: 'event_invitation'
        },
        {
          id: 3,
          name: 'Emergency Blood Appeal',
          subject: 'Urgent: Critical Blood Shortage - Your Help Needed',
          type: 'urgent',
          status: 'sent',
          targetAudience: 'o_negative_donors',
          recipientCount: 89,
          openRate: 89.7,
          clickRate: 34.8,
          scheduledAt: '2024-06-20T15:00:00Z',
          sentAt: '2024-06-20T15:00:00Z',
          createdBy: 'Medical Director',
          template: 'emergency_appeal'
        }
      ]
    };
  } catch (error) {
    console.error('Email campaigns fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get campaign analytics
 */
export const getCampaignAnalytics = async (campaignId) => {
  try {
    const response = await api.get(`/api/notifications/campaigns/${campaignId}/analytics`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock campaign analytics
    return {
      success: true,
      data: {
        overview: {
          sent: 542,
          delivered: 538,
          opened: 368,
          clicked: 69,
          unsubscribed: 3,
          bounced: 4
        },
        rates: {
          deliveryRate: 99.3,
          openRate: 68.3,
          clickRate: 12.7,
          unsubscribeRate: 0.6,
          bounceRate: 0.7
        },
        timeline: [
          { hour: 0, opens: 45, clicks: 8 },
          { hour: 1, opens: 89, clicks: 15 },
          { hour: 2, opens: 134, clicks: 23 },
          { hour: 3, opens: 178, clicks: 31 },
          { hour: 4, opens: 203, clicks: 37 },
          { hour: 5, opens: 234, clicks: 42 },
          { hour: 6, opens: 267, clicks: 48 }
        ],
        topLinks: [
          { url: '/donate/schedule', clicks: 28, percentage: 40.6 },
          { url: '/events/blood-drive', clicks: 19, percentage: 27.5 },
          { url: '/donor/profile', clicks: 12, percentage: 17.4 },
          { url: '/contact', clicks: 10, percentage: 14.5 }
        ],
        conversions: {
          appointmentsScheduled: 23,
          eventRegistrations: 15,
          profileUpdates: 8,
          referrals: 4
        }
      }
    };
  } catch (error) {
    console.error('Campaign analytics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// SMS NOTIFICATIONS
// ===========================

/**
 * Send SMS notification
 */
export const sendSMSNotification = async (smsData) => {
  try {
    const response = await api.post('/api/notifications/sms', smsData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to send SMS notification'
    };
  } catch (error) {
    console.error('SMS notification send failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get SMS delivery status
 */
export const getSMSDeliveryStatus = async (messageId) => {
  try {
    const response = await api.get(`/api/notifications/sms/${messageId}/status`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to get SMS status'
    };
  } catch (error) {
    console.error('SMS status fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// PUSH NOTIFICATIONS
// ===========================

/**
 * Send push notification
 */
export const sendPushNotification = async (pushData) => {
  try {
    const response = await api.post('/api/notifications/push', pushData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to send push notification'
    };
  } catch (error) {
    console.error('Push notification send failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Register device for push notifications
 */
export const registerPushDevice = async (deviceData) => {
  try {
    const response = await api.post('/api/notifications/push/register', deviceData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to register device'
    };
  } catch (error) {
    console.error('Device registration failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// NOTIFICATION TEMPLATES
// ===========================

/**
 * Get notification templates
 */
export const getNotificationTemplates = async (type = 'all') => {
  try {
    const response = await api.get(`/api/notifications/templates?type=${type}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock notification templates
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Donation Reminder',
          type: 'email',
          category: 'reminder',
          subject: 'Time to Donate Again - Your Help is Needed',
          content: 'Dear {{donor_name}}, it\'s been {{days_since_last}} days since your last donation...',
          variables: ['donor_name', 'days_since_last', 'next_eligible_date'],
          isActive: true,
          usage: 1247,
          lastModified: '2024-06-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'Appointment Confirmation',
          type: 'sms',
          category: 'confirmation',
          subject: null,
          content: 'Hi {{donor_name}}, your blood donation appointment is confirmed for {{appointment_date}} at {{appointment_time}}. Location: {{location}}',
          variables: ['donor_name', 'appointment_date', 'appointment_time', 'location'],
          isActive: true,
          usage: 890,
          lastModified: '2024-06-10T14:30:00Z'
        },
        {
          id: 3,
          name: 'Critical Blood Alert',
          type: 'push',
          category: 'urgent',
          subject: 'Critical Blood Shortage',
          content: 'We urgently need {{blood_type}} donors. Your donation could save lives today!',
          variables: ['blood_type'],
          isActive: true,
          usage: 156,
          lastModified: '2024-06-20T16:45:00Z'
        }
      ]
    };
  } catch (error) {
    console.error('Notification templates fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Create notification template
 */
export const createNotificationTemplate = async (templateData) => {
  try {
    const response = await api.post('/api/notifications/templates', templateData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create template'
    };
  } catch (error) {
    console.error('Template creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Update notification template
 */
export const updateNotificationTemplate = async (templateId, templateData) => {
  try {
    const response = await api.put(`/api/notifications/templates/${templateId}`, templateData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to update template'
    };
  } catch (error) {
    console.error('Template update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// NOTIFICATION SETTINGS
// ===========================

/**
 * Get notification settings
 */
export const getNotificationSettings = async () => {
  try {
    const response = await api.get('/api/notifications/settings');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock notification settings
    return {
      success: true,
      data: {
        email: {
          enabled: true,
          maxPerDay: 5,
          quietHours: { start: '22:00', end: '08:00' },
          unsubscribeRate: 2.3
        },
        sms: {
          enabled: true,
          maxPerDay: 3,
          quietHours: { start: '21:00', end: '09:00' },
          costPerMessage: 0.05
        },
        push: {
          enabled: true,
          maxPerDay: 10,
          quietHours: { start: '22:00', end: '08:00' },
          deliveryRate: 94.5
        },
        preferences: {
          respectUserPreferences: true,
          defaultOptIn: false,
          requireDoubleOptIn: true
        }
      }
    };
  } catch (error) {
    console.error('Notification settings fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Update notification settings
 */
export const updateNotificationSettings = async (settings) => {
  try {
    const response = await api.put('/api/notifications/settings', settings);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to update notification settings'
    };
  } catch (error) {
    console.error('Notification settings update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export default {
  // System Notifications
  getSystemNotifications,
  acknowledgeNotification,
  dismissNotification,
  createSystemNotification,
  
  // User Notifications
  sendUserNotification,
  sendBulkNotification,
  getUserNotificationHistory,
  
  // Email Campaigns
  createEmailCampaign,
  getEmailCampaigns,
  getCampaignAnalytics,
  
  // SMS Notifications
  sendSMSNotification,
  getSMSDeliveryStatus,
  
  // Push Notifications
  sendPushNotification,
  registerPushDevice,
  
  // Templates
  getNotificationTemplates,
  createNotificationTemplate,
  updateNotificationTemplate,
  
  // Settings
  getNotificationSettings,
  updateNotificationSettings
};
