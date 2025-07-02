import React, { useState, useEffect } from 'react';
import { Card, Button, Tag, Table, Modal, notification, Typography, Space, Row, Col, Form, Input, Select, DatePicker, InputNumber, Tooltip, Popconfirm } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, EyeOutlined, ExperimentOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getBloodRequests, addBloodRequest, updateBloodRequest, deleteBloodRequest } from '../../service/bloodRequestApi';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Bình thường", "Khẩn cấp", "Cực kỳ khẩn cấp"];

const StaffBloodRequests = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    const res = await getBloodRequests();
    if (res.success) {
      setBloodRequests(res.data);
    } else {
      notification.error({
        message: "Lỗi",
        description: res.error || "Không thể tải dữ liệu"
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setIsFormModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      ...record,
      requestedDate: dayjs(record.requestedDate)
    });
    setIsFormModalVisible(true);
  };

  const handleDelete = async (id) => {
    const res = await deleteBloodRequest(id);
    if (res.success) {
      notification.success({
        message: "Thành công",
        description: "Đã xóa yêu cầu cần máu"
      });
      fetchData();
    } else {
      notification.error({
        message: "Lỗi",
        description: res.error || "Không thể xóa yêu cầu"
      });
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        requestedDate: values.requestedDate.toISOString(),
        requestedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6" // demo user id
      };

      let res;
      if (editing) {
        res = await updateBloodRequest(editing.bloodRequestId, payload);
      } else {
        res = await addBloodRequest(payload);
      }

      if (res.success) {
        notification.success({
          message: "Thành công",
          description: editing ? "Đã cập nhật yêu cầu" : "Đã thêm yêu cầu mới"
        });
        setIsFormModalVisible(false);
        fetchData();
      } else {
        notification.error({
          message: "Lỗi",
          description: res.error || "Không thể lưu yêu cầu"
        });
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    const request = bloodRequests.find(req => req.bloodRequestId === requestId);
    if (!request) return;

    const res = await updateBloodRequest(requestId, { ...request, status: newStatus });
    if (res.success) {
      notification.success({
        message: "Cập nhật thành công",
        description: `Yêu cầu cần máu đã được ${newStatus === 'accepted' ? 'chấp nhận' : 'từ chối'}.`,
      });
      fetchData();
    } else {
      notification.error({
        message: "Lỗi",
        description: res.error || "Không thể cập nhật trạng thái"
      });
    }
  };

  const filteredRequests = bloodRequests.filter(req => {
    if (activeTab === 'all') return true;
    const statusMap = {
      'pending': 'PENDING',
      'accepted': 'ACCEPTED', 
      'rejected': 'REJECTED'
    };
    return req.status === statusMap[activeTab];
  });

  const getStatusCounts = () => {
    const pending = bloodRequests.filter(req => req.status === 'PENDING').length;
    const accepted = bloodRequests.filter(req => req.status === 'ACCEPTED').length;
    const rejected = bloodRequests.filter(req => req.status === 'REJECTED').length;
    return { pending, accepted, rejected, total: bloodRequests.length };
  };

  const counts = getStatusCounts();

  const columns = [
    { 
      title: 'Bệnh nhân', 
      dataIndex: 'patientName', 
      key: 'patientName', 
      width: 140,
      render: text => <strong className="text-gray-800">{text}</strong> 
    },
    { 
      title: 'Bệnh viện', 
      dataIndex: 'hospitalName', 
      key: 'hospitalName',
      width: 180,
      ellipsis: true,
      render: text => <span className="text-gray-700">{text}</span>
    },
    { 
      title: 'Nhóm máu', 
      dataIndex: 'bloodGroup', 
      key: 'bloodGroup',
      width: 100,
      render: text => <span className="font-semibold text-red-600">{text}</span>
    },
    { 
      title: 'Thành phần', 
      dataIndex: 'componentType', 
      key: 'componentType', 
      width: 120,
      render: type => {
        const typeMap = {
          'WHOLE_BLOOD': 'Toàn phần',
          'RED_BLOOD_CELLS': 'Hồng cầu',
          'PLATELETS': 'Tiểu cầu',
          'PLASMA': 'Huyết tương'
        };
        return <span className="text-blue-600">{typeMap[type] || type}</span>;
      }
    },
    { 
      title: 'Thể tích (ml)', 
      dataIndex: 'volumeInML', 
      key: 'volumeInML',
      width: 120,
      render: text => <span className="font-medium text-gray-700">{text} ml</span>
    },
    { 
      title: 'Lý do', 
      dataIndex: 'reason', 
      key: 'reason', 
      width: 200,
      ellipsis: true,
      render: text => <span title={text} className="text-gray-600">{text}</span>
    },
    { 
      title: 'Ngày cần', 
      dataIndex: 'requestedDate', 
      key: 'requestedDate', 
      width: 120,
      render: date => <span className="text-gray-700">{dayjs(date).format('DD/MM/YYYY')}</span>
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status', 
      width: 120,
      render: status => {
        const statusMap = {
          'PENDING': 'pending',
          'ACCEPTED': 'accepted', 
          'REJECTED': 'rejected'
        };
        return getStatusTag(statusMap[status] || status);
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              type="text"
              onClick={() => showModal(record)}
              style={{ color: '#3b82f6' }}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              type="text"
              onClick={() => handleEdit(record)}
              style={{ color: '#f59e0b' }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa yêu cầu này?"
              onConfirm={() => handleDelete(record.bloodRequestId)}
              okText="Xóa"
              cancelText="Hủy"
              okType="danger"
            >
              <Button
                icon={<DeleteOutlined />}
                size="small"
                type="text"
                danger
              />
            </Popconfirm>
          </Tooltip>
          {record.status === 'PENDING' && (
            <>
              <Tooltip title="Duyệt yêu cầu">
                <Button
                  icon={<CheckCircleOutlined />}
                  size="small"
                  type="text"
                  onClick={() => handleUpdateStatus(record.bloodRequestId, 'ACCEPTED')}
                  style={{ color: '#10b981' }}
                />
              </Tooltip>
              <Tooltip title="Từ chối yêu cầu">
                <Button
                  icon={<CloseCircleOutlined />}
                  size="small"
                  type="text"
                  danger
                  onClick={() => handleUpdateStatus(record.bloodRequestId, 'REJECTED')}
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!text-red-600">Quản lý yêu cầu cần máu</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
          style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0 }}
        >
          Thêm yêu cầu
        </Button>
      </div>

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
          rowKey="bloodRequestId"
          loading={loading}
          pagination={{ 
            pageSize: 8,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} yêu cầu`
          }}
          className="overflow-hidden"
          size="middle"
          bordered
        />
      </Card>

      {/* Detail Modal */}
      {isModalVisible && selectedRequest && (
        <Modal
          title={<Title level={4}>Chi tiết yêu cầu cần máu</Title>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>Đóng</Button>
          ]}
        >
          <Space direction="vertical" className="w-full">
            <Text><strong>Bệnh nhân:</strong> {selectedRequest.patientName}</Text>
            <Text><strong>Bệnh viện:</strong> {selectedRequest.hospitalName}</Text>
            <Text><strong>Nhóm máu:</strong> {selectedRequest.bloodGroup}</Text>
            <Text><strong>Thành phần:</strong> {selectedRequest.componentType}</Text>
            <Text><strong>Thể tích:</strong> {selectedRequest.volumeInML} ml</Text>
            <Text><strong>Lý do:</strong> {selectedRequest.reason}</Text>
            <Text><strong>Ngày cần:</strong> {dayjs(selectedRequest.requestedDate).format('DD/MM/YYYY')}</Text>
          </Space>
        </Modal>
      )}

      {/* Form Modal */}
      <Modal
        title={editing ? "Cập nhật yêu cầu cần máu" : "Thêm yêu cầu cần máu mới"}
        open={isFormModalVisible}
        onOk={handleFormSubmit}
        onCancel={() => setIsFormModalVisible(false)}
        okText={editing ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="patientName" label="Tên bệnh nhân" rules={[{ required: true, message: "Vui lòng nhập tên bệnh nhân" }]}>
            <Input placeholder="Nhập tên bệnh nhân" />
          </Form.Item>
          <Form.Item name="hospitalName" label="Tên bệnh viện" rules={[{ required: true, message: "Vui lòng nhập tên bệnh viện" }]}>
            <Input placeholder="Nhập tên bệnh viện" />
          </Form.Item>
          <Form.Item name="bloodGroup" label="Nhóm máu" rules={[{ required: true, message: "Vui lòng chọn nhóm máu" }]}>
            <Select placeholder="Chọn nhóm máu">
              {bloodGroups.map(group => <Option key={group} value={group}>{group}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="componentType" label="Thành phần máu" rules={[{ required: true, message: "Vui lòng chọn thành phần máu" }]}>
            <Select placeholder="Chọn thành phần máu">
              <Option value="WHOLE_BLOOD">Toàn phần</Option>
              <Option value="RED_BLOOD_CELLS">Hồng cầu</Option>
              <Option value="PLATELETS">Tiểu cầu</Option>
              <Option value="PLASMA">Huyết tương</Option>
            </Select>
          </Form.Item>
          <Form.Item name="volumeInML" label="Thể tích cần (ml)" rules={[{ required: true, message: "Vui lòng nhập thể tích" }]}>
            <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập thể tích" />
          </Form.Item>
          <Form.Item name="reason" label="Lý do cần máu" rules={[{ required: true, message: "Vui lòng nhập lý do" }]}>
            <Input.TextArea rows={3} placeholder="Nhập lý do cần máu" />
          </Form.Item>
          <Form.Item name="requestedDate" label="Ngày cần máu" rules={[{ required: true, message: "Vui lòng chọn ngày" }]}>
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffBloodRequests;