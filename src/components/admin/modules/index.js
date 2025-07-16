/**
 * ADMIN DASHBOARD MODULES INDEX
 * 
 * PURPOSE:
 * Central export point for all admin dashboard modules. This file serves as the main
 * entry point for all modular components in the blood donation admin dashboard.
 * 
 * REFACTORING NOTES:
 * - Each module is self-contained with its own hooks, components, and utilities
 * - Modules can be lazy-loaded for better performance
 * - Clear separation of concerns between different functional areas
 * - Easy to add/remove modules without affecting others
 * 
 * AVAILABLE MODULES:
 * 1. UserManagement: User CRUD operations, role management, user statistics
 * 2. BloodInventory: Blood stock tracking, inventory alerts, expiration management
 * 3. BloodRequestsManagement: Request processing, approval workflows, tracking
 * 4. EventManagement: Blood drive events, scheduling, volunteer coordination
 * 5. NotificationSystem: Alert management, messaging, communication tools
 * 6. Reports: Analytics, reporting tools, data export functionality
 * 7. SystemSettings: Configuration, preferences, system maintenance
 * 8. Authentication: Login/logout, password management, session handling
 * 
 * USAGE EXAMPLES:
 * 
 * // Standard import
 * import { UserManagement } from './modules';
 * 
 * // Lazy loading for performance
 * const UserManagement = lazy(() => import('./modules/UserManagement'));
 * 
 * // Dynamic imports
 * const module = await import('./modules/BloodInventory');
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Use React.lazy() for code splitting
 * - Consider preloading critical modules
 * - Monitor bundle size for each module
 */

// Enhanced modules with comprehensive documentation
export { default as UserManagement } from './UserManagement-Enhanced';

// Standard modules (to be enhanced)
export { default as BloodInventory } from './BloodInventory';
export { default as BloodRequestsManagement } from './BloodRequestsManagement';
export { default as EventManagement } from './EventManagement';
export { default as NotificationSystem } from './NotificationSystem';
export { default as Reports } from './Reports';
export { default as SystemSettings } from './SystemSettings';
export { default as Authentication } from './Authentication';

// Module configurations and constants
export const MODULE_CONFIGS = {
  userManagement: {
    name: 'User Management',
    description: 'Manage users, roles, and permissions',
    permissions: ['admin', 'staff'],
    icon: 'users',
    color: 'blue'
  },
  bloodInventory: {
    name: 'Blood Inventory',
    description: 'Track blood stock and inventory levels',
    permissions: ['admin', 'staff', 'medical'],
    icon: 'droplet',
    color: 'red'
  },
  bloodRequests: {
    name: 'Blood Requests',
    description: 'Process and manage blood requests',
    permissions: ['admin', 'staff', 'medical'],
    icon: 'clipboard-list',
    color: 'green'
  },
  events: {
    name: 'Events',
    description: 'Organize blood drive events',
    permissions: ['admin', 'staff'],
    icon: 'calendar',
    color: 'purple'
  },
  notifications: {
    name: 'Notifications',
    description: 'Manage system notifications and alerts',
    permissions: ['admin', 'staff'],
    icon: 'bell',
    color: 'yellow'
  },
  reports: {
    name: 'Reports',
    description: 'Generate analytics and reports',
    permissions: ['admin'],
    icon: 'chart-bar',
    color: 'indigo'
  },
  settings: {
    name: 'System Settings',
    description: 'Configure system preferences',
    permissions: ['admin'],
    icon: 'cog',
    color: 'gray'
  },
  authentication: {
    name: 'Authentication',
    description: 'Manage login and security',
    permissions: ['admin'],
    icon: 'shield-check',
    color: 'emerald'
  }
};

// Module navigation helper
export const getModuleByRole = (userRole) => {
  return Object.entries(MODULE_CONFIGS)
    .filter(([_, config]) => config.permissions.includes(userRole))
    .map(([key, config]) => ({ key, ...config }));
};

// Module lazy loading helpers
export const loadModule = async (moduleName) => {
  try {
    const module = await import(`./${moduleName}`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load module: ${moduleName}`, error);
    throw error;
  }
};
