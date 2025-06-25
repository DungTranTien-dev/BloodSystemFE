import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography, Tag, Empty, Space } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined, BankOutlined, ClockCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import Layout from '../../components/ui/Layout';
import { getDonationRequests } from '../../service/donationApi';

const { Title, Text } = Typography;

const getStatusTag = (status) => {
  switch (status) {
    case 'pending':
      return <Tag icon={<ClockCircleOutlined />} color="gold">Chờ duyệt</Tag>;
    case 'accepted':
      return <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>;
    case 'rejected':
      return <Tag icon={<CloseCircleOutlined />} color="error">Bị từ chối</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const TrackDonation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getDonationRequests();
        if (response.success) {
          setRequests(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <Layout className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <Title level={2} className="text-center mb-8">Theo dõi yêu cầu hiến máu</Title>
        
        {loading ? (
          <div className="text-center py-20"><Spin size="large" /></div>
        ) : requests.length > 0 ? (
          <Space direction="vertical" size="large" className="w-full">
            {requests.map(req => (
              <Card 
                key={req.id} 
                className="shadow-md hover:shadow-lg transition-shadow rounded-lg"
                title={<Text strong>Yêu cầu #{req.id.split('-')[1]}</Text>}
                extra={getStatusTag(req.status)}
              >
                <Space direction="vertical" size="middle" className="w-full">
                    <Text>
                        <BankOutlined className="mr-2 text-purple-600"/> 
                        <strong>Bệnh viện:</strong> {req.hospitalAddress}
                    </Text>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Text>
                            <CalendarOutlined className="mr-2 text-purple-600"/> 
                            <strong>Ngày hiến máu:</strong> {dayjs(req.donationDate).format('DD/MM/YYYY')}
                        </Text>
                        <Text>
                            <ClockCircleFilled className="mr-2 text-purple-600"/> 
                            <strong>Giờ hiến máu:</strong> {req.donationTime}
                        </Text>
                    </div>
                </Space>
              </Card>
            ))}
          </Space>
        ) : (
          <Card className="rounded-lg">
            <Empty description="Bạn chưa có yêu cầu hiến máu nào." />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TrackDonation;