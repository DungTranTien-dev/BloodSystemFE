import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FaChevronRight,
  FaTachometerAlt, 
  FaUsers, 
  FaUser, 
  FaSearch, 
  FaEdit, 
  FaEnvelope,
  FaCog,
  FaChartBar,
  FaBell
} from 'react-icons/fa';

// Constants directly in component to avoid import issues
const APP_CONFIG = {
  name: 'BloodBank & Donor Management System',
  version: '1.0.0',
  description: 'Comprehensive blood bank management solution',
  lastUpdated: '2024-12-11'
};

const MENU_ITEMS = [
  { 
    icon: FaTachometerAlt, 
    label: 'Dashboard', 
    path: '/admin/dashboard',
    description: 'Main dashboard overview with key metrics',
    category: 'main'
  },
  { 
    icon: FaUsers, 
    label: 'Blood Group', 
    path: '/admin/blood-group',
    description: 'Manage blood group types and categories',
    category: 'main'
  },
  { 
    icon: FaUser, 
    label: 'Donor List', 
    path: '/admin/donor-list',
    description: 'View and manage registered donors',
    category: 'main'
  },
  { 
    icon: FaSearch, 
    label: 'Manage Contactus Query', 
    path: '/admin/contactus',
    description: 'Handle contact form queries and support requests',
    category: 'main'
  },
  { 
    icon: FaEdit, 
    label: 'Manage Pages', 
    path: '/admin/pages',
    description: 'Content management system for website pages',
    category: 'main'
  },
  { 
    icon: FaEdit, 
    label: 'Update Contact Info', 
    path: '/admin/contact-info',
    description: 'Update organization contact details',
    category: 'settings'
  },
  { 
    icon: FaEnvelope, 
    label: 'Request Received By Donar', 
    path: '/admin/requests',
    description: 'Manage blood donation requests from donors',
    category: 'main'
  },
  { 
    icon: FaCog, 
    label: 'Settings', 
    path: '/admin/settings',
    description: 'System configuration and preferences',
    category: 'settings'
  }
];

const DEFAULT_STATISTICS = [
  {
    id: 'blood-groups',
    number: '6',
    title: 'LISTED BLOOD GROUPS',
    bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
    fullDetailText: 'FULL DETAIL',
    description: 'Total number of blood group types in system',
    trend: '+2.5%',
    trendDirection: 'up'
  },
  {
    id: 'registered-groups',
    number: '9',
    title: 'REGISTERED BLOOD GROUP',
    bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
    fullDetailText: 'FULL DETAIL',
    description: 'Active registered blood groups',
    trend: '+5.2%',
    trendDirection: 'up'
  },
  {
    id: 'total-queries',
    number: '0',
    title: 'TOTAL QUERIES',
    bgColor: 'bg-gradient-to-br from-red-400 to-pink-500',
    fullDetailText: 'FULL DETAIL',
    description: 'Contact form queries received',
    trend: '0%',
    trendDirection: 'neutral'
  },
  {
    id: 'blood-requests',
    number: '5',
    title: 'TOTAL BLOOD REQUEST RECEIVED',
    bgColor: 'bg-gradient-to-br from-pink-400 to-red-500',
    fullDetailText: 'FULL DETAIL',
    description: 'Blood donation requests from donors',
    trend: '+12.3%',
    trendDirection: 'up'
  }
];

// Simple utility functions
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

const getTrendIndicator = (direction) => {
  if (direction > 0) {
    return {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      symbol: '↗'
    };
  } else if (direction < 0) {
    return {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      symbol: '↘'
    };
  } else {
    return {
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      symbol: '→'
    };
  }
};

const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
};

/**
 * Admin Dashboard Component
 * 
 * Main dashboard for BloodBank & Donor Management System
 * Features:
 * - Sidebar navigation with menu items
 * - Statistics cards showing key metrics
 * - Responsive design with Tailwind CSS
 * - Interactive menu state management
 * - Local storage for user preferences
 * 
 * @component
 * @author Your Name
 * @version 1.0.0
 */
