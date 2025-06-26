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
import { getHospitalsByDate } from '../../service/hospitalApi';
import { CalendarOutlined } from '@ant-design/icons';
import { submitDonationRequest } from '../../service/donationApi';

const { Text, Paragraph } = Typography;
const { Option } = Select;

const DonorBlood = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [availableHospitals, setAvailableHospitals] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedHospital = location.state?.selectedHospital;
  const availableDates = location.state?.availableDates || [];

  const loadHospitalsForDate = async (date) => {
    if (!date) return;
    const dateString = dayjs(date).format('YYYY-MM-DD');
    try {
      const response = await getHospitalsByDate(dateString);
      if (response.success) {
        setAvailableHospitals(response.data);
        const hospital = response.data.find(h => h.id === selectedHospital?.id);
        if (hospital) {
          setTimeSlots(hospital.availableSlots);
        }
      }
    } catch (error) {
      console.error('Error loading hospitals:', error);
      message.error('Không thể tải danh sách bệnh viện.');
    }
  };

  useEffect(() => {
    if (selectedHospital && availableDates.length > 0) {
      const firstAvailableDate = dayjs(availableDates[0].date);
      form.setFieldsValue({
        donationDate: firstAvailableDate,
        hospitalAddress: selectedHospital.address,
      });
      loadHospitalsForDate(firstAvailableDate);
    }
  }, [selectedHospital, availableDates, form]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleDateChange = (date) => {
    form.setFieldsValue({ hospitalAddress: undefined, donationTime: undefined });
    setTimeSlots([]);
    if (date) {
      loadHospitalsForDate(date);
    }
  };
  
  const handleHospitalAddressChange = (address) => {
    const selected = availableHospitals.find(h => h.address === address);
    if (selected) {
      setTimeSlots(selected.availableSlots);
      form.setFieldsValue({ donationTime: undefined });
    }
  };

    const onFinish = async (values) => {
    setLoading(true);
    message.loading({ content: 'Đang gửi đăng ký...', key: 'submit' });

    try {
      // Dữ liệu đầy đủ để gửi đi
      const donationData = {
        ...values,
        donationDate: values.donationDate.toISOString(),
        medicalHistory: values.medicalHistory || 'Không có',
        donationCount: values.donationCount || 0,
      };

      // Gọi API để lưu dữ liệu
      const response = await submitDonationRequest(donationData);

      if (response.success) {
        message.success({ content: 'Yêu cầu của bạn đã được gửi thành công!', key: 'submit', duration: 2 });
        
        // Điều hướng đến trang thông báo
        setTimeout(() => {
          navigate('/donation-confirmation');
        }, 1000);
      } else {
        throw new Error(response.error || 'Đăng ký thất bại.');
      }

    } catch (error) {
      message.error({ content: error.message || 'Đăng ký thất bại. Vui lòng thử lại.', key: 'submit', duration: 3 });
    } finally {
      setLoading(false);
    }
  };

  const disabledDate = (current) => {
    if (!current) return false;
    const today = dayjs().startOf('day');
    if (current < today) return true;
    if (availableDates.length > 0) {
      const availableDateStrings = availableDates.map(d => dayjs(d.date).format('YYYY-MM-DD'));
      return !availableDateStrings.includes(current.format('YYYY-MM-DD'));
    }
    return false;
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
                  Bạn đang đăng ký hiến máu tại: {selectedHospital.name}
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
              >
                {/* Tuổi & Cân nặng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item name="age" label={<span className="text-sm font-medium text-red-500">Tuổi của bạn*</span>} rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }, { type: 'number', min: 18, max: 60, message: 'Tuổi hiến máu phải từ 18 đến 60!' }]}>
                    <InputNumber type="number" placeholder="18-60" className="w-full h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" style={{ fontSize: '16px', width: '100%' }}/>
                  </Form.Item>
                  <Form.Item name="weight" label={<span className="text-sm font-medium text-red-500">Cân nặng (kg)*</span>} rules={[{ required: true, message: 'Vui lòng nhập cân nặng!' }, { type: 'number', min: 45, message: 'Cân nặng tối thiểu là 45kg!' }]}>
                    <InputNumber type="number" placeholder="Tối thiểu 45kg" className="w-full h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" style={{ fontSize: '16px', width: '100%' }} />
                  </Form.Item>
                </div>
                
                {/* Nhóm máu */}
                <Form.Item name="bloodGroup" label={<span className="text-sm font-medium text-red-500">Nhóm máu*</span>} rules={[{ required: true, message: 'Vui lòng chọn nhóm máu!' }]}>
                  <Select placeholder="Chọn nhóm máu của bạn" className="h-12" dropdownStyle={{ borderRadius: '8px' }}>
                    {bloodGroups.map(group => (
                      <Option key={group} value={group}>
                        <div className="flex items-center"><Droplet className="text-red-500 mr-2" size={16}/>{group}</div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Ngày hiến máu */}
                <Form.Item name="donationDate" label={<span className="text-sm font-medium text-red-500">Ngày dự kiến hiến máu*</span>} rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
                  <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày bạn muốn hiến máu" format="DD/MM/YYYY" disabledDate={disabledDate} onChange={handleDateChange} className="h-12 rounded-lg" suffixIcon={<CalendarOutlined />} />
                </Form.Item>
                
                {/* Địa chỉ & Giờ hiến máu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item name="hospitalAddress" label={<span className="text-sm font-medium text-red-500">Địa chỉ bệnh viện*</span>} rules={[{ required: true, message: 'Vui lòng chọn bệnh viện!' }]}>
                    <Select placeholder="Chọn địa chỉ" onChange={handleHospitalAddressChange} disabled={!form.getFieldValue('donationDate')} className="h-12" dropdownStyle={{ borderRadius: '8px' }}>
                      {availableHospitals.map(hospital => (<Option key={hospital.id} value={hospital.address}><Text strong>{hospital.name}</Text></Option>))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="donationTime" label={<span className="text-sm font-medium text-red-500">Giờ hiến máu*</span>} rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}>
                    <Select placeholder="Chọn khung giờ" disabled={timeSlots.length === 0} className="h-12" dropdownStyle={{ borderRadius: '8px' }}>
                      {timeSlots.map(slot => (<Option key={slot} value={slot}><div className="flex items-center"><Clock size={14} className="mr-2"/>{slot}</div></Option>))}
                    </Select>
                  </Form.Item>
                </div>

                {/* Tiền sử hiến máu */}
                <Form.Item name="previousDonations" label={<span className="text-sm font-medium text-red-500">Bạn đã từng hiến máu chưa?*</span>} rules={[{ required: true, message: 'Vui lòng chọn!' }]}>
                  <Select placeholder="Chọn..." className="h-12" dropdownStyle={{ borderRadius: '8px' }}>
                    <Option value="no">Chưa bao giờ</Option>
                    <Option value="yes">Đã hiến máu</Option>
                  </Select>
                </Form.Item>

                <Form.Item noStyle shouldUpdate={(prev, curr) => prev.previousDonations !== curr.previousDonations}>
                  {({ getFieldValue }) => getFieldValue('previousDonations') === 'yes' ? (
                    <Form.Item name="donationCount" label={<span className="text-sm font-medium text-red-500">Bạn đã hiến máu bao nhiêu lần?*</span>} rules={[{ required: true, message: 'Vui lòng nhập số lần!' }]}>
                      <InputNumber placeholder="Nhập số lần" className="w-full h-12 rounded-lg" style={{ fontSize: '16px', width: '100%' }} min={1} />
                    </Form.Item>
                  ) : null}
                </Form.Item>

                {/* Tiền sử bệnh lý */}
                <Form.Item name="medicalHistory" label={<span className="text-sm font-medium text-red-500">Tiền sử bệnh lý (nếu có)</span>}>
                  <Input.TextArea rows={3} placeholder="Liệt kê các bệnh mãn tính hoặc tình trạng sức khỏe đặc biệt..." className="rounded-lg" />
                </Form.Item>
                
                {/* Cam kết */}
                <Form.Item name="agreedToTerms" valuePropName="checked" rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các điều khoản!')) }]}>
                  <Checkbox><span className="font-semibold text-red-500">Tôi đồng ý với các điều khoản và điều kiện.</span></Checkbox>
                </Form.Item>
                <Paragraph type="secondary" className="-mt-4 ml-6 text-xs">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Tôi hiểu rằng việc hiến máu là hoàn toàn tự nguyện.</li>
                    <li>Tôi cam kết đã khai báo thông tin y tế trung thực.</li>
                  </ul>
                </Paragraph>

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