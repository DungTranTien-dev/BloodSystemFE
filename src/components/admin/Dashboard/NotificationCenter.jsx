// Notification Center Component - Placeholder for refactored admin dashboard
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Bell, Send, Mail, MessageSquare, Users } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications] = useState([
    { id: 1, type: 'Email', title: 'Nhắc nhở hiến máu', recipients: 1234, status: 'Sent', time: '2 giờ trước' },
    { id: 2, type: 'SMS', title: 'Yêu cầu máu khẩn cấp', recipients: 567, status: 'Delivered', time: '4 giờ trước' },
    { id: 3, type: 'Push', title: 'Sự kiện hiến máu mới', recipients: 2345, status: 'Sent', time: '1 ngày trước' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trung tâm thông báo</h2>
          <p className="text-gray-600">Gửi và quản lý thông báo đến người dùng</p>
        </div>
        <button
          onClick={() => toast.info('Tính năng đang phát triển')}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Send size={20} />
          <span>Tạo thông báo</span>
        </button>
      </div>

      {/* Notification Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Email Campaign</h4>
            <Mail className="text-blue-500" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gửi hôm nay:</span>
              <span className="font-medium">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tỷ lệ mở:</span>
              <span className="font-medium">68%</span>
            </div>
            <button 
              onClick={() => toast.info('Tính năng đang phát triển')}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 transition-colors"
            >
              Tạo chiến dịch
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">SMS Alerts</h4>
            <MessageSquare className="text-green-500" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gửi hôm nay:</span>
              <span className="font-medium">567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tỷ lệ thành công:</span>
              <span className="font-medium">92%</span>
            </div>
            <button 
              onClick={() => toast.info('Tính năng đang phát triển')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600 transition-colors"
            >
              Gửi SMS
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Push Notifications</h4>
            <Bell className="text-purple-500" size={24} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gửi hôm nay:</span>
              <span className="font-medium">2,345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tỷ lệ click:</span>
              <span className="font-medium">45%</span>
            </div>
            <button 
              onClick={() => toast.info('Tính năng đang phát triển')}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded mt-3 hover:bg-purple-600 transition-colors"
            >
              Gửi Push
            </button>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Thông báo gần đây</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.type === 'Email' ? 'bg-blue-500' :
                    notification.type === 'SMS' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-500">
                      {notification.type} • {notification.recipients} người nhận • {notification.time}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  notification.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {notification.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email gửi</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">SMS gửi</p>
              <p className="text-2xl font-bold text-gray-900">567</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Push notification</p>
              <p className="text-2xl font-bold text-gray-900">2,345</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng người nhận</p>
              <p className="text-2xl font-bold text-gray-900">4,146</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
