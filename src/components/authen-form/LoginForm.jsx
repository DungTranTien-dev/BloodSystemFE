import React from "react";
import { Button, Input, Form, Checkbox } from "antd";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
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
    <p className="text-gray-600 mt-2">Đăng nhập để tiếp tục cứu người</p>
  </div>
);

function LoginForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();

  const onFinish = async (values) => {
    try {
      const response = await api.post("auth/login", values);
      dispatch(login(response.data));
      localStorage.setItem("token", response.data.result.accessToken);
      const user = response.data.result.user;
      // if (user.role === 'ADMIN') {
      //   navigate('/admin');
      //   toast.success('Đăng nhập thành công!');
      //   return;
      // } else if (user.role === 'STAFF') {
      //   navigate('/DashboardS');
      //   toast.success('Đăng nhập thành công!');
      //   return;
      // } else if (user.role === 'CUSTOMER') {
      //   navigate('/');
      //   toast.success('Đăng nhập thành công!');
      //   return;
      // } else {
      //   navigate('/');
      //   toast.success('Đăng nhập thành công!');
      //   return;
      // }
      navigate('/');
    } catch (e) {
      toast.error(e.response?.data || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 sm:p-14 w-full max-w-md">
        <Logo onClick={() => navigate("/")} />
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<FaUser className="mr-3 text-gray-400 text-lg" />}
              placeholder="Email"
              size="large"
              className="!h-14 !text-base"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<FaLock className="mr-3 text-gray-400 text-lg" />}
              placeholder="Mật khẩu"
              size="large"
              className="!h-14 !text-base"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  <span className="text-base text-gray-700">Ghi nhớ đăng nhập</span>
                </Checkbox>
              </Form.Item>
              <span
                className="font-medium text-red-600 hover:text-red-500 hover:underline cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                Quên mật khẩu?
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full !bg-gradient-to-r !from-red-500 !to-pink-600 !text-white !font-bold hover:!opacity-90 transition-all duration-300 transform hover:scale-105 !h-14 !text-lg !border-none"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="text-center">
            <p className="text-gray-700 text-base">
              Chưa có tài khoản?{' '}
              <span
                onClick={() => navigate("/register")}
                className="font-medium text-red-600 hover:text-red-500 hover:underline cursor-pointer"
              >
                Đăng ký
              </span>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default LoginForm;
