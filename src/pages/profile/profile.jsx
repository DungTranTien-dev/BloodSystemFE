import React, { useEffect, useState } from 'react';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  FireOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import { useSelector } from 'react-redux';
import { getUserBloodDonationHistory } from '../../service/bloodRegistrationApi';

const Profile = () => {
  // Lấy dữ liệu từ redux
  const userState = useSelector((state) => state.user);
  const user = userState?.user || {};
  const medical = userState?.medical || {};

  // Xử lý dữ liệu
  const fullName = medical.fullName || user.userName || 'Chưa cập nhật';
  const email = medical.email || user.email || 'Chưa cập nhật';
  const phone = medical.phoneNumber || 'Chưa cập nhật';
  const address = medical.currentAddress || 'Chưa cập nhật';
  const joinDate = medical.createDate ? new Date(medical.createDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật';
  const bloodType = medical.bloodType || 'Chưa cập nhật';
  const donationCount = medical.donationCount || 0;
  const totalBlood = donationCount * 400;
  const gender = medical.gender === 'MALE' ? 'Nam' : medical.gender === 'FEMALE' ? 'Nữ' : 'Chưa cập nhật';
  const citizenId = medical.citizenId || 'Chưa cập nhật';
  const dateOfBirth = medical.dateOfBirth ? new Date(medical.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật';
  // Avatar: lấy chữ cái đầu của fullName
  const avatarText = fullName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,3);

  // Lịch sử hiến máu
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [latestDonation, setLatestDonation] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      setLoadingHistory(true);
      const res = await getUserBloodDonationHistory();
      if (res.isSuccess && Array.isArray(res.result)) {
        // Sắp xếp lịch sử hiến máu theo endTime (hoặc startTime nếu không có endTime) từ gần đến xa
        const sortedHistory = [...res.result].sort((a, b) => {
          const dateA = a.endTime ? new Date(a.endTime) : (a.startTime ? new Date(a.startTime) : new Date(0));
          const dateB = b.endTime ? new Date(b.endTime) : (b.startTime ? new Date(b.startTime) : new Date(0));
          return dateB - dateA;
        });
        setHistory(sortedHistory);
        // Tìm lần hiến máu gần nhất (endTime hoặc startTime gần nhất không vượt quá ngày hiện tại, chỉ lấy bản ghi COMPLETED)
        const now = new Date();
        const validDonations = res.result.filter(item => {
          if ((item.registerType || '').toUpperCase() !== 'COMPLETED') return false;
          const end = item.endTime ? new Date(item.endTime) : null;
          const start = item.startTime ? new Date(item.startTime) : null;
          return (
            (end && end <= now) || (start && start <= now)
          );
        });
        let latest = null;
        validDonations.forEach(item => {
          const end = item.endTime ? new Date(item.endTime) : null;
          const start = item.startTime ? new Date(item.startTime) : null;
          const date = end || start;
          if (!date) return;
          if (!latest || date > latest) latest = date;
        });
        setLatestDonation(latest);
      } else {
        setHistory([]);
        setLatestDonation(null);
      }
      setLoadingHistory(false);
    }
    fetchHistory();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const paginatedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  // Helper để hiển thị trạng thái
  const getStatusBadge = (registerType) => {
    switch ((registerType || '').toUpperCase()) {
      case 'PENDING':
        return <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium">Chờ xác nhận</span>;
      case 'COMPLETED':
        return <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">Hoàn thành</span>;
      case 'CANCEL':
        return <span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">Đã hủy</span>;
      default:
        return <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs">Không rõ</span>;
    }
  };

  return (
    <>
      <Header/>
    <div className="bg-gradient-to-br from-red-500 to-pink-500 min-h-screen pb-12">
      {/* Header riêng */}
      <div className="flex justify-between items-start px-6 pt-6 md:px-10">
        <h1 className="text-white text-2xl md:text-3xl font-bold">Hồ sơ cá nhân</h1>
        <div className="flex gap-2 mt-1">
          <button className="bg-white px-4 py-1 rounded-lg text-sm font-medium text-gray-700 shadow hover:bg-gray-100 flex items-center gap-1">
            <EditOutlined /> Chỉnh sửa
          </button>
          <button className="bg-white px-4 py-1 rounded-lg text-sm font-medium text-gray-700 shadow hover:bg-gray-100 flex items-center gap-1">
            <SettingOutlined /> Cài đặt
          </button>
        </div>
      </div>
      {/* Nội dung hộp trắng nằm tách biệt */}
      <div className="max-w-7xl mx-auto mt-6 bg-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thông tin cá nhân */}
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
                {avatarText}
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold">{fullName}</h2>
                <div className="text-sm text-gray-600 flex justify-center items-center gap-1">
                  <FireOutlined className="text-red-500" />
                  Nhóm máu: <span className="ml-1 px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">{bloodType}</span>
                </div>
              </div>
              <div className="text-sm text-gray-700 w-full mt-4 space-y-2">
                <p><MailOutlined className="mr-2" />{email}</p>
                <p><PhoneOutlined className="mr-2" />{phone}</p>
                <p><EnvironmentOutlined className="mr-2" />{address}</p>
                <p><CalendarOutlined className="mr-2" />Tham gia từ: {joinDate}</p>
                <p><span className="font-semibold">Giới tính:</span> {gender}</p>
                <p><span className="font-semibold">Căn cước công dân:</span> {citizenId}</p>
                <p><span className="font-semibold">Ngày sinh:</span> {dateOfBirth}</p>
              </div>
            </div>
          </div>
          {/* Thống kê + Thành tích + Lịch sử */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Thống kê */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-pink-100 rounded-xl p-4 text-center shadow">
                <HeartOutlined className="text-pink-500 text-3xl mb-2" />
                <p className="text-2xl font-bold">{donationCount}</p>
                <p className="text-sm text-gray-700">Lần hiến máu</p>
              </div>
              <div className="bg-pink-100 rounded-xl p-4 text-center shadow">
                <FireOutlined className="text-pink-500 text-3xl mb-2" />
                <p className="text-2xl font-bold">{totalBlood}ml</p>
                <p className="text-sm text-gray-700">Tổng lượng máu</p>
              </div>
              <div className="bg-pink-100 rounded-xl p-4 text-center shadow">
                <ClockCircleOutlined className="text-pink-500 text-3xl mb-2" />
                <p className="text-2xl font-bold">{latestDonation ? latestDonation.toLocaleDateString('vi-VN') : '-'}</p>
                <p className="text-sm text-gray-700">Lần hiến gần nhất</p>
              </div>
            </div>
            {/* Lịch sử hiến máu */}
            <div className="bg-pink-100 rounded-xl p-4 shadow">
              <h3 className="text-base font-semibold text-pink-700 mb-1">📅 Lịch sử hiến máu</h3>
              <p className="text-sm text-gray-600 mb-4">Theo dõi các lần hiến máu của bạn</p>
              <div className="space-y-3">
                {loadingHistory ? (
                  <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
                ) : history.length === 0 ? (
                  <div className="text-center text-gray-500">Chưa có dữ liệu</div>
                ) : (
                  paginatedHistory.map((item, idx) => (
                    <div key={item.bloodRegistrationId || idx} className="bg-white rounded-lg px-4 py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{item.eventTitle || 'Không rõ sự kiện'}</h4>
                        <p className="text-sm text-gray-500">Địa điểm: {item.eventLocation || '-'}</p>
                        <p className="text-sm text-gray-500">Bắt đầu: {item.startTime ? new Date(item.startTime).toLocaleString('vi-VN') : '-'}</p>
                        <p className="text-sm text-gray-500">Kết thúc: {item.endTime ? new Date(item.endTime).toLocaleString('vi-VN') : '-'}</p>
                        <p className="text-xs text-gray-400 pt-1">Ngày đăng ký: {item.createDate ? new Date(item.createDate).toLocaleDateString('vi-VN') : '-'}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(item.registerType)}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Pagination */}
              {totalPages > 1 && !loadingHistory && (
                <div className="flex justify-center mt-4 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded border text-sm font-medium ${currentPage === i + 1 ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-300'} hover:bg-red-100 transition`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
              <div className="text-center mt-4">
                {/* Đã bỏ nút Xem tất cả lịch sử */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
