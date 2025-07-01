import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Card } from 'antd';
import { FaDroplet, FaHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/ui/Layout';
import api from '../../config/axios';

const { Option } = Select;

const BloodRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const unitOptions = [
    '1 Unit (450ml)', '2 Units (900ml)', 
    '3 Units (1350ml)', '4 Units (1800ml)', 
    '5+ Units (Contact for details)'
  ];
  const componentTypes = [
  { label: 'Whole Blood', value: 'WHOLE_BLOOD' },
  { label: 'Red Blood Cell', value: 'RED_BLOOD_CELL' },
  { label: 'Plasma', value: 'PLASMA' },
  { label: 'Platelet', value: 'PLATELET' },
  { label: 'In Progress', value: 'IN_PROGESS' }
];


  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const unitMap = {
        '1 Unit (450ml)': 450,
        '2 Units (900ml)': 900,
        '3 Units (1350ml)': 1350,
        '4 Units (1800ml)': 1800,
        '5+ Units (Contact for details)': 2000
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

      if (response?.data?.success) {
        message.success('Blood request submitted successfully!');
        form.resetFields();
        setTimeout(() => navigate('/'), 1500);
      } else {
        message.error(response?.data?.message || 'Request failed.');
      }

    } catch (error) {
      console.error(error);
      message.error('Something went wrong. Please try again.');
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
              Donate Blood Request
            </h1>
            <p className="text-gray-600 text-lg">
              Help save lives by requesting blood donations for patients in need
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            <div className="p-6 lg:p-8">
              <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className="space-y-6">
                
                {/* Patient Name */}
                <Form.Item name="patientName" label="Patient Name*" rules={[{ required: true }]}>
                  <Input placeholder="Enter patient name" />
                </Form.Item>

                {/* Hospital Name */}
                <Form.Item name="hospitalName" label="Hospital Name*" rules={[{ required: true }]}>
                  <Input placeholder="Enter hospital name" />
                </Form.Item>

                {/* Blood Group */}
                <Form.Item name="bloodGroup" label="Blood Group*" rules={[{ required: true }]}>
                  <Select placeholder="Select blood group">
                    {bloodGroups.map(bg => <Option key={bg} value={bg}>{bg}</Option>)}
                  </Select>
                </Form.Item>

                {/* Component Type */}
                <Form.Item
  name="componentType"
  label="Component Type*"
  rules={[{ required: true, message: 'Please select component type' }]}
>
  <Select placeholder="Select component type">
    {componentTypes.map(({ label, value }) => (
      <Option key={value} value={value}>
        {label}
      </Option>
    ))}
  </Select>
</Form.Item>


                {/* Units */}
                <Form.Item name="units" label="Blood Volume*" rules={[{ required: true }]}>
                  <Select placeholder="Select units">
                    {unitOptions.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
                  </Select>
                </Form.Item>

                {/* Reason */}
                <Form.Item name="reason" label="Reason*" rules={[{ required: true }]}>
                  <Input placeholder="e.g., Accident, Surgery, Transfusion..." />
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
                      {loading ? 'Submitting Request...' : 'Submit Blood Request'}
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
