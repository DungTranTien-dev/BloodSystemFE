// Custom hooks for admin management functionality
import { useState } from 'react';

export const useAdminManagement = () => {
  const [userRole, setUserRole] = useState('admin');
  const [systemSettings, setSystemSettings] = useState({
    autoApproval: false,
    emailNotifications: true,
    smsAlerts: false
  });
  const [donationEvent, setDonationEvent] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    maxDonors: 100
  });

  // Manage user functionality - Admin can assign roles
  const handleUserRoleChange = (role) => {
    setUserRole(role);
    // Log admin action for audit trail
    console.log(`Admin assigned role: ${role} to user`);
  };

  // Manage system settings
  const handleSystemSettingsChange = (setting, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    // Save system settings to backend
    saveSystemSettings({ ...systemSettings, [setting]: value });
  };

  // Create blood donation event
  const handleCreateDonationEvent = (eventData) => {
    // Validate event data
    if (!eventData.eventName || !eventData.eventDate) {
      alert('Please fill in required event details');
      return;
    }
    
    // Create event in system
    const newEvent = {
      id: Date.now(),
      ...eventData,
      createdBy: 'admin',
      createdAt: new Date(),
      status: 'active'
    };
    
    // Save to localStorage (in real app, this would be API call)
    const existingEvents = JSON.parse(localStorage.getItem('donationEvents') || '[]');
    localStorage.setItem('donationEvents', JSON.stringify([...existingEvents, newEvent]));
    
    alert(`Blood donation event "${eventData.eventName}" created successfully!`);
  };

  // Dashboard analytics data preparation
  const prepareDashboardData = () => {
    const donors = JSON.parse(localStorage.getItem('donors') || '[]');
    const events = JSON.parse(localStorage.getItem('donationEvents') || '[]');
    
    return {
      totalDonors: donors.length,
      activeEvents: events.filter(e => e.status === 'active').length,
      donationsThisMonth: donors.filter(d => {
        const donationDate = new Date(d.lastDonationDate);
        const now = new Date();
        return donationDate.getMonth() === now.getMonth() && 
               donationDate.getFullYear() === now.getFullYear();
      }).length,
      systemHealth: systemSettings.autoApproval ? 'Automated' : 'Manual Review'
    };
  };

  // Save system settings (simulate API call)
  const saveSystemSettings = async (settings) => {
    try {
      localStorage.setItem('systemSettings', JSON.stringify(settings));
      console.log('System settings saved:', settings);
    } catch (error) {
      console.error('Failed to save system settings:', error);
    }
  };

  // Create audit log for admin actions
  const createAuditLog = (action, details) => {
    const auditLog = {
      action,
      performedBy: userRole,
      timestamp: new Date(),
      details
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    localStorage.setItem('auditLogs', JSON.stringify([...existingLogs, auditLog]));
  };

  return {
    userRole,
    setUserRole,
    systemSettings,
    setSystemSettings,
    donationEvent,
    setDonationEvent,
    handleUserRoleChange,
    handleSystemSettingsChange,
    handleCreateDonationEvent,
    prepareDashboardData,
    saveSystemSettings,
    createAuditLog
  };
};
