// System Settings Component - Placeholder for refactored admin dashboard
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Settings, Save, RotateCcw, Shield, Database, Bell } from 'lucide-react';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    systemName: 'Blood Donation Management System',
    language: 'Vietnamese',
    timezone: 'Asia/Ho_Chi_Minh',
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    sessionTimeout: '30',
    maxLoginAttempts: '5'
  });

  const handleSaveSettings = () => {
    toast.success('Cài đặt đã được lưu thành công!');
  };

  const handleResetSettings = () => {
    setSettings({
      systemName: 'Blood Donation Management System',
      language: 'Vietnamese',
      timezone: 'Asia/Ho_Chi_Minh',
      emailNotifications: true,
      smsNotifications: false,
      autoBackup: true,
      sessionTimeout: '30',
      maxLoginAttempts: '5'
    });
    toast.success('Cài đặt đã được đặt lại về mặc định!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h2>
          <p className="text-gray-600">Cấu hình và quản lý hệ thống</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleResetSettings}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Đặt lại</span>
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Save size={20} />
            <span>Lưu cài đặt</span>
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="text-blue-500" size={24} />
            <h4 className="font-semibold text-gray-900">Cài đặt chung</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên hệ thống</label>
              <input 
                type="text" 
                value={settings.systemName}
                onChange={(e) => setSettings({...settings, systemName: e.target.value})}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ mặc định</label>
              <select 
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Vietnamese">Tiếng Việt</option>
                <option value="English">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
              <select 
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Asia/Ho_Chi_Minh">UTC+7 (Hồ Chí Minh)</option>
                <option value="UTC">UTC+0 (London)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-green-500" size={24} />
            <h4 className="font-semibold text-gray-900">Cài đặt bảo mật</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian hết phiên (phút)</label>
              <input 
                type="number" 
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lần đăng nhập sai tối đa</label>
              <input 
                type="number" 
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({...settings, maxLoginAttempts: e.target.value})}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Xác thực hai yếu tố</span>
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Đã bật</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Chính sách mật khẩu</span>
                <button 
                  onClick={() => toast.info('Tính năng đang phát triển')}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Cấu hình
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="text-yellow-500" size={24} />
            <h4 className="font-semibold text-gray-900">Cài đặt thông báo</h4>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Thông báo Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Thông báo SMS</span>
              </label>
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="text-purple-500" size={24} />
            <h4 className="font-semibold text-gray-900">Cài đặt sao lưu</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Sao lưu tự động</span>
              </label>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => toast.success('Bắt đầu sao lưu thủ công')}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                Sao lưu ngay
              </button>
              <p className="text-sm text-gray-500">Sao lưu gần nhất: 01/02/2024 - 14:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="font-semibold text-gray-900 mb-4">Thông tin hệ thống</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Phiên bản hệ thống</p>
            <p className="font-medium">v1.2.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cơ sở dữ liệu</p>
            <p className="font-medium">MySQL 8.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Thời gian hoạt động</p>
            <p className="font-medium">15 ngày 8 giờ</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dung lượng sử dụng</p>
            <p className="font-medium">2.4 GB / 10 GB</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Số lượng người dùng</p>
            <p className="font-medium">1,234 người</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cập nhật cuối</p>
            <p className="font-medium">01/02/2024</p>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="font-semibold text-gray-900 mb-4">Phiên đăng nhập hoạt động</h4>
        <div className="space-y-3">
          {[
            { user: 'admin@system.com', device: 'Chrome on Windows', location: 'Hồ Chí Minh', time: 'Đang hoạt động' },
            { user: 'staff@system.com', device: 'Firefox on Mac', location: 'Hà Nội', time: '5 phút trước' },
            { user: 'manager@system.com', device: 'Safari on iPhone', location: 'Đà Nẵng', time: '15 phút trước' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium text-gray-900">{session.user}</div>
                <div className="text-sm text-gray-500">{session.device} • {session.location}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{session.time}</div>
                <button 
                  onClick={() => toast.info(`Đăng xuất phiên: ${session.user}`)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
