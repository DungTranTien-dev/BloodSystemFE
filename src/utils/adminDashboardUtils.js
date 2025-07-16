/**
 * UTILITY FUNCTIONS & CONSTANTS
 * 
 * PURPOSE:
 * Centralized utility functions, constants, and helper methods for the Blood Donation Admin Dashboard.
 * Promotes code reusability and maintains consistency across the application.
 * 
 * FEATURES:
 * - Data formatting and validation utilities
 * - Date and time manipulation functions
 * - Blood type validation and utilities
 * - User role and permission checking
 * - Export and import helpers
 * - UI state management utilities
 * 
 * REFACTORING BENEFITS:
 * - Eliminates code duplication across modules
 * - Centralizes business logic for easy maintenance
 * - Provides consistent data formatting
 * - Enables easier testing of utility functions
 * - Promotes single source of truth for constants
 */

// ===========================================
// CONSTANTS
// ===========================================

export const BLOOD_TYPES = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export const USER_ROLES = [
  'Super Admin',
  'Admin', 
  'Medical Staff',
  'Volunteer',
  'Donor'
];

export const USER_STATUSES = [
  'Active',
  'Inactive', 
  'Pending',
  'Suspended'
];

export const BLOOD_REQUEST_URGENCIES = [
  'Critical',
  'High',
  'Medium',
  'Low'
];

export const BLOOD_REQUEST_STATUSES = [
  'Pending',
  'Processing',
  'Approved',
  'Rejected',
  'Completed'
];

export const EVENT_STATUSES = [
  'Planning',
  'Active',
  'Completed',
  'Cancelled'
];

export const NOTIFICATION_TYPES = [
  'email',
  'sms',
  'push'
];

export const NOTIFICATION_URGENCIES = [
  'low',
  'normal',
  'high',
  'critical'
];

export const REPORT_FORMATS = [
  'CSV',
  'Excel',
  'PDF'
];

export const BLOOD_INVENTORY_STATUSES = [
  'Good',
  'Low',
  'Critical',
  'Expired'
];

// ===========================================
// BLOOD TYPE UTILITIES
// ===========================================

/**
 * Check if a blood type is a universal donor
 * @param {string} bloodType - Blood type to check
 * @returns {boolean} True if universal donor (O-)
 */
export const isUniversalDonor = (bloodType) => {
  return bloodType === 'O-';
};

/**
 * Check if a blood type is a universal recipient
 * @param {string} bloodType - Blood type to check
 * @returns {boolean} True if universal recipient (AB+)
 */
export const isUniversalRecipient = (bloodType) => {
  return bloodType === 'AB+';
};

/**
 * Get compatible blood types for receiving
 * @param {string} bloodType - Recipient blood type
 * @returns {array} Array of compatible donor blood types
 */
export const getCompatibleDonorTypes = (bloodType) => {
  const compatibility = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
  };
  
  return compatibility[bloodType] || [];
};

/**
 * Get compatible blood types for donating
 * @param {string} bloodType - Donor blood type
 * @returns {array} Array of compatible recipient blood types
 */
export const getCompatibleRecipientTypes = (bloodType) => {
  const compatibility = {
    'A+': ['A+', 'AB+'],
    'A-': ['A+', 'A-', 'AB+', 'AB-'],
    'B+': ['B+', 'AB+'],
    'B-': ['B+', 'B-', 'AB+', 'AB-'],
    'AB+': ['AB+'],
    'AB-': ['AB+', 'AB-'],
    'O+': ['A+', 'B+', 'AB+', 'O+'],
    'O-': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  };
  
  return compatibility[bloodType] || [];
};

// ===========================================
// USER & ROLE UTILITIES
// ===========================================

/**
 * Check if user has administrative privileges
 * @param {Object} user - User object
 * @returns {boolean} True if user is Admin or Super Admin
 */
export const isAdmin = (user) => {
  return user?.role === 'Admin' || user?.role === 'Super Admin';
};

