import React from 'react';
import { Button, Input, Form, Checkbox } from "antd";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { jwtDecode } from "jwt-decode";

// THAY ĐỔI 1: Đổi màu chữ của Logo sang màu tối
const Logo = () => (
  <div className="text-center mb-8">
    <img src="https://cdn-icons-png.flaticon.com/512/2928/2928921.png" alt="Logo LifeStream" className="h-20 w-20 mx-auto mb-4" />
    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Chào mừng đến với LifeStream</h1>
    <p className="text-gray-600 mt-2">Đăng nhập để tiếp tục cứu người</p>
  </div>
);

function LoginForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const response = await api.post('Auth/login', values);
      console.log(response);
      dispatch(login(response.data.result));
      localStorage.setItem("token", response.data.result.accessToken);
      const user = response.data.result;
      const redirectTo = location.state?.redirectTo;
      if (redirectTo) {
        navigate(redirectTo);
        toast.success('Đăng nhập thành công!'); 
        return;
      }
      if (user.role === 'ADMIN') {
        navigate('/Dashboard');
        toast.success('Đăng nhập thành công!');
        return;
      } else if (user.role === 'STAFF') {
        navigate('/DashboardS');
        toast.success('Đăng nhập thành công!');
        return;
      } else if (user.role === 'CUSTOMER') {
        navigate('/');
        toast.success('Đăng nhập thành công!');
        return;
      } else {
        navigate('/');
        toast.success('Đăng nhập thành công!');
        return;
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* THAY ĐỔI 2: Nền form đổi thành màu trắng và có bóng đổ */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 sm:p-14 w-full max-w-md">
        <Logo />
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
              { type: 'email', message: "Email không hợp lệ!" }
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
                onClick={() => navigate('/forgot-password')}
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
              Chưa có tài khoản?{" "}
              <span
                onClick={() => navigate('/register')}
                className="font-medium text-red-600 hover:text-red-500 hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </span>
            </p>
          </div>

          {/* Nếu cần demo tài khoản có thể bật đoạn sau */}
          {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tài khoản demo:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>Admin:</strong> admin@lifestream.com / admin123
              </div>
              <div>
                <strong>User:</strong> user@lifestream.com / user123
              </div>
            </div>
          </div> */}
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
