// Reports Section Component - Placeholder for refactored admin dashboard
import React, { useState } from 'react';
import { toast } from 'sonner';
import { BarChart3, Download, FileText, TrendingUp, Calendar } from 'lucide-react';

const ReportsSection = () => {
  const [reports] = useState([
    { id: 1, name: 'Báo cáo hiến máu tháng', type: 'Monthly', date: '2024-02-01', status: 'Ready' },
    { id: 2, name: 'Thống kê người dùng', type: 'User Analytics', date: '2024-02-15', status: 'Processing' },
    { id: 3, name: 'Báo cáo tồn kho', type: 'Inventory', date: '2024-02-20', status: 'Ready' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h2>
          <p className="text-gray-600">Tạo và quản lý các báo cáo hệ thống</p>
        </div>
        <button
          onClick={() => toast.info('Tính năng đang phát triển')}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <FileText size={20} />
          <span>Tạo báo cáo</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Báo cáo tháng này</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tăng trưởng hiến máu</p>
              <p className="text-2xl font-bold text-gray-900">+15%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Báo cáo tự động</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Download className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Lượt tải xuống</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Báo cáo hiến máu</h4>
            <BarChart3 className="text-blue-500" size={24} />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Thống kê số lượng hiến máu theo thời gian, nhóm máu và địa điểm
          </p>
          <button 
            onClick={() => toast.info('Tính năng đang phát triển')}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Tạo báo cáo
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Báo cáo người dùng</h4>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Phân tích hoạt động người dùng, đăng ký mới và tỷ lệ tham gia
          </p>
          <button 
            onClick={() => toast.info('Tính năng đang phát triển')}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Tạo báo cáo
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Báo cáo tồn kho</h4>
            <FileText className="text-purple-500" size={24} />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Tình trạng kho máu, ngày hết hạn và dự báo nhu cầu
          </p>
          <button 
            onClick={() => toast.info('Tính năng đang phát triển')}
            className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            Tạo báo cáo
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Báo cáo gần đây</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-500">
                      {report.type} • {report.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                  {report.status === 'Ready' && (
                    <button
                      onClick={() => toast.success(`Tải xuống ${report.name}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Download size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ thống kê</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 size={48} className="mx-auto mb-2" />
            <p>Biểu đồ sẽ được hiển thị ở đây</p>
            <p className="text-sm">Tính năng đang phát triển</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
