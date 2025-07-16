import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Card } from 'antd';
import { FaDroplet, FaHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/ui/Layout';
import api from '../../config/axios';
import { toast } from 'react-toastify';

const { Option } = Select;

const BloodRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const unitOptions = [
    '1 Đơn vị (450ml)', '2 Đơn vị (900ml)', 
    '3 Đơn vị (1350ml)', '4 Đơn vị (1800ml)', 
    '5+ Đơn vị (Liên hệ để biết thêm)'
  ];
  const componentTypes = [
  { label: 'Máu toàn phần', value: 'WHOLE_BLOOD' },
  { label: 'Hồng cầu', value: 'RED_BLOOD_CELL' },
  { label: 'Huyết tương', value: 'PLASMA' },
  { label: 'Tiểu cầu', value: 'PLATELET' }
];


  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const unitMap = {
        '1 Đơn vị (450ml)': 450,
        '2 Đơn vị (900ml)': 900,
        '3 Đơn vị (1350ml)': 1350,
        '4 Đơn vị (1800ml)': 1800,
        '5+ Đơn vị (Liên hệ để biết thêm)': 2000
      };
      const volumeInML = unitMap[values.units] || 450;

      const requestDto = {
        patientName: values.patientName,
        hospitalName: values.hospitalName || 'Unknown',
        bloodGroup: values.bloodGroup,
        componentType: values.componentType,
        volumeInML,
        reason: values.reason || 'Không rõ'
      };

      const response = await api.post('BloodRequest/create', requestDto);
      console.log('API response:', response.data);

      if (response?.data?.isSuccess) {
        toast.success('Gửi yêu cầu hiến máu thành công!');
        form.resetFields();
        setTimeout(() => navigate('/donate-confirm?status=success'), 1500);
      } else {
        toast.error(response?.data?.message || 'Gửi yêu cầu thất bại.');
        setTimeout(() => navigate('/donate-confirm?status=error'), 1500);
      }

    } catch (error) {
      console.error(error);
      message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
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
              <FaDroplet className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Yêu Cầu Hiến Máu
            </h1>
            <p className="text-gray-600 text-lg">
              Hãy giúp cứu sống những người bệnh bằng cách gửi yêu cầu hiến máu
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            <div className="p-6 lg:p-8">
              <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className="space-y-6">
                
                {/* Patient Name */}
                <Form.Item name="patientName" label="Tên bệnh nhân*" rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân' }]}>
                  <Input placeholder="Nhập tên bệnh nhân" />
                </Form.Item>

                {/* Hospital Name */}
                <Form.Item name="hospitalName" label="Tên bệnh viện*" rules={[{ required: true, message: 'Vui lòng nhập tên bệnh viện' }]}>
                  <Input placeholder="Nhập tên bệnh viện" />
                </Form.Item>

                {/* Blood Group */}
                <Form.Item name="bloodGroup" label="Nhóm máu*" rules={[{ required: true, message: 'Vui lòng chọn nhóm máu' }]}>
                  <Select placeholder="Chọn nhóm máu">
                    {bloodGroups.map(bg => <Option key={bg} value={bg}>{bg}</Option>)}
                  </Select>
                </Form.Item>

                {/* Component Type */}
                <Form.Item
  name="componentType"
  label="Thành phần máu*"
  rules={[{ required: true, message: 'Vui lòng chọn thành phần máu' }]}
>
  <Select placeholder="Chọn thành phần máu">
    {componentTypes.map(({ label, value }) => (
      <Option key={value} value={value}>
        {label}
      </Option>
    ))}
  </Select>
</Form.Item>


                {/* Units */}
                <Form.Item name="units" label="Thể tích máu*" rules={[{ required: true, message: 'Vui lòng chọn thể tích máu' }]}>
                  <Select placeholder="Chọn thể tích">
                    {unitOptions.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
                  </Select>
                </Form.Item>

                {/* Reason */}
                <Form.Item name="reason" label="Lý do*" rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}>
                  <Input placeholder="VD: Tai nạn, phẫu thuật, truyền máu..." />
                </Form.Item>

                {/* Submit */}
                <Form.Item className="mb-0 pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-14 text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
                      fontSize: '16px'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <FaHeart className="mr-2" />
                      {loading ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu Hiến Máu'}
                    </div>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BloodRequest;