const Dashboard = () => {
  // State management
  const [activeMenu, setActiveMenu] = useState(() => 
    storage.get('activeMenu', 'Dashboard')
  );
  const [isLoading, setIsLoading] = useState(true);
  const [statisticsData, setStatisticsData] = useState(DEFAULT_STATISTICS);

  // Memoized values
  const greeting = useMemo(() => getTimeBasedGreeting(), []);
  const currentDate = useMemo(() => formatDate(new Date()), []);

  /**
   * Load dashboard data on component mount
   * In real application, this would fetch data from API
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real app, replace with actual API call:
        // const data = await fetchDashboardStats();
        // setStatisticsData(data);
        
        setStatisticsData(DEFAULT_STATISTICS);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Handle error state here
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /**
   * Save active menu to localStorage when it changes
   */
  useEffect(() => {
    storage.set('activeMenu', activeMenu);
  }, [activeMenu]);
  /**
   * Enhanced Statistics Card Component
   * 
   * Displays key metrics with consistent styling and enhanced features
   * Features hover effects, loading states, and trend indicators
   * 
   * @param {Object} props - Component props
   * @param {string} props.number - Main statistic number
   * @param {string} props.title - Card title/description
   * @param {string} props.bgColor - Background color class
   * @param {string} props.fullDetailText - Footer action text
   * @param {string} props.trend - Trend percentage
   * @param {string} props.trendDirection - Direction of trend (up/down/neutral)
   * @param {Function} props.onClick - Click handler for card
   * @param {boolean} props.isLoading - Loading state
   * @returns {React.ReactElement} Statistics card element
   */
  const StatCard = ({ 
    number, 
    title, 
    bgColor, 
    fullDetailText, 
    trend, 
    trendDirection,
    onClick, 
    isLoading = false 
  }) => {
    const trendInfo = getTrendIndicator(
      trendDirection === 'up' ? 1 : trendDirection === 'down' ? -1 : 0
    );    if (isLoading) {
      return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
          <div className="p-8">
            <div className="h-10 bg-slate-200 rounded mb-2"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          </div>
          <div className="bg-slate-100 h-12"></div>
        </div>
      );
    }

    return (
      <div 
        className={`${bgColor} rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl group`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
        aria-label={`${title}: ${number}. ${trend ? `Trend: ${trend} ${trendDirection}` : ''}`}
      >
        {/* Main content area */}
        <div className="p-8 text-white relative">
          {/* Trend indicator */}
          {trend && (
            <div className={`absolute top-6 right-6 ${trendInfo.bgColor} ${trendInfo.color} px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
              {trendInfo.symbol} {trend}
            </div>
          )}
          
          <div className="text-5xl font-bold mb-4 drop-shadow-lg" aria-label={`${number} ${title}`}>
            {formatNumber(parseInt(number) || 0)}
          </div>
          <div className="text-lg font-semibold pr-20 leading-tight">
            {title}
          </div>
        </div>
        
        {/* Footer with action button */}
        <div className="bg-white bg-opacity-20 px-8 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white text-sm font-medium">
            <span>{fullDetailText}</span>
            <FaChevronRight className="text-sm transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
          </div>
        </div>
      </div>
    );
  };

  // PropTypes for StatCard component
  StatCard.propTypes = {
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    fullDetailText: PropTypes.string.isRequired,
    trend: PropTypes.string,
    trendDirection: PropTypes.oneOf(['up', 'down', 'neutral']),
    onClick: PropTypes.func,
    isLoading: PropTypes.bool
  };

  StatCard.defaultProps = {
    trend: null,
    trendDirection: 'neutral',
    onClick: () => {},
    isLoading: false
  };

  /**
   * Handle menu item click
   * Updates active menu state and could handle navigation
   * 
   * @param {string} menuLabel - Label of clicked menu item
   * @param {string} path - Navigation path
   */
  const handleMenuClick = (menuLabel, path) => {
    setActiveMenu(menuLabel);
    // TODO: Add navigation logic here
    // navigate(path);
    console.log(`Navigating to: ${path}`);
  };

  /**
   * Handle statistics card click
   * Could open detailed view or navigate to specific section
   * 
   * @param {string} cardId - Unique identifier for the card
   */
  const handleStatCardClick = (cardId) => {
    // TODO: Add navigation or modal logic
    console.log(`Clicked on stat card: ${cardId}`);
  };

  /**
   * Get grouped menu items for organized display
   */
  const menuCategories = useMemo(() => {
    const categories = {};
    MENU_ITEMS.forEach(item => {
      const category = item.category || 'main';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });
    return categories;
  }, []);  return (
    <div className="min-h-screen bg-slate-50 flex" role="main">
      {/* 
        SIDEBAR NAVIGATION
        Fixed width sidebar with navigation menu
        Contains system branding and main navigation items
      */}
      <aside className="w-64 bg-white shadow-xl text-slate-800 flex flex-col border-r border-slate-200" role="navigation" aria-label="Main navigation">        {/* System Header/Branding */}        <header className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 border-b">
          <h1 className="text-lg font-bold leading-tight">
            {APP_CONFIG.name}
          </h1>
          <p className="text-xs text-red-100 mt-1">
            v{APP_CONFIG.version}
          </p>
        </header>
        
        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          {/* Main Menu Section */}
          <div className="px-4 mb-4">            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
              MAIN
            </span>
          </div>
            {/* Menu Items */}
          <ul className="space-y-1">
            {MENU_ITEMS.filter(item => item.category === 'main').map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <button
                  onClick={() => handleMenuClick(item.label, item.path)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors duration-200 rounded-r-full mr-4 ${
                    activeMenu === item.label 
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 border-r-4 border-red-500 text-red-700' 
                      : 'text-slate-600 hover:text-red-600'
                  }`}
                  aria-current={activeMenu === item.label ? 'page' : undefined}
                  title={item.description}
                >
                  <item.icon 
                    className="mr-3 text-sm flex-shrink-0" 
                    aria-hidden="true" 
                  />
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Settings Section */}
          {MENU_ITEMS.filter(item => item.category === 'settings').length > 0 && (
            <>              <div className="px-4 mb-4 mt-6">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                  SETTINGS
                </span>
              </div>
              
              <ul className="space-y-1">
                {MENU_ITEMS.filter(item => item.category === 'settings').map((item, index) => (
                  <li key={`settings-${item.label}-${index}`}>
                    <button
                      onClick={() => handleMenuClick(item.label, item.path)}
                      className={`w-full flex items-center px-6 py-3 text-left hover:bg-red-50 focus:bg-red-50 focus:outline-none transition-colors duration-200 rounded-r-full mr-4 ${
                        activeMenu === item.label 
                          ? 'bg-gradient-to-r from-red-100 to-pink-100 border-r-4 border-red-500 text-red-700' 
                          : 'text-slate-600 hover:text-red-600'
                      }`}
                      aria-current={activeMenu === item.label ? 'page' : undefined}
                      title={item.description}
                    >
                      <item.icon 
                        className="mr-3 text-sm flex-shrink-0" 
                        aria-hidden="true" 
                      />
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>
          {/* Footer with system info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-500">
            {APP_CONFIG.description}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Last updated: {formatDate(APP_CONFIG.lastUpdated)}
          </div>
        </div>
      </aside>

      {/* 
        MAIN CONTENT AREA
        Contains header and dashboard content
        Responsive layout that adapts to screen size
      */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 
          TOP HEADER BAR
          Contains user account info and potential actions
        */}        <header className="bg-white shadow-lg border-b border-slate-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Page Title - dynamic based on current page */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-800">
                {activeMenu}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {greeting}! Welcome to the administration panel • {currentDate}
              </p>
            </div>
            
            {/* User Account Section */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 font-medium">Account</span>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-red-50 rounded-lg p-2 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <FaChevronRight className="text-slate-400 text-xs" />
              </div>
            </div>
          </div>
        </header>        {/* 
          DASHBOARD CONTENT
          Main content area with statistics and data
        */}        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Banner */}
          <div className="relative mb-8 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 p-8">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2 drop-shadow-lg">
                Welcome to <span className="text-pink-200">Admin</span> Dashboard
              </h1>
              <p className="text-lg text-red-100">
                {greeting}! Monitor key metrics and manage your blood donation system efficiently.
              </p>
            </div>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-lg text-slate-500">
              Your journey to managing lives starts here
            </p>
          </div>

          {/* 
            STATISTICS GRID
            Responsive grid layout for statistics cards
            Shows key metrics and performance indicators
          */}
          <section aria-labelledby="stats-heading" className="mb-8">
            <h2 id="stats-heading" className="sr-only">
              Dashboard Statistics
            </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {statisticsData.map((stat) => (
                <StatCard
                  key={stat.id}
                  number={stat.number}
                  title={stat.title}
                  bgColor={stat.bgColor}
                  fullDetailText={stat.fullDetailText}
                  trend={stat.trend}
                  trendDirection={stat.trendDirection}
                  onClick={() => handleStatCardClick(stat.id)}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </section>          {/* 
            ADDITIONAL CONTENT AREA
            Space for charts, tables, or other dashboard widgets
            TODO: Add charts, recent activities, quick actions, etc.
          */}
          <section className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Recent Activities
            </h3>
            <div className="text-slate-500 text-center py-12">
              <div className="inline-block p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-full mb-6">
                <div className="text-4xl text-red-600">📊</div>
              </div>
              <p className="text-lg mb-2">Additional dashboard content will be displayed here</p>
              <p className="text-sm text-slate-400">
                Charts, recent activities, quick actions, etc.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
