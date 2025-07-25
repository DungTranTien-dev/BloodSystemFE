import React, { useState, useEffect } from 'react';
import { Table, Button, message, Spin, Modal, Form, Input, DatePicker, Switch, Select, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getBloodSeparations, updateBloodSeparation, deleteBloodSeparation, createBloodSeparation } from '../../service/bloodSeparationApi';
import dayjs from 'dayjs';

const componentTypeMap = {
  0: 'Hß╗ông cß║ºu',
  1: 'Tiß╗âu cß║ºu',
  2: 'Huyß║┐t t╞░╞íng',
  3: 'Bß║ích cß║ºu',
};
const componentTypeOptions = [
  { value: 0, label: 'Hß╗ông cß║ºu' },
  { value: 1, label: 'Tiß╗âu cß║ºu' },
  { value: 2, label: 'Huyß║┐t t╞░╞íng' },
  { value: 3, label: 'Bß║ích cß║ºu' },
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
      message.error(res.message || 'Lß╗ùi khi tß║úi dß╗» liß╗çu t├ích m├íu');
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
        message.success('Cß║¡p nhß║¡t th├ánh c├┤ng!');
        setEditModalVisible(false);
        fetchData();
      } else {
        message.error(res.message || 'Cß║¡p nhß║¡t thß║Ñt bß║íi');
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
        message.success('Tß║ío t├ích m├íu th├ánh c├┤ng!');
        setCreateModalVisible(false);
        createForm.resetFields();
        fetchData();
      } else {
        message.error(res.message || 'Tß║ío thß║Ñt bß║íi');
      }
    } catch (err) {
      // validation error
    } finally {
      setCreating(false);
    }
  };

  const columns = [
    {
      title: 'M├ú t├ích m├íu',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'T├¬n m├íu',
      dataIndex: ['blood', 'bloodName'],
      key: 'bloodName',
      render: (_, record) => record.blood?.bloodName || '',
    },
    {
      title: 'Th├ánh phß║ºn',
      dataIndex: 'componentType',
      key: 'componentType',
      render: (value) => componentTypeMap[value] || value,
    },
    {
      title: 'Thß╗â t├¡ch (ml)',
      dataIndex: 'volumeInML',
      key: 'volumeInML',
    },
    {
      title: 'Ng├áy t├ích',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (value) => value ? new Date(value).toLocaleString('vi-VN') : '',
    },
    {
      title: 'Ng├áy hß║┐t hß║ín',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (value) => value ? new Date(value).toLocaleString('vi-VN') : '',
    },
    {
      title: 'Trß║íng th├íi',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${statusColorClass[value]} `} style={{ fontWeight: 500, minWidth: 90, display: 'inline-block', textAlign: 'center' }}>
          {value ? 'C├▓n sß╗¡ dß╗Ñng' : '─É├ú sß╗¡ dß╗Ñng'}
        </span>
      ),
    },
    {
      title: 'Thao t├íc',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title="Chß╗ënh sß╗¡a">
            <Button icon={<EditOutlined style={{ color: '#f59e0b', fontSize: 18 }} />} style={actionButtonStyle} onClick={() => showEditModal(record)} />
          </Tooltip>
          <Tooltip title="X├│a">
            <Popconfirm title="Bß║ín c├│ chß║»c chß║»n muß╗æn x├│a?" onConfirm={async () => { const res = await deleteBloodSeparation(record.separatedBloodComponentId); if (res && res.isSuccess) { message.success('X├│a th├ánh c├┤ng!'); fetchData(); } else { message.error(res.message || 'X├│a thß║Ñt bß║íi'); } }} okText="X├│a" cancelText="Hß╗ºy">
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
        Danh s├ích t├ích m├íu
      </h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4"
        style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6, fontWeight: 500 }}
        onClick={() => setCreateModalVisible(true)}
      >
        Th├¬m t├ích m├íu
      </Button>
      <Button onClick={fetchData} className="mb-4 ml-2">L├ám mß╗¢i</Button>
      <Spin spinning={loading} tip="─Éang tß║úi dß╗» liß╗çu...">
        <Table columns={columns} dataSource={data} rowKey="separatedBloodComponentId" bordered />
      </Spin>
      <Modal
        title="Chß╗ënh sß╗¡a t├ích m├íu"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={() => setEditModalVisible(false)}
        okText={<span style={{ color: '#fff' }}>L╞░u</span>}
        cancelText="Hß╗ºy"
        confirmLoading={updating}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6 } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="M├ú t├ích m├íu">
            <Input disabled />
          </Form.Item>
          <Form.Item name={["blood", "bloodName"]} label="T├¬n m├íu">
            <Input disabled />
          </Form.Item>
          <Form.Item name="componentType" label="Th├ánh phß║ºn" rules={[{ required: true, message: 'Chß╗ìn th├ánh phß║ºn' }]}> 
            <Select options={componentTypeOptions} />
          </Form.Item>
          <Form.Item name="volumeInML" label="Thß╗â t├¡ch (ml)" rules={[{ required: true, message: 'Nhß║¡p thß╗â t├¡ch' }]}> 
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="createdDate" label="Ng├áy t├ích" rules={[{ required: true, message: 'Chß╗ìn ng├áy t├ích' }]}> 
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Ng├áy hß║┐t hß║ín" rules={[{ required: true, message: 'Chß╗ìn ng├áy hß║┐t hß║ín' }]}> 
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isAvailable" label="Trß║íng th├íi" valuePropName="checked">
            <Switch checkedChildren="C├▓n sß╗¡ dß╗Ñng" unCheckedChildren="─É├ú sß╗¡ dß╗Ñng" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Th├¬m t├ích m├íu"
        open={createModalVisible}
        onOk={handleCreateOk}
        onCancel={() => setCreateModalVisible(false)}
        okText={<span style={{ color: '#fff' }}>Tß║ío</span>}
        cancelText="Hß╗ºy"
        confirmLoading={creating}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6 } }}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item name="bloodId" label="Blood ID" rules={[{ required: true, message: 'Nhß║¡p bloodId' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="componentType" label="Th├ánh phß║ºn" rules={[{ required: true, message: 'Chß╗ìn th├ánh phß║ºn' }]}> 
            <Select options={componentTypeOptions} />
          </Form.Item>
          <Form.Item name="volumeInML" label="Thß╗â t├¡ch (ml)" rules={[{ required: true, message: 'Nhß║¡p thß╗â t├¡ch' }]}> 
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Ng├áy hß║┐t hß║ín" rules={[{ required: true, message: 'Chß╗ìn ng├áy hß║┐t hß║ín' }]}> 
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BloodSeparation; 
