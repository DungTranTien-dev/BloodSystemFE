/**
 * Admin Reports Page
 * 
 * Comprehensive reporting interface for blood bank administration
 * Integrates with all backend API services for complete analytics
 * 
 * @author Blood System Development Team
 * @version 2.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  FileText, 
  Printer,
  Eye,
  Search,
  TrendingUp,
  Users,
  Droplets,
  Activity,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  RefreshCw
} from 'lucide-react';

// Import our API services
import { reportsApi } from '../../service/reportsApi';
import { analyticsApi } from '../../service/analyticsApi';
import { dashboardApi } from '../../service/dashboardApi';

const AdminReports = () => {
  // ===========================
  // STATE MANAGEMENT
  // ===========================
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reportData, setReportData] = useState({
    analytics: null,
    donations: null,
    inventory: null,
    donors: null,
    requests: null,
    financial: null
  });
  
  const [loading, setLoading] = useState({
    analytics: false,
    donations: false,
    inventory: false,
    donors: false,
    requests: false,
    financial: false,
    export: false
  });

  const [filters, setFilters] = useState({
    period: '30d',
    bloodType: 'all',
    status: 'all',
    location: 'all',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    }
  });

  const [errors, setErrors] = useState({});
  const [customReportConfig, setCustomReportConfig] = useState({
    title: '',
    description: '',
    sections: [],
    format: 'pdf'
  });

  // ===========================
  // REPORT TYPES CONFIGURATION
  // ===========================
  const reportTypes = useMemo(() => [
    {
      id: 'analytics',
      title: 'Analytics Overview',
      description: 'Comprehensive system analytics and KPIs',
      icon: BarChart3,
      color: 'blue',
      sections: ['kpi', 'trends', 'comparison', 'forecasts']
    },
    {
      id: 'donations',
      title: 'Donation Reports',
      description: 'Blood donation statistics and trends',
      icon: Droplets,
      color: 'red',
      sections: ['volume', 'frequency', 'demographics', 'locations']
    },
    {
      id: 'inventory',
      title: 'Inventory Reports',
      description: 'Blood stock levels and distribution',
      icon: Activity,
      color: 'green',
      sections: ['levels', 'expiry', 'usage', 'distribution']
    },
    {
      id: 'donors',
      title: 'Donor Reports',
      description: 'Donor management and analytics',
      icon: Users,
      color: 'purple',
      sections: ['registration', 'retention', 'behavior', 'health']
    },
    {
      id: 'requests',
      title: 'Request Reports',
      description: 'Blood request tracking and fulfillment',
      icon: FileText,
      color: 'orange',
      sections: ['volume', 'fulfillment', 'timing', 'hospitals']
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      description: 'Cost analysis and budget tracking',
      icon: DollarSign,
      color: 'indigo',
      sections: ['costs', 'revenue', 'efficiency', 'budget']
    }
  ], []);

  // ===========================
  // DATA LOADING FUNCTIONS
  // ===========================
  const loadReportData = useCallback(async (reportType) => {
    setLoading(prev => ({ ...prev, [reportType]: true }));
    setErrors(prev => ({ ...prev, [reportType]: null }));

    try {
      let result;
      
      switch (reportType) {
        case 'analytics':
          result = await reportsApi.getAnalyticsData(filters.period, {
            includeKPIs: true,
            includeTrends: true,
            includeComparisons: true
          });
          break;
          
        case 'donations':
          result = await reportsApi.getDonationReports(filters.period, {
            bloodType: filters.bloodType !== 'all' ? filters.bloodType : undefined,
            status: filters.status !== 'all' ? filters.status : undefined,
            location: filters.location !== 'all' ? filters.location : undefined
          });
          break;
          
        case 'inventory':
          result = await reportsApi.getInventoryReports({
            includeExpiry: true,
            includeDistribution: true,
            includeUsage: true,
            period: filters.period
          });
          break;
          
        case 'donors':
          result = await reportsApi.getDonorReports(filters.period, {
            includeRetention: true,
            includeBehavior: true,
            includeHealth: true
          });
          break;
          
        case 'requests':
          result = await reportsApi.getRequestReports(filters.period, {
            includeHospitals: true,
            includeTiming: true,
            includeFulfillment: true
          });
          break;
          
        case 'financial':
          result = await reportsApi.getFinancialReports(filters.period, {
            includeCosts: true,
            includeRevenue: true,
            includeEfficiency: true
          });
          break;
          
        default:
          throw new Error(`Unknown report type: ${reportType}`);
      }

      if (result.success) {
        setReportData(prev => ({
          ...prev,
          [reportType]: result.data
        }));
      } else {
        setErrors(prev => ({ ...prev, [reportType]: result.error }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, [reportType]: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, [reportType]: false }));
    }
  }, [filters]);

  // ===========================
  // EXPORT FUNCTIONS
  // ===========================
  const exportReport = useCallback(async (reportType, format) => {
    setLoading(prev => ({ ...prev, export: true }));
    
    try {
      const result = await reportsApi.exportReport(reportType, format, {
        data: reportData[reportType],
        filters,
        generatedAt: new Date().toISOString(),
        title: reportTypes.find(rt => rt.id === reportType)?.title
      });

      if (result.success && result.data.downloadUrl) {
        // Trigger download
        const link = document.createElement('a');
        link.href = result.data.downloadUrl;
        link.download = result.data.filename || `${reportType}_report.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setErrors(prev => ({ 
          ...prev, 
          export: result.error || 'Export failed' 
        }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, export: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, export: false }));
    }
  }, [reportData, filters, reportTypes]);

  const generateCustomReport = useCallback(async () => {
    setLoading(prev => ({ ...prev, export: true }));
    
    try {
      const result = await reportsApi.generateCustomReport(customReportConfig.title, {
        description: customReportConfig.description,
        sections: customReportConfig.sections,
        filters,
        format: customReportConfig.format
      });

      if (result.success && result.data.downloadUrl) {
        const link = document.createElement('a');
        link.href = result.data.downloadUrl;
        link.download = result.data.filename || `custom_report.${customReportConfig.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setErrors(prev => ({ 
          ...prev, 
          export: result.error || 'Custom report generation failed' 
        }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, export: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, export: false }));
    }
  }, [customReportConfig, filters]);

  // ===========================
  // EVENT HANDLERS
  // ===========================
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'custom' && !reportData[tabId]) {
      loadReportData(tabId);
    }
  }, [reportData, loadReportData]);

  const handleFilterChange = useCallback((filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  }, []);

  const handleRefresh = useCallback(() => {
    if (activeTab !== 'custom') {
      loadReportData(activeTab);
    }
  }, [activeTab, loadReportData]);

  const applyFilters = useCallback(() => {
    if (activeTab !== 'custom') {
      loadReportData(activeTab);
    }
  }, [activeTab, loadReportData]);

  // ===========================
  // EFFECTS
  // ===========================
  useEffect(() => {
    // Load initial data
    loadReportData('analytics');
  }, []);

  // ===========================
  // RENDER HELPERS
  // ===========================
  const renderReportCard = useCallback((report) => {
    const Icon = report.icon;
    const isLoading = loading[report.id];
    const hasError = errors[report.id];
    const hasData = reportData[report.id];

    return (
      <div
        key={report.id}
        className={`bg-white rounded-lg border-2 cursor-pointer transition-all ${
          activeTab === report.id
            ? `border-${report.color}-500 shadow-lg`
            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }`}
        onClick={() => handleTabChange(report.id)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg bg-${report.color}-100 text-${report.color}-600`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isLoading && (
                <RefreshCw size={16} className="text-gray-400 animate-spin" />
              )}
              {hasError && (
                <AlertTriangle size={16} className="text-red-500" />
              )}
              {hasData && !isLoading && !hasError && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </div>
          </div>
          
          {hasData && !isLoading && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-4 text-sm text-gray-600">
                {report.sections.map((section) => (
                  <span key={section} className="capitalize">{section}</span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    exportReport(report.id, 'pdf');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                  disabled={loading.export}
                >
                  PDF
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    exportReport(report.id, 'excel');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                  disabled={loading.export}
                >
                  Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }, [activeTab, loading, errors, reportData, handleTabChange, exportReport]);

  const renderFilterPanel = useCallback(() => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Report Filters</h3>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          Apply Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Time Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period
          </label>
          <select
            value={filters.period}
            onChange={(e) => handleFilterChange('period', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
            <option value="custom">Custom range</option>
          </select>
        </div>

        {/* Blood Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Type
          </label>
          <select
            value={filters.bloodType}
            onChange={(e) => handleFilterChange('bloodType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Locations</option>
            <option value="center-1">Main Center</option>
            <option value="center-2">North Branch</option>
            <option value="center-3">South Branch</option>
            <option value="mobile">Mobile Units</option>
          </select>
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.period === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleFilterChange('dateRange', {
                ...filters.dateRange,
                start: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleFilterChange('dateRange', {
                ...filters.dateRange,
                end: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  ), [filters, handleFilterChange, applyFilters]);

  const renderReportContent = useCallback(() => {
    if (activeTab === 'custom') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Report Builder</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title
              </label>
              <input
                type="text"
                value={customReportConfig.title}
                onChange={(e) => setCustomReportConfig(prev => ({ 
                  ...prev, 
                  title: e.target.value 
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter report title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={customReportConfig.description}
                onChange={(e) => setCustomReportConfig(prev => ({ 
                  ...prev, 
                  description: e.target.value 
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
                placeholder="Describe the purpose of this report"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Sections
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {reportTypes.map((type) => (
                  <label key={type.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={customReportConfig.sections.includes(type.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCustomReportConfig(prev => ({
                            ...prev,
                            sections: [...prev.sections, type.id]
                          }));
                        } else {
                          setCustomReportConfig(prev => ({
                            ...prev,
                            sections: prev.sections.filter(s => s !== type.id)
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{type.title}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <select
                value={customReportConfig.format}
                onChange={(e) => setCustomReportConfig(prev => ({ 
                  ...prev, 
                  format: e.target.value 
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <button
              onClick={generateCustomReport}
              disabled={loading.export || !customReportConfig.title || customReportConfig.sections.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.export ? 'Generating Report...' : 'Generate Custom Report'}
            </button>
          </div>
        </div>
      );
    }

    const currentReportData = reportData[activeTab];
    const isLoading = loading[activeTab];
    const hasError = errors[activeTab];

    if (isLoading) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="flex items-center justify-center">
            <RefreshCw size={32} className="text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading report data...</span>
          </div>
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Report</h3>
            <p className="text-gray-600 mb-4">{hasError}</p>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (!currentReportData) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600 mb-4">Click on a report type to load data</p>
          </div>
        </div>
      );
    }

    // Render actual report content based on type
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {reportTypes.find(rt => rt.id === activeTab)?.title}
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => exportReport(activeTab, 'pdf')}
              disabled={loading.export}
              className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
            >
              <Download size={16} />
              <span>PDF</span>
            </button>
            <button
              onClick={() => exportReport(activeTab, 'excel')}
              disabled={loading.export}
              className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={16} />
              <span>Excel</span>
            </button>
          </div>
        </div>

        {/* Report-specific content rendering */}
        <div className="space-y-6">
          {/* Summary Statistics */}
          {currentReportData.summary && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(currentReportData.summary).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Charts and visualizations would go here */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BarChart3 size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Detailed charts and visualizations will be displayed here
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Data loaded successfully - {Object.keys(currentReportData).length} sections available
            </p>
          </div>
        </div>
      </div>
    );
  }, [activeTab, reportData, loading, errors, reportTypes, handleRefresh, exportReport, customReportConfig, generateCustomReport]);

  // ===========================
  // MAIN RENDER
  // ===========================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Reports</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive analytics and reporting for blood bank management
            </p>
          </div>
          
          <button
            onClick={() => handleTabChange('custom')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>Custom Report</span>
          </button>
        </div>

        {/* Error Display */}
        {errors.export && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} className="text-red-600" />
              <span className="text-red-800 font-semibold">Export Error</span>
            </div>
            <p className="text-red-700 mt-1">{errors.export}</p>
          </div>
        )}

        {/* Filter Panel */}
        {renderFilterPanel()}

        {/* Report Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map(renderReportCard)}
        </div>

        {/* Report Content */}
        {renderReportContent()}
      </div>
    </div>
  );
};

export default AdminReports;
