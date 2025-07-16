/**
 * Events & Campaigns API Service
 * 
 * Handles all backend communications for event management and campaign functionality
 * including blood drives, donor events, promotional campaigns, and event analytics
 * 
 * @author Blood System Development Team
 * @version 1.0.0
 */

import api from '../config/axios';

// ===========================
// EVENT MANAGEMENT
// ===========================

/**
 * Get all events with filtering and pagination
 */
export const getEvents = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/events?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock events data for development
    return {
      success: true,
      data: {
        events: [
          {
            id: 1,
            title: 'Community Blood Drive - Downtown',
            description: 'Annual community blood drive to support local hospitals and emergency services',
            type: 'blood_drive',
            status: 'scheduled',
            startDate: '2024-06-25T09:00:00Z',
            endDate: '2024-06-25T17:00:00Z',
            location: {
              name: 'Downtown Community Center',
              address: '123 Main Street, Downtown',
              city: 'Metro City',
              coordinates: { lat: 40.7128, lng: -74.0060 }
            },
            capacity: 100,
            registered: 67,
            attended: 0,
            collected: 0,
            target: 80,
            organizer: 'Red Cross Metro',
            contactInfo: {
              phone: '+1-555-0123',
              email: 'events@redcross-metro.org'
            },
            requirements: ['ID Required', 'Age 18-65', 'Weight 110+ lbs'],
            incentives: ['Free T-shirt', 'Health screening', 'Refreshments'],
            createdAt: '2024-06-01T10:00:00Z',
            updatedAt: '2024-06-20T15:30:00Z'
          },
          {
            id: 2,
            title: 'University Health Fair & Blood Drive',
            description: 'Student-organized health fair featuring blood donation, health screenings, and wellness education',
            type: 'blood_drive',
            status: 'active',
            startDate: '2024-06-22T10:00:00Z',
            endDate: '2024-06-22T16:00:00Z',
            location: {
              name: 'University Student Center',
              address: '456 College Avenue',
              city: 'University Town',
              coordinates: { lat: 40.7589, lng: -73.9851 }
            },
            capacity: 150,
            registered: 142,
            attended: 89,
            collected: 78,
            target: 120,
            organizer: 'University Health Services',
            contactInfo: {
              phone: '+1-555-0456',
              email: 'health@university.edu'
            },
            requirements: ['Student ID or Valid ID', 'Age 18+', 'Good Health'],
            incentives: ['Study Break Package', 'Pizza Voucher', 'Health Kit'],
            createdAt: '2024-05-15T14:00:00Z',
            updatedAt: '2024-06-22T12:00:00Z'
          },
          {
            id: 3,
            title: 'Emergency Response Blood Drive',
            description: 'Urgent blood collection in response to recent hospital surge demand',
            type: 'emergency_drive',
            status: 'completed',
            startDate: '2024-06-18T08:00:00Z',
            endDate: '2024-06-18T20:00:00Z',
            location: {
              name: 'City Convention Center',
              address: '789 Convention Blvd',
              city: 'Metro City',
              coordinates: { lat: 40.7505, lng: -73.9934 }
            },
            capacity: 200,
            registered: 178,
            attended: 156,
            collected: 142,
            target: 150,
            organizer: 'Emergency Blood Coalition',
            contactInfo: {
              phone: '+1-555-0789',
              email: 'emergency@bloodcoalition.org'
            },
            requirements: ['Emergency Clearance', 'Valid ID', 'Health Assessment'],
            incentives: ['Express Processing', 'Priority Parking', 'Meal Voucher'],
            createdAt: '2024-06-16T08:00:00Z',
            updatedAt: '2024-06-19T09:00:00Z'
          },
          {
            id: 4,
            title: 'Corporate Partnership Drive - TechCorp',
            description: 'Quarterly blood drive for TechCorp employees and their families',
            type: 'corporate_drive',
            status: 'scheduled',
            startDate: '2024-07-15T12:00:00Z',
            endDate: '2024-07-15T18:00:00Z',
            location: {
              name: 'TechCorp Headquarters',
              address: '321 Innovation Drive',
              city: 'Tech Valley',
              coordinates: { lat: 37.7749, lng: -122.4194 }
            },
            capacity: 80,
            registered: 34,
            attended: 0,
            collected: 0,
            target: 60,
            organizer: 'TechCorp HR Department',
            contactInfo: {
              phone: '+1-555-0321',
              email: 'hr@techcorp.com'
            },
            requirements: ['Employee Badge or Invitation', 'Valid ID'],
            incentives: ['Paid Time Off', 'Wellness Credit', 'Company Swag'],
            createdAt: '2024-06-10T11:00:00Z',
            updatedAt: '2024-06-21T16:00:00Z'
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalEvents: 4,
          pageSize: 10
        },
        summary: {
          totalEvents: 4,
          upcomingEvents: 2,
          activeEvents: 1,
          completedEvents: 1,
          totalCapacity: 530,
          totalRegistered: 421,
          totalCollected: 220
        }
      }
    };
  } catch (error) {
    console.error('Events fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch events'
    };
  }
};

