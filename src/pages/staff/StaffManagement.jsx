import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Button,
  Tag,
  Table,
  Modal,
  notification,
  Typography,
  Space,
  Row,
  Col,
  Layout, // SỬA LỖI: Import Layout từ 'antd'
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  ExperimentOutlined, // Thay thế cho Droplet
  TeamOutlined, // Thay thế cho Users
} from '@ant-design/icons';
// import Layout from "@/components/ui/Layout"; // Hoặc nếu bạn có Layout tùy chỉnh, hãy dùng dòng này và xóa dòng import Layout từ antd ở trên.

const { Title, Text } = Typography;

// Dữ liệu giả, giữ nguyên
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
  }
];

const mockBloodRequests = [
  {
    id: 1,
    patientName: "Lê Văn C",
    bloodType: "AB+",
    quantity: 2,
    urgency: "Khẩn cấp",
    hospital: "Bệnh viện Việt Đức",
    contactPerson: "Bác sĩ Nguyễn",
    contactPhone: "0111222333",
    reason: "Phẫu thuật tim",
    status: "pending",
    createdAt: "2024-06-25"
  },
  {
    id: 2,
    patientName: "Phạm Thị D",
    bloodType: "O-",
    quantity: 1,
    urgency: "Bình thường",
    hospital: "Bệnh viện 108",
    contactPerson: "Điều dưỡng Mai",
    contactPhone: "0444555666",
    reason: "Thiếu máu",
    status: "accepted",
    createdAt: "2024-06-24"
  }
];

