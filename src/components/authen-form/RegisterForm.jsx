import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
  Row,
  Col,
  Space,
  Typography,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const { Title } = Typography;
const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await axios.post("http://localhost:5101/api/auth/register", values);
      toast.success("Successfully create new account!");
      Navigate("/login");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data);
    }
  };

  const provinces = [
    "Hà Nội", "TP. Hồ Chí Minh", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
  ];

  return (
    <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 md:p-12">
      <div className="text-center bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-2xl -mt-8 md:-mt-12 -mx-8 md:-mx-12 mb-8 px-8 py-5">
        <HeartOutlined className="text-6xl mb-3" />
        <Title level={2} className="!text-white tracking-tight text-5xl">
          Đăng Ký tài khoản
        </Title>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-800 font-semibold">Đã có tài khoản?</p>
            <p className="text-blue-600 text-sm">
              Đăng nhập ngay để truy cập hệ thống
            </p>
          </div>
          <Button
            type="primary"
            onClick={() => navigate("/login")}
            className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
            icon={<UserOutlined />}
          >
            Đăng Nhập
          </Button>
        </div>
      </div>

      <Form
        form={form}
        name="bloodDonationRegistration"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <div className="mb-6">
          <Title level={4} className="mb-4 border-b border-gray-200 pb-2">
            Thông tin tài khoản
          </Title>
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
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Địa chỉ Email"
                />
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
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                />
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
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="mb-6">
          <Title level={4} className="mb-4 border-b border-gray-200 pb-2">
            Thông tin cá nhân
          </Title>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: "Nhập họ tên!" }]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="birthDate"
                label="Ngày sinh"
                rules={[{ required: true, message: "Chọn ngày sinh!" }]}
              >
                <DatePicker
                  className="w-full"
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Chọn giới tính!" }]}
              >
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
        <div className="mb-6">
          <Title level={4} className="mb-4 border-b border-gray-200 pb-2">
            Thông tin liên hệ
          </Title>
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
                    <Option key={p} value={p}>
                      {p}
                    </Option>
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
                <Input
                  prefix={<HomeOutlined />}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        
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
    </div>
  );
};

export default RegisterForm;