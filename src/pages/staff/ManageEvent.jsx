import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm"; // Đường dẫn tuỳ dự án
import Header from "../../components/Header";

const staffMenus = [
  { label: "Trang nhân viên", href: "/staff" },
  { label: "Quản lý sự kiện", href: "/staff/manage-event" },
  { label: "Quản lý tin tức", href: "/staff/manage-news" },
  { label: "Quản lý yêu cầu máu", href: "/staff/manage-blood-requests" },
  { label: "Quản lý hồ sơ y tế", href: "/doctor/manage-medical" },
  { label: "Quản lý máu", href: "/doctor/manage-blood" },
  { label: "Quản lý máu đã phân tách", href: "/doctor/manage-separated" },
  { label: "Quản lý đăng ký hiến máu", href: "/staff/manage-registion" },
];


// Dữ liệu mẫu
const eventSample = [
  {
    id: "EVT001",
    name: "Hiến máu nhân đạo tại Trung tâm A",
    date: "2025-07-01",
    location: "Trung tâm A",
    description: "Sự kiện hiến máu nhân đạo cho cộng đồng.",
    status: "Sắp diễn ra",
  },
  {
    id: "EVT002",
    name: "Tập huấn nhân viên mới",
    date: "2025-07-05",
    location: "Phòng họp B",
    description: "Đào tạo quy trình tiếp nhận máu cho nhân viên mới.",
    status: "Đã kết thúc",
  },
];

function ManageEvent() {
  const [search, setSearch] = useState("");
  const [eventList, setEventList] = useState(eventSample);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Lọc theo tên sự kiện hoặc địa điểm
  const filteredList = eventList.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  // Cấu hình field cho form Event
  const eventFields = [
    {
      name: "name",
      label: "Tên sự kiện",
      type: "text",
      placeholder: "Nhập tên sự kiện",
      required: true
    },
    {
      name: "date",
      label: "Ngày diễn ra",
      type: "date",
      required: true
    },
    {
      name: "location",
      label: "Địa điểm",
      type: "text",
      placeholder: "Nhập địa điểm",
      required: true
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
      placeholder: "Nhập mô tả sự kiện",
      required: true
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      options: [
        { value: "Sắp diễn ra", label: "Sắp diễn ra" },
        { value: "Đang diễn ra", label: "Đang diễn ra" },
        { value: "Đã kết thúc", label: "Đã kết thúc" }
      ],
      required: true
    }
  ];

  // Xử lý submit form (thêm/sửa)
  const handleSubmitEvent = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (formData.id) {
      // Cập nhật
      setEventList(prev =>
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      // Thêm mới
      const newId = `EVT${String(eventList.length + 1).padStart(3, '0')}`;
      setEventList(prev => [
        ...prev,
        { ...formData, id: newId }
      ]);
    }
    return true;
  };

  // Xem chi tiết
  const handleDetail = (item) => {
    setCurrentEvent(item);
    setIsDetailOpen(true);
  };

  // Mở popup thêm mới
  const handleCreate = () => {
    setCurrentEvent(null);
    setIsPopupOpen(true);
  };

  // Mở popup sửa
  const handleEdit = (item) => {
    setCurrentEvent(item);
    setIsPopupOpen(true);
  };

  return (
    <>
    <Header pageTitle="Quản lý lịch hiến máu" />
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Sidebar
        title="Staff Panel"
        version="v1.0.0"
        menus={staffMenus}
        activeLabel="Manage Event"
      />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-1">Quản lý sự kiện</h1>
            <p className="text-slate-600">Tạo, chỉnh sửa và theo dõi các sự kiện hiến máu.</p>
          </div>
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
            onClick={handleCreate}
          >
            + Thêm sự kiện
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm theo tên sự kiện hoặc địa điểm..."
            className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-red-200 to-pink-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Mã sự kiện</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Tên sự kiện</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Địa điểm</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Không tìm thấy sự kiện phù hợp.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4 font-mono text-slate-700">{item.id}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.location}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            item.status === "Sắp diễn ra"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Đang diễn ra"
                              ? "bg-green-100 text-green-700"
                              : "bg-pink-100 text-pink-700"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="text-pink-600 hover:underline"
                        onClick={() => handleDetail(item)}
                      >
                        Xem chi tiết
                      </button>
                      <button
                        className="text-pink-600 hover:text-pink-800"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination mẫu */}
        <div className="mt-6 flex justify-end">
          <nav className="inline-flex rounded-md shadow-sm">
            <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-l hover:bg-red-50">Trước</button>
            <button className="px-3 py-1 bg-pink-500 text-white border-t border-b border-slate-200 font-semibold">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-r hover:bg-red-50">Sau</button>
          </nav>
        </div>

        {/* PopupForm dùng chung cho thêm/sửa */}
        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmitEvent}
          initialData={currentEvent}
          fieldsConfig={eventFields}
          title={currentEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
          submitText={currentEvent ? "Cập nhật" : "Tạo mới"}
        />

        {/* Popup xem chi tiết */}
        {isDetailOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết sự kiện</h2>
              <div className="mb-2"><span className="font-semibold">Mã sự kiện:</span> {currentEvent.id}</div>
              <div className="mb-2"><span className="font-semibold">Tên sự kiện:</span> {currentEvent.name}</div>
              <div className="mb-2"><span className="font-semibold">Ngày:</span> {currentEvent.date}</div>
              <div className="mb-2"><span className="font-semibold">Địa điểm:</span> {currentEvent.location}</div>
              <div className="mb-2"><span className="font-semibold">Trạng thái:</span> {currentEvent.status}</div>
              <div className="mb-4"><span className="font-semibold">Mô tả:</span> {currentEvent.description}</div>
              <div className="flex justify-end">
                <button
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition"
                  onClick={() => setIsDetailOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  );
}

export default ManageEvent;
