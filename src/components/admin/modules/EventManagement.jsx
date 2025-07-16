import React from 'react';
import { Calendar, Plus, MapPin, Users, Clock, Eye } from 'lucide-react';

const EventManagement = ({
  events,
  setShowCreateEventModal,
  setShowEventDetailsModal,
  setSelectedEvent
}) => {
  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => new Date(event.date) > now);
  };

  const getOngoingEvents = () => {
    const now = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventEndDate = new Date(eventDate.getTime() + (event.duration || 8) * 60 * 60 * 1000);
      return eventDate <= now && now <= eventEndDate;
    });
  };

  const getCompletedEvents = () => {
    const now = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventEndDate = new Date(eventDate.getTime() + (event.duration || 8) * 60 * 60 * 1000);
      return eventEndDate < now;
    });
  };

  const getTotalAttendees = () => {
    return events.reduce((total, event) => total + (event.attendees || 0), 0);
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const eventEndDate = new Date(eventDate.getTime() + (event.duration || 8) * 60 * 60 * 1000);
    
    if (eventDate > now) return 'Upcoming';
    if (eventDate <= now && now <= eventEndDate) return 'Ongoing';
    return 'Completed';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
            <Calendar className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Event Management</h3>
            <p className="text-gray-600">Organize blood donation events</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateEventModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={16} />
          <span>Create Event</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">{getUpcomingEvents().length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-green-600">{getOngoingEvents().length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-purple-600">{getTotalAttendees()}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="text-orange-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getEventStatus(event))}`}>
                    {getEventStatus(event)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventDetailsModal(true);
                  }}
                  className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 flex-shrink-0" size={16} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 flex-shrink-0" size={16} />
                  <span>{event.time || '9:00 AM - 5:00 PM'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 flex-shrink-0" size={16} />
                  <span className="truncate">{event.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-2 flex-shrink-0" size={16} />
                  <span>{event.attendees || 0} attendees</span>
                </div>
              </div>
              
              {event.description && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first blood donation event.</p>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
