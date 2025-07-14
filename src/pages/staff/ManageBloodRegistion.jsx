import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import api from "../../config/axios";
import { Row, Col, Card, Typography, message } from "antd";

const { Title, Text } = Typography;

const staffMenus = [
  { label: "Staff Page", href: "/staff" },
  { label: "Manage Event", href: "/staff/manage-event" },
  { label: "Manage News", href: "/staff/manage-news" },
  { label: "Manage Blood Requests", href: "/staff/manage-blood-requests" },
  { label: "Manage Medical", href: "/doctor/manage-medical" },
  { label: "Manage Blood", href: "/doctor/manage-blood" },
  { label: "Manage Blood đã phân tách", href: "/doctor/manage-separated" },
  { label: "Manage Blood Registion", href: "/staff/manage-registion" }, // sửa path đúng
];

const mapStatusText = (status) => {
  switch (status) {
    case "PENDING": return "Chờ xử lý";
    case "COMPLETED": return "Đã xác nhận";
    case "CANCEL": return "Đã huỷ";
    default: return status;
  }
};

function ManageBloodRegistion() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("/BloodRegistrations");
      if (res.data?.isSuccess) {
        const mapped = res.data.result.map((item) => ({
          id: item.bloodRegistrationId,
          eventName: item.eventTitle,
          fullName: item.fullName || "Người dùng",
          date: item.createDate?.slice(0, 10),
          status: item.registerType,
          statusText: mapStatusText(item.registerType),
        }));
        setRegistrations(mapped);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách đăng ký:", error);
      message.error("Lỗi khi tải danh sách đăng ký.");
    }
  };

  const handleChangeStatus = async (id, type) => {
    try {
      const res = await api.post(`/BloodRegistrations/change-status/${id}?type=${type}`);
      if (res.data?.isSuccess) {
        message.success("Cập nhật trạng thái thành công");
        fetchRegistrations();
      } else {
        message.error("Cập nhật thất bại");
      }
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      message.error("Lỗi cập nhật trạng thái");
    }
  };

  const getCounts = () => {
    const count = { all: registrations.length, PENDING: 0, COMPLETED: 0, CANCEL: 0 };
    registrations.forEach((r) => {
      if (count[r.status] !== undefined) count[r.status]++;
    });
    return count;
  };

  const counts = getCounts();

  const filtered = registrations.filter((r) =>
    (activeStatus === "all" || r.status === activeStatus) &&
    r.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header pageTitle="Quản lý đăng ký hiến máu" />
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Sidebar
          title="Staff Panel"
          version="v1.0.0"
          menus={staffMenus}
          activeLabel="Manage Blood Registion"
        />
        <main className="flex-1 p-8">
          {/* Thống kê theo trạng thái */}
          <Row gutter={[16, 16]} className="mb-6">
            {["all", "PENDING", "COMPLETED", "CANCEL"].map((key) => (
              <Col xs={12} sm={6} key={key}>
                <Card
                  onClick={() => setActiveStatus(key)}
                  className={`cursor-pointer hover:shadow-lg transition ${
                    activeStatus === key ? "border border-red-400" : ""
                  }`}
                >
                  <Title level={4} className="text-center">
                    {counts[key]}
                  </Title>
                  <Text className="block text-center">
                    {key === "all" ? "Tất cả" : mapStatusText(key)}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Thanh tìm kiếm */}
          <input
            className="px-4 py-2 border border-slate-300 rounded mb-4 w-full max-w-md"
            placeholder="Tìm theo tên người đăng ký..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Bảng danh sách */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-red-200">
                <tr>
                  {["Mã", "Người đăng ký", "Sự kiện", "Ngày", "Trạng thái", "Hành động"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-slate-400 py-8">
                      Không tìm thấy đăng ký phù hợp.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50 transition">
                      <td className="px-6 py-4 font-mono">{item.id}</td>
                      <td className="px-6 py-4">{item.fullName}</td>
                      <td className="px-6 py-4">{item.eventName}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            item.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {item.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {item.status === "PENDING" && (
                          <>
                            <button
                              className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded hover:bg-green-200"
                              onClick={() => handleChangeStatus(item.id, "COMPLETED")}
                            >
                              Đồng ý
                            </button>
                            <button
                              className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded hover:bg-red-200"
                              onClick={() => handleChangeStatus(item.id, "CANCEL")}
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default ManageBloodRegistion;
