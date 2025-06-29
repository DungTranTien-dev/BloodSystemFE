import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, TimePicker, notification, Typography, Space, Row, Col, Table, Tag, Modal } from 'antd';
import { PlusOutlined, SaveOutlined, BankOutlined, EyeOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { createHospital, getCreatedHospitals } from '../../service/hospitalApi';
import dayjs from 'dayjs';
import { format, parseISO } from 'date-fns';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateHospital = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoadingHospitals(true);
    try {
      const response = await getCreatedHospitals();
      if (response.success) {
        // Đảm bảo hospitals luôn là array
        setHospitals(Array.isArray(response.data) ? response.data : []);
      } else {
        notification.error({
          message: 'Lỗi',
          description: response.error,
        });
        setHospitals([]); // Set empty array on error
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách bệnh viện',
      });
      setHospitals([]); // Set empty array on error
    } finally {
      setLoadingHospitals(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Combine date and time for start and end times
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
        // Refresh the list after creating
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

  const showModal = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedHospital(null);
  };

  const formatDateTime = (isoString) => {
    return format(parseISO(isoString), "dd/MM/yyyy HH:mm");
  };

  const columns = [
    {
      title: 'Tên bệnh viện',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => formatDateTime(text),
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => formatDateTime(text),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => <Tag color="green">Hoạt động</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showModal(record)}
          >
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
          <BankOutlined className="text-2xl text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Quản lý bệnh viện
        </h1>
        <p className="text-gray-600 text-lg">Tạo bệnh viện mới và xem lịch sử đã tạo</p>
      </div>

      <Row gutter={[24, 24]}>
        {/* Form tạo bệnh viện */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <PlusOutlined className="text-red-500" />
                <span className="font-semibold">Tạo bệnh viện mới</span>
              </div>
            }
            className="border-0 shadow-xl bg-white/80 backdrop-blur-sm"
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
                      prefix={<BankOutlined className="text-gray-400" />}
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
                  { required: true, message: 'Vui lòng nhập mô tả!' },
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
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    icon={<SaveOutlined />}
                    className="px-8 bg-gradient-to-r from-red-500 to-pink-600 border-0 hover:from-red-600 hover:to-pink-700"
                  >
                    Tạo bệnh viện
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Danh sách bệnh viện đã tạo */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BankOutlined className="text-red-500" />
                  <span className="font-semibold">Lịch sử đã tạo</span>
                </div>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchHospitals}
                  loading={loadingHospitals}
                  size="small"
                >
                  Làm mới
                </Button>
              </div>
            }
            className="border-0 shadow-xl bg-white/80 backdrop-blur-sm"
          >
            <Table 
              columns={columns} 
              dataSource={Array.isArray(hospitals) ? hospitals : []} 
              rowKey="id"
              pagination={{ 
                pageSize: 5,
                showSizeChanger: false,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bệnh viện`
              }}
              loading={loadingHospitals}
              size="small"
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal chi tiết */}
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
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default CreateHospital;
