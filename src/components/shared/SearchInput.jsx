/**
 * SHARED COMPONENT: SearchInput
 * 
 * PURPOSE:
 * Reusable search input component with consistent styling and functionality.
 * Includes search icon, clear functionality, and customizable placeholder.
 * 
 * FEATURES:
 * - Consistent search UI across modules
 * - Built-in clear functionality
 * - Loading state support
 * - Keyboard shortcuts support
 * - Debounced search capability
 * 
 * REFACTORING BENEFITS:
 * - Eliminates duplicate search components
 * - Ensures consistent search behavior
 * - Centralized search logic
 * - Easy to add features like autocomplete
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const SearchInput = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  isLoading = false,
  debounceMs = 300,
  showClear = true,
  size = 'md',
  className = '',
  disabled = false,
  autoFocus = false,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  
  // Size configurations
  const sizeConfig = {
    sm: { 
      container: 'h-8', 
      input: 'pl-8 pr-8 py-1 text-sm',
      icon: 16,
      iconLeft: 'left-2',
      iconRight: 'right-2'
    },
    md: { 
      container: 'h-10', 
      input: 'pl-10 pr-10 py-2 text-base',
      icon: 20,
      iconLeft: 'left-3',
      iconRight: 'right-3'
    },
    lg: { 
      container: 'h-12', 
      input: 'pl-12 pr-12 py-3 text-lg',
      icon: 24,
      iconLeft: 'left-3',
      iconRight: 'right-3'
    }
  };
  
  const config = sizeConfig[size] || sizeConfig.md;
  
  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  // Auto focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Debounced onChange handler
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Set up new debounce
    if (onChange) {
      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    }
  };
  
  // Clear handler
  const handleClear = () => {
    setLocalValue('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (onChange) {
      onChange('');
    }
    if (onClear) {
      onClear();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };
  
  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
  
  const showClearButton = showClear && localValue && !isLoading;
  
  return (
    <div className={`relative ${config.container} ${className}`}>
      {/* Search Icon */}
      <div className={`absolute ${config.iconLeft} top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none`}>
        {isLoading ? (
          <Loader2 size={config.icon} className="animate-spin" />
        ) : (
          <Search size={config.icon} />
        )}
      </div>
      
      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className={`
          w-full 
          ${config.input}
          border 
          border-gray-300 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
          transition-all
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        {...props}
      />
      
      {/* Clear Button */}
      {showClearButton && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className={`
            absolute 
            ${config.iconRight} 
            top-1/2 
            transform 
            -translate-y-1/2 
            text-gray-400 
            hover:text-gray-600 
            transition-colors
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          title="Clear search"
        >
          <X size={config.icon} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