/**
 * Check if user has super admin privileges
 * @param {Object} user - User object
 * @returns {boolean} True if user is Super Admin
 */
export const isSuperAdmin = (user) => {
  return user?.role === 'Super Admin';
};

/**
 * Check if user has medical staff privileges
 * @param {Object} user - User object
 * @returns {boolean} True if user is Medical Staff
 */
export const isMedicalStaff = (user) => {
  return user?.role === 'Medical Staff';
};

/**
 * Get user role priority for sorting
 * @param {string} role - User role
 * @returns {number} Priority number (lower = higher priority)
 */
export const getRolePriority = (role) => {
  const priorities = {
    'Super Admin': 1,
    'Admin': 2,
    'Medical Staff': 3,
    'Volunteer': 4,
    'Donor': 5
  };
  
  return priorities[role] || 999;
};

/**
 * Get role badge color class
 * @param {string} role - User role
 * @returns {string} CSS class for role badge
 */
export const getRoleBadgeColor = (role) => {
  const colors = {
    'Super Admin': 'bg-red-100 text-red-800',
    'Admin': 'bg-orange-100 text-orange-800',
    'Medical Staff': 'bg-blue-100 text-blue-800',
    'Volunteer': 'bg-green-100 text-green-800',
    'Donor': 'bg-purple-100 text-purple-800'
  };
  
  return colors[role] || 'bg-gray-100 text-gray-800';
};

// ===========================================
// DATE & TIME UTILITIES
// ===========================================

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('vi-VN');
    case 'long':
      return dateObj.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'relative':
      return getRelativeTime(dateObj);
    default:
      return dateObj.toLocaleDateString('vi-VN');
  }
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date} date - Date to get relative time for
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(date, 'short');
};

/**
 * Check if date is within specified days
 * @param {string|Date} date - Date to check
 * @param {number} days - Number of days
 * @returns {boolean} True if date is within specified days
 */
export const isWithinDays = (date, days) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const now = new Date();
  const diffMs = dateObj - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  return diffDays <= days && diffDays >= 0;
};

// ===========================================
// DATA VALIDATION UTILITIES
// ===========================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (Vietnamese)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+84|0)[1-9]\d{8,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate blood type
 * @param {string} bloodType - Blood type to validate
 * @returns {boolean} True if valid blood type
 */
export const isValidBloodType = (bloodType) => {
  return BLOOD_TYPES.includes(bloodType);
};

/**
 * Validate user data
 * @param {Object} userData - User data to validate
 * @returns {Object} Validation result with errors
 */
