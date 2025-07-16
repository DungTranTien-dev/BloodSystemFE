# Blood System Backend API

## Hướng dẫn thiết lập và chạy Backend với SQL Server

### 📋 Yêu cầu hệ thống
- Node.js 16+ 
- SQL Server (Local hoặc Remote)
- Windows/Linux/macOS

### 🚀 Cách cài đặt

#### Bước 1: Tạo thư mục backend và di chuyển files
```bash
# Tạo thư mục backend
mkdir backend
cd backend

# Copy tất cả files từ backend-config/ vào backend/
# Hoặc di chuyển toàn bộ backend-config/ thành backend/
```

#### Bước 2: Cài đặt dependencies
```bash
npm install
```

#### Bước 3: Cấu hình môi trường
```bash
# Copy file .env.example thành .env
cp .env.example .env

# Chỉnh sửa file .env với thông tin SQL Server của bạn
```

#### Bước 4: Thiết lập SQL Server Database
1. Mở SQL Server Management Studio (SSMS)
2. Chạy script từ file `BACKEND_SETUP_GUIDE.md` để tạo database và tables
3. Chạy script sample data để có dữ liệu test

#### Bước 5: Khởi chạy server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 🔧 Cấu hình Database (.env)

```env
# SQL Server Configuration
DB_SERVER=localhost        # hoặc IP của SQL Server
DB_PORT=1433              # Port mặc định của SQL Server
DB_NAME=BloodSupportDb    # Tên database
DB_USER=sa                # Username (để trống nếu dùng Windows Auth)
DB_PASSWORD=yourpassword  # Password (để trống nếu dùng Windows Auth)
```

### 📡 API Endpoints

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

#### Dashboard
- `GET /api/dashboard/statistics` - Thống kê tổng quan
- `GET /api/dashboard/recent-activities` - Hoạt động gần đây

#### Blood Management
- `GET /api/blood/inventory` - Kho máu
- `POST /api/blood/request` - Yêu cầu máu
- `GET /api/blood/requests` - Danh sách yêu cầu

#### User Management
- `GET /api/users` - Danh sách người dùng
- `GET /api/users/:id` - Thông tin user
- `PUT /api/users/:id` - Cập nhật user

#### Events
- `GET /api/events` - Danh sách sự kiện
- `POST /api/events` - Tạo sự kiện mới

### 🧪 Testing API

#### Test server health:
```bash
curl http://localhost:5100/api/health
```

#### Test login:
```bash
curl -X POST http://localhost:5100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t blood-system-backend .

# Run container
docker run -p 5100:5100 --env-file .env blood-system-backend
```

### 📝 Database Schema

Database `BloodSupportDb` bao gồm:
- **Users** - Quản lý người dùng
- **BloodInventory** - Kho máu
- **Donations** - Lịch sử hiến máu
- **BloodRequests** - Yêu cầu máu
- **Events** - Sự kiện hiến máu
- **EventRegistrations** - Đăng ký sự kiện
- **SystemLogs** - Logs hệ thống

### 🔍 Troubleshooting

#### Lỗi kết nối SQL Server:
1. Kiểm tra SQL Server đã bật chưa
2. Kiểm tra firewall cho port 1433
3. Kiểm tra SQL Server Authentication mode
4. Verify connection string trong .env

#### Lỗi CORS:
- Kiểm tra `FRONTEND_URL` trong .env file

#### Lỗi JWT:
- Đổi `JWT_SECRET` trong .env file

### 📊 Production Deployment

#### Cấu hình Production:
```env
NODE_ENV=production
PORT=5100
# Sử dụng strong JWT secret
JWT_SECRET=your_very_long_random_secret_key_here
# Database production
DB_SERVER=your_production_sql_server
```

#### PM2 Deployment:
```bash
npm install -g pm2
pm2 start server.js --name "blood-system-api"
pm2 startup
pm2 save
```

### 🔐 Security Notes

- Đổi JWT_SECRET trong production
- Sử dụng HTTPS trong production  
- Cấu hình proper CORS origins
- Enable rate limiting cho production
- Regular backup database

---

**Lưu ý:** Sau khi backend chạy thành công trên port 5100, frontend React sẽ tự động kết nối và sử dụng real data thay vì mock data.
