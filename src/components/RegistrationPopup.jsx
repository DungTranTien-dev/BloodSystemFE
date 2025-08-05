import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Radio,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Checkbox,
  AutoComplete,
  Spin,
} from "antd";
import {
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  HeartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import api from "../config/axios";
import { useWatch } from "antd/es/form/Form";


const { Title } = Typography;
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZHVuZ2RldjExMyIsImEiOiJjbWNicWJnd2owYzF2MmtvbHRjbTI3c3Z6In0.GxTBXw4sDwC2RAzMpNPMRA";

const sectionStyle = {
  background: "#f8fafc",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
};

const RegistrationPopup = ({ visible, onClose, onFinish, form, navigate }) => {
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [loadingDisease, setLoadingDisease] = useState(false);
  const [addressOptions, setAddressOptions] = useState([]);
  const [addressFetching, setAddressFetching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const hasDonatedBefore = useWatch("hasDonatedBefore", form);


  useEffect(() => {
    if (visible) {
      setLoadingDisease(true);
      api
        .get("ChronicDisease/all")
        .then((res) => {
          if (res.data?.isSuccess) {
            setChronicDiseases(res.data.result || []);
          } else {
            setChronicDiseases([]);
          }
        })
        .catch(() => setChronicDiseases([]))
        .finally(() => setLoadingDisease(false));
    }
  }, [visible]);

  const handleSearchAddress = async (value) => {
    if (!value) {
      setAddressOptions([]);
      return;
    }
    setAddressFetching(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?country=VN&language=vi&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      setAddressOptions(
        (data.features || []).map((item) => ({
          value: item.place_name,
          label: item.place_name,
          center: item.center,
        }))
      );
    } catch {
      setAddressOptions([]);
    }
    setAddressFetching(false);
  };

  const handleSelectAddress = (value, option) => {
    if (option.center) {
      const [longitude, latitude] = option.center;
      setSelectedLocation({ latitude, longitude });
      form.setFieldsValue({ address: value, latitude, longitude });
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <HeartOutlined style={{ color: "#f43f5e", fontSize: 32 }} />
          <Title level={3} style={{ margin: 0 }}>
            Đăng ký hồ sơ y tế
          </Title>
        </div>
      }
      destroyOnClose
      styles={{ body: { background: "#f1f5f9", borderRadius: 16 } }}
    >
      <Form
        form={form}
        name="medicalRegistration"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
        style={{ marginTop: 12 }}
      >
        {/* Thông tin cá nhân */}
        <div style={sectionStyle}>
          <Title level={5} style={{ color: "#1e293b", marginBottom: 16 }}>
            <UserOutlined style={{ marginRight: 8, color: "#3b82f6" }} />
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
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
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
                  <Radio value="Male">Nam</Radio>
                  <Radio value="Female">Nữ</Radio>
                  <Radio value="Other">Khác</Radio>
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
        <div style={sectionStyle}>
          <Title level={5} style={{ color: "#1e293b", marginBottom: 16 }}>
            <PhoneOutlined style={{ marginRight: 8, color: "#3b82f6" }} />
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
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập Email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Địa chỉ Email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Nhập địa chỉ!" }]}
          >
            <AutoComplete
              options={addressOptions}
              onSearch={handleSearchAddress}
              onSelect={handleSelectAddress}
              notFoundContent={addressFetching ? <Spin size="small" /> : null}
              filterOption={false}
              style={{ width: "100%" }}
            >
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
              />
            </AutoComplete>
          </Form.Item>
          {selectedLocation && (
            <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
              Tọa độ: {selectedLocation.latitude.toFixed(6)},{" "}
              {selectedLocation.longitude.toFixed(6)}
            </div>
          )}
        </div>

        {/* Thông tin sức khỏe */}
        <div style={sectionStyle}>
          <Title level={5} style={{ color: "#1e293b", marginBottom: 16 }}>
            <HeartOutlined style={{ marginRight: 8, color: "#f43f5e" }} />
            Thông tin sức khỏe
          </Title>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="bloodName"
                label="Nhóm máu"
                rules={[{ required: true, message: "Chọn nhóm máu!" }]}
              >
                <Radio.Group>
                  <Radio value="A">A</Radio>
                  <Radio value="B">B</Radio>
                  <Radio value="AB">AB</Radio>
                  <Radio value="O">O</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="hasDonatedBefore"
                label="Đã từng hiến máu?"
                rules={[{ required: true, message: "Chọn thông tin!" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Có</Radio>
                  <Radio value={false}>Chưa</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {hasDonatedBefore === true && (
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastDonorDate"
                  label="Ngày hiến máu gần nhất"
                  rules={[{ required: true, message: "Chọn ngày!" }]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày"
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Col xs={24} md={12}>
            <Form.Item
              name="donationCount"
              label="Số lần hiến máu"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("hasDonatedBefore") === true) {
                      return value > 0
                        ? Promise.resolve()
                        : Promise.reject("Phải lớn hơn 0 nếu đã từng hiến");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              initialValue={0}
              getValueFromEvent={(e) => Number(e.target.value)}
            >
              <Input type="number" min={0} placeholder="Nhập số lần đã hiến máu" />
            </Form.Item>
          </Col>



          <Form.Item
            name="chronicDiseaseIds"
            label="Bệnh lý mãn tính (nếu có)"
            style={{ marginBottom: 8 }}
          >
            {loadingDisease ? (
              <Spin />
            ) : (
              <Checkbox.Group
                onChange={(checkedValues) => {
                  setSelectedDiseases(checkedValues);
                  form.setFieldsValue({ chronicDiseaseIds: checkedValues });
                }}
                value={selectedDiseases}
              >
                <div
                  style={{
                    maxHeight: 120,
                    overflowY: "auto",
                    background: "#fff",
                    borderRadius: 8,
                    padding: "12px 16px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Row gutter={[0, 8]}>
                    {chronicDiseases.map((disease) => (
                      <Col xs={24} sm={12} key={disease.chronicDiseaseId}>
                        <Checkbox value={disease.chronicDiseaseId}>
                          {disease.chronicDiseaseName}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Checkbox.Group>
            )}
          </Form.Item>

          <Form.Item
            name="diseaseDescription"
            label="Mô tả bệnh lý khác"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả bệnh lý khác!" },
              {
                min: 5,
                message: "Mô tả phải có ít nhất 5 ký tự!",
              },
              {
                validator: (_, value) => {
                  if (value && value.trim().length < 5) {
                    return Promise.reject("Không được chỉ nhập khoảng trắng hoặc dưới 5 ký tự!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập ít nhất 5 ký tự mô tả..."
              rows={3}
              style={{ background: "#f9fafb", borderRadius: 8 }}
            />
          </Form.Item>

        </div>

        {/* Hidden tọa độ */}
        <Form.Item name="latitude" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="longitude" hidden>
          <Input />
        </Form.Item>

        {/* Nút */}
        <div className="text-center mt-8">
          <Space size="large" direction="vertical" className="w-full">


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
    </Modal>
  );
};

export default RegistrationPopup;
