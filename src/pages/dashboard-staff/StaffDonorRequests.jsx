import React, { useState, useEffect } from 'react';
import { Card, Button, Tag, Table, Modal, notification, Typography, Space, Row, Col, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { getAllBloodRegistrations } from '../../service/bloodRegistrationApi';
const { Title, Text } = Typography;

const StaffDonorRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllBloodRegistrations();
    if (res && res.isSuccess) setData(res.result);
    else notification.error({ message: res.message || 'Lỗi khi tải dữ liệu đăng ký máu' });
    setLoading(false);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'PENDING':
        return <Tag icon={<ClockCircleOutlined />} color="warning">Chờ duyệt</Tag>;
      case 'ACCEPTED':
        return <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>;
      case 'REJECTED':
        return <Tag icon={<CloseCircleOutlined />} color="error">Bị từ chối</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  const filteredRequests = data.filter(req => {
    if (activeTab === 'all') return true;
    return req.registerType === activeTab.toUpperCase();
  });

  const getStatusCounts = () => {
    const pending = data.filter(req => req.registerType === 'PENDING').length;
    const accepted = data.filter(req => req.registerType === 'ACCEPTED').length;
    const rejected = data.filter(req => req.registerType === 'REJECTED').length;
    return { pending, accepted, rejected, total: data.length };
  };

  const counts = getStatusCounts();

  const columns = [
    { title: 'Mã đăng ký', dataIndex: 'bloodRegistrationId', key: 'bloodRegistrationId' },
    { title: 'Sự kiện', dataIndex: 'eventTitle', key: 'eventTitle' },
    { title: 'Địa điểm', dataIndex: 'eventLocation', key: 'eventLocation' },
    { title: 'Thời gian bắt đầu', dataIndex: 'startTime', key: 'startTime', render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: 'Thời gian kết thúc', dataIndex: 'endTime', key: 'endTime', render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: 'Ngày đăng ký', dataIndex: 'createDate', key: 'createDate', render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: 'Trạng thái', dataIndex: 'registerType', key: 'registerType', render: status => getStatusTag(status) },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab('all')}>
            <div className="text-center">
              <Title level={2} className="!text-blue-700 !mb-1">{counts.total}</Title>
              <Text className="text-blue-600 font-medium">Tổng số</Text>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab('pending')}>
            <div className="text-center">
              <Title level={2} className="!text-yellow-700 !mb-1">{counts.pending}</Title>
              <Text className="text-yellow-600 font-medium">Chờ duyệt</Text>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab('accepted')}>
            <div className="text-center">
              <Title level={2} className="!text-green-700 !mb-1">{counts.accepted}</Title>
              <Text className="text-green-600 font-medium">Đã duyệt</Text>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab('rejected')}>
            <div className="text-center">
              <Title level={2} className="!text-red-700 !mb-1">{counts.rejected}</Title>
              <Text className="text-red-600 font-medium">Bị từ chối</Text>
            </div>
          </Card>
        </Col>
      </Row>
      {/* Filter Tabs */}
      <Card className="border-0 shadow-lg mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'Tất cả', color: 'blue' },
            { key: 'pending', label: 'Chờ duyệt', color: 'yellow' },
            { key: 'accepted', label: 'Đã duyệt', color: 'green' },
            { key: 'rejected', label: 'Bị từ chối', color: 'red' }
          ].map(tab => (
            <Button
              key={tab.key}
              type={activeTab === tab.key ? 'primary' : 'default'}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? 'bg-gradient-to-r from-red-500 to-pink-600 border-0' : ''}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>
      {/* Table */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <Spin spinning={loading} tip="Đang tải dữ liệu...">
          <Table 
            columns={columns} 
            dataSource={filteredRequests} 
            rowKey="bloodRegistrationId"
            pagination={{ pageSize: 10 }}
            className="overflow-hidden"
          />
        </Spin>
      </Card>
      {/* Modal */}
      {isModalVisible && selectedRequest && (
        <Modal
          title={<Title level={4}>Chi tiết đăng ký máu</Title>}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsModalVisible(false)}>Đóng</Button>
          ]}
        >
          <Space direction="vertical" className="w-full">
            <Text><strong>Mã đăng ký:</strong> {selectedRequest.bloodRegistrationId}</Text>
            <Text><strong>Sự kiện:</strong> {selectedRequest.eventTitle}</Text>
            <Text><strong>Địa điểm:</strong> {selectedRequest.eventLocation}</Text>
            <Text><strong>Thời gian bắt đầu:</strong> {selectedRequest.startTime ? new Date(selectedRequest.startTime).toLocaleString('vi-VN') : ''}</Text>
            <Text><strong>Thời gian kết thúc:</strong> {selectedRequest.endTime ? new Date(selectedRequest.endTime).toLocaleString('vi-VN') : ''}</Text>
            <Text><strong>Ngày đăng ký:</strong> {selectedRequest.createDate ? new Date(selectedRequest.createDate).toLocaleString('vi-VN') : ''}</Text>
            <Text><strong>Trạng thái:</strong> {getStatusTag(selectedRequest.registerType)}</Text>
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default StaffDonorRequests;