const StaffManagement = () => {
  const [donorRequests, setDonorRequests] = useState(mockDonorRequests);
  const [bloodRequests, setBloodRequests] = useState(mockBloodRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'donor' or 'blood'

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
  
  const showModal = (request, type) => {
    setSelectedRequest(request);
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  const handleUpdateDonorStatus = async (requestId, newStatus) => {
    setDonorRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: newStatus } : req)
    );

    notification.success({
      message: "Cập nhật thành công",
      description: `Yêu cầu hiến máu đã được ${newStatus === 'accepted' ? 'chấp nhận' : 'từ chối'}.`,
    });
  };

  const handleUpdateBloodStatus = async (requestId, newStatus) => {
    setBloodRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: newStatus } : req)
    );

    notification.success({
      message: "Cập nhật thành công",
      description: `Yêu cầu cần máu đã được ${newStatus === 'accepted' ? 'chấp nhận' : 'từ chối'}.`,
    });
  };

  const donorColumns = [
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
          <Button icon={<EyeOutlined />} size="small" onClick={() => showModal(record, 'donor')}>Xem</Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                onClick={() => handleUpdateDonorStatus(record.id, 'accepted')}
                className="bg-green-600 hover:bg-green-700 !border-green-600"
              >
                Duyệt
              </Button>
              <Button
                type="primary"
                danger
                icon={<CloseCircleOutlined />}
                size="small"
                onClick={() => handleUpdateDonorStatus(record.id, 'rejected')}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const bloodColumns = [
    { title: 'Bệnh nhân', dataIndex: 'patientName', key: 'patientName', render: text => <strong>{text}</strong> },
    { title: 'Nhóm máu', dataIndex: 'bloodType', key: 'bloodType' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', render: text => `${text} đơn vị` },
    { 
      title: 'Mức độ', 
      dataIndex: 'urgency', 
      key: 'urgency', 
      render: urgency => (
        <Tag color={urgency === 'Khẩn cấp' ? 'red' : 'blue'}>{urgency}</Tag>
      )
    },
    { title: 'Bệnh viện', dataIndex: 'hospital', key: 'hospital' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: status => getStatusTag(status) },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} size="small" onClick={() => showModal(record, 'blood')}>Xem</Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                onClick={() => handleUpdateBloodStatus(record.id, 'accepted')}
                className="bg-green-600 hover:bg-green-700 !border-green-600"
              >
                Duyệt
              </Button>
              <Button
                type="primary"
                danger
                icon={<CloseCircleOutlined />}
                size="small"
                onClick={() => handleUpdateBloodStatus(record.id, 'rejected')}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];
  
  const tabItems = [
    {
      key: '1',
      label: (
        <span className="flex items-center">
          <HeartOutlined className="mr-2" />
          Yêu cầu hiến máu
        </span>
      ),
      children: (
        <div className="p-6">
           <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Danh sách yêu cầu hiến máu</h3>
              <p className="text-gray-600">Quản lý và xử lý các yêu cầu đăng ký hiến máu từ người dùng</p>
            </div>
          <Table columns={donorColumns} dataSource={donorRequests} rowKey="id" />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span className="flex items-center">
          <ExperimentOutlined className="mr-2" />
          Yêu cầu cần máu
        </span>
      ),
      children: (
        <div className="p-6">
           <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Danh sách yêu cầu cần máu</h3>
              <p className="text-gray-600">Quản lý và xử lý các yêu cầu cần máu từ bệnh viện</p>
            </div>
          <Table columns={bloodColumns} dataSource={bloodRequests} rowKey="id" />
        </div>
      ),
      // SỬA LỖI: Xóa thuộc tính forceRender không hợp lệ
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
        <div className="container mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
              <TeamOutlined className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Quản lý yêu cầu
            </h1>
            <p className="text-gray-600 text-lg">Xử lý các yêu cầu hiến máu và cần máu từ cộng đồng</p>
          </div>

          {/* Stats Cards */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} md={8}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-600 font-medium">Tổng yêu cầu</Text>
                    <Title level={2} className="!text-blue-700 !mt-1">
                      {donorRequests.length + bloodRequests.length}
                    </Title>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <TeamOutlined className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-600 font-medium">Đã duyệt</Text>
                    <Title level={2} className="!text-green-700 !mt-1">
                      {[...donorRequests, ...bloodRequests].filter(req => req.status === 'accepted').length}
                    </Title>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircleOutlined className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-yellow-600 font-medium">Chờ duyệt</Text>
                    <Title level={2} className="!text-yellow-700 !mt-1">
                      {[...donorRequests, ...bloodRequests].filter(req => req.status === 'pending').length}
                    </Title>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <ClockCircleOutlined className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Tabs Section */}
          <Card
            className="border-0 shadow-xl bg-white/80 backdrop-blur-sm"
            styles={{ body: { padding: 0 } }}
          >
            <Tabs defaultActiveKey="1" items={tabItems} className="custom-tabs"/>
          </Card>
        </div>
      </div>
      
      {/* Modal hiển thị chi tiết */}
      {isModalVisible && selectedRequest && (
        <Modal
          title={
            <Title level={4}>
              {modalType === 'donor' ? 'Chi tiết yêu cầu hiến máu' : 'Chi tiết yêu cầu cần máu'}
            </Title>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Đóng
            </Button>
          ]}
          // SỬA LỖI: Xóa prop forceRender không cần thiết
        >
          {modalType === 'donor' ? (
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
          ) : (
            <Space direction="vertical" className="w-full">
              <Text><strong>Bệnh nhân:</strong> {selectedRequest.patientName}</Text>
              <Text><strong>Nhóm máu:</strong> {selectedRequest.bloodType}</Text>
              <Text><strong>Số lượng:</strong> {selectedRequest.quantity} đơn vị</Text>
              <Text><strong>Mức độ khẩn cấp:</strong> {selectedRequest.urgency}</Text>
              <Text><strong>Lý do:</strong> {selectedRequest.reason}</Text>
              <Text><strong>Bệnh viện:</strong> {selectedRequest.hospital}</Text>
              <Text><strong>Người liên hệ:</strong> {selectedRequest.contactPerson}</Text>
              <Text><strong>Điện thoại:</strong> {selectedRequest.contactPhone}</Text>
            </Space>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default StaffManagement;