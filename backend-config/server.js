// Main Server File for BloodSupportDb Backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./database');

const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5179',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const isHealthy = await database.healthCheck();
    const dbInfo = await database.getDatabaseInfo();
    
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: isHealthy,
        info: dbInfo
      },
      server: {
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: error.message
    });
  }
});

// ===========================
// API ROUTES
// ===========================

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Query user from database
    const result = await database.query(
      'SELECT Id, Name, Email, Role, BloodType, Status FROM Users WHERE Email = @email AND Status = @status',
      { email, status: 'Active' }
    );

    if (result.recordset.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = result.recordset[0];

    // In production, verify password hash here
    // const isValidPassword = await bcrypt.compare(password, user.Password);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.Id,
          name: user.Name,
          email: user.Email,
          role: user.Role,
          bloodType: user.BloodType,
          status: user.Status
        },
        token: 'mock-jwt-token' // In production, generate real JWT
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Dashboard Statistics
app.get('/api/dashboard/statistics', async (req, res) => {
  try {
    const stats = await database.executeTransaction([
      {
        query: 'SELECT COUNT(*) as totalDonors FROM Users WHERE Role = @role',
        params: { role: 'Donor' }
      },
      {
        query: 'SELECT COUNT(*) as totalDonations FROM Donations'
      },
      {
        query: 'SELECT SUM(Units) as totalBloodUnits FROM BloodInventory WHERE Status = @status',
        params: { status: 'Available' }
      },
      {
        query: 'SELECT COUNT(*) as activeEvents FROM Events WHERE Status = @status',
        params: { status: 'Active' }
      }
    ]);

    // Get low stock blood types
    const lowStockResult = await database.query(`
      SELECT BloodType, SUM(Units) as TotalUnits
      FROM BloodInventory 
      WHERE Status = 'Available'
      GROUP BY BloodType
      HAVING SUM(Units) < 30
    `);

    res.json({
      success: true,
      data: {
        totalDonors: stats[0].recordset[0].totalDonors || 0,
        totalDonations: stats[1].recordset[0].totalDonations || 0,
        bloodUnits: stats[2].recordset[0].totalBloodUnits || 0,
        activeEvents: stats[3].recordset[0].activeEvents || 0,
        lowStockTypes: lowStockResult.recordset.map(item => item.BloodType)
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Blood Type Distribution
app.get('/api/dashboard/blood-distribution', async (req, res) => {
  try {
    const result = await database.query(`
      SELECT 
        BloodType,
        SUM(Units) as TotalUnits,
        COUNT(*) as RecordCount
      FROM BloodInventory 
      WHERE Status = 'Available'
      GROUP BY BloodType
      ORDER BY TotalUnits DESC
    `);

    const totalUnits = result.recordset.reduce((sum, item) => sum + item.TotalUnits, 0);

    const bloodTypes = result.recordset.map((item, index) => ({
      bloodType: item.BloodType,
      count: item.TotalUnits,
      percentage: totalUnits > 0 ? ((item.TotalUnits / totalUnits) * 100).toFixed(1) : 0,
      color: getBloodTypeColor(item.BloodType)
    }));

    res.json({
      success: true,
      data: {
        bloodTypes,
        totalUnits,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Blood distribution error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blood distribution'
    });
  }
});

// Recent Activities
app.get('/api/dashboard/activities', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const result = await database.query(`
      SELECT TOP (@limit)
        sl.Action,
        sl.Entity,
        sl.Details,
        sl.CreatedAt,
        u.Name as UserName,
        u.Role as UserRole
      FROM SystemLogs sl
      LEFT JOIN Users u ON sl.UserId = u.Id
      ORDER BY sl.CreatedAt DESC
    `, { limit });

    const activities = result.recordset.map(log => ({
      id: log.Id,
      user: log.UserName || 'System',
      action: log.Action,
      type: log.Entity?.toLowerCase() || 'system',
      timestamp: log.CreatedAt,
      details: log.Details
    }));

    res.json({
      success: true,
      data: {
        activities,
        total: activities.length
      }
    });

  } catch (error) {
    console.error('Recent activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities'
    });
  }
});

// Blood Inventory
app.get('/api/blood/inventory', async (req, res) => {
  try {
    const result = await database.query(`
      SELECT 
        bi.*,
        u.Name as DonorName
      FROM BloodInventory bi
      LEFT JOIN Users u ON bi.DonorId = u.Id
      WHERE bi.Status = 'Available'
      ORDER BY bi.ExpiryDate ASC
    `);

    const inventory = result.recordset.map(item => ({
      id: item.Id,
      type: item.BloodType,
      units: item.Units,
      expiryDate: item.ExpiryDate,
      collectionDate: item.CollectionDate,
      donor: item.DonorName,
      location: item.Location,
      status: getInventoryStatus(item.Units, item.ExpiryDate)
    }));

    res.json({
      success: true,
      data: inventory
    });

  } catch (error) {
    console.error('Blood inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blood inventory'
    });
  }
});

// Blood Requests
app.get('/api/blood/requests', async (req, res) => {
  try {
    const result = await database.query(`
      SELECT 
        br.*,
        u.Name as ProcessedByName
      FROM BloodRequests br
      LEFT JOIN Users u ON br.ProcessedBy = u.Id
      ORDER BY br.RequestDate DESC
    `);

    const requests = result.recordset.map(req => ({
      id: req.Id,
      hospital: req.HospitalName,
      bloodType: req.BloodType,
      units: req.UnitsRequested,
      urgency: req.Urgency,
      status: req.Status,
      requestDate: req.RequestDate,
      requiredDate: req.RequiredDate,
      processedBy: req.ProcessedByName,
      patientInfo: req.PatientInfo
    }));

    res.json({
      success: true,
      data: requests
    });

  } catch (error) {
    console.error('Blood requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blood requests'
    });
  }
});

// Users Management
app.get('/api/users', async (req, res) => {
  try {
    const { role, status } = req.query;
    let query = 'SELECT Id, Name, Email, Phone, Role, BloodType, Status, CreatedAt FROM Users WHERE 1=1';
    const params = {};

    if (role) {
      query += ' AND Role = @role';
      params.role = role;
    }

    if (status) {
      query += ' AND Status = @status';
      params.status = status;
    }

    query += ' ORDER BY CreatedAt DESC';

    const result = await database.query(query, params);

    const users = result.recordset.map(user => ({
      id: user.Id,
      name: user.Name,
      email: user.Email,
      phone: user.Phone,
      role: user.Role,
      bloodType: user.BloodType,
      status: user.Status,
      lastDonation: '2024-01-15' // This should come from Donations table
    }));

    res.json({
      success: true,
      data: {
        users,
        total: users.length
      }
    });

  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const result = await database.query(`
      SELECT 
        e.*,
        u.Name as CreatedByName
      FROM Events e
      LEFT JOIN Users u ON e.CreatedBy = u.Id
      ORDER BY e.EventDate DESC
    `);

    const events = result.recordset.map(event => ({
      id: event.Id,
      name: event.Name,
      description: event.Description,
      date: event.EventDate,
      location: event.Location,
      organizer: event.OrganizerName,
      contactInfo: event.ContactInfo,
      target: event.TargetDonors,
      registered: event.RegisteredCount,
      status: event.Status,
      createdBy: event.CreatedByName
    }));

    res.json({
      success: true,
      data: events
    });

  } catch (error) {
    console.error('Events fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

// ===========================
// HELPER FUNCTIONS
// ===========================

function getBloodTypeColor(bloodType) {
  const colors = {
    'A+': '#ff6b6b',
    'A-': '#ff8e6b',
    'B+': '#4ecdc4',
    'B-': '#45b7d1',
    'AB+': '#96ceb4',
    'AB-': '#ffeaa7',
    'O+': '#d63031',
    'O-': '#fd79a8'
  };
  return colors[bloodType] || '#74b9ff';
}

function getInventoryStatus(units, expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (units < 10) return 'Critical';
  if (units < 25) return 'Low';
  if (daysUntilExpiry <= 7) return 'Expiring Soon';
  return 'Good';
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// ===========================
// SERVER STARTUP
// ===========================

async function startServer() {
  try {
    // Test database connection
    await database.connect();
    console.log('🗄️  Database connection established');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 BloodSupportDb Backend running on port ${PORT}`);
      console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5179'}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  await database.disconnect();
  process.exit(0);
});

// Start the server
startServer();
