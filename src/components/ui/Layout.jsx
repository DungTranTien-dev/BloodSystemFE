import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Common Layout component that wraps pages with Header and Footer
 * This helps optimize memory by reusing the same Header/Footer instances
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 * @param {string} props.className - Additional CSS classes for the main content
 * @param {boolean} props.showFooter - Whether to show footer (default: true)
 * @returns {React.ReactElement} Layout with Header and Footer
 */
const Layout = ({ 
  children, 
  className = '', 
  showFooter = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Common Header */}
      <Header />
      
      {/* Main Content */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {/* Common Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
