import React, { useState, useEffect } from 'react';
import { Spin, Select } from 'antd';
import {
  CalendarOutlined,
  BankOutlined,
  ClockCircleFilled,
  ContainerOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import Layout from '../../components/ui/Layout';
import { getUserBloodDonationHistory } from '../../service/bloodRegistrationApi';

const { Option } = Select;

const TrackDonation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getUserBloodDonationHistory();
        if (res.isSuccess && Array.isArray(res.result)) {
          // Sắp xếp theo ngày đăng ký (createDate) từ mới nhất đến cũ nhất
          const sorted = [...res.result].sort((a, b) => {
            const dateA = a.createDate ? new Date(a.createDate) : new Date(0);
            const dateB = b.createDate ? new Date(b.createDate) : new Date(0);
            return dateB - dateA;
          });
          setRequests(sorted);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error('Lỗi khi lấy yêu cầu đăng ký:', error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusBadge = (registerType) => {
    switch (registerType?.toUpperCase()) {
      case 'PENDING':
        return <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">Chờ xác nhận</span>;
      case 'COMPLETED':
        return <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">Hoàn thành</span>;
      case 'CANCEL':
        return <span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">Đã hủy</span>;
      default:
        return <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">Không rõ</span>;
    }
  };

  const filteredRequests = filter === 'ALL'
    ? requests
    : requests.filter(req => req.registerType?.toUpperCase() === filter);

  return (
    <Layout>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-pink-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold">🩸 Lịch sử hiến máu</h1>
        <p className="mt-2 text-lg">Quản lý và theo dõi các yêu cầu hiến máu tình nguyện của bạn</p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center py-24">
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        ) : (
          <>
            {/* Section title + Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Có tổng cộng </span>
                <span className="font-bold text-red-600">{requests.length}</span>
                <span className="font-semibold"> yêu cầu hiến máu</span>
              </p>

              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-700">Lọc theo trạng thái:</label>
                <Select
                  value={filter}
                  onChange={value => setFilter(value)}
                  className="w-[180px]"
                  size="small"
                >
                  <Option value="ALL">Tất cả</Option>
                  <Option value="PENDING">Chờ xác nhận</Option>
                  <Option value="COMPLETED">Hoàn thành</Option>
                  <Option value="CANCEL">Đã hủy</Option>
                </Select>
              </div>
            </div>


            {/* Grid */}
            {filteredRequests.length === 0 ? (
              <div className="text-center text-gray-500 italic">Không có yêu cầu nào phù hợp với bộ lọc.</div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {filteredRequests.map((req, index) => (
                  <div
                    key={req.bloodRegistrationId}
                    className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-md transition relative"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Yêu cầu #{index + 1}</h3>
                      {getStatusBadge(req.registerType)}
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p className="flex items-center">
                        <ContainerOutlined className="mr-2 !text-red-500" />
                        <strong>Sự kiện:</strong> <span className="ml-1">{req.eventTitle}</span>
                      </p>
                      <p className="flex items-center">
                        <BankOutlined className="mr-2 !text-red-500" />
                        <strong>Địa điểm:</strong> <span className="ml-1">{req.eventLocation}</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <p className="flex items-center">
                          <CalendarOutlined className="mr-2 !text-red-500" />
                          <strong>Bắt đầu:</strong>{' '}
                          <span className="ml-1">{dayjs(req.startTime).format('HH:mm DD/MM/YYYY')}</span>
                        </p>
                        <p className="flex items-center">
                          <ClockCircleFilled className="mr-2 !text-red-500" />
                          <strong>Kết thúc:</strong>{' '}
                          <span className="ml-1">{dayjs(req.endTime).format('HH:mm DD/MM/YYYY')}</span>
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs pt-2">Ngày đăng ký: {dayjs(req.createDate).format('DD/MM/YYYY')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default TrackDonation;
