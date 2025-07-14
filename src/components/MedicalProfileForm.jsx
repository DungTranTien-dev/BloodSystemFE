// MedicalProfileForm.jsx
import React from 'react';
import { Form, Input, Button, DatePicker, Radio, Row, Col, Typography, Select, Space } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const MedicalProfileForm = ({ form, onFinish, provinces }) => {
  const navigate = useNavigate();


  const handleMedicalProfileSubmit = async (values) => {
  try {
    const createRes = await api.post("/UserMedical", values);

    if (createRes.data?.success) {
      // Tiếp tục gọi API đăng ký hiến máu
      const { selectedHospital } = location.state;
      const registerRes = await api.post("/DonationEvent/register", {
        donationEventId: selectedHospital.id,
      });

      if (registerRes.data?.success) {
        message.success("Đăng ký hiến máu thành công!");
        navigate("/"); // Quay về trang chủ
      } else {
        message.error("Tạo hồ sơ thành công nhưng đăng ký thất bại.");
      }
    } else {
      message.error("Tạo hồ sơ thất bại.");
    }

  } catch (error) {
    console.error("Lỗi tạo hồ sơ:", error);
    message.error("Có lỗi xảy ra khi tạo hồ sơ.");
  }
};


  return (
    <Form
      form={form}
      name="bloodDonationRegistration"
      onFinish={onFinish}
      layout="vertical"
      scrollToFirstError
    >
      {/* Tài khoản */}
      <div className="mb-6">
        <Title level={4} className="mb-4 border-b border-gray-200 pb-2">Thông tin tài khoản</Title>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="email"
              label="Email (dùng để đăng nhập)"
              rules={[
                { required: true, message: "Vui lòng nhập Email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Địa chỉ Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Nhập mật khẩu!" },
                { min: 6, message: "Tối thiểu 6 ký tự!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator: (_, v) =>
                    !v || getFieldValue("password") === v
                      ? Promise.resolve()
                      : Promise.reject("Mật khẩu không khớp!"),
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Cá nhân */}
      <div className="mb-6">
        <Title level={4} className="mb-4 border-b border-gray-200 pb-2">Thông tin cá nhân</Title>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: "Nhập họ tên!" }]}>
              <Input placeholder="Họ và tên" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="birthDate" label="Ngày sinh" rules={[{ required: true, message: "Chọn ngày sinh!" }]}>
              <DatePicker className="w-full" format="DD/MM/YYYY" placeholder="Chọn ngày" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: "Chọn giới tính!" }]}>
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="idNumber"
              label="Số CMND/CCCD"
              rules={[
                { required: true, message: "Nhập số CMND/CCCD!" },
                { pattern: /^[0-9]{9,12}$/, message: "Không hợp lệ!" },
              ]}
            >
              <Input placeholder="CMND hoặc CCCD" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Liên hệ */}
      <div className="mb-6">
        <Title level={4} className="mb-4 border-b border-gray-200 pb-2">Thông tin liên hệ</Title>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Nhập số điện thoại!" },
                { pattern: /^[0-9]{10,11}$/, message: "Không hợp lệ!" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="SĐT" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="province"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: "Chọn tỉnh!" }]}
            >
              <Select placeholder="Chọn tỉnh" showSearch>
                {provinces.map((p) => (
                  <Option key={p} value={p}>{p}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Địa chỉ hiện tại"
              rules={[{ required: true, message: "Nhập địa chỉ!" }]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Số nhà, đường, phường/xã, quận/huyện" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Nút hành động */}
      <div className="text-center mt-8">
        <Space size="large" direction="vertical" className="w-full">
          <Button
            size="large"
            onClick={() => navigate("/login")}
            className="!h-12 !px-8 !bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white !font-bold hover:!opacity-90 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
            icon={<UserOutlined />}
          >
            ← Về Trang Đăng Nhập
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="!h-12 !bg-gradient-to-r !from-red-500 !to-pink-600 !text-white !font-bold hover:!opacity-90 !px-10 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
            icon={<HeartOutlined />}
          >
            Đăng Ký
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default MedicalProfileForm;
