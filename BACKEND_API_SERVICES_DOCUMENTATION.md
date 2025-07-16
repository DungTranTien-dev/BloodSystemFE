# Backend API Services Documentation 🚀

## Overview

This document provides comprehensive documentation for all backend API services created for the Blood Bank Management System's admin dashboard and reporting functionality. These services handle all backend communications and provide a robust foundation for the admin interface.

## 📁 Service Files Created

### 1. `dashboardApi.js` - Dashboard Management
**Purpose**: Core dashboard functionality with real-time metrics and statistics

**Key Features**:
- Real-time dashboard statistics
- Blood type distribution analytics  
- Donation trends and patterns
- Quick action counters
- Dashboard configuration management
- Live data updates
- Export functionality (PDF/Excel)

**Main Functions**:
- `getDashboardStats()` - Comprehensive dashboard metrics
- `getBloodTypeDistribution()` - Blood type analytics
- `getDonationTrends()` - Historical trend data
- `getRealTimeUpdates()` - Live system updates
- `getRecentActivities()` - System activity logs
- `exportDashboardPDF/Excel()` - Data export

### 2. `reportsApi.js` - Advanced Reporting
**Purpose**: Comprehensive reporting and analytics functionality

**Key Features**:
- Analytics reports with KPIs
- Donation reports with filtering
- Blood inventory analysis
- Donor engagement metrics
- Blood request analytics
- Financial reporting
- Custom report generation
- Scheduled reporting
- Multiple export formats

**Main Functions**:
- `getAnalyticsData()` - Business intelligence data
- `getDonationReports()` - Donation analysis
- `getInventoryReports()` - Stock management reports
- `getDonorReports()` - Donor behavior analysis
- `getRequestReports()` - Blood request analytics
- `getFinancialReports()` - Cost and revenue analysis
- `generateCustomReport()` - Custom report creation
- `exportReport[PDF/Excel/CSV]()` - Multi-format exports

### 3. `adminApi.js` - Admin Management
**Purpose**: Core administrative functionality for user and system management

**Key Features**:
- Complete user management (CRUD)
- System settings configuration
- Notification management
- Audit logging
- Backup and restore
- System health monitoring
- Data import/export
- Bulk operations

**Main Functions**:
- `getAllUsers()` - User management with pagination
- `createUser()`, `updateUser()`, `deleteUser()` - User CRUD
- `getSystemSettings()`, `updateSystemSettings()` - System config
- `getNotifications()`, `sendNotification()` - Admin notifications
- `getAuditLogs()` - System audit trails
- `createBackup()`, `restoreBackup()` - Data backup
- `getSystemHealth()` - System monitoring

### 4. `analyticsApi.js` - Advanced Analytics
**Purpose**: Deep analytics and predictive insights

**Key Features**:
- Key Performance Indicators (KPIs)
- Operational metrics tracking
- Blood type demand analysis
- Donor behavior analytics
- Predictive forecasting
- Churn prediction
- Cost analysis
- Benchmarking data

**Main Functions**:
- `getKPIMetrics()` - Performance indicators
- `getOperationalMetrics()` - Daily operations data
- `getBloodTypeDemandAnalysis()` - Supply/demand analytics
- `getDonorBehaviorAnalytics()` - Donor insights
- `getDemandForecast()` - Predictive analytics
- `getChurnPrediction()` - Retention analysis
- `getCostAnalysis()` - Financial efficiency
- `getBenchmarkingData()` - Comparative metrics

### 5. `notificationsApi.js` - Communication Management
**Purpose**: Comprehensive notification and communication system

**Key Features**:
- System notifications
- User notifications
- Email campaigns
- SMS messaging
- Push notifications
- Notification templates
- Campaign analytics
- Communication settings

**Main Functions**:
- `getSystemNotifications()` - Admin alerts
- `sendUserNotification()` - User messaging
- `createEmailCampaign()` - Email marketing
- `sendSMSNotification()` - SMS alerts
- `sendPushNotification()` - Mobile notifications
- `getNotificationTemplates()` - Message templates
- `getCampaignAnalytics()` - Communication metrics

### 6. `eventsApi.js` - Event & Campaign Management
**Purpose**: Blood drive events and marketing campaign management

**Key Features**:
- Event creation and management
- Registration handling
- Volunteer coordination
- Event analytics
- Marketing campaigns
- Performance tracking
- Venue management
- Attendance tracking

**Main Functions**:
- `getEvents()` - Event listing with filters
- `createEvent()`, `updateEvent()` - Event management
- `registerForEvent()` - Registration handling
- `getEventAnalytics()` - Event performance
- `getCampaigns()` - Marketing campaigns
- `getCampaignMetrics()` - Campaign analytics
- `getEventVolunteers()` - Volunteer management

## 🔧 Technical Architecture

### API Configuration
All services use the centralized `api` configuration from `src/config/axios.js`:
```javascript
import api from '../config/axios';
```

