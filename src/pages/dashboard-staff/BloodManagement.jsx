import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExperimentOutlined } from "@ant-design/icons";
import { getBloodList, addBlood, updateBlood, deleteBlood } from "../../service/bloodApi";

const { Option } = Select;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const componentTypes = ["Toàn phần", "Hồng cầu", "Tiểu cầu", "Huyết tương"];

const BloodManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    const res = await getBloodList();
    if (res && res.isSuccess) setData(res.result);
    else message.error(res.message || "Lấy dữ liệu thất bại");
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      bloodId: record.bloodId,
      bloodName: record.bloodName,
      volumeInML: record.volumeInML,
      collectedDate: record.collectedDate ? record.collectedDate.split('T')[0] : '',
      expiryDate: record.expiryDate ? record.expiryDate.split('T')[0] : '',
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    const res = await deleteBlood(id);
    if (res.success) {
      message.success("Xóa thành công");
      fetchData();
    } else message.error(res.error || "Xóa thất bại");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let res;
      if (editing) {
        res = await updateBlood(editing.bloodId, values);
      } else {
        res = await addBlood(values);
      }
      if (res.isSuccess) {
        message.success(editing ? "Cập nhật thành công" : "Thêm thành công");
        setModalVisible(false);
        fetchData();
      } else {
        message.error(res.message || "Lưu thất bại");
      }
    } catch {}
  };

  const columns = [
    { title: "Mã máu", dataIndex: "bloodId", key: "bloodId" },
    { title: "Tên máu", dataIndex: "bloodName", key: "bloodName" },
    { title: "Thể tích (ml)", dataIndex: "volumeInML", key: "volumeInML" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Ngày thu thập", dataIndex: "collectedDate", key: "collectedDate", render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: "Hạn sử dụng", dataIndex: "expiryDate", key: "expiryDate", render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: "Còn sử dụng", dataIndex: "isAvailable", key: "isAvailable", render: v => v ? 'Còn' : 'Hết' },
    { title: "Người hiến", dataIndex: "userName", key: "userName" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="text" onClick={() => handleEdit(record)} style={{ color: '#f59e0b', marginRight: 8 }} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.bloodId)} okText="Xóa" cancelText="Hủy">
            <Button icon={<DeleteOutlined />} type="text" danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
        <ExperimentOutlined className="text-2xl" />
        Danh sách máu
      </h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4"
        style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0 }}
        onClick={handleAdd}
      >
        Thêm máu
      </Button>
      <Button onClick={fetchData} className="mb-4 ml-2" icon={<ReloadOutlined />}>Làm mới</Button>
      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <Table columns={columns} dataSource={data} rowKey="bloodId" bordered pagination={{ pageSize: 8 }} />
      </Spin>
      <Modal
        title={editing ? "Cập nhật thông tin máu" : "Thêm máu mới"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        okText={editing ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="bloodId" label="ID máu">
            <Input disabled />
          </Form.Item>
          <Form.Item name="bloodName" label="Tên máu" rules={[{ required: true, message: "Nhập tên máu" }]}> <Input /> </Form.Item>
          <Form.Item name="volumeInML" label="Thể tích (ml)" rules={[{ required: true, message: "Nhập thể tích" }]}> <Input type="number" min={1} /> </Form.Item>
          <Form.Item name="collectedDate" label="Ngày thu thập" rules={[{ required: true, message: "Chọn ngày thu thập" }]}> <Input type="date" /> </Form.Item>
          <Form.Item name="expiryDate" label="Hạn sử dụng" rules={[{ required: true, message: "Chọn hạn sử dụng" }]}> <Input type="date" /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BloodManagement; 