/**
 * Get event details by ID
 */
export const getEventById = async (eventId) => {
  try {
    const response = await api.get(`/api/events/${eventId}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Event not found'
    };
  } catch (error) {
    console.error('Event fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Create new event
 */
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/api/events', eventData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create event'
    };
  } catch (error) {
    console.error('Event creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Update event
 */
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/api/events/${eventId}`, eventData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to update event'
    };
  } catch (error) {
    console.error('Event update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Delete event
 */
export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/api/events/${eventId}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to delete event'
    };
  } catch (error) {
    console.error('Event deletion failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Cancel event
 */
export const cancelEvent = async (eventId, reason) => {
  try {
    const response = await api.patch(`/api/events/${eventId}/cancel`, { reason });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to cancel event'
    };
  } catch (error) {
    console.error('Event cancellation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// EVENT REGISTRATION
// ===========================

/**
 * Register for event
 */
export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await api.post(`/api/events/${eventId}/register`, registrationData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to register for event'
    };
  } catch (error) {
    console.error('Event registration failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get event registrations
 */
export const getEventRegistrations = async (eventId, filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/events/${eventId}/registrations?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock registrations data
    return {
      success: true,
      data: [
        {
          id: 1,
          userId: 123,
          userName: 'John Smith',
          userEmail: 'john.smith@email.com',
          userPhone: '+1-555-0100',
          bloodType: 'O+',
          registeredAt: '2024-06-20T10:30:00Z',
          status: 'confirmed',
          attendanceStatus: 'pending',
          donationStatus: 'pending',
          notes: 'First time participant',
          preferences: {
            timeSlot: '10:00-11:00',
            specialRequests: 'Wheelchair accessible'
          }
        },
        {
          id: 2,
          userId: 456,
          userName: 'Mary Johnson',
          userEmail: 'mary.johnson@email.com',
          userPhone: '+1-555-0200',
          bloodType: 'A-',
          registeredAt: '2024-06-19T14:15:00Z',
          status: 'confirmed',
          attendanceStatus: 'attended',
          donationStatus: 'completed',
          notes: 'Regular donor, excellent cooperation',
          preferences: {
            timeSlot: '14:00-15:00',
            specialRequests: null
          }
        }
      ]
    };
  } catch (error) {
    console.error('Event registrations fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Update registration status
 */
export const updateRegistrationStatus = async (eventId, registrationId, status) => {
  try {
    const response = await api.patch(`/api/events/${eventId}/registrations/${registrationId}`, { status });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to update registration status'
    };
  } catch (error) {
    console.error('Registration status update failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// EVENT ANALYTICS
// ===========================

/**
 * Get event performance analytics
 */
export const getEventAnalytics = async (eventId) => {
  try {
    const response = await api.get(`/api/events/${eventId}/analytics`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock event analytics
    return {
      success: true,
      data: {
        overview: {
          registrations: 142,
          attendance: 89,
          donations: 78,
          noShows: 53,
          deferrals: 11,
          attendanceRate: 62.7,
          donationRate: 87.6,
          efficiency: 54.9
        },
        timeline: [
          { hour: 9, registrations: 12, attendance: 8, donations: 7 },
          { hour: 10, registrations: 18, attendance: 15, donations: 13 },
          { hour: 11, registrations: 15, attendance: 12, donations: 11 },
          { hour: 12, registrations: 20, attendance: 16, donations: 14 },
          { hour: 13, registrations: 22, attendance: 18, donations: 16 },
          { hour: 14, registrations: 25, attendance: 20, donations: 17 },
          { hour: 15, registrations: 18, attendance: 14, donations: 12 },
          { hour: 16, registrations: 12, attendance: 9, donations: 8 }
        ],
        demographics: {
          ageGroups: [
            { group: '18-25', count: 23, percentage: 25.8 },
            { group: '26-35', count: 28, percentage: 31.5 },
            { group: '36-45', count: 21, percentage: 23.6 },
            { group: '46-55', count: 12, percentage: 13.5 },
            { group: '56+', count: 5, percentage: 5.6 }
          ],
          bloodTypes: [
            { type: 'O+', count: 28, percentage: 35.9 },
            { type: 'A+', count: 19, percentage: 24.4 },
            { type: 'B+', count: 12, percentage: 15.4 },
            { type: 'AB+', count: 6, percentage: 7.7 },
            { type: 'O-', count: 5, percentage: 6.4 },
            { type: 'A-', count: 4, percentage: 5.1 },
            { type: 'B-', count: 3, percentage: 3.8 },
            { type: 'AB-', count: 1, percentage: 1.3 }
          ],
          firstTimeVsRepeat: {
            firstTime: 34,
            repeat: 44,
            firstTimePercentage: 43.6
          }
        },
        feedback: {
          averageRating: 4.3,
          totalResponses: 67,
          satisfaction: {
            excellent: 32,
            good: 24,
            average: 8,
            poor: 2,
            terrible: 1
          },
          commonComments: [
            'Well organized event',
            'Friendly staff',
            'Good location',
            'Could use more parking',
            'Wait times could be shorter'
          ]
        },
        costs: {
          totalCost: 3200,
          costPerDonation: 41.03,
          breakdown: {
            staffing: 1800,
            supplies: 800,
            venue: 400,
            marketing: 200
          }
        }
      }
    };
  } catch (error) {
    console.error('Event analytics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get event performance comparison
 */
export const getEventComparison = async (eventIds) => {
  try {
    const response = await api.post('/api/events/compare', { eventIds });
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to compare events'
    };
  } catch (error) {
    console.error('Event comparison failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// CAMPAIGN MANAGEMENT
// ===========================

/**
 * Get marketing campaigns
 */
export const getCampaigns = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/api/campaigns?${queryParams}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock campaigns data
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Summer Blood Drive Campaign 2024',
          description: 'Increase blood donations during summer months when supplies typically drop',
          type: 'seasonal',
          status: 'active',
          startDate: '2024-06-01T00:00:00Z',
          endDate: '2024-08-31T23:59:59Z',
          budget: 15000,
          spent: 8750,
          targetDonations: 500,
          achievedDonations: 287,
          targetParticipants: 800,
          registeredParticipants: 542,
          channels: ['email', 'social_media', 'radio', 'print'],
          kpis: {
            awareness: { target: 10000, achieved: 7500 },
            engagement: { target: 1500, achieved: 1234 },
            conversion: { target: 20, achieved: 18.5 }
          },
          createdBy: 'Marketing Team',
          createdAt: '2024-05-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'Back to School Blood Drive',
          description: 'Target college campuses and university communities',
          type: 'demographic',
          status: 'scheduled',
          startDate: '2024-08-15T00:00:00Z',
          endDate: '2024-09-30T23:59:59Z',
          budget: 12000,
          spent: 0,
          targetDonations: 300,
          achievedDonations: 0,
          targetParticipants: 500,
          registeredParticipants: 0,
          channels: ['social_media', 'campus_events', 'student_groups'],
          kpis: {
            awareness: { target: 8000, achieved: 0 },
            engagement: { target: 1200, achieved: 0 },
            conversion: { target: 25, achieved: 0 }
          },
          createdBy: 'Outreach Coordinator',
          createdAt: '2024-06-20T14:30:00Z'
        },
        {
          id: 3,
          name: 'Emergency Response Campaign',
          description: 'Rapid response campaign for critical blood shortage',
          type: 'emergency',
          status: 'completed',
          startDate: '2024-06-15T00:00:00Z',
          endDate: '2024-06-20T23:59:59Z',
          budget: 5000,
          spent: 4850,
          targetDonations: 100,
          achievedDonations: 142,
          targetParticipants: 150,
          registeredParticipants: 178,
          channels: ['emergency_alerts', 'social_media', 'direct_contact'],
          kpis: {
            awareness: { target: 5000, achieved: 8500 },
            engagement: { target: 800, achieved: 1200 },
            conversion: { target: 30, achieved: 35.2 }
          },
          createdBy: 'Emergency Response Team',
          createdAt: '2024-06-14T08:00:00Z'
        }
      ]
    };
  } catch (error) {
    console.error('Campaigns fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Create new campaign
 */
export const createCampaign = async (campaignData) => {
  try {
    const response = await api.post('/api/campaigns', campaignData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to create campaign'
    };
  } catch (error) {
    console.error('Campaign creation failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Get campaign performance metrics
 */
export const getCampaignMetrics = async (campaignId) => {
  try {
    const response = await api.get(`/api/campaigns/${campaignId}/metrics`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock campaign metrics
    return {
      success: true,
      data: {
        performance: {
          impressions: 45000,
          reach: 28500,
          clicks: 2340,
          registrations: 542,
          donations: 287,
          ctr: 5.2,
          conversionRate: 18.5,
          costPerClick: 3.74,
          costPerRegistration: 16.15,
          costPerDonation: 30.49
        },
        timeline: [
          { date: '2024-06-01', impressions: 2500, clicks: 130, registrations: 28 },
          { date: '2024-06-02', impressions: 3200, clicks: 156, registrations: 34 },
          { date: '2024-06-03', impressions: 2800, clicks: 145, registrations: 31 }
        ],
        channels: [
          { channel: 'email', impressions: 15000, clicks: 900, cost: 1200, donations: 89 },
          { channel: 'social_media', impressions: 18000, clicks: 1080, cost: 2800, donations: 124 },
          { channel: 'radio', impressions: 8000, clicks: 240, cost: 3500, donations: 45 },
          { channel: 'print', impressions: 4000, clicks: 120, cost: 1250, donations: 29 }
        ],
        demographics: {
          age: [
            { group: '18-25', registrations: 156, donations: 67 },
            { group: '26-35', registrations: 198, donations: 89 },
            { group: '36-45', registrations: 134, donations: 78 },
            { group: '46+', registrations: 54, donations: 53 }
          ],
          location: [
            { city: 'Downtown', registrations: 234, donations: 134 },
            { city: 'Suburbs', registrations: 198, donations: 89 },
            { city: 'University Area', registrations: 110, donations: 64 }
          ]
        }
      }
    };
  } catch (error) {
    console.error('Campaign metrics fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// ===========================
// VOLUNTEER MANAGEMENT
// ===========================

/**
 * Get event volunteers
 */
export const getEventVolunteers = async (eventId) => {
  try {
    const response = await api.get(`/api/events/${eventId}/volunteers`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    // Mock volunteers data
    return {
      success: true,
      data: [
        {
          id: 1,
          name: 'Alice Cooper',
          email: 'alice.cooper@volunteer.org',
          phone: '+1-555-0301',
          role: 'Registration Coordinator',
          experience: 'Advanced',
          availability: 'Full Day',
          status: 'confirmed',
          checkInTime: null,
          checkOutTime: null,
          hoursWorked: 0,
          tasks: ['Check-in donors', 'Manage queues', 'Provide information']
        },
        {
          id: 2,
          name: 'Bob Wilson',
          email: 'bob.wilson@volunteer.org',
          phone: '+1-555-0302',
          role: 'Refreshment Coordinator',
          experience: 'Intermediate',
          availability: 'Morning Only',
          status: 'confirmed',
          checkInTime: '2024-06-22T09:00:00Z',
          checkOutTime: '2024-06-22T13:00:00Z',
          hoursWorked: 4,
          tasks: ['Serve refreshments', 'Restock supplies', 'Clean area']
        }
      ]
    };
  } catch (error) {
    console.error('Event volunteers fetch failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Assign volunteer to event
 */
export const assignVolunteer = async (eventId, volunteerData) => {
  try {
    const response = await api.post(`/api/events/${eventId}/volunteers`, volunteerData);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result
      };
    }
    
    return {
      success: false,
      error: 'Failed to assign volunteer'
    };
  } catch (error) {
    console.error('Volunteer assignment failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export default {
  // Event Management
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  cancelEvent,
  
  // Event Registration
  registerForEvent,
  getEventRegistrations,
  updateRegistrationStatus,
  
  // Event Analytics
  getEventAnalytics,
  getEventComparison,
  
  // Campaign Management
  getCampaigns,
  createCampaign,
  getCampaignMetrics,
  
  // Volunteer Management
  getEventVolunteers,
  assignVolunteer
};
