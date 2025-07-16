/**
 * Analytics API Service
 * 
 * Handles all backend communications for analytics and metrics functionality
 * including performance metrics, KPIs, trends analysis, and business intelligence
 * 
 * @author Blood System Development Team
 * @version 1.0.0
 */

import api from '../config/axios';

// ===========================
// PERFORMANCE METRICS
// ===========================

/**
 * Get key performance indicators (KPIs)
 */
export const getKPIMetrics = async (period = '30d') => {
  try {
    const response = await api.get(`/api/analytics/kpis?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock KPI data for development
    return {
      success: true,
      data: {
        period,
        metrics: {
          donationEfficiency: {
            value: 87.5,
            target: 85.0,
            trend: '+2.3%',
            status: 'above_target',
            description: 'Percentage of successful donation appointments'
          },
          donorRetention: {
            value: 78.2,
            target: 75.0,
            trend: '+1.8%',
            status: 'above_target',
            description: 'Percentage of donors who donate multiple times'
          },
          inventoryTurnover: {
            value: 12.5,
            target: 15.0,
            trend: '-0.5%',
            status: 'below_target',
            description: 'Average days for blood units to be used'
          },
          requestFulfillment: {
            value: 92.3,
            target: 90.0,
            trend: '+3.1%',
            status: 'above_target',
            description: 'Percentage of blood requests successfully fulfilled'
          },
          collectionCost: {
            value: 45.2,
            target: 50.0,
            trend: '-2.1%',
            status: 'above_target',
            description: 'Average cost per blood unit collected (USD)'
          },
          wasteReduction: {
            value: 96.8,
            target: 95.0,
            trend: '+0.8%',
            status: 'above_target',
            description: 'Percentage of blood units used before expiry'
          }
        },
        comparison: {
          previous_period: {
            donationEfficiency: 85.2,
            donorRetention: 76.4,
            inventoryTurnover: 13.0,
            requestFulfillment: 89.2,
            collectionCost: 46.3,
            wasteReduction: 96.0
          }
        }
      }
    };
  } catch (error) {
    console.error('KPI metrics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch KPI metrics'
    };
  }
};

/**
 * Get operational metrics
 */
export const getOperationalMetrics = async (period = '7d') => {
  try {
    const response = await api.get(`/api/analytics/operational?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock operational metrics
    return {
      success: true,
      data: {
        daily_operations: [
          {
            date: '2024-06-15',
            donations_collected: 23,
            units_processed: 21,
            requests_received: 8,
            requests_fulfilled: 7,
            new_registrations: 5,
            events_conducted: 1
          },
          {
            date: '2024-06-16',
            donations_collected: 19,
            units_processed: 18,
            requests_received: 12,
            requests_fulfilled: 11,
            new_registrations: 3,
            events_conducted: 0
          },
          {
            date: '2024-06-17',
            donations_collected: 31,
            units_processed: 29,
            requests_received: 15,
            requests_fulfilled: 13,
            new_registrations: 8,
            events_conducted: 2
          },
          {
            date: '2024-06-18',
            donations_collected: 28,
            units_processed: 26,
            requests_received: 9,
            requests_fulfilled: 9,
            new_registrations: 4,
            events_conducted: 1
          },
          {
            date: '2024-06-19',
            donations_collected: 35,
            units_processed: 33,
            requests_received: 18,
            requests_fulfilled: 16,
            new_registrations: 7,
            events_conducted: 1
          },
          {
            date: '2024-06-20',
            donations_collected: 42,
            units_processed: 40,
            requests_received: 22,
            requests_fulfilled: 20,
            new_registrations: 9,
            events_conducted: 3
          },
          {
            date: '2024-06-21',
            donations_collected: 38,
            units_processed: 36,
            requests_received: 16,
            requests_fulfilled: 15,
            new_registrations: 6,
            events_conducted: 1
          }
        ],
        summary: {
          total_donations: 216,
          total_processed: 203,
          total_requests: 100,
          total_fulfilled: 91,
          total_registrations: 42,
          total_events: 9,
          average_daily_donations: 30.9,
          fulfillment_rate: 91.0,
          processing_efficiency: 94.0
        }
      }
    };
  } catch (error) {
    console.error('Operational metrics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// BLOOD TYPE ANALYTICS
// ===========================

/**
 * Get blood type demand analysis
 */
export const getBloodTypeDemandAnalysis = async (period = '30d') => {
  try {
    const response = await api.get(`/api/analytics/blood-demand?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock blood type demand analysis
    return {
      success: true,
      data: {
        demand_vs_supply: [
          {
            bloodType: 'O+',
            demand: 145,
            supply: 156,
            balance: 11,
            status: 'adequate',
            trend: 'stable',
            forecasted_need: 140
          },
          {
            bloodType: 'A+',
            demand: 98,
            supply: 112,
            balance: 14,
            status: 'adequate',
            trend: 'increasing',
            forecasted_need: 105
          },
          {
            bloodType: 'B+',
            demand: 67,
            supply: 78,
            balance: 11,
            status: 'adequate',
            trend: 'stable',
            forecasted_need: 70
          },
          {
            bloodType: 'AB+',
            demand: 34,
            supply: 45,
            balance: 11,
            status: 'adequate',
            trend: 'decreasing',
            forecasted_need: 30
          },
          {
            bloodType: 'O-',
            demand: 89,
            supply: 67,
            balance: -22,
            status: 'shortage',
            trend: 'increasing',
            forecasted_need: 95
          },
          {
            bloodType: 'A-',
            demand: 45,
            supply: 34,
            balance: -11,
            status: 'low',
            trend: 'stable',
            forecasted_need: 48
          },
          {
            bloodType: 'B-',
            demand: 23,
            supply: 18,
            balance: -5,
            status: 'low',
            trend: 'increasing',
            forecasted_need: 25
          },
          {
            bloodType: 'AB-',
            demand: 12,
            supply: 8,
            balance: -4,
            status: 'critical',
            trend: 'stable',
            forecasted_need: 12
          }
        ],
        seasonal_patterns: {
          high_demand_months: ['December', 'January', 'July'],
          low_demand_months: ['February', 'March', 'September'],
          peak_days: ['Monday', 'Friday'],
          low_days: ['Wednesday', 'Sunday']
        },
        recommendations: [
          {
            bloodType: 'O-',
            action: 'Increase collection campaigns',
            priority: 'high',
            estimated_impact: '+15 units/week'
          },
          {
            bloodType: 'AB-',
            action: 'Target rare donor outreach',
            priority: 'high',
            estimated_impact: '+8 units/month'
          },
          {
            bloodType: 'A-',
            action: 'Schedule additional drives',
            priority: 'medium',
            estimated_impact: '+12 units/month'
          }
        ]
      }
    };
  } catch (error) {
    console.error('Blood demand analysis fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get compatibility matrix analytics
 */
export const getCompatibilityAnalytics = async () => {
  try {
    const response = await api.get('/api/analytics/compatibility');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock compatibility analytics
    return {
      success: true,
      data: {
        utilization_matrix: [
          { donor: 'O+', can_receive: ['O+', 'O-', 'A+', 'B+', 'AB+'], usage_rate: 85.2 },
          { donor: 'A+', can_receive: ['A+', 'A-', 'AB+'], usage_rate: 78.9 },
          { donor: 'B+', can_receive: ['B+', 'B-', 'AB+'], usage_rate: 72.1 },
          { donor: 'AB+', can_receive: ['AB+'], usage_rate: 94.7 },
          { donor: 'O-', can_receive: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], usage_rate: 98.5 },
          { donor: 'A-', can_receive: ['A+', 'A-', 'AB+', 'AB-'], usage_rate: 89.3 },
          { donor: 'B-', can_receive: ['B+', 'B-', 'AB+', 'AB-'], usage_rate: 91.7 },
          { donor: 'AB-', can_receive: ['AB+', 'AB-'], usage_rate: 96.2 }
        ],
        cross_matching_efficiency: {
          average_time: '15.3 minutes',
          success_rate: 97.8,
          automation_rate: 65.2
        },
        emergency_protocols: {
          universal_donor_usage: 23.4,
          emergency_release_rate: 5.7,
          critical_shortage_events: 3
        }
      }
    };
  } catch (error) {
    console.error('Compatibility analytics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// DONOR ANALYTICS
// ===========================

/**
 * Get donor behavior analytics
 */
export const getDonorBehaviorAnalytics = async (period = '90d') => {
  try {
    const response = await api.get(`/api/analytics/donor-behavior?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock donor behavior analytics
    return {
      success: true,
      data: {
        donation_patterns: {
          frequency_distribution: [
            { frequency: 'First-time', count: 156, percentage: 18.2, retention_rate: 35.2 },
            { frequency: 'Occasional (2-3 times)', count: 234, percentage: 27.3, retention_rate: 67.8 },
            { frequency: 'Regular (4-6 times)', count: 298, percentage: 34.8, retention_rate: 89.1 },
            { frequency: 'Frequent (7+ times)', count: 168, percentage: 19.6, retention_rate: 95.8 }
          ],
          seasonal_trends: [
            { month: 'January', donations: 89, unique_donors: 67 },
            { month: 'February', donations: 76, unique_donors: 58 },
            { month: 'March', donations: 92, unique_donors: 71 },
            { month: 'April', donations: 98, unique_donors: 74 },
            { month: 'May', donations: 87, unique_donors: 65 },
            { month: 'June', donations: 103, unique_donors: 78 }
          ]
        },
        demographics: {
          age_groups: [
            { group: '18-25', active_donors: 187, avg_donations: 2.3, dropout_rate: 35.2 },
            { group: '26-35', active_donors: 298, avg_donations: 4.1, dropout_rate: 18.7 },
            { group: '36-45', active_donors: 234, avg_donations: 5.7, dropout_rate: 12.8 },
            { group: '46-55', active_donors: 109, avg_donations: 7.2, dropout_rate: 9.1 },
            { group: '56-65', active_donors: 28, avg_donations: 8.9, dropout_rate: 7.3 }
          ],
          motivation_factors: [
            { factor: 'Helping others', percentage: 78.5 },
            { factor: 'Social responsibility', percentage: 56.2 },
            { factor: 'Personal/family history', percentage: 34.7 },
            { factor: 'Community events', percentage: 23.8 },
            { factor: 'Health benefits', percentage: 18.9 }
          ]
        },
        engagement_metrics: {
          email_open_rate: 68.3,
          sms_response_rate: 82.1,
          event_attendance_rate: 45.7,
          referral_rate: 12.8,
          app_usage_rate: 34.2
        },
        retention_analysis: {
          overall_retention: 78.5,
          first_year_retention: 45.2,
          three_year_retention: 67.8,
          five_year_retention: 84.1,
          churn_predictors: [
            'Long gaps between donations',
            'Missed appointments',
            'No engagement with communications',
            'Relocation'
          ]
        }
      }
    };
  } catch (error) {
    console.error('Donor behavior analytics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get donor segmentation analytics
 */
export const getDonorSegmentation = async () => {
  try {
    const response = await api.get('/api/analytics/donor-segmentation');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock donor segmentation
    return {
      success: true,
      data: {
        segments: [
          {
            name: 'Champions',
            description: 'Highly engaged, frequent donors',
            count: 168,
            percentage: 19.6,
            criteria: 'Donate 7+ times, high engagement',
            avg_ltv: 850,
            retention_rate: 95.8,
            characteristics: ['Consistent schedule', 'Refers others', 'Event participants']
          },
          {
            name: 'Loyalists',
            description: 'Regular donors with good frequency',
            count: 298,
            percentage: 34.8,
            criteria: 'Donate 4-6 times, moderate engagement',
            avg_ltv: 520,
            retention_rate: 89.1,
            characteristics: ['Predictable pattern', 'Responds to reminders', 'Health conscious']
          },
          {
            name: 'Potentials',
            description: 'Occasional donors with growth potential',
            count: 234,
            percentage: 27.3,
            criteria: 'Donate 2-3 times, variable engagement',
            avg_ltv: 280,
            retention_rate: 67.8,
            characteristics: ['Needs motivation', 'Schedule flexibility', 'Social influence']
          },
          {
            name: 'Newcomers',
            description: 'First-time donors',
            count: 156,
            percentage: 18.2,
            criteria: 'First donation, unknown engagement',
            avg_ltv: 120,
            retention_rate: 35.2,
            characteristics: ['High potential', 'Needs nurturing', 'Education required']
          }
        ],
        recommendations: [
          {
            segment: 'Champions',
            strategies: ['VIP recognition programs', 'Exclusive events', 'Referral rewards'],
            expected_impact: 'Increase advocacy by 15%'
          },
          {
            segment: 'Loyalists',
            strategies: ['Milestone celebrations', 'Flexible scheduling', 'Health updates'],
            expected_impact: 'Reduce churn by 8%'
          },
          {
            segment: 'Potentials',
            strategies: ['Personalized reminders', 'Impact stories', 'Convenience improvements'],
            expected_impact: 'Increase frequency by 25%'
          },
          {
            segment: 'Newcomers',
            strategies: ['Welcome program', 'Education content', 'Easy scheduling'],
            expected_impact: 'Improve retention to 50%'
          }
        ]
      }
    };
  } catch (error) {
    console.error('Donor segmentation fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// PREDICTIVE ANALYTICS
// ===========================

/**
 * Get demand forecasting
 */
export const getDemandForecast = async (period = '30d') => {
  try {
    const response = await api.get(`/api/analytics/forecast?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock demand forecast
    return {
      success: true,
      data: {
        overall_forecast: [
          { date: '2024-06-22', predicted_demand: 45, confidence: 85.2 },
          { date: '2024-06-23', predicted_demand: 38, confidence: 87.1 },
          { date: '2024-06-24', predicted_demand: 52, confidence: 82.9 },
          { date: '2024-06-25', predicted_demand: 48, confidence: 89.3 },
          { date: '2024-06-26', predicted_demand: 41, confidence: 86.7 },
          { date: '2024-06-27', predicted_demand: 35, confidence: 88.4 },
          { date: '2024-06-28', predicted_demand: 29, confidence: 91.2 }
        ],
        by_blood_type: [
          { bloodType: 'O+', forecast: 156, current_stock: 145, shortage_risk: 'medium' },
          { bloodType: 'A+', forecast: 98, current_stock: 112, shortage_risk: 'low' },
          { bloodType: 'B+', forecast: 67, current_stock: 78, shortage_risk: 'low' },
          { bloodType: 'AB+', forecast: 34, current_stock: 45, shortage_risk: 'low' },
          { bloodType: 'O-', forecast: 89, current_stock: 67, shortage_risk: 'high' },
          { bloodType: 'A-', forecast: 45, current_stock: 34, shortage_risk: 'high' },
          { bloodType: 'B-', forecast: 23, current_stock: 18, shortage_risk: 'medium' },
          { bloodType: 'AB-', forecast: 12, current_stock: 8, shortage_risk: 'critical' }
        ],
        seasonal_adjustments: {
          summer_increase: 15.2,
          holiday_decrease: -8.7,
          emergency_spike: 35.0,
          weekend_pattern: -12.3
        },
        recommendations: [
          {
            priority: 'high',
            action: 'Schedule emergency collection for O- and AB-',
            timeframe: '48 hours',
            expected_units: 25
          },
          {
            priority: 'medium',
            action: 'Increase A- collection campaigns',
            timeframe: '1 week',
            expected_units: 15
          }
        ]
      }
    };
  } catch (error) {
    console.error('Demand forecast fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get churn prediction
 */
export const getChurnPrediction = async () => {
  try {
    const response = await api.get('/api/analytics/churn-prediction');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock churn prediction
    return {
      success: true,
      data: {
        at_risk_donors: [
          {
            id: 1,
            name: 'John Smith',
            risk_score: 0.85,
            risk_level: 'high',
            last_donation: '2024-03-15',
            days_since_last: 98,
            factors: ['Long gap', 'Missed appointments', 'No email engagement'],
            recommended_action: 'Personal outreach call'
          },
          {
            id: 2,
            name: 'Mary Johnson',
            risk_score: 0.67,
            risk_level: 'medium',
            last_donation: '2024-04-20',
            days_since_last: 62,
            factors: ['Declining frequency', 'Changed contact info'],
            recommended_action: 'Send personalized message'
          },
          {
            id: 3,
            name: 'Robert Brown',
            risk_score: 0.72,
            risk_level: 'medium',
            last_donation: '2024-04-05',
            days_since_last: 77,
            factors: ['No recent engagement', 'Location change'],
            recommended_action: 'Update preferences survey'
          }
        ],
        model_performance: {
          accuracy: 87.3,
          precision: 84.1,
          recall: 89.7,
          f1_score: 86.8
        },
        intervention_success: {
          personal_call: 72.5,
          personalized_email: 45.8,
          sms_reminder: 38.2,
          incentive_offer: 65.1
        }
      }
    };
  } catch (error) {
    console.error('Churn prediction fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// FINANCIAL ANALYTICS
// ===========================

/**
 * Get cost analysis
 */
export const getCostAnalysis = async (period = '30d') => {
  try {
    const response = await api.get(`/api/analytics/cost-analysis?period=${period}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock cost analysis
    return {
      success: true,
      data: {
        cost_breakdown: {
          collection: { amount: 32000, percentage: 36.6, per_unit: 21.33 },
          processing: { amount: 18500, percentage: 21.1, per_unit: 12.33 },
          testing: { amount: 12000, percentage: 13.7, per_unit: 8.00 },
          storage: { amount: 8500, percentage: 9.7, per_unit: 5.67 },
          transportation: { amount: 6000, percentage: 6.9, per_unit: 4.00 },
          administration: { amount: 10500, percentage: 12.0, per_unit: 7.00 }
        },
        efficiency_metrics: {
          cost_per_unit: 58.33,
          cost_per_donor: 102.14,
          cost_reduction_ytd: -5.2,
          target_cost_per_unit: 55.00
        },
        benchmarking: {
          industry_average: 62.50,
          best_practice: 52.00,
          our_ranking: 'Above Average'
        },
        optimization_opportunities: [
          { area: 'Collection efficiency', potential_savings: 3200, impact: 'Medium' },
          { area: 'Testing automation', potential_savings: 2400, impact: 'High' },
          { area: 'Storage optimization', potential_savings: 1700, impact: 'Low' }
        ]
      }
    };
  } catch (error) {
    console.error('Cost analysis fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// COMPARATIVE ANALYTICS
// ===========================

/**
 * Get benchmarking data
 */
export const getBenchmarkingData = async () => {
  try {
    const response = await api.get('/api/analytics/benchmarking');
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock benchmarking data
    return {
      success: true,
      data: {
        peer_comparison: {
          donations_per_capita: { our_value: 4.2, peer_average: 3.8, industry_best: 5.1 },
          donor_retention: { our_value: 78.5, peer_average: 72.3, industry_best: 85.2 },
          cost_efficiency: { our_value: 58.33, peer_average: 62.50, industry_best: 52.00 },
          fulfillment_rate: { our_value: 92.3, peer_average: 87.1, industry_best: 96.7 }
        },
        rankings: {
          overall_performance: { rank: 3, total_participants: 15 },
          cost_efficiency: { rank: 5, total_participants: 15 },
          donor_satisfaction: { rank: 2, total_participants: 15 },
          innovation_index: { rank: 4, total_participants: 15 }
        },
        improvement_areas: [
          { metric: 'Cost per unit', gap: 6.33, priority: 'high' },
          { metric: 'Donor acquisition', gap: 0.9, priority: 'medium' },
          { metric: 'Fulfillment rate', gap: 4.4, priority: 'medium' }
        ]
      }
    };
  } catch (error) {
    console.error('Benchmarking data fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export default {
  // Performance Metrics
  getKPIMetrics,
  getOperationalMetrics,
  
  // Blood Type Analytics
  getBloodTypeDemandAnalysis,
  getCompatibilityAnalytics,
  
  // Donor Analytics
  getDonorBehaviorAnalytics,
  getDonorSegmentation,
  
  // Predictive Analytics
  getDemandForecast,
  getChurnPrediction,
  
  // Financial Analytics
  getCostAnalysis,
  
  // Comparative Analytics
  getBenchmarkingData
};
