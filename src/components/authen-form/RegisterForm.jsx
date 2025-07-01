import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Radio,
  Select,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Checkbox
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const RegistrationPopup = ({
  visible,
  onClose,
  onFinish,
  form,
  provinces,
  chronicDiseases = [], // Nhận danh sách bệnh lý từ cha
  navigate,
}) => (
  <Modal
    open={visible}
    onCancel={onClose}
    footer={null}
    centered
    width={900}
    title={<Title level={3}>Đăng ký hồ sơ y tế</Title>}
    destroyOnClose
  >
    <Form
      form={form}
      name="medicalRegistration"
      onFinish={onFinish}
      layout="vertical"
      scrollToFirstError
    >
      {/* Thông tin cá nhân */}
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

      {/* Thông tin liên hệ */}
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

      {/* Thông tin sức khỏe */}
      <div className="mb-6">
        <Title level={4} className="mb-4 border-b border-gray-200 pb-2">
          Thông tin sức khỏe
        </Title>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="bloodName"
              label="Nhóm máu"
              rules={[{ required: true, message: "Chọn nhóm máu!" }]}
            >
              <Select placeholder="Chọn nhóm máu">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="AB">AB</Option>
                <Option value="O">O</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="hasDonatedBefore"
              label="Đã từng hiến máu?"
              valuePropName="checked"
              initialValue={false}
            >
              <Radio.Group>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Chưa</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="chronicDiseaseIds"
          label="Bệnh lý mãn tính (nếu có)"
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {chronicDiseases.map(disease => (
                <Col span={24} key={disease.chronicDiseaseId}>
                  <Checkbox value={disease.chronicDiseaseId}>
                    {disease.chronicDiseaseName}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        
        <Form.Item
          name="diseaseDescription"
          label="Mô tả bệnh lý khác (nếu có)"
        >
          <Input.TextArea 
            placeholder="Mô tả chi tiết các bệnh lý khác..." 
            rows={3}
          />
        </Form.Item>
      </div>

      {/* Nút đăng ký */}
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
            Hoàn tất đăng ký
          </Button>
        </Space>
      </div>
    </Form>
  </Modal>
);

export default RegistrationPopup;
