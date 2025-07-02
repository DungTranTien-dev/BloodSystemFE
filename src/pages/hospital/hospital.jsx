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
} from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  CalendarOutlined,
  SearchOutlined,
  TeamOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import dayjs from "dayjs"; // Cần dayjs để làm việc với AntD DatePicker
import { getHospitalsNew } from "../../service/hospitalApi";
import { useSelector } from "react-redux";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const { RangePicker } = DatePicker;

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
          redirectTo: "/donor-blood",
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

    navigate("/donor-blood", {
      state: {
        selectedHospital: {
          title: hospital.title,
          startTime: hospital.startTime,
          endTime: hospital.endTime,
          eventId: hospital.donationEventId
        },
      },
    });
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
      <Footer />
    </>
  );
};

export default Hospitals;
