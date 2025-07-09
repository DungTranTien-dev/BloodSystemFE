import React, { useState, useEffect } from 'react';
import { Table, Button, message, Spin, Modal, Form, Input, DatePicker, Switch, Select, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getBloodSeparations, updateBloodSeparation, deleteBloodSeparation, createBloodSeparation } from '../../service/bloodSeparationApi';
import dayjs from 'dayjs';

const componentTypeMap = {
  0: 'Hồng cầu',
  1: 'Tiểu cầu',
  2: 'Huyết tương',
  3: 'Bạch cầu',
};
const componentTypeOptions = [
  { value: 0, label: 'Hồng cầu' },
  { value: 1, label: 'Tiểu cầu' },
  { value: 2, label: 'Huyết tương' },
  { value: 3, label: 'Bạch cầu' },
];

const statusColorClass = {
  true: 'bg-green-100 text-green-800',
  false: 'bg-gray-100 text-gray-800',
};
const actionButtonStyle = { border: 'none', background: 'none', padding: 0, margin: 0 };

const BloodSeparation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [updating, setUpdating] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getBloodSeparations();
    if (res && res.isSuccess) {
      setData(res.result);
    } else {
      message.error(res.message || 'Lỗi khi tải dữ liệu tách máu');
    }
    setLoading(false);
  };

  const showEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      createdDate: record.createdDate ? dayjs(record.createdDate) : null,
      expiryDate: record.expiryDate ? dayjs(record.expiryDate) : null,
    });
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      setUpdating(true);
      const payload = {
        ...editingRecord,
        ...values,
        createdDate: values.createdDate ? values.createdDate.toISOString() : null,
        expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
      };
      const res = await updateBloodSeparation(payload);
      if (res && res.isSuccess) {
        message.success('Cập nhật thành công!');
        setEditModalVisible(false);
        fetchData();
      } else {
        message.error(res.message || 'Cập nhật thất bại');
      }
    } catch (err) {
      // validation error
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateOk = async () => {
    try {
      const values = await createForm.validateFields();
      setCreating(true);
      const payload = {
        ...values,
        expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
      };
      const res = await createBloodSeparation(payload);
      if (res && res.isSuccess) {
        message.success('Tạo tách máu thành công!');
        setCreateModalVisible(false);
        createForm.resetFields();
        fetchData();
      } else {
        message.error(res.message || 'Tạo thất bại');
      }
    } catch (err) {
      // validation error
    } finally {
      setCreating(false);
    }
  };

  const columns = [
    {
      title: 'Mã tách máu',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên máu',
      dataIndex: ['blood', 'bloodName'],
      key: 'bloodName',
      render: (_, record) => record.blood?.bloodName || '',
    },
    {
      title: 'Thành phần',
      dataIndex: 'componentType',
      key: 'componentType',
      render: (value) => componentTypeMap[value] || value,
    },
    {
      title: 'Thể tích (ml)',
      dataIndex: 'volumeInML',
      key: 'volumeInML',
    },
    {
      title: 'Ngày tách',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (value) => value ? new Date(value).toLocaleString('vi-VN') : '',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (value) => value ? new Date(value).toLocaleString('vi-VN') : '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${statusColorClass[value]} `} style={{ fontWeight: 500, minWidth: 90, display: 'inline-block', textAlign: 'center' }}>
          {value ? 'Còn sử dụng' : 'Đã sử dụng'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined style={{ color: '#f59e0b', fontSize: 18 }} />} style={actionButtonStyle} onClick={() => showEditModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={async () => { const res = await deleteBloodSeparation(record.separatedBloodComponentId); if (res && res.isSuccess) { message.success('Xóa thành công!'); fetchData(); } else { message.error(res.message || 'Xóa thất bại'); } }} okText="Xóa" cancelText="Hủy">
              <Button icon={<DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />} style={actionButtonStyle} danger />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
        Danh sách tách máu
      </h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4"
        style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6, fontWeight: 500 }}
        onClick={() => setCreateModalVisible(true)}
      >
        Thêm tách máu
      </Button>
      <Button onClick={fetchData} className="mb-4 ml-2">Làm mới</Button>
      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <Table columns={columns} dataSource={data} rowKey="separatedBloodComponentId" bordered />
      </Spin>
      <Modal
        title="Chỉnh sửa tách máu"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={() => setEditModalVisible(false)}
        okText={<span style={{ color: '#fff' }}>Lưu</span>}
        cancelText="Hủy"
        confirmLoading={updating}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6 } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="Mã tách máu">
            <Input disabled />
          </Form.Item>
          <Form.Item name={["blood", "bloodName"]} label="Tên máu">
            <Input disabled />
          </Form.Item>
          <Form.Item name="componentType" label="Thành phần" rules={[{ required: true, message: 'Chọn thành phần' }]}> 
            <Select options={componentTypeOptions} />
          </Form.Item>
          <Form.Item name="volumeInML" label="Thể tích (ml)" rules={[{ required: true, message: 'Nhập thể tích' }]}> 
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="createdDate" label="Ngày tách" rules={[{ required: true, message: 'Chọn ngày tách' }]}> 
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Ngày hết hạn" rules={[{ required: true, message: 'Chọn ngày hết hạn' }]}> 
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isAvailable" label="Trạng thái" valuePropName="checked">
            <Switch checkedChildren="Còn sử dụng" unCheckedChildren="Đã sử dụng" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm tách máu"
        open={createModalVisible}
        onOk={handleCreateOk}
        onCancel={() => setCreateModalVisible(false)}
        okText={<span style={{ color: '#fff' }}>Tạo</span>}
        cancelText="Hủy"
        confirmLoading={creating}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6 } }}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item name="bloodId" label="Blood ID" rules={[{ required: true, message: 'Nhập bloodId' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="componentType" label="Thành phần" rules={[{ required: true, message: 'Chọn thành phần' }]}> 
            <Select options={componentTypeOptions} />
          </Form.Item>
          <Form.Item name="volumeInML" label="Thể tích (ml)" rules={[{ required: true, message: 'Nhập thể tích' }]}> 
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Ngày hết hạn" rules={[{ required: true, message: 'Chọn ngày hết hạn' }]}> 
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BloodSeparation; 