# BloodSupportDb Backend Setup Guide

## 🚀 Tạo Backend Server cho kết nối SQL Server

### 1. Tạo Backend Project

```bash
# Tạo thư mục backend
mkdir BloodSystemBE
cd BloodSystemBE

# Khởi tạo Node.js project
npm init -y

# Cài đặt dependencies
npm install express cors dotenv mssql bcryptjs jsonwebtoken
npm install -D nodemon
```

### 2. Cấu trúc Backend Project

```
BloodSystemBE/
├── server.js
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── donorController.js
│   ├── bloodController.js
│   └── adminController.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   ├── donors.js
│   ├── blood.js
│   └── admin.js
├── models/
│   └── sql/
│       ├── users.sql
│       ├── blood_inventory.sql
│       └── donations.sql
└── .env
```

### 3. Environment Variables (.env)

```env
# Server Configuration
PORT=5100
NODE_ENV=development

# SQL Server Configuration
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=BloodSupportDb
DB_USER=sa
DB_PASSWORD=your_password

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Settings
FRONTEND_URL=http://localhost:5179
```

### 4. SQL Server Database Setup

#### Tạo Database và Tables:

```sql
-- Tạo Database
CREATE DATABASE BloodSupportDb;
USE BloodSupportDb;

-- Bảng Users (người dùng)
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(20),
    Role NVARCHAR(20) DEFAULT 'Donor', -- 'Admin', 'Donor', 'Medical Staff', 'Volunteer'
    BloodType NVARCHAR(5),
    Address NVARCHAR(255),
    DateOfBirth DATE,
    Gender NVARCHAR(10),
    EmergencyContact NVARCHAR(100),
    MedicalConditions NTEXT,
    Status NVARCHAR(20) DEFAULT 'Active', -- 'Active', 'Inactive', 'Pending'
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Bảng Blood Inventory (kho máu)
CREATE TABLE BloodInventory (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    BloodType NVARCHAR(5) NOT NULL,
    Units INT NOT NULL,
    ExpiryDate DATE NOT NULL,
    CollectionDate DATE NOT NULL,
    DonorId INT,
    Location NVARCHAR(100),
    Status NVARCHAR(20) DEFAULT 'Available', -- 'Available', 'Used', 'Expired'
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (DonorId) REFERENCES Users(Id)
);

-- Bảng Donations (lịch sử hiến máu)
CREATE TABLE Donations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DonorId INT NOT NULL,
    BloodType NVARCHAR(5) NOT NULL,
    Units INT NOT NULL,
    DonationDate DATE NOT NULL,
    Location NVARCHAR(100),
    MedicalStaffId INT,
    Notes NTEXT,
    Status NVARCHAR(20) DEFAULT 'Completed', -- 'Scheduled', 'Completed', 'Cancelled'
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (DonorId) REFERENCES Users(Id),
    FOREIGN KEY (MedicalStaffId) REFERENCES Users(Id)
);

-- Bảng Blood Requests (yêu cầu máu)
CREATE TABLE BloodRequests (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    HospitalName NVARCHAR(100) NOT NULL,
    BloodType NVARCHAR(5) NOT NULL,
    UnitsRequested INT NOT NULL,
    Urgency NVARCHAR(20) NOT NULL, -- 'Low', 'Medium', 'High', 'Critical'
    PatientInfo NTEXT,
    RequestDate DATETIME DEFAULT GETDATE(),
    RequiredDate DATE,
    Status NVARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected', 'Fulfilled'
    ProcessedBy INT,
    ProcessedAt DATETIME,
    Notes NTEXT,
    FOREIGN KEY (ProcessedBy) REFERENCES Users(Id)
);

-- Bảng Events (sự kiện hiến máu)
CREATE TABLE Events (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Description NTEXT,
    EventDate DATE NOT NULL,
    StartTime TIME,
    EndTime TIME,
    Location NVARCHAR(255) NOT NULL,
    OrganizerName NVARCHAR(100),
    ContactInfo NVARCHAR(100),
    TargetDonors INT,
    RegisteredCount INT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'Planning', -- 'Planning', 'Active', 'Completed', 'Cancelled'
    CreatedBy INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

-- Bảng Event Registrations (đăng ký sự kiện)
CREATE TABLE EventRegistrations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    EventId INT NOT NULL,
    UserId INT NOT NULL,
    RegistrationDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) DEFAULT 'Registered', -- 'Registered', 'Attended', 'No-show', 'Cancelled'
    Notes NTEXT,
    FOREIGN KEY (EventId) REFERENCES Events(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Bảng System Logs (nhật ký hệ thống)
CREATE TABLE SystemLogs (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    Action NVARCHAR(100) NOT NULL,
    Entity NVARCHAR(50), -- 'User', 'Blood', 'Event', 'Request'
    EntityId INT,
    Details NTEXT,
    IPAddress NVARCHAR(45),
    UserAgent NTEXT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);
```

