import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Radio,
    Checkbox,
    InputNumber,
    Row,
    Col,
    Space,
    Typography,
    message,
    Steps
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
    HeartOutlined,
    IdcardOutlined,
    FileTextOutlined,
    SafetyOutlined,
    KeyOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Step } = Steps;

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const steps = [
        {
            title: 'Giấy tờ tùy thân',
            icon: <IdcardOutlined />,
            description: 'Thông tin cá nhân'
        },
        {
            title: 'Hồ sơ người hiến máu',
            icon: <FileTextOutlined />,
            description: 'Thông tin y tế'
        },
        {
            title: 'Xác thực tài khoản',
            icon: <SafetyOutlined />,
            description: 'Xác minh danh tính'
        },
        {
            title: 'Tạo mật khẩu',
            icon: <KeyOutlined />,
            description: 'Bảo mật tài khoản'
        }
    ];

    const onFinish = (values) => {
        if (currentStep < steps.length - 1) {
            setFormData({ ...formData, ...values });
            setCurrentStep(currentStep + 1);
            form.resetFields();
        } else {
            // Final submission
            const finalData = { ...formData, ...values };
            message.success('Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Vui lòng kiểm tra lại thông tin!');
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Hải Phòng', 'Đà Nẵng', 'Cần Thơ'];
    const chronicDiseaseOptions = ['Tiểu đường', 'Cao huyết áp', 'Bệnh tim mạch', 'Hen suyễn', 'Bệnh thận', 'Bệnh gan'];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Giấy tờ tùy thân
                return (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="fullName"
                                    label="Họ và tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="idNumber"
                                    label="Số CCCD/CMND"
                                    rules={[{ required: true, message: 'Vui lòng nhập số CCCD!' }]}
                                >
                                    <Input prefix={<IdcardOutlined />} placeholder="Nhập số CCCD/CMND" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="dateOfBirth"
                                    label="Ngày sinh"
                                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                    rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                                >
                                    <Radio.Group>
                                        <Radio value="male">Nam</Radio>
                                        <Radio value="female">Nữ</Radio>
                                        <Radio value="other">Khác</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="address"
                                    label="Địa chỉ"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                );

            case 1: // Hồ sơ người hiến máu
                return (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="bloodType"
                                    label="Nhóm máu"
                                    rules={[{ required: true, message: 'Vui lòng chọn nhóm máu!' }]}
                                >
                                    <Select placeholder="Chọn nhóm máu">
                                        {bloodTypes.map(type => (
                                            <Option key={type} value={type}>{type}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="weight"
                                    label="Cân nặng (kg)"
                                    rules={[{ required: true, message: 'Vui lòng nhập cân nặng!' }]}
                                >
                                    <InputNumber min={30} max={200} style={{ width: '100%' }} placeholder="Nhập cân nặng" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="hasDonatedBefore"
                                    label="Đã từng hiến máu?"
                                    rules={[{ required: true, message: 'Vui lòng chọn!' }]}
                                >
                                    <Radio.Group>
                                        <Radio value="yes">Có</Radio>
                                        <Radio value="no">Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item name="donationCount" label="Số lần hiến máu (nếu có)">
                                    <InputNumber min={0} style={{ width: '100%' }} placeholder="Số lần" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="chronicDiseases" label="Bệnh mãn tính (nếu có)">
                            <Checkbox.Group>
                                <Row>
                                    {chronicDiseaseOptions.map(disease => (
                                        <Col xs={24} sm={12} md={8} key={disease}>
                                            <Checkbox value={disease}>{disease}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </>
                );

            case 2: // Xác thực tài khoản
                return (
                    <>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Nhập email để xác thực" />
                        </Form.Item>
                        <Form.Item
                            name="verificationCode"
                            label="Mã xác thực"
                            rules={[{ required: true, message: 'Vui lòng nhập mã xác thực!' }]}
                        >
                            <Row gutter={8}>
                                <Col span={16}>
                                    <Input placeholder="Nhập mã xác thực" />
                                </Col>
                                <Col span={8}>
                                    <Button type="default" block>
                                        Gửi mã
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-blue-800 text-sm">
                                <SafetyOutlined className="mr-2" />
                                Mã xác thực sẽ được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.
                            </p>
                        </div>
                    </>
                );

            case 3: // Tạo mật khẩu
                return (
                    <>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                { min: 4, message: 'Tên đăng nhập phải có ít nhất 4 ký tự!' }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                })
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            name="agreeTerms"
                            valuePropName="checked"
                            rules={[{ required: true, message: 'Vui lòng đồng ý với điều khoản!' }]}
                        >
                            <Checkbox>
                                Tôi đồng ý với <a href="#" className="text-red-600">Điều khoản sử dụng</a> và 
                                <a href="#" className="text-red-600 ml-1">Chính sách bảo mật</a>
                            </Checkbox>
                        </Form.Item>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-2xl -mt-8 md:-mt-12 -mx-8 md:-mx-12 mb-8 px-8 py-5">
                <HeartOutlined className="text-6xl mb-3" />
                <Title level={2} className="!text-white tracking-tight text-5xl">Đăng ký tài khoản</Title>
            </div>

            {/* Back to Login notice */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-800 font-semibold">Đã có tài khoản?</p>
                        <p className="text-blue-600 text-sm">Đăng nhập ngay để truy cập hệ thống</p>
                    </div>
                    <Button 
                        type="primary" 
                        onClick={() => navigate('/login')}
                        className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
                        icon={<UserOutlined />}
                    >
                        Đăng Nhập
                    </Button>
                </div>
            </div>

            {/* Steps */}
            <Steps current={currentStep} className="mb-8">
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                    />
                ))}
            </Steps>

            {/* Form */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="space-y-6"
                size="large"
            >
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="text-center mt-8">
                    <Space size="large" direction="vertical" className="w-full">
                        {/* Back to Login Button */}
                        <Button 
                            size="large" 
                            onClick={() => navigate('/login')}
                            className="!h-12 !px-8 !bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white !font-bold hover:!opacity-90 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300"
                            icon={<UserOutlined />}
                        >
                            ← Về Trang Đăng Nhập
                        </Button>
                        
                        {/* Step Navigation */}
                        <Space size="large">
                            {currentStep > 0 && (
                                <Button 
                                    size="large" 
                                    onClick={handlePrevious}
                                    className="!h-12 !px-8"
                                >
                                    Quay lại
                                </Button>
                            )}
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="!h-12 !bg-gradient-to-r !from-red-500 !to-pink-600 !text-white !font-bold hover:!opacity-90 !px-10 !border-none !shadow-lg hover:!shadow-xl !transform hover:!scale-105 !transition-all !duration-300" 
                                icon={currentStep === steps.length - 1 ? <HeartOutlined /> : null}
                            >
                                {currentStep === steps.length - 1 ? 'Hoàn Thành Đăng Ký' : 'Tiếp Tục'}
                            </Button>
                        </Space>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;
