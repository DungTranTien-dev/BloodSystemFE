/**
 * Reports API Service
 * 
 * Handles all backend communications for admin reporting functionality
 * including analytics, detailed reports, data exports, and custom reports
 * 
 * @author Blood System Development Team
 * @version 1.0.0
 */

import api from '../config/axios';

// ===========================
// ANALYTICS REPORTS
// ===========================

/**
 * Get comprehensive analytics data
 * Returns detailed metrics for admin analysis
 */
export const getAnalyticsData = async (dateRange = '30d') => {
  try {
    const response = await api.get(`/api/reports/analytics?range=${dateRange}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock analytics data for development
    return {
      success: true,
      data: {
        summary: {
          totalDonations: 1456,
          totalDonors: 856,
          totalRequests: 234,
          totalBloodUnits: 2340,
          avgDonationsPerDay: 48.5,
          donorRetentionRate: 78.5,
          requestFulfillmentRate: 92.3
        },
        trends: {
          donations: {
            current: 1456,
            previous: 1234,
            change: 18.0,
            trend: 'up'
          },
          donors: {
            current: 856,
            previous: 789,
            change: 8.5,
            trend: 'up'
          },
          requests: {
            current: 234,
            previous: 267,
            change: -12.4,
            trend: 'down'
          }
        },
        demographics: {
          ageGroups: [
            { group: '18-25', count: 234, percentage: 27.3 },
            { group: '26-35', count: 298, percentage: 34.8 },
            { group: '36-45', count: 187, percentage: 21.8 },
            { group: '46-55', count: 109, percentage: 12.7 },
            { group: '56+', count: 28, percentage: 3.3 }
          ],
          gender: [
            { gender: 'Male', count: 512, percentage: 59.8 },
            { gender: 'Female', count: 344, percentage: 40.2 }
          ],
          bloodTypes: [
            { type: 'O+', donors: 234, donations: 456 },
            { type: 'A+', donors: 198, donations: 342 },
            { type: 'B+', donors: 156, donations: 234 },
            { type: 'AB+', donors: 89, donations: 123 },
            { type: 'O-', donors: 67, donations: 98 },
            { type: 'A-', donors: 54, donations: 76 },
            { type: 'B-', donors: 34, donations: 45 },
            { type: 'AB-', donors: 24, donations: 29 }
          ]
        },
        performance: {
          topPerformingCenters: [
            { name: 'Central Blood Bank', donations: 456, efficiency: 94.5 },
            { name: 'City Hospital Center', donations: 342, efficiency: 91.2 },
            { name: 'University Medical Center', donations: 267, efficiency: 88.7 }
          ],
          monthlyTargets: {
            target: 500,
            achieved: 456,
            percentage: 91.2
          }
        }
      }
    };
  } catch (error) {
    console.error('Analytics data fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch analytics data'
    };
  }
};

/**
 * Get donation reports with filtering options
 */
export const getDonationReports = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/reports/donations?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock donation reports
    return {
      success: true,
      data: {
        summary: {
          totalDonations: 1456,
          totalVolume: '728 Liters',
          averagePerDonation: '500ml',
          uniqueDonors: 856
        },
        byBloodType: [
          { bloodType: 'O+', count: 456, volume: 228000, percentage: 31.3 },
          { bloodType: 'A+', count: 342, volume: 171000, percentage: 23.5 },
          { bloodType: 'B+', count: 234, volume: 117000, percentage: 16.1 },
          { bloodType: 'AB+', count: 123, volume: 61500, percentage: 8.4 },
          { bloodType: 'O-', count: 98, volume: 49000, percentage: 6.7 },
          { bloodType: 'A-', count: 76, volume: 38000, percentage: 5.2 },
          { bloodType: 'B-', count: 45, volume: 22500, percentage: 3.1 },
          { bloodType: 'AB-', count: 29, volume: 14500, percentage: 2.0 }
        ],
        timeSeriesData: [
          { month: '2024-01', donations: 123, volume: 61500 },
          { month: '2024-02', donations: 145, volume: 72500 },
          { month: '2024-03', donations: 167, volume: 83500 },
          { month: '2024-04', donations: 134, volume: 67000 },
          { month: '2024-05', donations: 189, volume: 94500 },
          { month: '2024-06', donations: 198, volume: 99000 }
        ],
        topDonors: [
          { name: 'John Smith', donations: 12, lastDonation: '2024-06-15' },
          { name: 'Mary Johnson', donations: 11, lastDonation: '2024-06-18' },
          { name: 'Robert Brown', donations: 10, lastDonation: '2024-06-20' }
        ]
      }
    };
  } catch (error) {
    console.error('Donation reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get blood inventory reports
 */
export const getInventoryReports = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/reports/inventory?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock inventory reports
    return {
      success: true,
      data: {
        currentStock: [
          { bloodType: 'O+', units: 234, status: 'sufficient', expiringIn7Days: 12 },
          { bloodType: 'A+', units: 198, status: 'sufficient', expiringIn7Days: 8 },
          { bloodType: 'B+', units: 156, status: 'low', expiringIn7Days: 15 },
          { bloodType: 'AB+', units: 89, status: 'sufficient', expiringIn7Days: 4 },
          { bloodType: 'O-', units: 34, status: 'critical', expiringIn7Days: 2 },
          { bloodType: 'A-', units: 45, status: 'low', expiringIn7Days: 3 },
          { bloodType: 'B-', units: 23, status: 'critical', expiringIn7Days: 1 },
          { bloodType: 'AB-', units: 12, status: 'critical', expiringIn7Days: 0 }
        ],
        summary: {
          totalUnits: 791,
          expiring7Days: 45,
          expiring3Days: 18,
          criticalLevels: 3,
          lastUpdated: new Date().toISOString()
        },
        wastageReport: {
          expiredUnits: 23,
          wastagePercentage: 2.8,
          totalValue: '$4,600',
          mostWastedType: 'AB+'
        },
        turnoverRate: [
          { bloodType: 'O+', rate: 15.5, status: 'optimal' },
          { bloodType: 'A+', rate: 12.3, status: 'optimal' },
          { bloodType: 'B+', rate: 8.7, status: 'slow' },
          { bloodType: 'AB+', rate: 6.2, status: 'slow' },
          { bloodType: 'O-', rate: 25.4, status: 'fast' },
          { bloodType: 'A-', rate: 18.9, status: 'optimal' },
          { bloodType: 'B-', rate: 22.1, status: 'fast' },
          { bloodType: 'AB-', rate: 28.7, status: 'fast' }
        ]
      }
    };
  } catch (error) {
    console.error('Inventory reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get donor engagement reports
 */
export const getDonorReports = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/reports/donors?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock donor reports
    return {
      success: true,
      data: {
        summary: {
          totalDonors: 856,
          activeDonors: 645,
          newDonors: 123,
          recurringDonors: 522,
          retentionRate: 78.5
        },
        engagement: {
          byFrequency: [
            { frequency: 'First Time', count: 123, percentage: 14.4 },
            { frequency: '2-3 Times', count: 234, percentage: 27.3 },
            { frequency: '4-6 Times', count: 198, percentage: 23.1 },
            { frequency: '7+ Times', count: 301, percentage: 35.2 }
          ],
          byRecency: [
            { period: 'Last 30 days', count: 234, percentage: 27.3 },
            { period: '31-90 days', count: 198, percentage: 23.1 },
            { period: '91-180 days', count: 156, percentage: 18.2 },
            { period: '180+ days', count: 268, percentage: 31.3 }
          ]
        },
        demographics: {
          ageDistribution: [
            { ageGroup: '18-25', count: 187, avgDonations: 2.3 },
            { ageGroup: '26-35', count: 298, avgDonations: 4.1 },
            { ageGroup: '36-45', count: 234, avgDonations: 5.7 },
            { ageGroup: '46-55', count: 109, avgDonations: 7.2 },
            { ageGroup: '56+', count: 28, avgDonations: 8.9 }
          ],
          genderSplit: [
            { gender: 'Male', count: 512, avgDonations: 4.8 },
            { gender: 'Female', count: 344, avgDonations: 3.9 }
          ]
        },
        performance: {
          topDonors: [
            { id: 1, name: 'John Smith', totalDonations: 15, lastDonation: '2024-06-15', bloodType: 'O+' },
            { id: 2, name: 'Mary Johnson', totalDonations: 13, lastDonation: '2024-06-18', bloodType: 'A-' },
            { id: 3, name: 'Robert Brown', totalDonations: 12, lastDonation: '2024-06-20', bloodType: 'B+' }
          ],
          eligibilityStatus: {
            eligible: 645,
            temporarilyIneligible: 123,
            permanentlyIneligible: 88
          }
        }
      }
    };
  } catch (error) {
    console.error('Donor reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// BLOOD REQUEST REPORTS
// ===========================

/**
 * Get blood request analysis reports
 */
export const getRequestReports = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/reports/requests?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock request reports
    return {
      success: true,
      data: {
        summary: {
          totalRequests: 234,
          approved: 198,
          pending: 23,
          rejected: 13,
          fulfillmentRate: 84.6,
          avgResponseTime: '4.2 hours'
        },
        byBloodType: [
          { bloodType: 'O+', requests: 67, fulfilled: 58, rate: 86.6 },
          { bloodType: 'A+', requests: 45, fulfilled: 41, rate: 91.1 },
          { bloodType: 'B+', requests: 34, fulfilled: 29, rate: 85.3 },
          { bloodType: 'AB+', requests: 23, fulfilled: 20, rate: 87.0 },
          { bloodType: 'O-', requests: 28, fulfilled: 21, rate: 75.0 },
          { bloodType: 'A-', requests: 18, fulfilled: 15, rate: 83.3 },
          { bloodType: 'B-', requests: 12, fulfilled: 9, rate: 75.0 },
          { bloodType: 'AB-', requests: 7, fulfilled: 5, rate: 71.4 }
        ],
        urgencyLevels: [
          { level: 'Emergency', count: 45, avgResponseTime: '1.2 hours', fulfillmentRate: 95.6 },
          { level: 'Urgent', count: 78, avgResponseTime: '3.5 hours', fulfillmentRate: 89.7 },
          { level: 'Normal', count: 111, avgResponseTime: '8.2 hours', fulfillmentRate: 78.4 }
        ],
        requestors: [
          { name: 'City General Hospital', requests: 67, fulfilled: 58, rate: 86.6 },
          { name: 'Medical University Center', requests: 45, fulfilled: 42, rate: 93.3 },
          { name: 'Emergency Care Institute', requests: 34, fulfilled: 29, rate: 85.3 },
          { name: 'Regional Medical Center', requests: 28, fulfilled: 25, rate: 89.3 }
        ],
        timeline: [
          { month: '2024-01', requests: 34, fulfilled: 29 },
          { month: '2024-02', requests: 41, fulfilled: 36 },
          { month: '2024-03', requests: 38, fulfilled: 32 },
          { month: '2024-04', requests: 45, fulfilled: 39 },
          { month: '2024-05', requests: 42, fulfilled: 37 },
          { month: '2024-06', requests: 34, fulfilled: 25 }
        ]
      }
    };
  } catch (error) {
    console.error('Request reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// FINANCIAL REPORTS
// ===========================

/**
 * Get financial and cost analysis reports
 */
export const getFinancialReports = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/reports/financial?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock financial reports
    return {
      success: true,
      data: {
        summary: {
          totalRevenue: 125000,
          totalCosts: 87500,
          netProfit: 37500,
          profitMargin: 30.0,
          costPerUnit: 37.39
        },
        revenue: {
          bloodSales: 98000,
          processingFees: 15000,
          testingFees: 8500,
          otherServices: 3500
        },
        costs: {
          collection: 32000,
          processing: 18500,
          testing: 12000,
          storage: 8500,
          transportation: 6000,
          administration: 10500
        },
        byBloodType: [
          { bloodType: 'O+', revenue: 34500, cost: 24300, profit: 10200, margin: 29.6 },
          { bloodType: 'A+', revenue: 28900, cost: 20500, profit: 8400, margin: 29.1 },
          { bloodType: 'B+', revenue: 21200, cost: 15800, profit: 5400, margin: 25.5 },
          { bloodType: 'AB+', revenue: 12800, cost: 9200, profit: 3600, margin: 28.1 },
          { bloodType: 'O-', revenue: 11500, cost: 7800, profit: 3700, margin: 32.2 },
          { bloodType: 'A-', revenue: 8900, cost: 6100, profit: 2800, margin: 31.5 },
          { bloodType: 'B-', revenue: 4700, cost: 2900, profit: 1800, margin: 38.3 },
          { bloodType: 'AB-', revenue: 2500, cost: 900, profit: 1600, margin: 64.0 }
        ],
        trends: [
          { month: '2024-01', revenue: 18500, costs: 13200, profit: 5300 },
          { month: '2024-02', revenue: 21200, costs: 14800, profit: 6400 },
          { month: '2024-03', revenue: 19800, costs: 14100, profit: 5700 },
          { month: '2024-04', revenue: 22100, costs: 15600, profit: 6500 },
          { month: '2024-05', revenue: 21800, costs: 15200, profit: 6600 },
          { month: '2024-06', revenue: 21600, costs: 14600, profit: 7000 }
        ]
      }
    };
  } catch (error) {
    console.error('Financial reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// CUSTOM REPORTS
// ===========================

/**
 * Generate custom report based on user parameters
 */
export const generateCustomReport = async (reportConfig) => {
  try {
    const response = await api.post('/api/reports/custom', reportConfig);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to generate custom report'
    };
  } catch (error) {
    console.error('Custom report generation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get saved custom reports
 */
export const getSavedReports = async () => {
  try {
    const response = await api.get('/api/reports/saved');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock saved reports
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Monthly Donation Summary',
          type: 'donation',
          createdBy: 'Admin User',
          createdAt: '2024-06-01',
          lastRun: '2024-06-15',
          schedule: 'monthly'
        },
        {
          id: 2,
          name: 'Blood Type Shortage Alert',
          type: 'inventory',
          createdBy: 'System Admin',
          createdAt: '2024-05-15',
          lastRun: '2024-06-21',
          schedule: 'daily'
        }
      ]
    };
  } catch (error) {
    console.error('Saved reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// EXPORT FUNCTIONS
// ===========================

/**
 * Export report as PDF
 */
export const exportReportPDF = async (reportType, filters = {}) => {
  try {
    const response = await api.post(`/api/reports/export/pdf/${reportType}`, filters, {
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      filename: `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`
    };
  } catch (error) {
    console.error('PDF export failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Export report as Excel
 */
export const exportReportExcel = async (reportType, filters = {}) => {
  try {
    const response = await api.post(`/api/reports/export/excel/${reportType}`, filters, {
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      filename: `${reportType}_report_${new Date().toISOString().split('T')[0]}.xlsx`
    };
  } catch (error) {
    console.error('Excel export failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Export report as CSV
 */
export const exportReportCSV = async (reportType, filters = {}) => {
  try {
    const response = await api.post(`/api/reports/export/csv/${reportType}`, filters, {
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      filename: `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`
    };
  } catch (error) {
    console.error('CSV export failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// REPORT SCHEDULING
// ===========================

/**
 * Schedule automated report generation
 */
export const scheduleReport = async (scheduleConfig) => {
  try {
    const response = await api.post('/api/reports/schedule', scheduleConfig);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to schedule report'
    };
  } catch (error) {
    console.error('Report scheduling failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get scheduled reports
 */
export const getScheduledReports = async () => {
  try {
    const response = await api.get('/api/reports/scheduled');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: true,
      data: []
    };
  } catch (error) {
    console.error('Scheduled reports fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export default {
  getAnalyticsData,
  getDonationReports,
  getInventoryReports,
  getDonorReports,
  getRequestReports,
  getFinancialReports,
  generateCustomReport,
  getSavedReports,
  exportReportPDF,
  exportReportExcel,
  exportReportCSV,
  scheduleReport,
  getScheduledReports
};
