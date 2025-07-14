import React, { useState } from "react";
import { Modal, Form, Input, Typography, Button, Space, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

const { Title } = Typography;

const RegistrationPopup = () => {
  const [visible, setVisible] = useState(true); // Modal mở luôn
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
  try {
    const data = {
      UserName: values.username,
      Email: values.email,
      Password: values.password,
      ConfirmPassword: values.confirm,
    };

    const response = await api.post("Auth/register", data);
    const resData = response.data;

    if (resData.isSuccess) {
      message.success(resData.message || "Đăng ký thành công!");
      setVisible(false);
      form.resetFields();
      navigate("/login"); // điều hướng về trang login
      console.log("UserId mới:", resData.result.userId); // nếu cần dùng userId
    } else {
      message.error(resData.message || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  } catch (error) {
    message.error(
      error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
    );
  }
};



  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      title={<Title level={3}>Đăng ký tài khoản</Title>}
      destroyOnHidden
    >
      <Form
        form={form}
        name="registration"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Xác nhận mật khẩu"
          />
        </Form.Item>

        <div className="text-center mt-8">
          <Space size="large" direction="vertical" className="w-full">
            <Button
              size="large"
              onClick={() => navigate("/login")}
              className="!h-12 !px-8 !bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white !font-bold hover:!opacity-90 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
            >
              ← Về Trang Đăng Nhập
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="!h-12 !bg-gradient-to-r !from-red-500 !to-pink-600 !text-white !font-bold hover:!opacity-90 !px-10 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
            >
              Hoàn tất đăng ký
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default RegistrationPopup;
