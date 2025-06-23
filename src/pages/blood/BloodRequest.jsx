import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Card } from 'antd';
import { FaDroplet, FaHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/ui/Layout';

const { Option } = Select;

const BloodRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const unitOptions = [
    '1 Unit (450ml)',
    '2 Units (900ml)', 
    '3 Units (1350ml)',
    '4 Units (1800ml)',
    '5+ Units (Contact for details)'
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create request object
      const bloodRequest = {
        id: Date.now(),
        patientName: values.patientName,
        patientAge: values.patientAge,
        disease: values.disease || 'Not specified',
        bloodGroup: values.bloodGroup,
        units: values.units,
        requestDate: new Date().toISOString(),
        status: 'Pending',
        priority: values.patientAge < 18 || values.patientAge > 65 ? 'High' : 'Normal'
      };

      // Save to localStorage (in real app, this would be API call)
      const existingRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
      existingRequests.push(bloodRequest);
      localStorage.setItem('bloodRequests', JSON.stringify(existingRequests));

      message.success('Blood donation request submitted successfully! We will contact you soon.');
      form.resetFields();
      
      // Optional: Navigate to confirmation page
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      message.error('Failed to submit request. Please try again.');
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
                    <span className="text-sm font-medium text-purple-600">
                      Patient Name*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please enter patient name' },
                    { min: 2, message: 'Name must be at least 2 characters' }
                  ]}
                >
                  <Input
                    placeholder="Enter Patient Name"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Patient Age */}
                <Form.Item
                  name="patientAge"
                  label={
                    <span className="text-sm font-medium text-purple-600">
                      Patient Age*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please enter patient age' },
                    { 
                      type: 'number', 
                      min: 0, 
                      max: 120, 
                      message: 'Please enter a valid age' 
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter Patient Age"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Disease */}
                <Form.Item
                  name="disease"
                  label={
                    <span className="text-sm font-medium text-purple-600">
                      Disease* (If Not Then None)
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please enter disease information or "None"' }
                  ]}
                >
                  <Input
                    placeholder="Enter disease for Blood"
                    className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    style={{ fontSize: '16px' }}
                  />
                </Form.Item>

                {/* Blood Group */}
                <Form.Item
                  name="bloodGroup"
                  label={
                    <span className="text-sm font-medium text-purple-600">
                      Blood Group*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please select blood group' }
                  ]}
                >
                  <Select
                    placeholder="Blood Group Select"
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

                {/* Units */}
                <Form.Item
                  name="units"
                  label={
                    <span className="text-sm font-medium text-purple-600">
                      Unit (ml)*
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please select required units' }
                  ]}
                >
                  <Select
                    placeholder="Enter Unit"
                    className="h-12"
                    style={{ fontSize: '16px' }}
                    dropdownStyle={{ borderRadius: '8px' }}
                  >
                    {unitOptions.map(unit => (
                      <Option key={unit} value={unit}>
                        {unit}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Submit Button */}
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
                      {loading ? 'Submitting Request...' : 'Donate Blood Request'}
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
        </div>      </div>
      
    </Layout>
  );
};

export default BloodRequest;
