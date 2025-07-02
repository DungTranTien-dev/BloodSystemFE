import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Card, DatePicker } from 'antd';
import { FaDroplet, FaHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/ui/Layout';
import dayjs from 'dayjs';
import { Heart as HeartLucide, Droplet } from 'lucide-react';
import { requestBlood } from '../../service/bloodRequestApi';

const { Option } = Select;

const BloodRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const componentTypes = [
    'Toàn phần', 'Hồng cầu', 'Tiểu cầu', 'Huyết tương'
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      const payload = {
        patientName: values.patientName,
        hospitalName: values.hospitalName,
        bloodGroup: values.bloodGroup,
        componentType: values.componentType,
        volumeInML: Number(values.volumeInML),
        reason: values.reason,
        requestedDate: values.requestedDate.toISOString(),
        requestedByUserId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // demo user id
      };
      const res = await requestBlood(payload);
      if (res.success) {
        message.success('Yêu cầu cần máu đã được gửi thành công!');
        form.resetFields();
        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error(res.error || 'Gửi yêu cầu cần máu thất bại');
      }
    } catch (err) {
      message.error(err.message || 'Gửi yêu cầu cần máu thất bại');
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
              <Droplet className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Yêu Cầu Cần Máu
            </h1>
            <p className="text-gray-600 text-lg">
              Gửi yêu cầu cần máu cho bệnh nhân cần giúp đỡ
            </p>
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
                onFinish={handleSubmit}
                className="space-y-6"
                size="large"
              >
                {/* Patient Name */}
                <Form.Item
                  name="patientName"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Tên bệnh nhân*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên bệnh nhân' },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên bệnh nhân"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Hospital Name */}
                <Form.Item
                  name="hospitalName"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Tên bệnh viện*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên bệnh viện' },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên bệnh viện"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Blood Group */}
                <Form.Item
                  name="bloodGroup"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Nhóm máu*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng chọn nhóm máu' },
                  ]}
                >
                  <Select
                    placeholder="Chọn nhóm máu"
                    className="h-12"
                    style={{ fontSize: '16px' }}
                    dropdownStyle={{ borderRadius: '8px' }}
                  >
                    {bloodGroups.map(group => (
                      <Option key={group} value={group}>
                        <div className="flex items-center">
                          <FaDroplet className="text-red-500 mr-2" />
                          {group}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Component Type */}
                <Form.Item
                  name="componentType"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Thành phần máu*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng chọn thành phần máu' },
                  ]}
                >
                  <Select
                    placeholder="Chọn thành phần máu"
                    className="h-12"
                    style={{ fontSize: '16px' }}
                    dropdownStyle={{ borderRadius: '8px' }}
                  >
                    {componentTypes.map(type => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Volume In ML */}
                <Form.Item
                  name="volumeInML"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Thể tích cần (ml)*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng nhập thể tích' },
                    { type: 'number', min: 50, message: 'Tối thiểu 50ml' },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập thể tích (ml)"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Reason */}
                <Form.Item
                  name="reason"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Lý do cần máu*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng nhập lý do' },
                  ]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập lý do cần máu"
                    className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Requested Date */}
                <Form.Item
                  name="requestedDate"
                  label={
                    <span className="text-sm font-medium text-red-500">
                      Ngày cần máu*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng chọn ngày' },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                    className="h-12 rounded-lg"
                    disabledDate={d => d && d < dayjs().startOf('day')}
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="mb-0 pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-14 text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)',
                      fontSize: '16px'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <HeartLucide className="mr-2" />
                      {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu Cần Máu'}
                    </div>
                  </Button>
                </Form.Item>
              </Form>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                <h3 className="text-sm font-semibold text-red-700 mb-2">
                  Emergency Contact Information
                </h3>
                <p className="text-sm text-red-600">
                  For urgent blood requests, please call our 24/7 hotline: 
                  <span className="font-bold ml-1">1800-BLOOD-HELP</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaHeart className="text-red-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Save Lives</h3>
              <p className="text-sm text-gray-600">One donation can save up to 3 lives</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaDroplet className="text-blue-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Quick Process</h3>
              <p className="text-sm text-gray-600">Fast and safe donation process</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaHeart className="text-green-500 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Health Benefits</h3>
              <p className="text-sm text-gray-600">Regular donation improves health</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BloodRequest;
