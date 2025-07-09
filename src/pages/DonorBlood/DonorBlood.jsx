import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  Card,
  Typography,
  message,
  InputNumber
} from 'antd';
import { Clock, Heart as HeartLucide, MapPin, UserCheck, Droplet, Activity, Smile } from 'lucide-react';
import dayjs from 'dayjs';
import Layout from '../../components/ui/Layout';
import { CalendarOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;
const { Option } = Select;

const DonorBlood = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [operatingHours, setOperatingHours] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedHospital } = location.state || {};

  useEffect(() => {
    if (selectedHospital) {
      const eventDate = dayjs(selectedHospital.startTime);
      form.setFieldsValue({
        donationDate: eventDate,
        hospitalAddress: selectedHospital.location,
      });

      const start = dayjs(selectedHospital.startTime);
      const end = dayjs(selectedHospital.endTime);
      setOperatingHours(`${start.format("HH:mm")} - ${end.format("HH:mm")}`);
    }
  }, [selectedHospital, form]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const componentTypes = [
    { value: 'WHOLE_BLOOD', label: 'Toàn phần (WHOLE_BLOOD)' },
    { value: 'RED_BLOOD_CELL', label: 'Hồng cầu (RED_BLOOD_CELL)' },
    { value: 'PLASMA', label: 'Huyết tương (PLASMA)' },
    { value: 'PLATELET', label: 'Tiểu cầu (PLATELET)' },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    message.loading({ content: 'Đang gửi đăng ký...', key: 'submit' });

    try {
      const donationData = {
        patientName: values.patientName,
        hospitalName: values.hospitalName,
        bloodGroup: values.bloodGroup,
        componentType: values.componentType,
        volumeInML: values.volumeInML,
        reason: values.reason,
        donationDate: values.donationDate.toISOString(),
      };
      const response = await submitDonorBlood(donationData);

      const eventId = selectedHospital?.eventId;
      if (!eventId) {
        throw new Error('Không tìm thấy eventId. Vui lòng thử lại.');
      }
      const regRes = await registerBloodDonation(eventId, donationData);
      if (regRes.success) {
        message.success({ content: 'Đăng ký hiến máu thành công!', key: 'submit', duration: 2 });
        navigate('/donation-confirmation');
      } else {
        throw new Error(regRes.error || 'Đăng ký hiến máu thất bại.');
      }
    } catch (error) {
      message.error({ content: error.message || 'Đăng ký thất bại. Vui lòng thử lại.', key: 'submit', duration: 3 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
              <HeartLucide className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Đăng Ký Hiến Máu
            </h1>
            <p className="text-gray-600 text-lg">
              Chung tay vì cộng đồng, mỗi giọt máu cho đi là một cuộc đời ở lại.
            </p>
            {selectedHospital && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-semibold">
                  Bạn đang đăng ký hiến máu tại: {selectedHospital.title}
                </p>
              </div>
            )}
          </div>

          {/* Form Card */}
          <Card
            className="shadow-2xl border-0 rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'white' }}
          >
            <div className="p-6 lg:p-8">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-6"
                size="large"
                initialValues={{
                  hospitalName: selectedHospital?.title,
                  donationDate: selectedHospital ? dayjs(selectedHospital.startTime) : undefined,
                }}
              >
                {/* Tên bệnh nhân */}
                <Form.Item
                  name="patientName"
                  label={<span className="text-sm font-medium text-red-500">Tên bệnh nhân*</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân!' }]}
                >
                  <Input placeholder="Nhập tên bệnh nhân" />
                </Form.Item>
                {/* Tên bệnh viện */}
                <Form.Item
                  name="hospitalName"
                  label={<span className="text-sm font-medium text-red-500">Tên bệnh viện*</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập tên bệnh viện!' }]}
                >
                  <Input placeholder="Tên bệnh viện" disabled />
                </Form.Item>
                {/* Ngày hiến máu */}
                <Form.Item
                  name="donationDate"
                  label={<span className="text-sm font-medium text-red-500">Ngày hiến máu*</span>}
                  rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" disabled />
                </Form.Item>
                {/* Giờ hoạt động */}
                <Form.Item
                  label={<span className="text-sm font-medium text-red-500">Giờ hoạt động</span>}
                >
                  <Input
                    value={operatingHours}
                    disabled
                    className="h-12"
                    prefix={<Clock size={14} className="mr-2 text-gray-400" />}
                  />
                </Form.Item>
                {/* Nhóm máu */}
                <Form.Item
                  name="bloodGroup"
                  label={<span className="text-sm font-medium text-red-500">Nhóm máu*</span>}
                  rules={[{ required: true, message: 'Vui lòng chọn nhóm máu!' }]}
                >
                  <Select placeholder="Chọn nhóm máu của bạn" className="h-12">
                    {bloodGroups.map(group => (
                      <Option key={group} value={group}>{group}</Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* Loại thành phần máu */}
                <Form.Item
                  name="componentType"
                  label={<span className="text-sm font-medium text-red-500">Loại thành phần máu*</span>}
                  rules={[{ required: true, message: 'Vui lòng chọn loại thành phần máu!' }]}
                >
                  <Select placeholder="Chọn loại thành phần máu" className="h-12">
                    {componentTypes.map(type => (
                      <Option key={type.value} value={type.value}>{type.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* Thể tích (ml) */}
                <Form.Item
                  name="volumeInML"
                  label={<span className="text-sm font-medium text-red-500">Thể tích cần (ml)*</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập thể tích!' }]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập thể tích (ml)"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>
                {/* Lý do */}
                <Form.Item
                  name="reason"
                  label={<span className="text-sm font-medium text-red-500">Lý do*</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
                >
                  <Input.TextArea rows={3} placeholder="Nhập lý do cần truyền máu" />
                </Form.Item>
                {/* Submit Button */}
                <Form.Item className="mb-0 pt-4">
                  <Button type="primary" htmlType="submit" loading={loading} className="w-full h-14 text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', fontSize: '16px' }}>
                    <div className="flex items-center justify-center"><UserCheck className="mr-2" />{loading ? 'Đang gửi...' : 'Xác Nhận Đăng Ký'}</div>
                  </Button>
                </Form.Item>
              </Form>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                <h3 className="text-sm font-semibold text-red-700 mb-2">Lưu ý quan trọng trước khi hiến máu</h3>
                <p className="text-sm text-red-600">Hãy đảm bảo bạn đã ăn nhẹ, uống đủ nước và ngủ đủ giấc trước ngày hiến máu để đảm bảo sức khỏe tốt nhất.</p>
              </div>
            </div>
          </Card>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><HeartLucide className="text-red-500 text-xl" /></div>
              <h3 className="font-semibold text-gray-800 mb-1">Cứu người</h3>
              <p className="text-sm text-gray-600">Một lần hiến máu có thể cứu 3 người</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><Activity className="text-blue-500 text-xl" /></div>
              <h3 className="font-semibold text-gray-800 mb-1">Kiểm tra sức khỏe</h3>
              <p className="text-sm text-gray-600">Được kiểm tra sức khỏe miễn phí</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><Smile className="text-green-500 text-xl" /></div>
              <h3 className="font-semibold text-gray-800 mb-1">Cảm thấy tuyệt vời</h3>
              <p className="text-sm text-gray-600">Làm một việc tốt cho cộng đồng</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonorBlood;