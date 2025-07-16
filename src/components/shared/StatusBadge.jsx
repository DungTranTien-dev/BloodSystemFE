/**
 * SHARED COMPONENT: StatusBadge
 * 
 * PURPOSE:
 * Reusable status badge component with consistent styling across the dashboard.
 * Supports different types of statuses with appropriate color coding.
 * 
 * FEATURES:
 * - Consistent styling and behavior
 * - Multiple status types support
 * - Customizable colors and sizes
 * - Accessibility-friendly
 * 
 * REFACTORING BENEFITS:
 * - Eliminates duplicate badge components
 * - Ensures consistent UI appearance
 * - Centralized styling management
 * - Easy to modify globally
 */

import React from 'react';
import { getStatusBadgeColor, getUrgencyBadgeColor } from '../../utils/adminDashboardUtils';

const StatusBadge = ({ 
  status, 
  type = 'user', 
  size = 'sm',
  urgency = null,
  className = '',
  ...props 
}) => {
  // Determine badge color based on type and status
  const getBadgeColor = () => {
    if (urgency) {
      return getUrgencyBadgeColor(urgency);
    }
    return getStatusBadgeColor(status, type);
  };
  
  // Determine size classes
  const getSizeClasses = () => {
    const sizes = {
      xs: 'px-2 py-0.5 text-xs',
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    };
    return sizes[size] || sizes.sm;
  };
  
  const baseClasses = 'inline-flex items-center font-semibold rounded-full';
  const colorClasses = getBadgeColor();
  const sizeClasses = getSizeClasses();
  
  return (
    <span 
      className={`${baseClasses} ${colorClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {urgency || status}
    </span>
  );
};

export default StatusBadge;
