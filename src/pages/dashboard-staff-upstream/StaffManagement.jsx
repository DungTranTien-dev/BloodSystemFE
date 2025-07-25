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
  Layout, // Sß╗¼A Lß╗ûI: Import Layout tß╗½ 'antd'
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  ExperimentOutlined, // Thay thß║┐ cho Droplet
  TeamOutlined, // Thay thß║┐ cho Users
} from '@ant-design/icons';
// import Layout from "@/components/ui/Layout"; // Hoß║╖c nß║┐u bß║ín c├│ Layout t├╣y chß╗ënh, h├úy d├╣ng d├▓ng n├áy v├á x├│a d├▓ng import Layout tß╗½ antd ß╗ƒ tr├¬n.

const { Title, Text } = Typography;

// Dß╗» liß╗çu giß║ú, giß╗» nguy├¬n
const mockDonorRequests = [
  {
    id: 1,
    fullName: "Nguyß╗àn V─ân A",
    phone: "0123456789",
    email: "nguyenvana@email.com",
    bloodType: "O+",
    weight: 65,
    lastDonation: "2024-01-15",
    hospital: "Bß╗çnh viß╗çn Chß╗ú Rß║½y",
    status: "pending",
    createdAt: "2024-06-25",
    medicalHistory: "Kh├┤ng c├│ bß╗çnh l├╜"
  },
  {
    id: 2,
    fullName: "Trß║ºn Thß╗ï B",
    phone: "0987654321",
    email: "tranthib@email.com",
    bloodType: "A+",
    weight: 55,
    lastDonation: "2024-03-10",
    hospital: "Bß╗çnh viß╗çn Bß║ích Mai",
    status: "accepted",
    createdAt: "2024-06-24",
    medicalHistory: "Kh├┤ng c├│ bß╗çnh l├╜"
  }
];

