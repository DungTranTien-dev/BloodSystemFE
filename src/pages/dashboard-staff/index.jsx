import React, { useState, useEffect } from "react";
import {
  PieChart,
  Heart,
  Plus,
  Building2,
  TestTube,
  LogOut,
  User,
  Monitor,
  Calendar,
  BarChart3,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { logout } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

const menuItems = [
  {
    key: "staff",
    label: "Tổng quan",
    icon: PieChart,
    path: "/DashboardS/staff"
  },
  {
    key: "manage-registion",
    label: "Quản lí hiến máu",
    icon: Monitor,
    path: "/DashboardS/manage-registion"
  },
  {
    key: "blood-request",
    label: "Quản lí cần máu",
    icon: TestTube,
    path: "/DashboardS/blood-request"
  },
  {
    key: "manage-event",
    label: "Quản lí sự kiện",
    icon: Building2,
    path: "/DashboardS/manage-event"
  },
  {
    key: "medical-request",
    label: "Quản lí hồ sơ y tế",
    icon: Monitor,
    path: "/DashboardS/medical-request"
  },
  {
    key: "manage-blood",
    label: "Quản lí máu",
    icon: Plus,
    path: "/DashboardS/manage-blood"
  },
  {
    key: "manage-separated",
    label: "Quản lí tách máu",
    icon: TestTube,
    path: "/DashboardS/manage-separated"
  }
];


const DashboardS = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("overview");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPage = pathSegments[pathSegments.length - 1];
    
    const pageToKeyMap = {
      'staff': 'staff',
      'manage-registion': 'manage-registion', 
      'blood-request': 'blood-request',
      'manage-event': 'manage-event',
      'manage-blood': 'manage-blood',
      'manage-separated': 'manage-separated',
      'manage-medical': 'manage-medical',
      'medical-request': 'medical-request',
    };
    
    if (pageToKeyMap[currentPage]) {
      setSelectedKey(pageToKeyMap[currentPage]);
    } else {
      setSelectedKey('overview');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const statsData = [
    {
      title: "Yêu cầu chờ xử lý",
      value: "24",
      change: "+12%",
      color: "bg-gradient-to-br from-red-500 to-pink-600",
      icon: Bell,
      description: "Yêu cầu hiến máu mới"
    },
    {
      title: "Lịch hẹn hôm nay",
      value: "8",
      change: "+3%",
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      icon: Calendar,
      description: "Cuộc hẹn được lên lịch"
    },
    {
      title: "Đơn vị máu thu được",
      value: "156",
      change: "+18%",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
      icon: Activity,
      description: "Tuần này"
    },
    {
      title: "Người hiến máu mới",
      value: "32",
      change: "+8%",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      icon: Users,
      description: "Tháng này"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-72'
      } bg-gradient-to-b from-red-600 via-red-500 to-pink-600 shadow-2xl`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <h1 className="text-xl font-bold text-white">Hiến máu</h1>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer w-full"
            >
              <div className="h-10 w-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <span className="text-white font-semibold">
                    {user?.user?.userName ? user?.user?.userName.charAt(0) : <User className="h-5 w-5" />}
                  </span>
                )}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-white font-semibold truncate">{user?.user?.userName || 'Staff'}</p>
                  <p className="text-white/70 text-sm truncate">{user?.user?.role}</p>
                </div>
              )}
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && !collapsed && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 rounded-t-lg"
                >
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ
                </button>
                <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50">
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600 rounded-b-lg"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 pb-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedKey === item.key;
              
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-red-600 shadow-lg' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setSelectedKey(item.key)}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-red-600' : ''}`} />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-red-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-72'}`}>
        {/* Header */}
        <Header/>

        {/* Main Content Area */}
        <main className="p-6">
          {selectedKey === "overview" ? (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-red-100 rounded-2xl">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Xin chào, {user?.userName || 'Nhân viên Y tế'}! 👩‍⚕️👨‍⚕️
                    </h1>
                    <p className="text-gray-600 text-lg">Chào mừng bạn đến với hệ thống quản lý hiến máu</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
        
              {/* Info Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Bell className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-600">Yêu cầu cần xử lý</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Kiểm tra và xác nhận các yêu cầu hiến máu, yêu cầu cần máu đang chờ xử lý để đảm bảo phục vụ kịp thời.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-amber-600">Quản lý lịch hẹn</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Theo dõi lịch hẹn hiến máu, sự kiện và sắp xếp thời gian tiếp nhận người hiến máu một cách hiệu quả.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-600">Thống kê hoạt động</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Xem số lượng đơn đăng ký, số máu đã tiếp nhận và nhu cầu từng nhóm máu theo thời gian thực.
                  </p>
                </div>
              </div>

              {/* Quick Guide */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-6 w-6 text-red-800" />
                  <h2 className="text-xl font-bold text-red-800">Hướng dẫn nhanh cho nhân viên mới</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Kiểm tra các yêu cầu mới trong mục Yêu cầu hiến máu",
                    "Xác nhận thông tin người hiến máu và lên lịch tiếp nhận", 
                    "Theo dõi tình hình nhóm máu trong kho để ưu tiên xử lý",
                    "Gửi thông báo đến người dùng nếu cần kêu gọi gấp"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                      <div className="p-1 bg-red-200 rounded-full mt-0.5">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                      </div>
                      <span className="text-red-800 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-12">
          <div className="text-center text-gray-600">
            <p className="font-medium">
              Hiến máu cứu người ©{new Date().getFullYear()} | 
              <span className="text-red-600 font-semibold ml-1">Kết nối sự sống</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardS;