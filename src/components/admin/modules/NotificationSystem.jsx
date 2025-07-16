import React from 'react';
import { Bell, Send, MessageSquare, Smartphone, Mail, Users, History } from 'lucide-react';

const NotificationSystem = ({
  notifications,
  setShowSendNotificationModal,
  setShowNotificationHistoryModal
}) => {
  const getTotalNotifications = () => {
    return notifications.length;
  };

  const getSentNotifications = () => {
    return notifications.filter(notif => notif.status === 'Sent').length;
  };

  const getPendingNotifications = () => {
    return notifications.filter(notif => notif.status === 'Pending').length;
  };

  const getFailedNotifications = () => {
    return notifications.filter(notif => notif.status === 'Failed').length;
  };

  const getRecentNotifications = () => {
    return notifications
      .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
      .slice(0, 5);
  };

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="text-blue-600" size={16} />;
      case 'sms':
        return <MessageSquare className="text-green-600" size={16} />;
      case 'push':
        return <Smartphone className="text-purple-600" size={16} />;
      default:
        return <Bell className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
            <Bell className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notification System</h3>
            <p className="text-gray-600">Send and manage notifications</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNotificationHistoryModal(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <History size={16} />
            <span>History</span>
          </button>
          <button
            onClick={() => setShowSendNotificationModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Send size={16} />
            <span>Send Notification</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalNotifications()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">{getSentNotifications()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Send className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{getPendingNotifications()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <MessageSquare className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{getFailedNotifications()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Smartphone className="text-red-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowSendNotificationModal(true)}
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="text-blue-600" size={20} />
            </div>
            <h4 className="font-semibold text-gray-900">Email Campaign</h4>
          </div>
          <p className="text-sm text-gray-600">Send email notifications to donors and volunteers</p>
        </button>

        <button
          onClick={() => setShowSendNotificationModal(true)}
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="text-green-600" size={20} />
            </div>
            <h4 className="font-semibold text-gray-900">SMS Alert</h4>
          </div>
          <p className="text-sm text-gray-600">Send urgent SMS alerts for blood shortages</p>
        </button>

        <button
          onClick={() => setShowSendNotificationModal(true)}
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Smartphone className="text-purple-600" size={20} />
            </div>
            <h4 className="font-semibold text-gray-900">Push Notification</h4>
          </div>
          <p className="text-sm text-gray-600">Send push notifications to mobile app users</p>
        </button>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Recent Notifications</h4>
            <button
              onClick={() => setShowNotificationHistoryModal(true)}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {getRecentNotifications().length > 0 ? (
            getRecentNotifications().map((notification) => (
              <div key={notification.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getNotificationTypeIcon(notification.type)}
                      <h5 className="font-medium text-gray-900">{notification.title}</h5>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users className="mr-1" size={12} />
                        {notification.recipients} recipients
                      </span>
                      <span>{new Date(notification.sentAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <Bell className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No notifications sent yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;
