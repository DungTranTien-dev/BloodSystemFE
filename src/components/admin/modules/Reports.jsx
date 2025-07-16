import React from 'react';
import { FileText, Download, BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';

const Reports = ({
  setShowCustomReportModal,
  handleExportAllReports,
  handleGenerateCustomReport
}) => {
  const quickReports = [
    {
      id: 1,
      title: 'Blood Inventory Report',
      description: 'Current stock levels and expiry dates',
      icon: BarChart3,
      color: 'blue',
      action: () => handleGenerateCustomReport('blood-inventory')
    },
    {
      id: 2,
      title: 'Donor Statistics',
      description: 'Donor demographics and donation history',
      icon: TrendingUp,
      color: 'green',
      action: () => handleGenerateCustomReport('donor-statistics')
    },
    {
      id: 3,
      title: 'Monthly Summary',
      description: 'Monthly donation and usage summary',
      icon: Calendar,
      color: 'purple',
      action: () => handleGenerateCustomReport('monthly-summary')
    },
    {
      id: 4,
      title: 'Hospital Requests',
      description: 'Hospital blood request analysis',
      icon: FileText,
      color: 'orange',
      action: () => handleGenerateCustomReport('hospital-requests')
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Blood Inventory Report - January 2025',
      type: 'Blood Inventory',
      generatedAt: '2025-01-15T10:30:00Z',
      format: 'PDF',
      size: '2.3 MB'
    },
    {
      id: 2,
      name: 'Donor Statistics - Q4 2024',
      type: 'Donor Statistics',
      generatedAt: '2025-01-10T14:15:00Z',
      format: 'Excel',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Monthly Summary - December 2024',
      type: 'Monthly Summary',
      generatedAt: '2025-01-05T09:45:00Z',
      format: 'CSV',
      size: '0.9 MB'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Reports & Analytics</h3>
            <p className="text-gray-600">Generate and download system reports</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportAllReports}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            <span>Export All</span>
          </button>
          <button
            onClick={() => setShowCustomReportModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Filter size={16} />
            <span>Custom Report</span>
          </button>
        </div>
      </div>

      {/* Quick Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-purple-600">156</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Download className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="text-orange-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickReports.map((report) => (
            <button
              key={report.id}
              onClick={report.action}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${getColorClasses(report.color)}`}>
                  <report.icon size={20} />
                </div>
                <h5 className="font-semibold text-gray-900">{report.title}</h5>
              </div>
              <p className="text-sm text-gray-600">{report.description}</p>
              <div className="mt-4 flex items-center text-sm text-indigo-600">
                <Download className="mr-1" size={14} />
                Generate Report
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Recent Reports</h4>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="text-gray-400" size={16} />
                    <h5 className="font-medium text-gray-900">{report.name}</h5>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {report.format}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Type: {report.type}</span>
                    <span>Size: {report.size}</span>
                    <span>Generated: {new Date(report.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 rounded hover:bg-indigo-50">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {recentReports.length === 0 && (
          <div className="p-6 text-center">
            <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No reports generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