### Error Handling Pattern
Consistent error handling across all services:
```javascript
try {
  const response = await api.get('/endpoint');
  if (response.data && response.data.isSuccess) {
    return { success: true, data: response.data.result };
  }
  return { success: false, error: 'Operation failed' };
} catch (error) {
  return { 
    success: false, 
    error: error.response?.data?.message || error.message 
  };
}
```

### Mock Data Strategy
All services include comprehensive mock data for development:
- Realistic sample data for testing
- Proper data structures
- Consistent naming conventions
- Real-world scenarios

## 📊 Data Models

### Dashboard Statistics
```javascript
{
  bloodGroups: { total, listed, active, trend },
  users: { total, donors, staff, admins, activeToday },
  bloodInventory: { totalUnits, availableUnits, expiringSoon },
  donations: { today, thisWeek, thisMonth, total },
  requests: { pending, approved, rejected, total },
  events: { upcoming, active, completed, total }
}
```

### User Management
```javascript
{
  id, name, email, phone, role, bloodType, status,
  lastDonation, donationCount, eligibleToDonate,
  createdAt, lastLogin
}
```

### Event Data
```javascript
{
  id, title, description, type, status,
  startDate, endDate, location, capacity,
  registered, attended, collected, target,
  organizer, contactInfo, requirements, incentives
}
```

### Analytics Metrics
```javascript
{
  kpis: { efficiency, retention, turnover, fulfillment },
  trends: { donations, requests, inventory },
  forecasts: { demand, supply, shortages },
  demographics: { age, gender, bloodTypes }
}
```

## 🚀 Usage Examples

### Dashboard Integration
```javascript
import dashboardApi from '../service/dashboardApi';

const loadDashboardData = async () => {
  const stats = await dashboardApi.getDashboardStats();
  const trends = await dashboardApi.getDonationTrends('7d');
  const activities = await dashboardApi.getRecentActivities();
  
  if (stats.success) {
    setDashboardStats(stats.data);
  }
};
```

### User Management
```javascript
import adminApi from '../service/adminApi';

const loadUsers = async (filters) => {
  const result = await adminApi.getAllUsers(filters);
  if (result.success) {
    setUsers(result.data.users);
    setPagination(result.data.pagination);
  }
};

const createNewUser = async (userData) => {
  const result = await adminApi.createUser(userData);
  if (result.success) {
    toast.success('User created successfully');
    refreshUserList();
  } else {
    toast.error(result.error);
  }
};
```

### Report Generation
```javascript
import reportsApi from '../service/reportsApi';

const generateDonationReport = async (filters) => {
  const report = await reportsApi.getDonationReports(filters);
  if (report.success) {
    setReportData(report.data);
  }
};

const exportReport = async (type, format) => {
  const result = await reportsApi.exportReportPDF(type);
  if (result.success) {
    downloadFile(result.data, result.filename);
  }
};
```

### Notifications
```javascript
import notificationsApi from '../service/notificationsApi';

const sendBulkNotification = async (notification) => {
  const result = await notificationsApi.sendBulkNotification({
    recipients: ['donors', 'staff'],
    title: 'Blood Drive Reminder',
    message: 'Join us for the community blood drive this Saturday!',
    channels: ['email', 'sms'],
    priority: 'medium'
  });
};
```

## 🔐 Security Features

### Authentication
- All API calls include authentication headers
- Role-based access control
- Session management
- Token validation

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

### Audit Logging
- All admin actions logged
- User activity tracking
- System event monitoring
- Security incident detection

## 📈 Performance Optimizations

### Caching Strategy
- API response caching
- Static data caching
- Real-time data optimization
- Background data refresh

### Data Loading
- Pagination support
- Lazy loading implementation
- Progressive data loading
- Efficient filtering

### Error Recovery
- Automatic retry logic
- Graceful degradation
- Fallback mechanisms
- Connection recovery

## 🧪 Testing Strategy

### Mock Data
- Comprehensive test scenarios
- Edge case coverage
- Performance testing data
- Integration test support

### API Testing
- Unit test compatibility
- Integration test support
- Load testing preparation
- Error scenario testing

## 🔄 Future Enhancements

### Planned Features
- Real-time WebSocket integration
- Advanced machine learning analytics
- Mobile app API support
- Third-party integrations

### Scalability
- Microservices architecture support
- Database optimization
- CDN integration
- Load balancing preparation

## 📞 Support

### Development Team
- **Backend Services**: Blood System Development Team
- **Version**: 1.0.0
- **Last Updated**: June 2024

### API Documentation
- All functions include JSDoc documentation
- Parameter descriptions
- Return value specifications
- Error handling examples

---

*This documentation covers all backend API services for the Blood Bank Management System. Each service is designed to be modular, scalable, and maintainable, providing a robust foundation for the admin dashboard and reporting functionality.*
