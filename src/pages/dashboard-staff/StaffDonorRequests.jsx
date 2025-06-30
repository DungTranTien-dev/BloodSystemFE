import React, { useState } from 'react';
import { Card, Button, Tag, Table, Modal, notification, Typography, Space, Row, Col } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

// Mock data giữ nguyên
const mockDonorRequests = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@email.com",
    bloodType: "O+",
    weight: 65,
    lastDonation: "2024-01-15",
    hospital: "Bệnh viện Chợ Rẫy",
    status: "pending",
    createdAt: "2024-06-25",
    medicalHistory: "Không có bệnh lý"
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    phone: "0987654321",
    email: "tranthib@email.com",
    bloodType: "A+",
    weight: 55,
    lastDonation: "2024-03-10",
    hospital: "Bệnh viện Bạch Mai",
    status: "accepted",
    createdAt: "2024-06-24",
    medicalHistory: "Không có bệnh lý"
  },
  {
    id: 3,
    fullName: "Lê Văn C",
    phone: "0369852147",
    email: "levanc@email.com",
    bloodType: "B+",
    weight: 70,
    lastDonation: "2024-02-20",
    hospital: "Bệnh viện Việt Đức",
    status: "rejected",
    createdAt: "2024-06-23",
    medicalHistory: "Không có bệnh lý"
  }
];

const StaffDonorRequests = () => {
  const [donorRequests, setDonorRequests] = useState(mockDonorRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const getStatusTag = (status) => {
    switch (status) {
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="warning">Chờ duyệt</Tag>;
      case 'accepted':
        return <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>;
      case 'rejected':
        return <Tag icon={<CloseCircleOutlined />} color="error">Bị từ chối</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  const showModal = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    setDonorRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: newStatus } : req)
    );
    notification.success({
      message: "Cập nhật thành công",
      description: `Yêu cầu hiến máu đã được ${newStatus === 'accepted' ? 'chấp nhận' : 'từ chối'}.`,
    });
  };

  const filteredRequests = donorRequests.filter(req => {
    if (activeTab === 'all') return true;
    return req.status === activeTab;
  });

  const getStatusCounts = () => {
    const pending = donorRequests.filter(req => req.status === 'pending').length;
    const accepted = donorRequests.filter(req => req.status === 'accepted').length;
    const rejected = donorRequests.filter(req => req.status === 'rejected').length;
    return { pending, accepted, rejected, total: donorRequests.length };
  };

  const counts = getStatusCounts();

  const columns = [
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', render: text => <strong>{text}</strong> },
    { title: 'Nhóm máu', dataIndex: 'bloodType', key: 'bloodType' },
    { title: 'Bệnh viện', dataIndex: 'hospital', key: 'hospital' },
    { title: 'Ngày gửi', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: status => getStatusTag(status) },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} size="small" onClick={() => showModal(record)}>Xem</Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                onClick={() => handleUpdateStatus(record.id, 'accepted')}
                className="bg-green-600 hover:bg-green-700 !border-green-600"
              >
                Duyệt
              </Button>
              <Button
                type="primary"
                danger
                icon={<CloseCircleOutlined />}
                size="small"
                onClick={() => handleUpdateStatus(record.id, 'rejected')}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
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
        <Table 
          columns={columns} 
          dataSource={filteredRequests} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="overflow-hidden"
        />
      </Card>

      {/* Modal */}
      {isModalVisible && selectedRequest && (
        <Modal
          title={<Title level={4}>Chi tiết yêu cầu hiến máu</Title>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>Đóng</Button>
          ]}
        >
          <Space direction="vertical" className="w-full">
            <Text><strong>Họ tên:</strong> {selectedRequest.fullName}</Text>
            <Text><strong>Điện thoại:</strong> {selectedRequest.phone}</Text>
            <Text><strong>Email:</strong> {selectedRequest.email}</Text>
            <Text><strong>Nhóm máu:</strong> {selectedRequest.bloodType}</Text>
            <Text><strong>Cân nặng:</strong> {selectedRequest.weight} kg</Text>
            <Text><strong>Lần hiến cuối:</strong> {selectedRequest.lastDonation}</Text>
            <Text><strong>Tiền sử bệnh:</strong> {selectedRequest.medicalHistory}</Text>
            <Text><strong>Bệnh viện:</strong> {selectedRequest.hospital}</Text>
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default StaffDonorRequests;