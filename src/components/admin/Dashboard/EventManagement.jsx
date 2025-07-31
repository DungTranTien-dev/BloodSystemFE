// Event Management Component - Placeholder for refactored admin dashboard
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Plus, MapPin, Users, Clock } from 'lucide-react';

const EventManagement = () => {
  const [events] = useState([
    { id: 1, name: 'Hiến máu tại Đại học ABC', date: '2024-02-20', location: 'Hà Nội', registered: 150, target: 200, status: 'Active' },
    { id: 2, name: 'Chiến dịch hiến máu cộng đồng', date: '2024-02-25', location: 'TP.HCM', registered: 89, target: 150, status: 'Active' },
    { id: 3, name: 'Ngày hội hiến máu tình nguyện', date: '2024-03-01', location: 'Đà Nẵng', registered: 45, target: 100, status: 'Planning' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý sự kiện</h2>
          <p className="text-gray-600">Tổ chức và theo dõi các chiến dịch hiến máu</p>
        </div>
        <button
          onClick={() => toast.info('Tính năng đang phát triển')}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Tạo sự kiện</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                event.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.status}
              </span>
            </div>

            <h4 className="font-semibold text-lg mb-2 text-gray-900">{event.name}</h4>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-red-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-red-500" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Đăng ký</span>
                <span className="font-medium">{event.registered}/{event.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full" 
                  style={{ width: `${(event.registered / event.target) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => toast.info(`Xem chi tiết sự kiện: ${event.name}`)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded text-sm hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Chi tiết
              </button>
              <button 
                onClick={() => toast.info(`Quản lý sự kiện: ${event.name}`)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded text-sm hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Quản lý
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng sự kiện</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Người tham gia</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.reduce((sum, event) => sum + event.registered, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter(event => event.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Địa điểm</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(events.map(event => event.location)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
