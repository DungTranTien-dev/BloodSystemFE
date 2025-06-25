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
import { getHospitals } from "../../service/hospitalApi";

const { RangePicker } = DatePicker;

// --- Component Card cho mỗi bệnh viện ---
const HospitalCard = ({ hospital, onBookAppointment, searchDate }) => {
 

  // Lấy giờ hoạt động dựa trên ngày tìm kiếm
  const getOperatingHoursForDate = () => {
    // Nếu không có ngày tìm kiếm, hiển thị lịch đầu tiên có
    if (!searchDate) {
      const firstSchedule = hospital.operatingSchedule?.[0];
      if (firstSchedule) {
        return `${format(parseISO(firstSchedule.date), "dd-MM-yyyy")} - ${
          firstSchedule.hours
        }`;
      }
      return hospital.workingHours || "Chưa có thông tin";
    }

    // Tìm lịch cho ngày đã chọn
    const schedule = hospital.operatingSchedule?.find(
      (s) => s.date === searchDate
    );
    if (schedule) {
      return `${format(parseISO(schedule.date), "dd-MM-yyyy")} - ${
        schedule.hours
      }`;
    }

    return `${format(parseISO(searchDate), "dd-MM-yyyy")} - Không hoạt động`;
  };

  // Lấy số lượng suất đăng ký
  const getAvailableSlots = () => {
    // Nếu không có ngày tìm kiếm, tính tổng tất cả các ngày
    if (!searchDate) {
      const totalSlots = hospital.donationDays.reduce(
        (total, day) => total + day.timeSlots.length,
        0
      );
      const bookedSlots = Math.floor(totalSlots * 0.3); // Giả lập đã đặt
      return `${totalSlots - bookedSlots}/${totalSlots}`;
    }

    // Tính cho ngày đã chọn
    const daySchedule = hospital.donationDays.find(
      (day) => day.date === searchDate
    );
    if (daySchedule) {
      const totalSlots = daySchedule.timeSlots.length;
      const bookedSlots = Math.floor(totalSlots * 0.3); // Giả lập đã đặt
      return `${totalSlots - bookedSlots}/${totalSlots}`;
    }

    return "0/0";
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
            <h3 className="text-xl font-bold text-blue-600 hover:underline cursor-pointer">
              {hospital.name}
            </h3>

          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <EnvironmentOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">Địa chỉ: {hospital.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockCircleOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">
                Thời gian hoạt động: {getOperatingHoursForDate()}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <PhoneOutlined className="mr-2 text-gray-400" />
              <span className="text-sm">Số điện thoại: {hospital.phone}</span>
            </div>
          </div>
        </div>

        {/* Đặt lịch */}
        <div className="sm:w-48 p-4 flex flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-slate-100">
          <div className="text-right mb-4 sm:mb-0">
            <div className="flex items-center text-gray-500 mb-1">
              <TeamOutlined className="mr-1" />
              <span className="text-sm">Số lượng đăng ký</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {getAvailableSlots()}{" "}
              <span className="text-sm font-normal text-gray-500">Người</span>
            </div>
          </div>
          <Button
            type="primary"
            onClick={() => onBookAppointment(hospital)}
            className="w-full font-semibold rounded-lg"
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </Card>
  );
};

// --- Component Trang chính ---
const Hospitals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // State cho RangePicker, sử dụng mảng [startDate, endDate]
  const [dateRange, setDateRange] = useState(() => {
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    if (startDateParam && endDateParam) {
      return [dayjs(startDateParam), dayjs(endDateParam)];
    }
    return null;
  });

  useEffect(() => {
    fetchHospitals();
  }, [searchParams]);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const params = {
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
      };
      const response = await getHospitals(params);
      if (response.success) {
        setHospitals(response.data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (hospital) => {
    navigate("/register", {
      state: {
        selectedHospital: hospital,
        availableDates: hospital.donationDays,
      },
    });
  };

  // Xử lý khi nhấn nút tìm kiếm theo ngày
  const handleDateSearch = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("startDate", dateRange[0].format("YYYY-MM-DD"));
      newSearchParams.set("endDate", dateRange[1].format("YYYY-MM-DD"));
      setSearchParams(newSearchParams);
    }
  };

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSearchDateRange = () => {
    if (dateRange) {
      return `${dateRange[0].format("DD-MM-YYYY")} - ${dateRange[1].format(
        "DD-MM-YYYY"
      )}`;
    }
    return "Chưa chọn thời gian";
  };

  return (
    <Layout className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <CalendarOutlined className="text-2xl text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Kết quả tìm kiếm bệnh viện
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
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleDateSearch}
                  className="w-full md:w-auto h-10"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Tìm kiếm bệnh viện theo tên hoặc địa chỉ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={
              <SearchOutlined className="site-form-item-icon text-gray-400" />
            }
            size="large"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600">
            {loading ? "Đang tải..." : `${filteredHospitals.length} Kết quả`}
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
                  searchDate={searchParams.get("startDate")}
                />
              ))
            ) : !loading ? (
              <div className="flex justify-center items-center h-full pt-16">
                <Empty
                  description={
                    <div>
                      <p className="font-semibold text-base">
                        Không tìm thấy bệnh viện
                      </p>
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
      </div>
    </Layout>
  );
};

export default Hospitals;
