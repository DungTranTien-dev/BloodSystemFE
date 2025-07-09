import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Input,
  Tag,
  DatePicker,
  Spin,
  Empty,
  Layout,
  Modal,
  Form,
  Select,
  Radio,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Typography,
} from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  CalendarOutlined,
  SearchOutlined,
  TeamOutlined,
  LoadingOutlined,
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import dayjs from "dayjs"; // Cần dayjs để làm việc với AntD DatePicker
import { getHospitalsNew } from "../../service/hospitalApi";
import { createUserMedical } from "../../service/medicalApi";
import { useSelector } from "react-redux";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { toast } from "sonner";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

// --- Component Modal Đăng ký hiến máu ---
const DonationModal = ({ visible, onCancel, selectedHospital, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Format date
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null,
        gender: values.gender === "male" ? 0 : values.gender === "female" ? 1 : 2,
        hasDonatedBefore: values.hasDonatedBefore || false,
        donationCount: values.donationCount || 0,
        chronicDiseaseIds: values.chronicDiseaseIds || [],
        latitue: values.latitue || 0,
        longtitue: values.longtitue || 0,
      };

      // Gọi API hoặc xử lý submit
      console.log("Form data:", formattedValues);
      
      // Chuyển đến trang confirm
      onSubmit(formattedValues);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  ];

  const chronicDiseases = [
    { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Tiểu đường" },
    { id: "4fa85f64-5717-4562-b3fc-2c963f66afa7", name: "Cao huyết áp" },
    { id: "5fa85f64-5717-4562-b3fc-2c963f66afa8", name: "Bệnh tim" },
  ];

  return (
    <Modal
      title={
        <div className="text-center">
          <HeartOutlined className="text-red-500 text-2xl mr-2" />
          <span className="text-xl font-bold">Đăng ký hiến máu</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="donation-modal"
    >
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Thông tin sự kiện:</h4>
        <p className="text-blue-700">{selectedHospital?.title}</p>
        <p className="text-blue-600 text-sm">
          {selectedHospital?.startTime && format(parseISO(selectedHospital.startTime), "dd/MM/yyyy HH:mm")}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
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
              name="citizenId"
              label="Số CMND/CCCD"
              rules={[
                { required: true, message: "Vui lòng nhập số CMND/CCCD!" },
                { pattern: /^[0-9]{9,12}$/, message: "Số CMND/CCCD không hợp lệ!" }
              ]}
            >
              <Input placeholder="CMND hoặc CCCD" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="bloodName"
              label="Nhóm máu"
              rules={[{ required: true, message: "Vui lòng chọn nhóm máu!" }]}
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
              name="phoneNumber"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="currentAddress"
              label="Địa chỉ hiện tại"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="hasDonatedBefore"
              valuePropName="checked"
            >
              <Checkbox>Đã hiến máu trước đây</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="donationCount"
              label="Số lần hiến máu"
            >
              <InputNumber
                min={0}
                className="w-full"
                placeholder="Số lần hiến máu"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="diseaseDescription"
          label="Mô tả bệnh tật (nếu có)"
        >
          <TextArea
            rows={3}
            placeholder="Mô tả các bệnh tật hoặc tình trạng sức khỏe..."
          />
        </Form.Item>

        <Form.Item
          name="chronicDiseaseIds"
          label="Bệnh mãn tính"
        >
          <Select
            mode="multiple"
            placeholder="Chọn bệnh mãn tính (nếu có)"
            allowClear
          >
            {chronicDiseases.map(disease => (
              <Option key={disease.id} value={disease.id}>
                {disease.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="latitue"
              label="Vĩ độ"
            >
              <InputNumber
                className="w-full"
                placeholder="Vĩ độ"
                step={0.000001}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="longtitue"
              label="Kinh độ"
            >
              <InputNumber
                className="w-full"
                placeholder="Kinh độ"
                step={0.000001}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onCancel} size="large">
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="!bg-gradient-to-r !from-red-500 !to-pink-600 !border-none"
          >
            Đăng ký hiến máu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

// --- Component Card cho mỗi bệnh viện ---
const HospitalCard = ({ hospital, onBookAppointment }) => {
  const formatTime = (isoString) => {
    return format(parseISO(isoString), "HH:mm");
  };

  const formatDate = (isoString) => {
    return format(parseISO(isoString), "dd/MM/yyyy");
  };

  const getOperatingHours = () => {
    const startTime = formatTime(hospital.startTime);
    const endTime = formatTime(hospital.endTime);
    return `${startTime} - ${endTime}`;
  };

  const getOperatingDate = () => {
    return formatDate(hospital.startTime);
  };

  return (
    <Card
      hoverable
      className="mb-6 rounded-2xl overflow-hidden !border-slate-200"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Logo */}
        <div className="w-24 h-24 m-4 mx-auto sm:mx-4 flex-shrink-0">
          <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin chính */}
        <div className="flex-1 p-4 pt-0 sm:pt-4 text-center sm:text-left">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent cursor-pointer">
              {hospital.title}
            </h3>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <EnvironmentOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">Địa chỉ: {hospital.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CalendarOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">
                Ngày hoạt động: {getOperatingDate()}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockCircleOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">
                Thời gian hoạt động: {getOperatingHours()}
              </span>
            </div>
            <div className="text-gray-600">
              <span className="text-sm">{hospital.description}</span>
            </div>
          </div>
        </div>

        {/* Đặt lịch */}
        <div className="sm:w-48 p-4 flex flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-slate-100">
          <div className="text-right mb-4 sm:mb-0">
            <div className="flex items-center text-gray-500 mb-1">
              <TeamOutlined className="mr-1" />
              <span className="text-sm">Trạng thái</span>
            </div>
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                Mở cửa
              </span>
            </div>
          </div>
          <button
            onClick={() => onBookAppointment(hospital)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-600 border-none shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90"
          >
            <CalendarOutlined className="text-white text-base" />
            <span className="text-sm">Đặt lịch</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

// --- Component Trang chính ---
const Hospitals = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (startDate && endDate) {
      return [dayjs(startDate), dayjs(endDate)];
    }
    return null;
  });
  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await getHospitalsNew();
      if (response.success) {
        setHospitals(response.data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSearch = () => {
    setDateRange(tempDateRange);
    if (tempDateRange && tempDateRange[0] && tempDateRange[1]) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("startDate", tempDateRange[0].format("YYYY-MM-DD"));
      newSearchParams.set("endDate", tempDateRange[1].format("YYYY-MM-DD"));
      setSearchParams(newSearchParams, { replace: true });
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("startDate");
      newSearchParams.delete("endDate");
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const handleBookAppointment = (hospital) => {
    if (!user) {
      navigate("/login", {
        state: {
          redirectTo: "/hospital",
          selectedHospital: {
            title: hospital.title,
            startTime: hospital.startTime,
            endTime: hospital.endTime,
            eventId: hospital.donationEventId
          },
        },
      });
      return;
    }

    setSelectedHospital(hospital);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedHospital(null);
  };

  const handleFormSubmit = async (formData) => {
    // Gọi API đăng ký y tế/hiến máu
    try {
      const res = await createUserMedical(formData);
      if (res.success) {
        setModalVisible(false);
        navigate("/donate-confirm", {
          state: {
            formData,
            hospital: selectedHospital
          }
        });
      } else {
        toast.error(res.error || "Đăng ký thất bại!");
      }
    } catch (err) {
      toast.error("Đăng ký thất bại!");
    }
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    // Do not show any hospitals if no date range is selected
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return false;
    }

    const searchMatch =
      hospital.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase());

    const [filterStart, filterEnd] = dateRange;
    const hospitalStart = dayjs(hospital.startTime);

    // Format dates to strings for robust comparison
    const hospitalDateStr = hospitalStart.format("YYYY-MM-DD");
    const filterStartDateStr = filterStart.format("YYYY-MM-DD");
    const filterEndDateStr = filterEnd.format("YYYY-MM-DD");

    const isWithinRange =
      hospitalDateStr >= filterStartDateStr &&
      hospitalDateStr <= filterEndDateStr;

    return searchMatch && isWithinRange;
  });

  return (
    <>
      <Header />
      <Layout className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <CalendarOutlined className="text-2xl text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Bạn cần đặt lịch vào thời gian nào?
              </h1>
            </div>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <RangePicker
                value={tempDateRange}
                size="large"
                onChange={(dates) => setTempDateRange(dates)}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                format="DD/MM/YYYY"
                className="flex-grow"
              />
              <Button
                size="large"
                icon={<SearchOutlined />}
                onClick={handleDateSearch}
                style={{
                  background:
                    "linear-gradient(to right, #ef4444, #db2777)",
                  color: "white",
                  border: "none",
                }}
                className="shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90"
              >
                Tìm kiếm
              </Button>
            </div>
            <Input
              placeholder="Tìm kiếm bệnh viện theo tên hoặc địa chỉ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={
                <SearchOutlined className="site-form-item-icon text-gray-400" />
              }
              size="large"
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold">
              {loading ? (
                "Đang tải..."
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                  {filteredHospitals.length} Bệnh viện
                </span>
              )}
            </h2>
          </div>

          <Spin
            spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
          >
            <div className="space-y-4 min-h-[200px]">
              {!loading && filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    onBookAppointment={handleBookAppointment}
                  />
                ))
              ) : !loading ? (
                <div className="flex justify-center items-center h-full pt-16">
                  <Empty
                    description={
                      !dateRange ? (
                        <div>
                          <p className="font-semibold text-base">
                            Vui lòng chọn khoảng thời gian
                          </p>
                          <span className="text-gray-500">
                            Để tìm kiếm, hãy chọn ngày bắt đầu và kết thúc.
                          </span>
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold text-base">
                            Không tìm thấy bệnh viện
                          </p>
                          <span className="text-gray-500">
                            Vui lòng thử lại với tiêu chí tìm kiếm khác.
                          </span>
                        </div>
                      )
                    }
                  />
                </div>
              ) : null}
            </div>
          </Spin>
        </div>
      </Layout>

      {/* Modal đăng ký hiến máu */}
      <DonationModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        selectedHospital={selectedHospital}
        onSubmit={handleFormSubmit}
      />

      <Footer />
    </>
  );
};

export default Hospitals;
