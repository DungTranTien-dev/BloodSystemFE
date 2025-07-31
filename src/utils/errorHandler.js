// Centralized Error Handler Utility
import { toast } from 'sonner';

/**
 * Standard error handling utility for the Blood Donation System
 * Provides consistent error handling across all components
 */

// Error Types
export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  SERVER: 'server',
  CLIENT: 'client',
  UNKNOWN: 'unknown'
};

/**
 * Main error handler function
 * @param {Error} error - The error object
 * @param {string} fallbackMessage - Default message if error parsing fails
 * @param {Object} options - Additional options for error handling
 */
export const handleApiError = (error, fallbackMessage = 'Có lỗi xảy ra', options = {}) => {
  const {
    showToast = true,
    logToConsole = true,
    context = 'Unknown',
    onError = null
  } = options;

  let errorMessage = fallbackMessage;
  let errorType = ERROR_TYPES.UNKNOWN;
  let statusCode = null;

  // Parse different error formats
  if (error?.response) {
    // Axios error response
    statusCode = error.response.status;
    errorMessage = error.response.data?.message || error.response.data?.error || fallbackMessage;
    
    // Determine error type based on status code
    if (statusCode >= 400 && statusCode < 500) {
      errorType = statusCode === 401 ? ERROR_TYPES.AUTHENTICATION :
                  statusCode === 403 ? ERROR_TYPES.AUTHORIZATION :
                  statusCode === 422 ? ERROR_TYPES.VALIDATION :
                  ERROR_TYPES.CLIENT;
    } else if (statusCode >= 500) {
      errorType = ERROR_TYPES.SERVER;
    }
  } else if (error?.message) {
    errorMessage = error.message;
    
    // Check for network errors
    if (error.message.includes('Network Error') || error.message.includes('fetch')) {
      errorType = ERROR_TYPES.NETWORK;
      errorMessage = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.';
    }
  }

  // Create error object for logging
  const errorData = {
    type: errorType,
    message: errorMessage,
    statusCode,
    context,
    timestamp: new Date().toISOString(),
    originalError: error
  };

  // Log to console if enabled
  if (logToConsole) {
    console.error(`[${context}] Error:`, errorData);
  }

  // Show toast notification if enabled
  if (showToast) {
    showErrorToast(errorMessage, errorType);
  }

  // Call custom error handler if provided
  if (onError && typeof onError === 'function') {
    onError(errorData);
  }

  return errorData;
};

/**
 * Show appropriate toast based on error type
 * @param {string} message - Error message
 * @param {string} type - Error type
 */
const showErrorToast = (message, type) => {
  const toastOptions = {
    duration: 5000,
    position: 'top-right'
  };

  switch (type) {
    case ERROR_TYPES.NETWORK:
      toast.error(message, {
        ...toastOptions,
        description: 'Kiểm tra kết nối mạng và thử lại'
      });
      break;
    
    case ERROR_TYPES.AUTHENTICATION:
      toast.error('Phiên đăng nhập đã hết hạn', {
        ...toastOptions,
        description: 'Vui lòng đăng nhập lại'
      });
      break;
    
    case ERROR_TYPES.AUTHORIZATION:
      toast.error('Không có quyền truy cập', {
        ...toastOptions,
        description: 'Bạn không có quyền thực hiện thao tác này'
      });
      break;
    
    case ERROR_TYPES.VALIDATION:
      toast.error(message, {
        ...toastOptions,
        description: 'Vui lòng kiểm tra lại thông tin nhập vào'
      });
      break;
    
    case ERROR_TYPES.SERVER:
      toast.error('Lỗi máy chủ', {
        ...toastOptions,
        description: 'Hệ thống đang gặp sự cố. Vui lòng thử lại sau.'
      });
      break;
    
    default:
      toast.error(message, toastOptions);
  }
};

/**
 * Success handler for consistent success messaging
 * @param {string} message - Success message
 * @param {Object} options - Additional options
 */
export const handleSuccess = (message, options = {}) => {
  const {
    showToast = true,
    description = null,
    duration = 3000,
    onSuccess = null
  } = options;

  if (showToast) {
    toast.success(message, {
      duration,
      description,
      position: 'top-right'
    });
  }

  if (onSuccess && typeof onSuccess === 'function') {
    onSuccess();
  }
};

/**
 * Validation error handler for forms
 * @param {Object} errors - Validation errors object
 * @param {string} context - Context for logging
 */
export const handleValidationErrors = (errors, context = 'Form Validation') => {
  const errorMessages = [];
  
  if (Array.isArray(errors)) {
    errorMessages.push(...errors);
  } else if (typeof errors === 'object') {
    Object.keys(errors).forEach(field => {
      const fieldErrors = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
      errorMessages.push(...fieldErrors);
    });
  } else if (typeof errors === 'string') {
    errorMessages.push(errors);
  }

  errorMessages.forEach((error, index) => {
    setTimeout(() => {
      toast.error(error, {
        duration: 4000,
        position: 'top-right'
      });
    }, index * 200); // Stagger multiple error messages
  });

  console.error(`[${context}] Validation errors:`, errors);
};

/**
 * Network status checker
 */
export const checkNetworkStatus = () => {
  if (!navigator.onLine) {
    toast.error('Không có kết nối mạng', {
      description: 'Vui lòng kiểm tra kết nối internet',
      duration: 5000
    });
    return false;
  }
  return true;
};

/**
 * Retry mechanism for failed API calls
 * @param {Function} apiCall - The API function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 */
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      lastError = error;
      
      console.warn(`API call attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  // All retries failed, throw the last error
  throw lastError;
};

/**
 * Custom hook for error boundary
 */
export const useErrorHandler = () => {
  const handleError = (error, context = 'Component') => {
    return handleApiError(error, 'Có lỗi xảy ra trong ứng dụng', {
      context,
      showToast: true,
      logToConsole: true
    });
  };

  return { handleError };
};

// Pre-configured error handlers for common scenarios
export const errorHandlers = {
  // Authentication errors
  auth: (error) => handleApiError(error, 'Lỗi xác thực', {
    context: 'Authentication',
    onError: (errorData) => {
      if (errorData.type === ERROR_TYPES.AUTHENTICATION) {
        // Redirect to login page
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    }
  }),

  // Data fetching errors
  fetch: (error, resource = 'dữ liệu') => handleApiError(
    error, 
    `Không thể tải ${resource}`, 
    { context: 'Data Fetching' }
  ),

  // Form submission errors
  form: (error) => handleApiError(error, 'Không thể gửi biểu mẫu', {
    context: 'Form Submission'
  }),

  // File upload errors
  upload: (error) => handleApiError(error, 'Không thể tải lên tệp', {
    context: 'File Upload'
  }),

  // Blood donation specific errors
  bloodDonation: (error) => handleApiError(error, 'Lỗi trong quá trình hiến máu', {
    context: 'Blood Donation'
  }),

  // User management errors
  userManagement: (error) => handleApiError(error, 'Lỗi quản lý người dùng', {
    context: 'User Management'
  }),

  // Inventory errors
  inventory: (error) => handleApiError(error, 'Lỗi quản lý kho máu', {
    context: 'Blood Inventory'
  })
};

export default {
  handleApiError,
  handleSuccess,
  handleValidationErrors,
  checkNetworkStatus,
  retryApiCall,
  useErrorHandler,
  errorHandlers,
  ERROR_TYPES
};
