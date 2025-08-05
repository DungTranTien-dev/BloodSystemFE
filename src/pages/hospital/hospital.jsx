import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  DatePicker,
  Form,
  Card,
  Button,
  Input,
  Spin,
  Empty,
  Layout
} from "antd";
import RegistrationPopup from "../../components/RegistrationPopup";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  SearchOutlined,
  LoadingOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../../config/axios";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const { RangePicker } = DatePicker;

const EventCard = ({ event, onRegisterEvent }) => {
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const getDaysLeft = () => {
    const now = new Date();
    const end = new Date(event.endTime);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Đã kết thúc";
    if (diffDays === 0) return "Kết thúc hôm nay";
    if (diffDays === 1) return "Còn 1 ngày";
    return `Còn ${diffDays} ngày`;
  };

  const getEventStatus = () => {
    const now = new Date();
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    if (now < start) return "Sắp diễn ra";
    if (now >= start && now <= end) return "Đang diễn ra";
    return "Đã kết thúc";
  };

  return (
    <Card hoverable className="mb-6 rounded-2xl overflow-hidden !border-slate-200">
      <div className="flex flex-col sm:flex-row">
        {/* Biểu tượng */}
        <div className="w-24 h-24 m-4 mx-auto sm:mx-4 flex-shrink-0">
          <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex-1 p-4 pt-0 sm:pt-4 text-center sm:text-left">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-red-600 hover:underline cursor-pointer">
              {event.title}
            </h3>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <EnvironmentOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">Địa điểm: {event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CalendarOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">
                Thời gian: {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <InfoCircleOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">Mô tả: {event.description}</span>
            </div>
          </div>
        </div>

        {/* Bên phải */}
        <div className="sm:w-48 p-4 flex flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-slate-100">
          <div className="text-right mb-4 sm:mb-0">
            <div className="flex items-center text-blue-500 mb-1">
              <CalendarOutlined className="mr-1" />
              <span className="text-sm font-medium">{getDaysLeft()}</span>
            </div>
            <div className="text-base font-semibold text-green-600">
              {getEventStatus()}
            </div>
          </div>

          {/* ✅ Không cho đăng ký nếu đã kết thúc */}
          {getEventStatus() === "Đã kết thúc" ? (
            <div className="text-sm text-red-500 font-semibold text-center mt-2">
              Sự kiện đã kết thúc
            </div>
          ) : (
            <Button
              type="primary"
              onClick={() => onRegisterEvent(event)}
              style={{
                background: "linear-gradient(to right, #ef4444, #db2777)",
                color: "white",
                border: "none"
              }}
              className="w-full font-semibold rounded-lg"
            >
              Đăng ký tham gia
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const Hospitals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();

  const [dateRange, setDateRange] = useState(() => {
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    if (startDateParam && endDateParam) {
      return [dayjs(startDateParam), dayjs(endDateParam)];
    }
    return null;
  });

  useEffect(() => {
    fetchEvents();
  }, [searchParams]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");

      let response;
      if (startDate && endDate) {
        response = await api.get("Event/range", {
          params: { start: startDate, end: endDate }
        });
      } else {
        response = await api.get("Event/all");
      }

      if (response.data && response.data.isSuccess) {
        setEvents(response.data.result || []);
        setFilteredEvents(response.data.result || []);
      } else {
        setEvents([]);
        setFilteredEvents([]);
        window.toast?.error(response.data?.message || "Không tìm thấy sự kiện");
      }
    } catch (error) {
      setEvents([]);
      setFilteredEvents([]);
      if (error.response) {
        window.toast?.error(error.response.data?.message || "Lỗi khi tải dữ liệu");
      } else if (error.request) {
        window.toast?.error("Không kết nối được với máy chủ");
      } else {
        window.toast?.error("Lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterEvent = async (event) => {
    try {
      const res = await api.get("UserMedical/check");

      if (res.data?.isSuccess) {
        const registerRes = await api.post(`BloodRegistrations/${event.donationEventId}`);
        if (registerRes.data?.isSuccess) {
          window.toast?.success("Đăng ký thành công!");
          navigate("/donation-confirmation?status=success");
        } else {
          window.toast?.error(registerRes.data?.message || "Đăng ký thất bại!");
          navigate("/donation-confirmation?status=error");
        }
      } else {
        setSelectedEvent(event);
        setShowPopup(true);
      }
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response?.data?.message?.toLowerCase() === "khong co ho so"
      ) {
        setSelectedEvent(event);
        setShowPopup(true);
      } else {
        window.toast?.error(err.response?.data?.message || "Lỗi kiểm tra hồ sơ!");
        navigate("/donation-confirmation?status=error");
      }
    }
  };

  const handlePopupFinish = async (values) => {
    try {
      const genderMap = { Male: 0, Female: 1, Other: 2 };
      const payload = {
        fullName: values.fullName,
        dateOfBirth: values.birthDate ? dayjs(values.birthDate).toISOString() : null,
        gender: genderMap[values.gender],
        citizenId: values.idNumber,
        bloodName: values.bloodName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        currentAddress: values.address,
        hasDonatedBefore: values.hasDonatedBefore ?? false,
        donationCount: values.donationCount,
        diseaseDescription: values.diseaseDescription,
        chronicDiseaseIds: values.chronicDiseaseIds ?? [],
        latitude: values.latitude ?? 0,
        longitude: values.longitude ?? 0,
        lastDonorDate: values.lastDonorDate ? dayjs(values.lastDonorDate).toISOString() : null
      };

      const createMedicalRes = await api.post("UserMedical/create", payload);
      if (!createMedicalRes.data?.isSuccess) {
        window.toast?.error(createMedicalRes.data?.message || "Tạo hồ sơ thất bại");
        return;
      }

      const registerRes = await api.post(`BloodRegistrations/${selectedEvent.donationEventId}`);
      if (registerRes.data?.isSuccess) {
        window.toast?.success("Đăng ký thành công!");
        setShowPopup(false);
        navigate("/donation-confirmation?status=success");
      } else {
        window.toast?.error(registerRes.data?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      window.toast?.error("Đã xảy ra lỗi! Vui lòng thử lại.");
      navigate("/donation-confirmation?status=error");
    }
  };

  const handleDateSearch = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("startDate", dateRange[0].format("YYYY-MM-DD"));
      newSearchParams.set("endDate", dateRange[1].format("YYYY-MM-DD"));
      setSearchParams(newSearchParams);
    }
  };

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const getSearchDateRange = () => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    if (!start || !end) return "Chưa chọn khoảng thời gian";
    return `${formatDate(start)} đến ${formatDate(end)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <>
      <Header />
      <Layout className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <CalendarOutlined className="text-2xl text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Kết quả tìm kiếm sự kiện
              </h1>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="text-lg font-medium text-blue-800">
                Thời gian đã chọn: {getSearchDateRange()}
              </div>
            </div>

            <Card className="p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tìm kiếm theo ngày khác
                  </label>
                  <RangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    format="DD-MM-YYYY"
                    className="h-10 w-full"
                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  />
                </div>
                <div className="md:w-auto w-full">
                  <Button
                    size="large"
                    icon={<SearchOutlined />}
                    onClick={handleDateSearch}
                    style={{
                      background: "linear-gradient(to right, #ef4444, #db2777)",
                      color: "white",
                      border: "none"
                    }}
                    className="shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90"
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Tìm kiếm sự kiện theo tên hoặc địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined className="site-form-item-icon text-gray-400" />}
              size="large"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              {loading ? "Đang tải..." : `${filteredEvents.length} Kết quả`}
            </h2>
          </div>

          <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}>
            <div className="space-y-4 min-h-[200px]">
              {!loading && filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard
                    key={event.donationEventId}
                    event={event}
                    onRegisterEvent={handleRegisterEvent}
                  />
                ))
              ) : !loading ? (
                <div className="flex justify-center items-center h-full pt-16">
                  <Empty
                    description={
                      <div>
                        <p className="font-semibold text-base">Không tìm thấy sự kiện</p>
                        <span className="text-gray-500">
                          Vui lòng thử lại với tiêu chí tìm kiếm khác.
                        </span>
                      </div>
                    }
                  />
                </div>
              ) : null}
            </div>
          </Spin>

          <RegistrationPopup
            visible={showPopup}
            onClose={() => setShowPopup(false)}
            onFinish={handlePopupFinish}
            form={form}
            navigate={navigate}
          />
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Hospitals;
