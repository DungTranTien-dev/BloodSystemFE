import React, { useState, useEffect } from 'react';
import { Table, Button, message, Spin, Modal, Form, Input, DatePicker, Switch, Select, InputNumber } from 'antd';
import { ReloadOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { getAllUserMedical, changeUserMedicalStatus, updateUserMedical } from '../../service/medicalApi';
import dayjs from 'dayjs';

const genderMap = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
  0: 'Nam',
  1: 'Nữ',
  2: 'Khác',
};
const typeMap = {
  PENDING: 'Chờ duyệt',
  AVAILABLE: 'Đã duyệt',
  BLOCK: 'Từ chối',
  COMPLETE: 'Hoàn tất',
  0: 'Chờ duyệt',
  1: 'Đã duyệt',
  2: 'Từ chối',
  3: 'Hoàn tất',
};
const genderOptions = [
  { label: 'Nam', value: 0 },
  { label: 'Nữ', value: 1 },
  { label: 'Khác', value: 2 },
];
const typeOptions = [
  { label: 'Chờ duyệt', value: 0 },
  { label: 'Đã duyệt', value: 1 },
  { label: 'Từ chối', value: 2 },
  { label: 'Hoàn tất', value: 3 },
];

const MedicalRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editForm] = Form.useForm();
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllUserMedical();
    if (res && res.success) {
      setData(res.data);
    } else {
      message.error(res.error || 'Lỗi khi tải dữ liệu yêu cầu y tế');
      setData([]);
    }
    setLoading(false);
  };



  const showViewModal = (record) => {
    setEditingRecord(record);
    setViewModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingRecord(record);
    editForm.setFieldsValue({
      ...record,
      dateOfBirth: record.dateOfBirth ? dayjs(record.dateOfBirth) : null,
      gender: typeof record.gender === 'number' ? record.gender : (record.gender === 'MALE' ? 0 : record.gender === 'FEMALE' ? 1 : 2),
      type: typeof record.type === 'number' ? record.type : (record.type === 'PENDING' ? 0 : record.type === 'AVAILABLE' ? 1 : record.type === 'BLOCK' ? 2 : record.type === 'COMPLETE' ? 3 : 0),
    });
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    if (!editingRecord) return;
    try {
      const values = await editForm.validateFields();
      setUpdating(true);
      const payload = {
        userMedicalId: editingRecord.userMedicalId,
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
        gender: values.gender,
        citizenId: values.citizenId,
        phoneNumber: values.phoneNumber,
        email: values.email,
        currentAddress: values.currentAddress,
        hasDonatedBefore: values.hasDonatedBefore,
        donationCount: values.donationCount,
        diseaseDescription: values.diseaseDescription,
        type: values.type,
        createDate: editingRecord.createDate ? dayjs(editingRecord.createDate).toISOString() : new Date().toISOString(),
        userId: editingRecord.userId || '',
      };
      const res = await updateUserMedical(payload);
      if (res && res.success) {
        message.success(res.message || 'Cập nhật thành công!');
        setEditModalVisible(false);
        setEditingRecord(null);
        editForm.resetFields();
        fetchData();
      } else {
        message.error(res.error || 'Cập nhật thất bại');
      }
    } catch (err) {
      message.error('Có lỗi xảy ra khi cập nhật');
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = async (userMedicalId, newType) => {
    try {
      const res = await changeUserMedicalStatus(userMedicalId, newType);
      if (res && res.success) {
        message.success(res.message || 'Cập nhật trạng thái thành công!');
        fetchData();
      } else {
        message.error(res.error || 'Cập nhật trạng thái thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (value) => value ? dayjs(value).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (value) => genderMap[value] || value || '',
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodName',
      key: 'bloodName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'type',
      key: 'type',
      render: (v, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={`px-2 py-1 rounded-full text-xs ${
            v === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            v === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
            v === 'BLOCK' ? 'bg-red-100 text-red-800' :
            v === 'COMPLETE' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {typeMap[v] || v || ''}
          </span>
          {v === 'PENDING' && (
            <div style={{ display: 'flex', gap: 4 }}>
              <Button
                size="small"
                type="text"
                style={{ color: '#10b981', fontSize: '12px' }}
                onClick={() => handleStatusChange(record.userMedicalId, 1)}
              >
                Duyệt
              </Button>
              <Button
                size="small"
                type="text"
                style={{ color: '#ef4444', fontSize: '12px' }}
                onClick={() => handleStatusChange(record.userMedicalId, 2)}
              >
                Từ chối
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            icon={<EyeOutlined />}
            size="small"
            type="text"
            onClick={() => showViewModal(record)}
            style={{ color: '#3b82f6' }}
          />
          <Button
            icon={<EditOutlined />}
            size="small"
            type="text"
            onClick={() => showEditModal(record)}
            style={{ color: '#f59e0b' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
        Danh sách yêu cầu y tế
      </h1>
      <Button onClick={fetchData} className="mb-4">Làm mới</Button>
      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <Table columns={columns} dataSource={data} rowKey="userMedicalId" bordered />
      </Spin>
      <Modal
        title="Chi tiết yêu cầu y tế"
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setEditingRecord(null);
        }}
        width={800}
        footer={[
          <Button key="close" onClick={() => {
            setViewModalVisible(false);
            setEditingRecord(null);
          }}>
            Đóng
          </Button>
        ]}
      >
        {editingRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Thông tin cá nhân</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Họ và tên:</span>
                    <p className="font-medium">{editingRecord.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Ngày sinh:</span>
                    <p className="font-medium">{editingRecord.dateOfBirth ? dayjs(editingRecord.dateOfBirth).format('DD/MM/YYYY') : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Giới tính:</span>
                    <p className="font-medium">{genderMap[editingRecord.gender] || editingRecord.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">CMND/CCCD:</span>
                    <p className="font-medium">{editingRecord.citizenId || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Nhóm máu:</span>
                    <p className="font-medium text-red-600">{editingRecord.bloodName || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Thông tin liên hệ</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Số điện thoại:</span>
                    <p className="font-medium">{editingRecord.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-medium text-blue-600">{editingRecord.email || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Địa chỉ:</span>
                    <p className="font-medium">{editingRecord.currentAddress || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Thông tin hiến máu</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Đã hiến máu trước đây:</span>
                    <p className="font-medium">
                      <span className={`px-2 py-1 rounded-full text-xs ${editingRecord.hasDonatedBefore ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {editingRecord.hasDonatedBefore ? 'Có' : 'Chưa'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Số lần hiến máu:</span>
                    <p className="font-medium">{editingRecord.donationCount || '0'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Trạng thái:</span>
                    <p className="font-medium">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        editingRecord.type === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        editingRecord.type === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                        editingRecord.type === 'BLOCK' ? 'bg-red-100 text-red-800' :
                        editingRecord.type === 'COMPLETE' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {typeMap[editingRecord.type] || editingRecord.type}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">Thông tin khác</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Mô tả bệnh tật:</span>
                    <p className="font-medium">{editingRecord.diseaseDescription || 'Không có'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Vĩ độ:</span>
                    <p className="font-medium">{editingRecord.latitue || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Kinh độ:</span>
                    <p className="font-medium">{editingRecord.longtitue || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title="Chỉnh sửa yêu cầu y tế"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingRecord(null);
          editForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={updating}
        width={800}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Ngày sinh" rules={[{ required: true, message: 'Chọn ngày sinh' }]}>
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Chọn giới tính' }]}>
            <Select options={genderOptions} />
          </Form.Item>
          <Form.Item name="citizenId" label="CMND/CCCD">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="currentAddress" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="hasDonatedBefore" label="Đã hiến máu trước đây" valuePropName="checked">
            <Switch checkedChildren="Có" unCheckedChildren="Chưa" />
          </Form.Item>
          <Form.Item name="donationCount" label="Số lần hiến máu">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="diseaseDescription" label="Mô tả bệnh tật">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Trạng thái" rules={[{ required: true, message: 'Chọn trạng thái' }]}>
            <Select options={typeOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MedicalRequest;

