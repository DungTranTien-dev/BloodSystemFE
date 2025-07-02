import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, InputNumber, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
    if (res.success) setData(res.data);
    else message.error(res.error || "Lấy dữ liệu thất bại");
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
    form.setFieldsValue(record);
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
        res = await updateBlood(editing.id, values);
      } else {
        res = await addBlood(values);
      }
      if (res.success) {
        message.success(editing ? "Cập nhật thành công" : "Thêm thành công");
        setModalVisible(false);
        fetchData();
      } else {
        message.error(res.error || "Lưu thất bại");
      }
    } catch {}
  };

  const columns = [
    { title: "Nhóm máu", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Thành phần", dataIndex: "componentType", key: "componentType" },
    { title: "Thể tích (ml)", dataIndex: "volumeInML", key: "volumeInML" },
    { title: "Ngày nhập", dataIndex: "importDate", key: "importDate" },
    { title: "Hạn sử dụng", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ color: "#db2777", fontWeight: 700, fontSize: 24 }}>Quản lý máu</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ background: "linear-gradient(135deg, #EF4444 0%, #EC4899 100%)", border: 0 }}>
          Thêm máu
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} bordered pagination={{ pageSize: 8 }} />
      <Modal
        title={editing ? "Cập nhật thông tin máu" : "Thêm máu mới"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        okText={editing ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="bloodGroup" label="Nhóm máu" rules={[{ required: true, message: "Chọn nhóm máu" }]}> <Select>{bloodGroups.map(g => <Option key={g} value={g}>{g}</Option>)}</Select></Form.Item>
          <Form.Item name="componentType" label="Thành phần máu" rules={[{ required: true, message: "Chọn thành phần" }]}> <Select>{componentTypes.map(c => <Option key={c} value={c}>{c}</Option>)}</Select></Form.Item>
          <Form.Item name="volumeInML" label="Thể tích (ml)" rules={[{ required: true, message: "Nhập thể tích" }]}> <InputNumber min={1} style={{ width: "100%" }} /></Form.Item>
          <Form.Item name="importDate" label="Ngày nhập" rules={[{ required: true, message: "Chọn ngày nhập" }]}> <Input type="date" /></Form.Item>
          <Form.Item name="expiryDate" label="Hạn sử dụng" rules={[{ required: true, message: "Chọn hạn sử dụng" }]}> <Input type="date" /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BloodManagement; 