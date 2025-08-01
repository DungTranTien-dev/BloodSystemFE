import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Spin, DatePicker, Form as AntForm, InputNumber, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ExperimentOutlined } from "@ant-design/icons";
import { getBloodList, addBlood, updateBlood, deleteBlood, changeBloodStatus } from "../../service/bloodApi";
import { createBloodSeparation } from '../../service/bloodSeparationApi';
import dayjs from "dayjs";

const { Option } = Select;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const componentTypes = ["To├án phß║ºn", "Hß╗ông cß║ºu", "Tiß╗âu cß║ºu", "Huyß║┐t t╞░╞íng"];

const statusMap = {
  UNPROCESSED: "Ch╞░a xß╗¡ l├¡",
  PROCESSING: "─Éang xß╗¡ l├¡",
  PROCESSED: "Ho├án th├ánh",
  ERROR: "Lß╗ùi"
};
const statusOrder = ["UNPROCESSED", "PROCESSING", "PROCESSED"];

const statusColorClass = {
  UNPROCESSED: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-green-100 text-green-800',
  PROCESSED: 'bg-blue-100 text-blue-800',
  ERROR: 'bg-red-100 text-red-800',
};

const componentTypeOptions = [
  { label: "Hß╗ông cß║ºu", value: 0 },
  { label: "Tiß╗âu cß║ºu", value: 1 },
  { label: "Huyß║┐t t╞░╞íng", value: 2 },
  { label: "Bß║ích cß║ºu", value: 3 },
];

