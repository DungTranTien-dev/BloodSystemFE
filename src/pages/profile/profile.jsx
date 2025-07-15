import React from 'react';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';

const UserProfile = () => {
  const history = [
    { id: 1, location: 'Bệnh viện Chợ Rẫy', date: '15/11/2024', amount: '400ml', status: 'Hoàn thành' },
    { id: 2, location: 'Trung tâm Huyết học', date: '15/08/2024', amount: '400ml', status: 'Hoàn thành' },
    { id: 3, location: 'Bệnh viện Bình Dân', date: '15/05/2024', amount: '400ml', status: 'Hoàn thành' },
  ];

  return (
    <div className="bg-gradient-to-br from-red-500 to-pink-500 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-pink-50 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Hồ sơ cá nhân</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thông tin cá nhân */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
                NVA
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold">Nguyễn Văn An</h2>
                <div className="text-sm text-gray-600 flex justify-center items-center gap-1">
                  <FireOutlined className="text-red-500" />
                  Nhóm máu: <span className="ml-1 px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">O+</span>
                </div>
              </div>
              <div className="text-sm text-gray-700 w-full mt-4 space-y-2">
                <p><MailOutlined className="mr-2" />nguyenvanan@email.com</p>
                <p><PhoneOutlined className="mr-2" />0123 456 789</p>
                <p><EnvironmentOutlined className="mr-2" />123 Đường ABC, Quận 1, TP.HCM</p>
                <p><CalendarOutlined className="mr-2" />Tham gia từ: 01/01/2020</p>
              </div>
            </div>
          </div>

          {/* Thống kê */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 text-center shadow">
              <HeartOutlined className="text-pink-500 text-3xl mb-2" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-500">Lần hiến máu</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow">
              <FireOutlined className="text-pink-500 text-3xl mb-2" />
              <p className="text-2xl font-bold">4800ml</p>
              <p className="text-sm text-gray-500">Tổng lượng máu</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow">
              <ClockCircleOutlined className="text-pink-500 text-3xl mb-2" />
              <p className="text-2xl font-bold">15/11/2024</p>
              <p className="text-sm text-gray-500">Lần hiến gần nhất</p>
            </div>
          </div>
        </div>

        {/* Thành tích */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-700 mb-2">🎖️ Thành tích</h3>
          <p className="text-sm text-gray-600 mb-3">Những thành tựu bạn đã đạt được trong hành trình hiến máu</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium">Người hiến máu tích cực</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium">Người hiến máu 10 lần</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium">Người hiến máu gương mẫu</span>
          </div>
        </div>

        {/* Lịch sử hiến máu */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-700 mb-2">📅 Lịch sử hiến máu</h3>
          <p className="text-sm text-gray-600 mb-4">Theo dõi các lần hiến máu của bạn</p>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-pink-50 rounded-lg p-4">
                <div>
                  <h4 className="font-semibold">{item.location}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{item.amount}</p>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="bg-white text-gray-700 border rounded-lg px-4 py-2 hover:bg-gray-100">
              Xem tất cả lịch sử
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