### 5. Sample Data

```sql
-- Thêm dữ liệu mẫu cho Users
INSERT INTO Users (Name, Email, Password, Phone, Role, BloodType, Address, DateOfBirth, Gender, Status) VALUES
('Admin System', 'admin@bloodsupport.com', '$2b$10$hashedpassword', '0123456789', 'Admin', 'O+', '123 Admin St', '1990-01-01', 'Male', 'Active'),
('Nguyễn Văn A', 'donor1@email.com', '$2b$10$hashedpassword', '0987654321', 'Donor', 'A+', '456 Donor St', '1995-05-15', 'Male', 'Active'),
('Trần Thị B', 'donor2@email.com', '$2b$10$hashedpassword', '0912345678', 'Donor', 'O-', '789 Universal St', '1992-08-20', 'Female', 'Active'),
('Lê Văn C', 'medical1@hospital.com', '$2b$10$hashedpassword', '0901234567', 'Medical Staff', 'B+', '321 Hospital Ave', '1988-12-10', 'Male', 'Active');

-- Thêm dữ liệu mẫu cho Blood Inventory
INSERT INTO BloodInventory (BloodType, Units, ExpiryDate, CollectionDate, DonorId, Location, Status) VALUES
('A+', 45, '2024-08-15', '2024-07-15', 2, 'Main Blood Bank', 'Available'),
('O-', 23, '2024-08-20', '2024-07-20', 3, 'Main Blood Bank', 'Available'),
('B+', 67, '2024-08-10', '2024-07-10', 4, 'North Branch', 'Available'),
('AB+', 34, '2024-08-18', '2024-07-18', 2, 'Main Blood Bank', 'Available');

-- Thêm dữ liệu mẫu cho Blood Requests
INSERT INTO BloodRequests (HospitalName, BloodType, UnitsRequested, Urgency, PatientInfo, RequiredDate, Status) VALUES
('Bệnh viện Bạch Mai', 'A+', 5, 'High', 'Emergency surgery patient', '2024-07-20', 'Pending'),
('Bệnh viện Chợ Rẫy', 'O-', 3, 'Critical', 'Accident victim', '2024-07-17', 'Approved'),
('Bệnh viện Đà Nẵng', 'B+', 8, 'Medium', 'Scheduled surgery', '2024-07-25', 'Pending');

-- Thêm dữ liệu mẫu cho Events
INSERT INTO Events (Name, Description, EventDate, StartTime, EndTime, Location, OrganizerName, ContactInfo, TargetDonors, Status, CreatedBy) VALUES
('Blood Drive at University', 'Annual blood donation drive at local university', '2024-08-20', '08:00:00', '17:00:00', 'University Campus', 'Red Cross', 'contact@redcross.org', 200, 'Planning', 1),
('Community Blood Drive', 'Community center blood donation event', '2024-08-25', '09:00:00', '16:00:00', 'Community Center', 'Local Hospital', 'community@hospital.com', 150, 'Active', 1);
```

### 6. Backend Code Implementation

Tôi sẽ tạo các file backend để kết nối với SQL Server...