export const validateUserData = (userData) => {
  const errors = {};
  
  if (!userData.name || userData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  if (!userData.email || !isValidEmail(userData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (userData.phone && !isValidPhone(userData.phone)) {
    errors.phone = 'Please enter a valid Vietnamese phone number';
  }
  
  if (!userData.bloodType || !isValidBloodType(userData.bloodType)) {
    errors.bloodType = 'Please select a valid blood type';
  }
  
  if (!userData.role || !USER_ROLES.includes(userData.role)) {
    errors.role = 'Please select a valid role';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ===========================================
// STATUS UTILITIES
// ===========================================

/**
 * Get status badge color class
 * @param {string} status - Status value
 * @param {string} type - Type of status ('user', 'blood', 'request', 'event')
 * @returns {string} CSS class for status badge
 */
export const getStatusBadgeColor = (status, type = 'user') => {
  const colorMaps = {
    user: {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-gray-100 text-gray-800'
    },
    blood: {
      'Good': 'bg-green-100 text-green-800',
      'Low': 'bg-yellow-100 text-yellow-800',
      'Critical': 'bg-red-100 text-red-800',
      'Expired': 'bg-gray-100 text-gray-800'
    },
    request: {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Completed': 'bg-purple-100 text-purple-800'
    },
    event: {
      'Planning': 'bg-blue-100 text-blue-800',
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800'
    }
  };
  
  return colorMaps[type]?.[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get urgency badge color class
 * @param {string} urgency - Urgency level
 * @returns {string} CSS class for urgency badge
 */
export const getUrgencyBadgeColor = (urgency) => {
  const colors = {
    'Critical': 'bg-red-100 text-red-800',
    'High': 'bg-orange-100 text-orange-800',
    'Medium': 'bg-blue-100 text-blue-800',
    'Low': 'bg-green-100 text-green-800'
  };
  
  return colors[urgency] || 'bg-gray-100 text-gray-800';
};

// ===========================================
// EXPORT/IMPORT UTILITIES
// ===========================================

/**
 * Convert data to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Array of header names
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, headers) => {
  if (!data || data.length === 0) return '';
  
  const csvHeaders = headers.join(',');
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header] || '';
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Download data as CSV file
 * @param {Array} data - Data to download
 * @param {string} filename - File name
 * @param {Array} headers - CSV headers
 */
export const downloadCSV = (data, filename, headers) => {
  const csv = convertToCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// ===========================================
// SEARCH & FILTER UTILITIES
// ===========================================

/**
 * Create search filter function
 * @param {string} searchTerm - Search term
 * @param {Array} searchFields - Fields to search in
 * @returns {function} Filter function
 */
export const createSearchFilter = (searchTerm, searchFields) => {
  if (!searchTerm) return () => true;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return (item) => {
    return searchFields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerSearchTerm);
    });
  };
};

/**
 * Create multi-field filter function
 * @param {Object} filters - Filter criteria
 * @returns {function} Filter function
 */
export const createMultiFieldFilter = (filters) => {
  return (item) => {
    return Object.entries(filters).every(([field, value]) => {
      if (!value) return true;
      
      const itemValue = item[field];
      
      if (Array.isArray(value)) {
        return value.includes(itemValue);
      }
      
      return itemValue === value;
    });
  };
};

// ===========================================
// UI UTILITIES
// ===========================================

/**
 * Generate avatar initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  
  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate random gradient class for avatars
 * @param {string} seed - Seed for consistent color
 * @returns {string} CSS gradient class
 */
export const getAvatarGradient = (seed) => {
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-red-500 to-pink-600',
    'from-green-500 to-blue-600',
    'from-yellow-500 to-orange-600',
    'from-purple-500 to-indigo-600',
    'from-pink-500 to-red-600',
    'from-indigo-500 to-blue-600',
    'from-orange-500 to-yellow-600'
  ];
  
  const hash = seed ? seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) : 0;
  return gradients[hash % gradients.length];
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// ===========================================
// STATISTICS UTILITIES
// ===========================================

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (rounded to 1 decimal)
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100 * 10) / 10;
};

/**
 * Calculate growth rate
 * @param {number} current - Current period value
 * @param {number} previous - Previous period value
 * @returns {Object} Growth rate object with value and direction
 */
export const calculateGrowthRate = (current, previous) => {
  if (!previous || previous === 0) {
    return { rate: 0, direction: 'stable', formatted: '0%' };
  }
  
  const rate = ((current - previous) / previous) * 100;
  const direction = rate > 0 ? 'up' : rate < 0 ? 'down' : 'stable';
  const formatted = `${rate > 0 ? '+' : ''}${Math.round(rate * 10) / 10}%`;
  
  return { rate: Math.abs(rate), direction, formatted };
};

// ===========================================
// ERROR HANDLING UTILITIES
// ===========================================

/**
 * Create error message from validation errors
 * @param {Object} errors - Validation errors object
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (errors) => {
  if (!errors || Object.keys(errors).length === 0) return '';
  
  const errorMessages = Object.values(errors);
  if (errorMessages.length === 1) return errorMessages[0];
  
  return errorMessages.map((msg, index) => `${index + 1}. ${msg}`).join('\n');
};

/**
 * Handle API errors gracefully
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};
