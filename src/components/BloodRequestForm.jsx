import React, { useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

// Nhóm máu
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Số đơn vị máu
const unitOptions = [
  '1 Đơn vị (450ml)', '2 Đơn vị (900ml)', '3 Đơn vị (1350ml)',
  '4 Đơn vị (1800ml)', '5+ Đơn vị (Liên hệ chi tiết)'
];

// Loại thành phần máu
const componentTypes = [
  { label: 'Máu toàn phần', value: 'WHOLE_BLOOD' },
  { label: 'Hồng cầu', value: 'RED_BLOOD_CELL' },
  { label: 'Huyết tương', value: 'PLASMA' },
  { label: 'Tiểu cầu', value: 'PLATELET' },
  { label: 'Đang xử lý', value: 'IN_PROGESS' }
];

const BloodRequestForm = ({ onSubmit, loading, form }) => {
  useEffect(() => {
    // ✅ Gán mặc định tên bệnh viện
    form.setFieldsValue({ hospitalName: 'MyHospital' });
  }, [form]);

  return (
    <Form layout="vertical" onFinish={onSubmit} form={form}>
      <Form.Item
        name="patientName"
        label="Tên bệnh nhân*"
        rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân' }]}
      >
        <Input placeholder="Nhập tên bệnh nhân" />
      </Form.Item>

      {/* ✅ Trường tên bệnh viện bị ẩn nhưng vẫn gửi cùng form */}
      <Form.Item name="hospitalName" hidden>
        <Input />
      </Form.Item>

      <Form.Item
        name="bloodGroup"
        label="Nhóm máu*"
        rules={[{ required: true, message: 'Vui lòng chọn nhóm máu' }]}
      >
        <Select placeholder="Chọn nhóm máu">
          {bloodGroups.map(bg => (
            <Option key={bg} value={bg}>{bg}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="componentType"
        label="Thành phần máu*"
        rules={[{ required: true, message: 'Vui lòng chọn thành phần máu' }]}
      >
        <Select placeholder="Chọn thành phần máu">
          {componentTypes.map(({ label, value }) => (
            <Option key={value} value={value}>{label}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="units"
        label="Lượng máu cần*"
        rules={[{ required: true, message: 'Vui lòng chọn số lượng máu cần' }]}
      >
        <Select placeholder="Chọn số đơn vị máu">
          {unitOptions.map(unit => (
            <Option key={unit} value={unit}>{unit}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="reason"
        label="Lý do*"
        rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
      >
        <Input placeholder="Ví dụ: tai nạn, phẫu thuật..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Gửi yêu cầu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BloodRequestForm;
