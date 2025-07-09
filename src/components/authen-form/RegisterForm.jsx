import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";
import api from "../../config/axios";

// Logo với onClick về trang chủ
const Logo = ({ onClick }) => (
  <div className="text-center mb-8 cursor-pointer" onClick={onClick}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/2928/2928921.png"
      alt="LifeStream Logo"
      className="h-20 w-20 mx-auto mb-4"
    />
    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
      Chào mừng đến với LifeStream
    </h1>
    <p className="text-gray-600 mt-2">Tạo tài khoản để tham gia cùng chúng tôi!</p>
  </div>
);

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await api.post("Auth/register", values);
      toast.success("Đăng ký tài khoản thành công!");
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 sm:p-14 w-full max-w-md">
        <Logo onClick={() => navigate("/")} />
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input
              prefix={<FaUser className="mr-3 text-gray-400 text-lg" />}
              placeholder="Tên đăng nhập"
              size="large"
              className="!h-14 !text-base"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<FaEnvelope className="mr-3 text-gray-400 text-lg" />}
              placeholder="Email"
              size="large"
              className="!h-14 !text-base"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<FaLock className="mr-3 text-gray-400 text-lg" />}
              placeholder="Mật khẩu"
              size="large"
              className="!h-14 !text-base"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator: (_, v) =>
                  !v || getFieldValue("password") === v
                    ? Promise.resolve()
                    : Promise.reject("Mật khẩu không khớp!"),
              }),
            ]}
          >
            <Input.Password
              prefix={<FaLock className="mr-3 text-gray-400 text-lg" />}
              placeholder="Xác nhận mật khẩu"
              size="large"
              className="!h-14 !text-base"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full !bg-gradient-to-r !from-red-500 !to-pink-600 !text-white !font-bold hover:!opacity-90 transition-all duration-300 transform hover:scale-105 !h-14 !text-lg !border-none"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
          <div className="text-center">
            <p className="text-gray-700 text-base">
              Đã có tài khoản?{' '}
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-red-600 hover:text-red-500 hover:underline cursor-pointer"
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;