const mockBloodRequests = [
  {
    id: 1,
    patientName: "L├¬ V─ân C",
    bloodType: "AB+",
    quantity: 2,
    urgency: "Khß║⌐n cß║Ñp",
    hospital: "Bß╗çnh viß╗çn Viß╗çt ─Éß╗⌐c",
    contactPerson: "B├íc s─⌐ Nguyß╗àn",
    contactPhone: "0111222333",
    reason: "Phß║½u thuß║¡t tim",
    status: "pending",
    createdAt: "2024-06-25"
  },
  {
    id: 2,
    patientName: "Phß║ím Thß╗ï D",
    bloodType: "O-",
    quantity: 1,
    urgency: "B├¼nh th╞░ß╗¥ng",
    hospital: "Bß╗çnh viß╗çn 108",
    contactPerson: "─Éiß╗üu d╞░ß╗íng Mai",
    contactPhone: "0444555666",
    reason: "Thiß║┐u m├íu",
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
        return <Tag icon={<ClockCircleOutlined />} color="warning">Chß╗¥ duyß╗çt</Tag>;
      case 'accepted':
        return <Tag icon={<CheckCircleOutlined />} color="success">─É├ú duyß╗çt</Tag>;
      case 'rejected':
        return <Tag icon={<CloseCircleOutlined />} color="error">Bß╗ï tß╗½ chß╗æi</Tag>;
      default:
        return <Tag>Kh├┤ng x├íc ─æß╗ïnh</Tag>;
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
      message: "Cß║¡p nhß║¡t th├ánh c├┤ng",
      description: `Y├¬u cß║ºu hiß║┐n m├íu ─æ├ú ─æ╞░ß╗úc ${newStatus === 'accepted' ? 'chß║Ñp nhß║¡n' : 'tß╗½ chß╗æi'}.`,
    });
  };

  const handleUpdateBloodStatus = async (requestId, newStatus) => {
    setBloodRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: newStatus } : req)
    );

    notification.success({
      message: "Cß║¡p nhß║¡t th├ánh c├┤ng",
      description: `Y├¬u cß║ºu cß║ºn m├íu ─æ├ú ─æ╞░ß╗úc ${newStatus === 'accepted' ? 'chß║Ñp nhß║¡n' : 'tß╗½ chß╗æi'}.`,
    });
  };

  const donorColumns = [
    { title: 'Hß╗ì t├¬n', dataIndex: 'fullName', key: 'fullName', render: text => <strong>{text}</strong> },
    { title: 'Nh├│m m├íu', dataIndex: 'bloodType', key: 'bloodType' },
    { title: 'Bß╗çnh viß╗çn', dataIndex: 'hospital', key: 'hospital' },
    { title: 'Ng├áy gß╗¡i', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Trß║íng th├íi', dataIndex: 'status', key: 'status', render: status => getStatusTag(status) },
    {
      title: 'Thao t├íc',
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
                Duyß╗çt
              </Button>
              <Button
                type="primary"
                danger
                icon={<CloseCircleOutlined />}
                size="small"
                onClick={() => handleUpdateDonorStatus(record.id, 'rejected')}
              >
                Tß╗½ chß╗æi
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const bloodColumns = [
    { title: 'Bß╗çnh nh├ón', dataIndex: 'patientName', key: 'patientName', render: text => <strong>{text}</strong> },
    { title: 'Nh├│m m├íu', dataIndex: 'bloodType', key: 'bloodType' },
    { title: 'Sß╗æ l╞░ß╗úng', dataIndex: 'quantity', key: 'quantity', render: text => `${text} ─æ╞ín vß╗ï` },
    { 
      title: 'Mß╗⌐c ─æß╗Ö', 
      dataIndex: 'urgency', 
      key: 'urgency', 
      render: urgency => (
        <Tag color={urgency === 'Khß║⌐n cß║Ñp' ? 'red' : 'blue'}>{urgency}</Tag>
      )
    },
    { title: 'Bß╗çnh viß╗çn', dataIndex: 'hospital', key: 'hospital' },
    { title: 'Trß║íng th├íi', dataIndex: 'status', key: 'status', render: status => getStatusTag(status) },
    {
      title: 'Thao t├íc',
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
                Duyß╗çt
              </Button>
              <Button
                type="primary"
                danger
                icon={<CloseCircleOutlined />}
                size="small"
                onClick={() => handleUpdateBloodStatus(record.id, 'rejected')}
              >
                Tß╗½ chß╗æi
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
          Y├¬u cß║ºu hiß║┐n m├íu
        </span>
      ),
      children: (
        <div className="p-6">
           <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Danh s├ích y├¬u cß║ºu hiß║┐n m├íu</h3>
              <p className="text-gray-600">Quß║ún l├╜ v├á xß╗¡ l├╜ c├íc y├¬u cß║ºu ─æ─âng k├╜ hiß║┐n m├íu tß╗½ ng╞░ß╗¥i d├╣ng</p>
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
          Y├¬u cß║ºu cß║ºn m├íu
        </span>
      ),
      children: (
        <div className="p-6">
           <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Danh s├ích y├¬u cß║ºu cß║ºn m├íu</h3>
              <p className="text-gray-600">Quß║ún l├╜ v├á xß╗¡ l├╜ c├íc y├¬u cß║ºu cß║ºn m├íu tß╗½ bß╗çnh viß╗çn</p>
            </div>
          <Table columns={bloodColumns} dataSource={bloodRequests} rowKey="id" />
        </div>
      ),
      // Sß╗¼A Lß╗ûI: X├│a thuß╗Öc t├¡nh forceRender kh├┤ng hß╗úp lß╗ç
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
              Quß║ún l├╜ y├¬u cß║ºu
            </h1>
            <p className="text-gray-600 text-lg">Xß╗¡ l├╜ c├íc y├¬u cß║ºu hiß║┐n m├íu v├á cß║ºn m├íu tß╗½ cß╗Öng ─æß╗ông</p>
          </div>

          {/* Stats Cards */}
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} md={8}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-600 font-medium">Tß╗òng y├¬u cß║ºu</Text>
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
                    <Text className="text-green-600 font-medium">─É├ú duyß╗çt</Text>
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
                    <Text className="text-yellow-600 font-medium">Chß╗¥ duyß╗çt</Text>
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
      
      {/* Modal hiß╗ân thß╗ï chi tiß║┐t */}
      {isModalVisible && selectedRequest && (
        <Modal
          title={
            <Title level={4}>
              {modalType === 'donor' ? 'Chi tiß║┐t y├¬u cß║ºu hiß║┐n m├íu' : 'Chi tiß║┐t y├¬u cß║ºu cß║ºn m├íu'}
            </Title>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              ─É├│ng
            </Button>
          ]}
          // Sß╗¼A Lß╗ûI: X├│a prop forceRender kh├┤ng cß║ºn thiß║┐t
        >
          {modalType === 'donor' ? (
            <Space direction="vertical" className="w-full">
              <Text><strong>Hß╗ì t├¬n:</strong> {selectedRequest.fullName}</Text>
              <Text><strong>─Éiß╗çn thoß║íi:</strong> {selectedRequest.phone}</Text>
              <Text><strong>Email:</strong> {selectedRequest.email}</Text>
              <Text><strong>Nh├│m m├íu:</strong> {selectedRequest.bloodType}</Text>
              <Text><strong>C├ón nß║╖ng:</strong> {selectedRequest.weight} kg</Text>
              <Text><strong>Lß║ºn hiß║┐n cuß╗æi:</strong> {selectedRequest.lastDonation}</Text>
              <Text><strong>Tiß╗ün sß╗¡ bß╗çnh:</strong> {selectedRequest.medicalHistory}</Text>
              <Text><strong>Bß╗çnh viß╗çn:</strong> {selectedRequest.hospital}</Text>
            </Space>
          ) : (
            <Space direction="vertical" className="w-full">
              <Text><strong>Bß╗çnh nh├ón:</strong> {selectedRequest.patientName}</Text>
              <Text><strong>Nh├│m m├íu:</strong> {selectedRequest.bloodType}</Text>
              <Text><strong>Sß╗æ l╞░ß╗úng:</strong> {selectedRequest.quantity} ─æ╞ín vß╗ï</Text>
              <Text><strong>Mß╗⌐c ─æß╗Ö khß║⌐n cß║Ñp:</strong> {selectedRequest.urgency}</Text>
              <Text><strong>L├╜ do:</strong> {selectedRequest.reason}</Text>
              <Text><strong>Bß╗çnh viß╗çn:</strong> {selectedRequest.hospital}</Text>
              <Text><strong>Ng╞░ß╗¥i li├¬n hß╗ç:</strong> {selectedRequest.contactPerson}</Text>
              <Text><strong>─Éiß╗çn thoß║íi:</strong> {selectedRequest.contactPhone}</Text>
            </Space>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default StaffManagement;
