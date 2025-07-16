/**
 * SHARED COMPONENT: UserAvatar
 * 
 * PURPOSE:
 * Reusable user avatar component with consistent styling and fallback initials.
 * Supports different sizes and customization options.
 * 
 * FEATURES:
 * - Automatic initials generation from name
 * - Consistent gradient backgrounds
 * - Multiple size options
 * - Image support with fallback
 * - Accessibility features
 * 
 * REFACTORING BENEFITS:
 * - Eliminates duplicate avatar components
 * - Ensures consistent user representation
 * - Centralized avatar logic
 * - Easy to enhance with features like status indicators
 */

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { getInitials, getAvatarGradient } from '../../utils/adminDashboardUtils';

const UserAvatar = ({ 
  user, 
  size = 'md',
  showStatus = false,
  className = '',
  onClick = null,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Size configurations
  const sizeConfig = {
    xs: { container: 'w-6 h-6', text: 'text-xs', status: 'w-2 h-2' },
    sm: { container: 'w-8 h-8', text: 'text-sm', status: 'w-2 h-2' },
    md: { container: 'w-10 h-10', text: 'text-base', status: 'w-3 h-3' },
    lg: { container: 'w-12 h-12', text: 'text-lg', status: 'w-3 h-3' },
    xl: { container: 'w-16 h-16', text: 'text-xl', status: 'w-4 h-4' },
    '2xl': { container: 'w-20 h-20', text: 'text-2xl', status: 'w-5 h-5' }
  };
  
  const config = sizeConfig[size] || sizeConfig.md;
  const initials = getInitials(user?.name);
  const gradientClass = getAvatarGradient(user?.name || user?.email || 'default');
  
  // Status indicator color based on user status
  const getStatusColor = () => {
    const statusColors = {
      'Active': 'bg-green-500',
      'Inactive': 'bg-gray-400',
      'Pending': 'bg-yellow-500',
      'Suspended': 'bg-red-500'
    };
    return statusColors[user?.status] || 'bg-gray-400';
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const hasImage = user?.avatar && !imageError;
  const isClickable = onClick !== null;
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      {...props}
    >
      <div 
        className={`
          ${config.container} 
          rounded-full 
          flex 
          items-center 
          justify-center 
          font-bold 
          text-white 
          shadow-lg
          ${hasImage ? '' : `bg-gradient-to-r ${gradientClass}`}
          ${isClickable ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}
        `}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyPress={isClickable ? (e) => e.key === 'Enter' && onClick(e) : undefined}
        title={user?.name || 'User'}
      >
        {hasImage ? (
          <img
            src={user.avatar}
            alt={user.name || 'User'}
            className={`${config.container} rounded-full object-cover`}
            onError={handleImageError}
          />
        ) : (
          <span className={config.text}>
            {initials || <User size={parseInt(config.container.split('-')[1]) / 2} />}
          </span>
        )}
      </div>
      
      {/* Status Indicator */}
      {showStatus && user?.status && (
        <div 
          className={`
            absolute 
            bottom-0 
            right-0 
            ${config.status} 
            ${getStatusColor()} 
            rounded-full 
            border-2 
            border-white
          `}
          title={`Status: ${user.status}`}
        />
      )}
    </div>
  );
};

export default UserAvatar;
