import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography, Empty, Space, Tag, Divider } from 'antd';
import {
  CalendarOutlined,
  BankOutlined,
  ClockCircleFilled,
  ContainerOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import Layout from '../../components/ui/Layout';
import api from '../../config/axios';

const { Title, Text } = Typography;

const TrackDonation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('BloodRegistrations/user');
        if (response.data?.isSuccess && Array.isArray(response.data.result)) {
          setRequests(response.data.result);
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

  const getStatusTag = (type) => {
    switch (type) {
      case 'Đăng ký tại chỗ':
        return <Tag color="green">Tại chỗ</Tag>;
      case 'Đăng ký trực tuyến':
        return <Tag color="blue">Trực tuyến</Tag>;
      default:
        return <Tag color="default">{type}</Tag>;
    }
  };

  return (
    <Layout className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Title level={2} className="text-center text-purple-700 mb-10">
          📌 Theo dõi yêu cầu hiến máu
        </Title>

        {loading ? (
          <div className="text-center py-24">
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        ) : requests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {requests.map((req, index) => (
              <Card
                key={req.bloodRegistrationId}
                title={
                  <div className="flex justify-between items-center">
                    <Text strong className="text-lg text-purple-700">
                      Yêu cầu #{index + 1}
                    </Text>
                    {getStatusTag(req.registerType)}
                  </div>
                }
                className="rounded-xl border border-purple-100 shadow-md hover:shadow-lg transition duration-300 bg-white"
              >
                <Space direction="vertical" size="middle" className="w-full text-gray-700">
                  <Text>
                    <ContainerOutlined className="mr-2 text-purple-500 text-lg" />
                    <strong>Sự kiện:</strong> {req.eventTitle}
                  </Text>
                  <Text>
                    <BankOutlined className="mr-2 text-purple-500 text-lg" />
                    <strong>Địa điểm:</strong> {req.eventLocation}
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Text>
                      <CalendarOutlined className="mr-2 text-purple-500 text-lg" />
                      <strong>Bắt đầu:</strong>{' '}
                      {dayjs(req.startTime).format('DD/MM/YYYY HH:mm')}
                    </Text>
                    <Text>
                      <ClockCircleFilled className="mr-2 text-purple-500 text-lg" />
                      <strong>Kết thúc:</strong>{' '}
                      {dayjs(req.endTime).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </div>
                  <Divider className="my-2" />
                  <Text type="secondary" className="text-sm">
                    Ngày đăng ký: {dayjs(req.createDate).format('DD/MM/YYYY')}
                  </Text>
                </Space>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-lg shadow-sm">
            <Empty description="Bạn chưa có yêu cầu hiến máu nào." />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TrackDonation;
