import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Spin, DatePicker, Form as AntForm, InputNumber, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExperimentOutlined } from "@ant-design/icons";
import { getBloodList, addBlood, updateBlood, deleteBlood, changeBloodStatus } from "../../service/bloodApi";
import { createBloodSeparation } from '../../service/bloodSeparationApi';
import dayjs from "dayjs";

const { Option } = Select;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const componentTypes = ["Toàn phần", "Hồng cầu", "Tiểu cầu", "Huyết tương"];

const statusMap = {
  UNPROCESSED: "Chưa xử lí",
  PROCESSING: "Đang xử lí",
  PROCESSED: "Hoàn thành",
  ERROR: "Lỗi"
};
const statusOrder = ["UNPROCESSED", "PROCESSING", "PROCESSED"];

const statusColorClass = {
  UNPROCESSED: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-green-100 text-green-800',
  PROCESSED: 'bg-blue-100 text-blue-800',
  ERROR: 'bg-red-100 text-red-800',
};

const componentTypeOptions = [
  { label: "Hồng cầu", value: 0 },
  { label: "Tiểu cầu", value: 1 },
  { label: "Huyết tương", value: 2 },
  { label: "Bạch cầu", value: 3 },
];

const validateUniqueComponentType = (idx, getFieldValue) => ({
  validator(_, value) {
    const all = getFieldValue(['components']) || [];
    if (all.filter((item, i) => item && item.componentType === value && i !== idx).length > 0) {
      return Promise.reject(new Error('Không được chọn trùng loại thành phần máu!'));
    }
    return Promise.resolve();
  }
});

const BloodManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const [separateModal, setSeparateModal] = useState(false);
  const [separateList, setSeparateList] = useState([]);
  const [separatingBlood, setSeparatingBlood] = useState(null);
  const [separateForm] = AntForm.useForm();

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

  const handleChangeStatus = async (record) => {
    // Chuyển trạng thái sang giá trị tiếp theo trong statusOrder
    const idx = statusOrder.indexOf(record.status);
    const newStatus = statusOrder[(idx + 1) % statusOrder.length];
    const res = await changeBloodStatus(record.bloodId, newStatus);
    if (res.success) {
      message.success("Đổi trạng thái thành công");
      fetchData();
    } else {
      message.error(res.error || "Đổi trạng thái thất bại");
    }
  };

  const handleApprove = async (record) => {
    if (record.status !== "PROCESSING") return;
    const res = await changeBloodStatus(record.bloodId, "PROCESSED");
    if (res.success) {
      message.success("Đã duyệt thành Hoàn thành");
      fetchData();
    } else {
      message.error(res.error || "Duyệt thất bại");
    }
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

  const openSeparateModal = (record) => {
    setSeparatingBlood(record);
    setSeparateList([
      { bloodId: record.bloodId, componentType: 0, volumeInML: undefined, expiryDate: null }
    ]);
    setSeparateModal(true);
    setTimeout(() => separateForm.resetFields(), 0);
  };

  const handleSeparateChange = (idx, field, value) => {
    setSeparateList(list => {
      const newList = [...list];
      newList[idx][field] = value;
      return newList;
    });
  };

  const handleAddComponent = () => {
    setSeparateList(list => [
      ...list,
      { bloodId: separatingBlood.bloodId, componentType: 0, volumeInML: undefined, expiryDate: null }
    ]);
    setTimeout(() => separateForm.resetFields(), 0);
  };

  const handleRemoveComponent = (idx) => {
    setSeparateList(list => list.filter((_, i) => i !== idx));
    setTimeout(() => separateForm.resetFields(), 0);
  };

  const handleSeparateBlood = async () => {
    try {
      const values = await separateForm.validateFields();
      // Kiểm tra componentType trùng nhau
      const types = values.components.map(x => x.componentType);
      const hasDuplicate = types.length !== new Set(types).size;
      if (hasDuplicate) {
        separateForm.setFields([
          {
            name: ['components'],
            errors: ['Không được chọn trùng loại thành phần máu trong cùng một lần tách']
          }
        ]);
        return;
      }
      // Gọi API createBloodSeparation cho từng thành phần
      for (const item of values.components) {
        const payload = {
          bloodId: separatingBlood.bloodId,
          componentType: item.componentType,
          volumeInML: item.volumeInML,
          expiryDate: item.expiryDate,
        };
        const res = await createBloodSeparation(payload);
        if (!res || res.isSuccess === false) {
          throw new Error(res?.message || 'Tách máu thất bại');
        }
      }
      // Sau khi tách máu thành công, chuyển trạng thái sang PROCESSED
      const resStatus = await changeBloodStatus(separatingBlood.bloodId, "PROCESSED");
      if (resStatus.success) {
        message.success("Đã tách máu và chuyển sang Hoàn thành");
        setSeparateModal(false);
        setSeparatingBlood(null);
        setSeparateList([]);
        separateForm.resetFields();
        fetchData();
      } else {
        message.error(resStatus.error || "Tách máu thành công nhưng đổi trạng thái thất bại");
      }
    } catch (err) {
      if (err.errorFields) return; // Đã có báo lỗi trên form
      message.error(err.message || "Tách máu thất bại");
    }
  };

  const actionButtonStyle = { border: 'none', background: 'none', padding: 0, margin: 0 };

  const columns = [
    { title: "Mã máu", dataIndex: "bloodId", key: "bloodId" },
    { title: "Tên máu", dataIndex: "bloodName", key: "bloodName" },
    { title: "Thể tích (ml)", dataIndex: "volumeInML", key: "volumeInML" },
    { title: "Ngày thu thập", dataIndex: "collectedDate", key: "collectedDate", render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: "Hạn sử dụng", dataIndex: "expiryDate", key: "expiryDate", render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: "Còn sử dụng", dataIndex: "isAvailable", key: "isAvailable", render: v => v ? 'Còn' : 'Hết' },
    { title: "Người hiến", dataIndex: "userName", key: "userName" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <>
          <span className={`px-2 py-1 rounded-full text-xs ${statusColorClass[v] || 'bg-gray-100 text-gray-800'}`} style={{ marginRight: 8, fontWeight: 500, minWidth: 90, display: 'inline-block', textAlign: 'center' }}>
            {statusMap[v] || v}
          </span>
          {v === "PROCESSING" && (
            <Tooltip title="Tách máu">
              <Button
                type="primary"
                size="small"
                style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 'none', marginLeft: -1, borderRadius: 6 }}
                onClick={() => openSeparateModal(record)}
              >
                Tách máu
              </Button>
            </Tooltip>
          )}
        </>
      )
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined style={{ color: '#f59e0b', fontSize: 18 }} />} style={actionButtonStyle} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.bloodId)} okText="Xóa" cancelText="Hủy">
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
        Danh sách máu
      </h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4"
        style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6, fontWeight: 500 }}
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
        okText={editing ? <span style={{ color: '#fff' }}>Cập nhật</span> : <span style={{ color: '#fff' }}>Thêm</span>}
        cancelText="Hủy"
        destroyOnClose
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6 } }}
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
      <Modal
        title="Tách máu thành các thành phần"
        open={separateModal}
        onCancel={() => { setSeparateModal(false); setSeparatingBlood(null); setSeparateList([]); separateForm.resetFields(); }}
        onOk={handleSeparateBlood}
        okText={<span style={{ color: '#fff' }}>Tách máu</span>}
        cancelText="Hủy"
        width={700}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0 } }}
      >
        <AntForm form={separateForm} layout="vertical" initialValues={{ components: separateList }}>
          {separateList.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
              <span style={{ minWidth: 120 }}>Thành phần #{idx + 1}</span>
              <AntForm.Item
                name={['components', idx, 'componentType']}
                rules={[
                  { required: true, message: 'Chọn loại thành phần' },
                  ({ getFieldValue }) => validateUniqueComponentType(idx, getFieldValue)
                ]}
                style={{ marginBottom: 0, width: 140 }}
              >
                <Select
                  options={componentTypeOptions}
                  style={{ width: 140 }}
                  placeholder="Loại thành phần"
                  defaultValue={item.componentType}
                />
              </AntForm.Item>
              <AntForm.Item
                name={['components', idx, 'volumeInML']}
                rules={[
                  { required: true, message: 'Nhập thể tích' },
                  { type: 'number', min: 1, message: 'Thể tích phải lớn hơn 0' }
                ]}
                style={{ marginBottom: 0, width: 120 }}
              >
                <InputNumber min={1} style={{ width: 100 }} placeholder="Thể tích (ml)" />
              </AntForm.Item>
              <AntForm.Item
                name={['components', idx, 'expiryDate']}
                rules={[{ required: true, message: 'Chọn hạn sử dụng' }]}
                style={{ marginBottom: 0, width: 180 }}
              >
                <DatePicker style={{ width: 160 }} format="YYYY-MM-DD" placeholder="Hạn sử dụng" />
              </AntForm.Item>
              {separateList.length > 1 && (
                <Button danger type="text" onClick={() => handleRemoveComponent(idx)}>Xóa</Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddComponent} type="dashed" style={{ marginBottom: 16 }}>
            Thêm thành phần
          </Button>
        </AntForm>
      </Modal>
    </div>
  );
};

export default BloodManagement; 