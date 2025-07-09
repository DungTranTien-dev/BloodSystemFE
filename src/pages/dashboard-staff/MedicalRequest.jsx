import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Badge,
  Modal,
  Typography,
  Space,
  Tooltip,
  Tag,
  Spin
} from 'antd';
import { MonitorOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { getAllUserMedical, changeUserMedicalStatus } from '../../service/medicalApi';
import { message } from 'antd';

const { Title, Text } = Typography;

const statusMap = {
  pending: { color: 'blue', text: 'Chờ duyệt' },
  approved: { color: 'green', text: 'Đã duyệt' },
  rejected: { color: 'red', text: 'Từ chối' },
};

const MedicalRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const res = await getAllUserMedical();
    if (res.success) {
      setData(res.data);
    } else {
      setError(res.error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeStatus = async (id, type) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    const res = await changeUserMedicalStatus(id, type);
    if (res.success) {
      message.success(res.message || 'Cập nhật trạng thái thành công!');
      fetchData();
    } else {
      message.error(res.error || 'Cập nhật trạng thái thất bại!');
    }
    setActionLoading((prev) => ({ ...prev, [id]: false }));
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodName',
      key: 'bloodName',
      render: (b) => <Tag color="red">{b}</Tag>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Badge status={statusMap[status]?.color || 'default'} text={statusMap[status]?.text || status || 'Chưa rõ'} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                setSelected(record);
                setViewModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Duyệt">
            <Button
              type="primary"
              size="small"
              loading={!!actionLoading[record.id]}
              onClick={() => handleChangeStatus(record.id, 1)}
              style={{ background: '#22c55e', border: 'none' }}
            >
              Duyệt
            </Button>
          </Tooltip>
          <Tooltip title="Từ chối">
            <Button
              danger
              size="small"
              loading={!!actionLoading[record.id]}
              onClick={() => handleChangeStatus(record.id, 2)}
              style={{ marginLeft: 4 }}
            >
              Từ chối
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleReload = () => {
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
        <MonitorOutlined className="text-2xl" />
        Yêu cầu y tế
      </h1>
      <Button
        icon={<ReloadOutlined />}
        onClick={handleReload}
        className="mb-4"
      >
        Làm mới
      </Button>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} yêu cầu y tế`
          }}
          locale={{
            emptyText: 'Chưa có yêu cầu y tế nào'
          }}
        />
      </Spin>
      <Modal
        title="Chi tiết yêu cầu y tế"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={null}
        destroyOnClose
      >
        {selected && (
          <div>
            <p><strong>Họ và tên:</strong> {selected.fullName}</p>
            <p><strong>Số điện thoại:</strong> {selected.phoneNumber}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Nhóm máu:</strong> {selected.bloodName}</p>
            <p><strong>Địa chỉ:</strong> {selected.currentAddress}</p>
            <p><strong>Mô tả bệnh tật:</strong> {selected.diseaseDescription || 'Không'}</p>
            <p><strong>Đã hiến máu trước đây:</strong> {selected.hasDonatedBefore ? 'Có' : 'Chưa'}</p>
            <p><strong>Số lần hiến máu:</strong> {selected.donationCount}</p>
            <p><strong>Bệnh mãn tính:</strong> {selected.chronicDiseaseIds && selected.chronicDiseaseIds.length > 0 ? selected.chronicDiseaseIds.join(', ') : 'Không'}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MedicalRequest; 