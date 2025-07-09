import React, { useEffect, useState } from 'react';
import { Card, Badge, message } from 'antd';
import { getUserBloodRegistrations } from '../../service/bloodRegistrationApi';
import { Clock, CheckCircle, XCircle, Calendar, MapPin, User, MessageCircle } from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ChatBox from '../../components/ai/ChatBox';

const typeMap = {
  PENDING: 'Chờ duyệt',
  COMPLETED: 'Hoàn thành',
  REJECTED: 'Từ chối',
  CANCEL: 'Đã hủy',
  0: 'Chờ duyệt',
  1: 'Hoàn thành',
  2: 'Từ chối',
};
const typeColorClass = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  REJECTED: 'bg-red-100 text-red-800',
  CANCEL: 'bg-gray-200 text-gray-500',
  0: 'bg-yellow-100 text-yellow-800',
  1: 'bg-blue-100 text-blue-800',
  2: 'bg-red-100 text-red-800',
};

const getStatusBadge = (status) => (
  <span className={`px-2 py-1 rounded-full text-xs ${typeColorClass[status] || 'bg-gray-100 text-gray-800'}`} style={{ fontWeight: 500, minWidth: 90, display: 'inline-block', textAlign: 'center' }}>
    {typeMap[status] || status}
  </span>
);

const TrackDonation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserBloodRegistrations();
      if (res && res.isSuccess) setData(res.result);
      else message.error(res.message || 'Lỗi khi tải dữ liệu đăng ký máu');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {data.length === 0 ? (
              <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="text-gray-500 mb-4">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2">Chưa có đăng ký nào</h3>
                  <p>Bạn chưa đăng ký hiến máu lần nào. Hãy tham gia các sự kiện hiến máu để cứu người!</p>
                </div>
              </Card>
            ) : (
              data.map((registration) => (
                <Card key={registration.bloodRegistrationId} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {registration.eventTitle}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-2 text-red-500" />
                              <span>{registration.eventLocation}</span>
                            </div>
                          </div>
                          {getStatusBadge(registration.registerType)}
                        </div>

                        {/* Event Details */}
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                            <div>
                              <span className="font-medium">Bắt đầu: </span>
                              {formatDate(registration.startTime)}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                            <div>
                              <span className="font-medium">Kết thúc: </span>
                              {formatDate(registration.endTime)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Registration Info */}
                      <div className="lg:text-right">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg inline-block mb-2">
                          <div className="text-xs font-medium">Mã đăng ký</div>
                          <div className="text-sm font-bold">{registration.bloodRegistrationId}</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Đăng ký: {formatDate(registration.createDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

     
      </div>
      {/* Floating AI Chat Button & Box */}
      <div>
        <button
          onClick={() => setShowChat((v) => !v)}
          className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
        {showChat && (
          <div className="fixed z-50 bottom-24 right-6 animate-fade-in">
            <div className="shadow-2xl rounded-2xl">
              <ChatBox />
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TrackDonation;