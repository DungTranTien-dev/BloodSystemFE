import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component that guards routes based on authentication
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string} props.requiredRole - Required role to access the route (admin, user)
 * @param {string} props.redirectTo - Path to redirect to if not authenticated (default: '/login')
 * @returns {React.ReactElement} Protected route component
 */
const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = '/login' 
}) => {  // Get authentication data from localStorage
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');

  // FOR DEVELOPMENT: Can bypass authentication if VITE_BYPASS_AUTH is set
  const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
  
  if (bypassAuth) {
    // In development mode with bypass enabled, allow access without authentication
    return children;
  }

  // Check if user is authenticated
  const isAuthenticated = userRole && userEmail;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If specific role is required, check role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on user role
    const roleRedirects = {
      admin: '/admin/dashboard',
      user: '/'
    };
    
    return <Navigate to={roleRedirects[userRole] || '/'} replace />;
  }

  // User is authenticated and has required role, render children
  return children;
};

export default ProtectedRoute;
