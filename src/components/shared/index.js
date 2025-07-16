/**
 * SHARED COMPONENTS INDEX
 * 
 * PURPOSE:
 * Central export point for all shared/reusable components in the Blood Donation Admin Dashboard.
 * Promotes component reusability and maintains consistent imports across the application.
 * 
 * COMPONENTS INCLUDED:
 * - StatusBadge: Consistent status indicators with color coding
 * - UserAvatar: User profile pictures with fallback initials
 * - SearchInput: Debounced search input with clear functionality
 * - LoadingSpinner: Loading states and skeleton screens
 * - Modal: Base modal component for all popups
 * - Button: Styled button variants with consistent theming
 * - Table: Enhanced table component with sorting and pagination
 * - FormField: Form input components with validation
 * - Card: Container components with consistent styling
 * - BloodTypeIndicator: Blood type display component
 * 
 * USAGE:
 * import { StatusBadge, UserAvatar, SearchInput } from '../shared';
 * 
 * REFACTORING BENEFITS:
 * - Single import source for shared components
 * - Easy to track component dependencies
 * - Simplified component discovery
 * - Consistent component naming and exports
 */

// UI Components
export { default as StatusBadge } from './StatusBadge';
export { default as UserAvatar } from './UserAvatar';
export { default as SearchInput } from './SearchInput';

// Form Components (to be created)
// export { default as FormField } from './FormField';
// export { default as Button } from './Button';
// export { default as Modal } from './Modal';

// Table Components (to be created)
// export { default as Table } from './Table';
// export { default as TableHeader } from './Table/TableHeader';
// export { default as TableRow } from './Table/TableRow';
// export { default as TableCell } from './Table/TableCell';

// Layout Components (to be created)
// export { default as Card } from './Card';
// export { default as LoadingSpinner } from './LoadingSpinner';
// export { default as EmptyState } from './EmptyState';

// Domain-specific Components (to be created)
// export { default as BloodTypeIndicator } from './BloodTypeIndicator';
// export { default as RoleIndicator } from './RoleIndicator';
// export { default as StatCard } from './StatCard';

// Chart Components (to be created)
// export { default as DonutChart } from './Charts/DonutChart';
// export { default as LineChart } from './Charts/LineChart';
// export { default as BarChart } from './Charts/BarChart';
