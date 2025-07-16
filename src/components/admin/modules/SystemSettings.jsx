import React from 'react';
import { Settings, Database, Shield, Bell, Download, Upload, FileText } from 'lucide-react';

const SystemSettings = ({
  setShowSettingsModal,
  handleBackupNow,
  handleRestoreBackup,
  handleViewSystemLogs,
  lastBackupTime,
  systemLogs
}) => {
  const settingsCategories = [
    {
      id: 1,
      title: 'General Settings',
      description: 'System configuration and preferences',
      icon: Settings,
      color: 'blue',
      action: () => setShowSettingsModal(true)
    },
    {
      id: 2,
      title: 'Security Settings',
      description: 'User authentication and permissions',
      icon: Shield,
      color: 'red',
      action: () => setShowSettingsModal(true)
    },
    {
      id: 3,
      title: 'Notification Settings',
      description: 'Email, SMS, and push notification configuration',
      icon: Bell,
      color: 'yellow',
      action: () => setShowSettingsModal(true)
    },
    {
      id: 4,
      title: 'Database Settings',
      description: 'Backup, restore, and maintenance options',
      icon: Database,
      color: 'green',
      action: () => setShowSettingsModal(true)
    }
  ];

  const systemStats = [
    {
      label: 'System Uptime',
      value: '15 days, 8 hours',
      color: 'green'
    },
    {
      label: 'Database Size',
      value: '2.4 GB',
      color: 'blue'
    },
    {
      label: 'Active Users',
      value: '127',
      color: 'purple'
    },
    {
      label: 'Last Backup',
      value: lastBackupTime ? 
        getTimeAgo(lastBackupTime) : 
        'No backup yet',
      color: 'orange'
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
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
          <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl">
            <Settings className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">System Settings</h3>
            <p className="text-gray-600">Configure system preferences and maintenance</p>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <Settings size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Categories */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Settings Categories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              onClick={category.action}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                  <category.icon size={20} />
                </div>
                <h5 className="font-semibold text-gray-900">{category.title}</h5>
              </div>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Backup & Maintenance */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">Backup & Maintenance</h4>
          <p className="text-sm text-gray-600 mt-1">Manage system backups and maintenance tasks</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleBackupNow}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <Download className="text-gray-400 group-hover:text-blue-500" size={20} />
              <span className="text-gray-600 group-hover:text-blue-600 font-medium">Backup Now</span>
            </button>
            
            <button
              onClick={handleRestoreBackup}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <Upload className="text-gray-400 group-hover:text-green-500" size={20} />
              <span className="text-gray-600 group-hover:text-green-600 font-medium">Restore Backup</span>
            </button>
            
            <button
              onClick={handleViewSystemLogs}
              className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <FileText className="text-gray-400 group-hover:text-purple-500" size={20} />
              <span className="text-gray-600 group-hover:text-purple-600 font-medium">View Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">System Information</h4>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Application Details</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="text-gray-900">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Environment:</span>
                  <span className="text-gray-900">Production</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="text-gray-900">January 15, 2025</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Server Information</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Server Time:</span>
                  <span className="text-gray-900">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Memory Usage:</span>
                  <span className="text-gray-900">64% (2.1 GB / 3.2 GB)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CPU Usage:</span>
                  <span className="text-gray-900">23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent System Logs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Recent System Logs</h4>
            <button 
              onClick={handleViewSystemLogs}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              View All Logs
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {systemLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{log.type}</span>
                    <span className="text-xs text-gray-500">by {log.user}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                  <span className="text-xs text-gray-400">
                    {getTimeAgo(log.timestamp)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    log.type.includes('login') ? 'bg-blue-100 text-blue-800' :
                    log.type.includes('backup') ? 'bg-green-100 text-green-800' :
                    log.type.includes('restore') ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {log.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {systemLogs.length === 0 && (
            <div className="p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No system logs available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
