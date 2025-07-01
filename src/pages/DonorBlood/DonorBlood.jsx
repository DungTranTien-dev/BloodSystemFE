import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Card, DatePicker, InputNumber, Checkbox, Space } from 'antd';
import { FaHeart, FaUserCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/ui/Layout'; // Giả sử Layout của bạn ở đây

const { Option } = Select;
const { TextArea } = Input;

const DonorBlood = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const donationApplication = {
        id: Date.now(),
        age: values.age,
        bloodGroup: values.bloodGroup,
        weight: values.weight,
        donationDate: values.donationDate.toISOString(),
        medicalHistory: values.medicalHistory || 'Không có',
        agreedToTerms: values.agreedToTerms,
        submissionDate: new Date().toISOString(),
        status: 'Pending Review',
      };

      const existingDonations = JSON.parse(localStorage.getItem('bloodDonations') || '[]');
      existingDonations.push(donationApplication);
      localStorage.setItem('bloodDonations', JSON.stringify(existingDonations));

      message.success('Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
      form.resetFields();
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.log(error);
      message.error('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = "text-sm font-medium text-purple-600";

  return (
    <Layout className="bg-gradient-to-br from-red-50 via-pink-50 to-red-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
              <FaHeart className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Đăng Ký Hiến Máu
            </h1>
            <p className="text-gray-600 text-lg">
              Chung tay vì cộng đồng, mỗi giọt máu cho đi là một cuộc đời ở lại.
            </p>
          </div>

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
                {/* Tuổi */}
                <Form.Item
                  name="age"
                  label={<span className={labelStyle}>Tuổi của bạn*</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập tuổi của bạn!' },
                    { type: 'number', min: 18, max: 60, message: 'Tuổi hiến máu phải từ 18 đến 60!' }
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập tuổi (từ 18-60)"
                    className="h-12 !rounded-lg"
                    style={{ width: '100%', fontSize: '16px' }} // SỬA Ở ĐÂY
                  />
                </Form.Item>

                {/* Nhóm máu */}
                <Form.Item
                  name="bloodGroup"
                  label={<span className={labelStyle}>Nhóm máu*</span>}
                  rules={[{ required: true, message: 'Vui lòng chọn nhóm máu!' }]}
                >
                  <Select placeholder="Chọn nhóm máu của bạn" className="h-12" style={{ fontSize: '16px' }}>
                    {bloodGroups.map(group => (
                      <Option key={group} value={group}>{group}</Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Cân nặng */}
                <Form.Item
                  name="weight"
                  label={<span className={labelStyle}>Cân nặng (kg)*</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập cân nặng!' },
                    { type: 'number', min: 45, message: 'Cân nặng tối thiểu để hiến máu là 45kg!' }
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập cân nặng (tối thiểu 45kg)"
                    className="h-12 !rounded-lg"
                    addonAfter="kg"
                    style={{ width: '100%', fontSize: '16px' }} // SỬA Ở ĐÂY
                  />
                </Form.Item>

                {/* Ngày muốn hiến máu */}
                <Form.Item
                  name="donationDate"
                  label={<span className={labelStyle}>Ngày dự kiến hiến máu*</span>}
                  rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                >
                  <DatePicker
                    className="w-full h-12"
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày bạn muốn hiến máu"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Tiền sử bệnh lý */}
                <Form.Item
                  name="medicalHistory"
                  label={<span className={labelStyle}>Tiền sử bệnh lý (nếu có)</span>}
                >
                  <TextArea
                    rows={4}
                    placeholder="Liệt kê các bệnh mãn tính hoặc tình trạng sức khỏe đặc biệt... Ghi 'Không' nếu không có."
                    style={{ fontSize: '16px', borderRadius: '8px' }}
                  />
                </Form.Item>

                {/* Cam kết và điều khoản - Đã được cấu trúc lại */}
                <Form.Item
                  name="agreedToTerms"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các điều khoản để tiếp tục!')),
                    },
                  ]}
                  className="mb-0" // Bỏ margin-bottom mặc định
                >
                  <Space align="start"> {/* SỬA Ở ĐÂY: Dùng Space để căn chỉnh */}
                    <Checkbox />
                    <div className="text-gray-600 text-sm leading-relaxed -mt-1">
                      <p className="font-semibold mb-2">
                        Tôi đồng ý với các điều khoản và điều kiện của chương trình hiến máu.
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Tôi hiểu rằng việc hiến máu là hoàn toàn tự nguyện và không được trả tiền.</li>
                        <li>Tôi cam kết tình trạng sức khỏe của mình ổn định, không mắc các bệnh truyền nhiễm và đã trung thực khai báo thông tin y tế.</li>
                      </ul>
                    </div>
                  </Space>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="mb-0 pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-14 text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)', // Giống trang mẫu
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <FaUserCheck className="mr-2" />
                      {loading ? 'Đang gửi đăng ký...' : 'Xác Nhận Đăng Ký'}
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

export default DonorBlood;