const validateUniqueComponentType = (idx, getFieldValue) => ({
  validator(_, value) {
    const all = getFieldValue(['components']) || [];
    if (all.filter((item, i) => item && item.componentType === value && i !== idx).length > 0) {
      return Promise.reject(new Error('Kh├┤ng ─æ╞░ß╗úc chß╗ìn tr├╣ng loß║íi th├ánh phß║ºn m├íu!'));
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
    else message.error(res.message || "Lß║Ñy dß╗» liß╗çu thß║Ñt bß║íi");
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
      message.success("X├│a th├ánh c├┤ng");
      fetchData();
    } else message.error(res.error || "X├│a thß║Ñt bß║íi");
  };

  const handleChangeStatus = async (record) => {
    // Chuyß╗ân trß║íng th├íi sang gi├í trß╗ï tiß║┐p theo trong statusOrder
    const idx = statusOrder.indexOf(record.status);
    const newStatus = statusOrder[(idx + 1) % statusOrder.length];
    const res = await changeBloodStatus(record.bloodId, newStatus);
    if (res.success) {
      message.success("─Éß╗òi trß║íng th├íi th├ánh c├┤ng");
      fetchData();
    } else {
      message.error(res.error || "─Éß╗òi trß║íng th├íi thß║Ñt bß║íi");
    }
  };

  const handleApprove = async (record) => {
    if (record.status !== "PROCESSING") return;
    const res = await changeBloodStatus(record.bloodId, "PROCESSED");
    if (res.success) {
      message.success("─É├ú duyß╗çt th├ánh Ho├án th├ánh");
      fetchData();
    } else {
      message.error(res.error || "Duyß╗çt thß║Ñt bß║íi");
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
        message.success(editing ? "Cß║¡p nhß║¡t th├ánh c├┤ng" : "Th├¬m th├ánh c├┤ng");
        setModalVisible(false);
        fetchData();
      } else {
        message.error(res.message || "L╞░u thß║Ñt bß║íi");
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
      // Kiß╗âm tra componentType tr├╣ng nhau
      const types = values.components.map(x => x.componentType);
      const hasDuplicate = types.length !== new Set(types).size;
      if (hasDuplicate) {
        separateForm.setFields([
          {
            name: ['components'],
            errors: ['Kh├┤ng ─æ╞░ß╗úc chß╗ìn tr├╣ng loß║íi th├ánh phß║ºn m├íu trong c├╣ng mß╗Öt lß║ºn t├ích']
          }
        ]);
        return;
      }
      // Gß╗ìi API createBloodSeparation cho tß╗½ng th├ánh phß║ºn
      for (const item of values.components) {
        const payload = {
          bloodId: separatingBlood.bloodId,
          componentType: item.componentType,
          volumeInML: item.volumeInML,
          expiryDate: item.expiryDate,
        };
        const res = await createBloodSeparation(payload);
        if (!res || res.isSuccess === false) {
          throw new Error(res?.message || 'T├ích m├íu thß║Ñt bß║íi');
        }
      }
      // Sau khi t├ích m├íu th├ánh c├┤ng, chuyß╗ân trß║íng th├íi sang PROCESSED
      const resStatus = await changeBloodStatus(separatingBlood.bloodId, "PROCESSED");
      if (resStatus.success) {
        message.success("─É├ú t├ích m├íu v├á chuyß╗ân sang Ho├án th├ánh");
        setSeparateModal(false);
        setSeparatingBlood(null);
        setSeparateList([]);
        separateForm.resetFields();
        fetchData();
      } else {
        message.error(resStatus.error || "T├ích m├íu th├ánh c├┤ng nh╞░ng ─æß╗òi trß║íng th├íi thß║Ñt bß║íi");
      }
    } catch (err) {
      if (err.errorFields) return; // ─É├ú c├│ b├ío lß╗ùi tr├¬n form
      message.error(err.message || "T├ích m├íu thß║Ñt bß║íi");
    }
  };

  const actionButtonStyle = { border: 'none', background: 'none', padding: 0, margin: 0 };

  const columns = [
    { title: "M├ú m├íu", dataIndex: "bloodId", key: "bloodId" },
    { title: "T├¬n m├íu", dataIndex: "bloodName", key: "bloodName" },
    { title: "Thß╗â t├¡ch (ml)", dataIndex: "volumeInML", key: "volumeInML" },
    { title: "Ng├áy thu thß║¡p", dataIndex: "collectedDate", key: "collectedDate", render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: "Hß║ín sß╗¡ dß╗Ñng", dataIndex: "expiryDate", key: "expiryDate", render: v => v ? new Date(v).toLocaleString('vi-VN') : '' },
    { title: "C├▓n sß╗¡ dß╗Ñng", dataIndex: "isAvailable", key: "isAvailable", render: v => v ? 'C├▓n' : 'Hß║┐t' },
    { title: "Ng╞░ß╗¥i hiß║┐n", dataIndex: "userName", key: "userName" },
    {
      title: "Trß║íng th├íi",
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <>
          <span className={`px-2 py-1 rounded-full text-xs ${statusColorClass[v] || 'bg-gray-100 text-gray-800'}`} style={{ marginRight: 8, fontWeight: 500, minWidth: 90, display: 'inline-block', textAlign: 'center' }}>
            {statusMap[v] || v}
          </span>
          {v === "PROCESSING" && (
            <Tooltip title="T├ích m├íu">
              <Button
                type="primary"
                size="small"
                style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 'none', marginLeft: -1, borderRadius: 6 }}
                onClick={() => openSeparateModal(record)}
              >
                T├ích m├íu
              </Button>
            </Tooltip>
          )}
        </>
      )
    },
    {
      title: "Thao t├íc",
      key: "action",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title="Chß╗ënh sß╗¡a">
            <Button icon={<EditOutlined style={{ color: '#f59e0b', fontSize: 18 }} />} style={actionButtonStyle} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="X├│a">
            <Popconfirm title="X├íc nhß║¡n x├│a?" onConfirm={() => handleDelete(record.bloodId)} okText="X├│a" cancelText="Hß╗ºy">
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
        Danh s├ích m├íu
      </h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4"
        style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6, fontWeight: 500 }}
        onClick={handleAdd}
      >
        Th├¬m m├íu
      </Button>
      <Button onClick={fetchData} className="mb-4 ml-2" icon={<ReloadOutlined />}>L├ám mß╗¢i</Button>
      <Spin spinning={loading} tip="─Éang tß║úi dß╗» liß╗çu...">
        <Table columns={columns} dataSource={data} rowKey="bloodId" bordered pagination={{ pageSize: 8 }} />
      </Spin>
      <Modal
        title={editing ? "Cß║¡p nhß║¡t th├┤ng tin m├íu" : "Th├¬m m├íu mß╗¢i"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        okText={editing ? <span style={{ color: '#fff' }}>Cß║¡p nhß║¡t</span> : <span style={{ color: '#fff' }}>Th├¬m</span>}
        cancelText="Hß╗ºy"
        destroyOnClose
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0, borderRadius: 6 } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="bloodId" label="ID m├íu">
            <Input disabled />
          </Form.Item>
          <Form.Item name="bloodName" label="T├¬n m├íu" rules={[{ required: true, message: "Nhß║¡p t├¬n m├íu" }]}> <Input /> </Form.Item>
          <Form.Item name="volumeInML" label="Thß╗â t├¡ch (ml)" rules={[{ required: true, message: "Nhß║¡p thß╗â t├¡ch" }]}> <Input type="number" min={1} /> </Form.Item>
          <Form.Item name="collectedDate" label="Ng├áy thu thß║¡p" rules={[{ required: true, message: "Chß╗ìn ng├áy thu thß║¡p" }]}> <Input type="date" /> </Form.Item>
          <Form.Item name="expiryDate" label="Hß║ín sß╗¡ dß╗Ñng" rules={[{ required: true, message: "Chß╗ìn hß║ín sß╗¡ dß╗Ñng" }]}> <Input type="date" /> </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="T├ích m├íu th├ánh c├íc th├ánh phß║ºn"
        open={separateModal}
        onCancel={() => { setSeparateModal(false); setSeparatingBlood(null); setSeparateList([]); separateForm.resetFields(); }}
        onOk={handleSeparateBlood}
        okText={<span style={{ color: '#fff' }}>T├ích m├íu</span>}
        cancelText="Hß╗ºy"
        width={700}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', border: 0 } }}
      >
        <AntForm form={separateForm} layout="vertical" initialValues={{ components: separateList }}>
          {separateList.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
              <span style={{ minWidth: 120 }}>Th├ánh phß║ºn #{idx + 1}</span>
              <AntForm.Item
                name={['components', idx, 'componentType']}
                rules={[
                  { required: true, message: 'Chß╗ìn loß║íi th├ánh phß║ºn' },
                  ({ getFieldValue }) => validateUniqueComponentType(idx, getFieldValue)
                ]}
                style={{ marginBottom: 0, width: 140 }}
              >
                <Select
                  options={componentTypeOptions}
                  style={{ width: 140 }}
                  placeholder="Loß║íi th├ánh phß║ºn"
                  defaultValue={item.componentType}
                />
              </AntForm.Item>
              <AntForm.Item
                name={['components', idx, 'volumeInML']}
                rules={[
                  { required: true, message: 'Nhß║¡p thß╗â t├¡ch' },
                  { type: 'number', min: 1, message: 'Thß╗â t├¡ch phß║úi lß╗¢n h╞ín 0' }
                ]}
                style={{ marginBottom: 0, width: 120 }}
              >
                <InputNumber min={1} style={{ width: 100 }} placeholder="Thß╗â t├¡ch (ml)" />
              </AntForm.Item>
              <AntForm.Item
                name={['components', idx, 'expiryDate']}
                rules={[{ required: true, message: 'Chß╗ìn hß║ín sß╗¡ dß╗Ñng' }]}
                style={{ marginBottom: 0, width: 180 }}
              >
                <DatePicker style={{ width: 160 }} format="YYYY-MM-DD" placeholder="Hß║ín sß╗¡ dß╗Ñng" />
              </AntForm.Item>
              {separateList.length > 1 && (
                <Button danger type="text" onClick={() => handleRemoveComponent(idx)}>X├│a</Button>
              )}
            </div>
          ))}
          <Button onClick={handleAddComponent} type="dashed" style={{ marginBottom: 16 }}>
            Th├¬m th├ánh phß║ºn
          </Button>
        </AntForm>
      </Modal>
    </div>
  );
};

export default BloodManagement; 
