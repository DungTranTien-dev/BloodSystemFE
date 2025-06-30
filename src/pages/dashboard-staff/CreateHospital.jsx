import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  DatePicker, 
  TimePicker, 
  notification, 
  Typography, 
  Space, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Modal, 
  Popconfirm,
  Tooltip,
  Badge,
  Statistic
} from 'antd';
import { 
  PlusOutlined, 
  SaveOutlined, 
  BankOutlined, 
  EyeOutlined, 
  DeleteOutlined, 
  ReloadOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { 
  createHospital, 
  getCreatedHospitals, 
  updateHospital, 
  deleteHospital
} from '../../service/hospitalApi';
import dayjs from 'dayjs';
import { format, parseISO } from 'date-fns';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateHospital = () => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoadingHospitals(true);
    try {
      const response = await getCreatedHospitals();
      if (response.success) {
        setHospitals(Array.isArray(response.data) ? response.data : []);
      } else {
        notification.error({
          message: 'Lỗi',
          description: response.error,
        });
        setHospitals([]);
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách bệnh viện',
      });
      setHospitals([]);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const startDateTime = dayjs(values.date).hour(values.startTime.hour()).minute(values.startTime.minute());
      const endDateTime = dayjs(values.date).hour(values.endTime.hour()).minute(values.endTime.minute());

      const hospitalData = {
        title: values.title,
        location: values.location,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        description: values.description
      };

      const response = await createHospital(hospitalData);
      
      if (response.success) {
        notification.success({
          message: 'Thành công',
          description: response.message || 'Bệnh viện đã được tạo thành công!',
        });
        form.resetFields();
        setIsAddModalVisible(false);
        fetchHospitals();
      } else {
        throw new Error(response.error || 'Có lỗi xảy ra');
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: error.message || 'Không thể tạo bệnh viện. Vui lòng thử lại.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onEditFinish = async (values) => {
    if (!editingHospital) return;
    
    setLoadingEdit(true);
    try {
      const startDateTime = dayjs(values.date).hour(values.startTime.hour()).minute(values.startTime.minute());
      const endDateTime = dayjs(values.date).hour(values.endTime.hour()).minute(values.endTime.minute());

      const hospitalData = {
        donationEventId: editingHospital.donationEventId,
        title: values.title,
        location: values.location,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        description: values.description
      };

      const response = await updateHospital(editingHospital.donationEventId, hospitalData);
      
      if (response.success) {
        notification.success({
          message: 'Thành công',
          description: response.message || 'Bệnh viện đã được cập nhật thành công!',
        });
        editForm.resetFields();
        setIsEditModalVisible(false);
        setEditingHospital(null);
        fetchHospitals();
      } else {
        throw new Error(response.error || 'Có lỗi xảy ra');
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: error.message || 'Không thể cập nhật bệnh viện. Vui lòng thử lại.',
      });
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleDelete = async (donationEventId) => {
    try {
      const response = await deleteHospital(donationEventId);
      
      if (response.success) {
        notification.success({
          message: 'Thành công',
          description: response.message || 'Bệnh viện đã được xóa thành công!',
        });
        fetchHospitals();
      } else {
        notification.error({
          message: 'Lỗi',
          description: response.error || 'Không thể xóa bệnh viện',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể xóa bệnh viện. Vui lòng thử lại.',
      });
    }
  };

  const showModal = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedHospital(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
    form.resetFields();
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const showEditModal = async (hospital) => {
    setEditingHospital(hospital);
    
    const startTime = dayjs(hospital.startTime);
    const endTime = dayjs(hospital.endTime);
    const date = startTime;
    
    editForm.setFieldsValue({
      title: hospital.title,
      location: hospital.location,
      date: date,
      startTime: startTime,
      endTime: endTime,
      description: hospital.description
    });
    
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingHospital(null);
    editForm.resetFields();
  };

  const formatDateTime = (isoString) => {
    try {
      const dateString = isoString.endsWith('Z') ? isoString : isoString + 'Z';
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm");
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusColor = (startTime, endTime) => {
    const now = dayjs();
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    
    if (now.isBefore(start)) return 'blue';
    if (now.isAfter(end)) return 'red';
    return 'green';
  };

  const getStatusText = (startTime, endTime) => {
    const now = dayjs();
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    
    if (now.isBefore(start)) return 'Sắp diễn ra';
    if (now.isAfter(end)) return 'Đã kết thúc';
    return 'Đang diễn ra';
  };

  const columns = [
    {
      title: 'Tên bệnh viện',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1f2937' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            ID: {text.substring(0, 8)}...
          </div>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'location',
      key: 'location',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <EnvironmentOutlined style={{ color: '#6b7280' }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_, record) => (
        <div style={{ fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <ClockCircleOutlined style={{ color: '#10b981' }} />
            <span>Bắt đầu: {formatDateTime(record.startTime)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ClockCircleOutlined style={{ color: '#ef4444' }} />
            <span>Kết thúc: {formatDateTime(record.endTime)}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => {
        const color = getStatusColor(record.startTime, record.endTime);
        const text = getStatusText(record.startTime, record.endTime);
        return (
          <Badge 
            status={color} 
            text={text}
            style={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
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
              onClick={() => showEditModal(record)}
              style={{ color: '#f59e0b' }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa bệnh viện này?"
              onConfirm={() => handleDelete(record.donationEventId)}
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
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header with Statistics */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
            <BankOutlined className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quản lý bệnh viện
          </h1>
          <p className="text-gray-600 text-lg">Quản lý và theo dõi tất cả bệnh viện trong hệ thống</p>
        </div>   
      </div>

      {/* Main Content - Hospital List */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BankOutlined className="text-red-500" />
              <span className="font-semibold text-lg">Danh sách bệnh viện</span>
            </div>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchHospitals}
                loading={loadingHospitals}
                size="middle"
              >
                Làm mới
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddModal}
                size="middle"
                className="bg-gradient-to-r from-red-500 to-pink-600 border-0 hover:from-red-600 hover:to-pink-700"
              >
                Thêm bệnh viện
              </Button>
            </Space>
          </div>
        }
        className="border-0 shadow-xl bg-white/80 backdrop-blur-sm"
      >
        <Table 
          columns={columns} 
          dataSource={hospitals} 
          rowKey="donationEventId"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bệnh viện`
          }}
          loading={loadingHospitals}
          size="middle"
          scroll={{ x: 1000 }}
          locale={{
            emptyText: 'Chưa có bệnh viện nào được tạo'
          }}
        />
      </Card>

      {/* Modal chi tiết bệnh viện */}
      {isModalVisible && selectedHospital && (
        <Modal
          title={<Title level={4}>Chi tiết bệnh viện</Title>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>Đóng</Button>
          ]}
        >
          <Space direction="vertical" className="w-full">
            <Text><strong>Tên bệnh viện:</strong> {selectedHospital.title}</Text>
            <Text><strong>Địa chỉ:</strong> {selectedHospital.location}</Text>
            <Text><strong>Thời gian bắt đầu:</strong> {formatDateTime(selectedHospital.startTime)}</Text>
            <Text><strong>Thời gian kết thúc:</strong> {formatDateTime(selectedHospital.endTime)}</Text>
            <Text><strong>Mô tả:</strong> {selectedHospital.description}</Text>
            <Badge 
              status={getStatusColor(selectedHospital.startTime, selectedHospital.endTime)} 
              text={getStatusText(selectedHospital.startTime, selectedHospital.endTime)}
            />
          </Space>
        </Modal>
      )}

      {/* Modal thêm bệnh viện */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <PlusOutlined className="text-red-500" />
            <span className="font-semibold text-lg">Thêm bệnh viện mới</span>
          </div>
        }
        open={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            date: dayjs(),
            startTime: dayjs().hour(8).minute(0),
            endTime: dayjs().hour(17).minute(0),
          }}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<Text strong>Tên bệnh viện</Text>}
                name="title"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên bệnh viện!' },
                  { min: 3, message: 'Tên bệnh viện phải có ít nhất 3 ký tự!' }
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="Nhập tên bệnh viện"
                  prefix={<BankOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<Text strong>Địa chỉ</Text>}
                name="location"
                rules={[
                  { required: true, message: 'Vui lòng nhập địa chỉ!' },
                  { min: 10, message: 'Địa chỉ phải có ít nhất 10 ký tự!' }
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="Nhập địa chỉ bệnh viện"
                  prefix={<EnvironmentOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={8}>
              <Form.Item
                label={<Text strong>Ngày hoạt động</Text>}
                name="date"
                rules={[
                  { required: true, message: 'Vui lòng chọn ngày!' }
                ]}
              >
                <DatePicker 
                  size="large" 
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label={<Text strong>Giờ bắt đầu</Text>}
                name="startTime"
                rules={[
                  { required: true, message: 'Vui lòng chọn giờ bắt đầu!' }
                ]}
              >
                <TimePicker 
                  size="large" 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="Chọn giờ bắt đầu"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label={<Text strong>Giờ kết thúc</Text>}
                name="endTime"
                rules={[
                  { required: true, message: 'Vui lòng chọn giờ kết thúc!' }
                ]}
              >
                <TimePicker 
                  size="large" 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="Chọn giờ kết thúc"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<Text strong>Mô tả</Text>}
            name="description"
            rules={[
              { min: 20, message: 'Mô tả phải có ít nhất 20 ký tự!' }
            ]}
          >
            <TextArea 
              rows={3}
              placeholder="Nhập mô tả chi tiết về bệnh viện, dịch vụ hiến máu, quy trình..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={handleAddModalCancel}>
                Hủy
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="bg-gradient-to-r from-red-500 to-pink-600 border-0 hover:from-red-600 hover:to-pink-700"
              >
                Tạo bệnh viện
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa bệnh viện */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EditOutlined className="text-orange-500" />
            <span className="font-semibold text-lg">Chỉnh sửa bệnh viện</span>
          </div>
        }
        open={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={onEditFinish}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={<Text strong>Tên bệnh viện</Text>}
                name="title"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên bệnh viện!' },
                  { min: 3, message: 'Tên bệnh viện phải có ít nhất 3 ký tự!' }
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="Nhập tên bệnh viện"
                  prefix={<BankOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={<Text strong>Địa chỉ</Text>}
                name="location"
                rules={[
                  { required: true, message: 'Vui lòng nhập địa chỉ!' },
                  { min: 10, message: 'Địa chỉ phải có ít nhất 10 ký tự!' }
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="Nhập địa chỉ bệnh viện"
                  prefix={<EnvironmentOutlined className="text-gray-400" />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={8}>
              <Form.Item
                label={<Text strong>Ngày hoạt động</Text>}
                name="date"
                rules={[
                  { required: true, message: 'Vui lòng chọn ngày!' }
                ]}
              >
                <DatePicker 
                  size="large" 
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label={<Text strong>Giờ bắt đầu</Text>}
                name="startTime"
                rules={[
                  { required: true, message: 'Vui lòng chọn giờ bắt đầu!' }
                ]}
              >
                <TimePicker 
                  size="large" 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="Chọn giờ bắt đầu"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label={<Text strong>Giờ kết thúc</Text>}
                name="endTime"
                rules={[
                  { required: true, message: 'Vui lòng chọn giờ kết thúc!' }
                ]}
              >
                <TimePicker 
                  size="large" 
                  style={{ width: '100%' }}
                  format="HH:mm"
                  placeholder="Chọn giờ kết thúc"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<Text strong>Mô tả</Text>}
            name="description"
            rules={[
              { min: 20, message: 'Mô tả phải có ít nhất 20 ký tự!' }
            ]}
          >
            <TextArea 
              rows={3}
              placeholder="Nhập mô tả chi tiết về bệnh viện, dịch vụ hiến máu, quy trình..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={handleEditModalCancel}>
                Hủy
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loadingEdit}
                icon={<SaveOutlined />}
                className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 hover:from-orange-600 hover:to-orange-700"
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateHospital;
