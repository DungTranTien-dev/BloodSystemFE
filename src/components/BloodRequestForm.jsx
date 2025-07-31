import React, { useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const unitOptions = [
  '1 Đơn vị (450ml)', '2 Đơn vị (900ml)', '3 Đơn vị (1350ml)',
  '4 Đơn vị (1800ml)', '5+ Đơn vị (Liên hệ chi tiết)'
];
const componentTypes = [
  { label: 'Máu toàn phần', value: 'WHOLE_BLOOD' },
  { label: 'Hồng cầu', value: 'RED_BLOOD_CELL' },
  { label: 'Huyết tương', value: 'PLASMA' },
  { label: 'Tiểu cầu', value: 'PLATELET' },
  { label: 'Đang xử lý', value: 'IN_PROGESS' }
];

const BloodRequestForm = ({ onSubmit, loading, form }) => {
  useEffect(() => {
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
        <Button
          htmlType="submit"
          block
          loading={loading}
          className="!bg-gradient-to-r from-red-500 to-pink-500 !text-white font-semibold rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition"
        >
          Gửi yêu cầu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BloodRequestForm;
