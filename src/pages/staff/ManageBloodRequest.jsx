import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import PopupForm from "../../components/PopupForm"; // Đường dẫn tuỳ dự án

const staffMenus = [
  { label: "Staff Page", href: "/staff" },
  { label: "Manage Event", href: "/staff/manage-event" },
  { label: "Manage News", href: "/staff/manage-news" },
  { label: "Manage Blood Requests", href: "/staff/manage-blood-requests" },
];

// Dữ liệu mẫu
const bloodRequestsSample = [
  {
    id: "REQ001",
    patient: "Nguyễn Văn A",
    bloodGroup: "O+",
    volume: 350,
    date: "2025-06-25",
    status: "Chờ xử lý",
    note: "Cần gấp cho ca cấp cứu.",
  },
  {
    id: "REQ002",
    patient: "Trần Thị B",
    bloodGroup: "A-",
    volume: 450,
    date: "2025-06-24",
    status: "Đã duyệt",
    note: "",
  },
];

function ManageBloodRequest() {
  const [search, setSearch] = useState("");
  const [requestList, setRequestList] = useState(bloodRequestsSample);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Lọc theo tên bệnh nhân hoặc nhóm máu
  const filteredList = requestList.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  // Cấu hình field cho form Request
  const requestFields = [
    {
      name: "patient",
      label: "Tên bệnh nhân",
      type: "text",
      placeholder: "Nhập tên bệnh nhân",
      required: true
    },
    {
      name: "bloodGroup",
      label: "Nhóm máu",
      type: "select",
      options: [
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
      ],
      required: true
    },
    {
      name: "volume",
      label: "Thể tích (ml)",
      type: "number",
      placeholder: "Nhập thể tích",
      required: true,
      min: 100,
      max: 500
    },
    {
      name: "date",
      label: "Ngày yêu cầu",
      type: "date",
      required: true
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      options: [
        { value: "Chờ xử lý", label: "Chờ xử lý" },
        { value: "Đã duyệt", label: "Đã duyệt" },
        { value: "Đã từ chối", label: "Đã từ chối" }
      ],
      required: true
    },
    {
      name: "note",
      label: "Ghi chú",
      type: "textarea",
      placeholder: "Nhập ghi chú (nếu có)"
    }
  ];

  // Xử lý submit form (thêm/sửa)
  const handleSubmitRequest = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (formData.id) {
      // Cập nhật
      setRequestList(prev =>
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      // Thêm mới
      const newId = `REQ${String(requestList.length + 1).padStart(3, '0')}`;
      setRequestList(prev => [
        ...prev,
        { ...formData, id: newId }
      ]);
    }
    return true;
  };

  // Xem chi tiết
  const handleDetail = (item) => {
    setCurrentRequest(item);
    setIsDetailOpen(true);
  };

  // Mở popup thêm mới
  const handleCreate = () => {
    setCurrentRequest(null);
    setIsPopupOpen(true);
  };

  // Mở popup sửa
  const handleEdit = (item) => {
    setCurrentRequest(item);
    setIsPopupOpen(true);
  };

  return (
    <>
      <Header pageTitle="Quản lý đơn nhận máu" />
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Sidebar
          title="Staff Panel"
          version="v1.0.0"
          menus={staffMenus}
          activeLabel="Manage Blood Requests"
        />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-red-600 mb-1">Quản lý đơn nhận máu</h1>
              <p className="text-slate-600">Tạo, chỉnh sửa và theo dõi các đơn nhận máu của bệnh nhân.</p>
            </div>
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
              onClick={handleCreate}
            >
              + Thêm đơn nhận máu
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Tìm theo tên bệnh nhân hoặc nhóm máu..."
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
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Bệnh nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Nhóm máu</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Thể tích (ml)</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ngày yêu cầu</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      Không tìm thấy đơn phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50 transition">
                      <td className="px-6 py-4 font-mono text-slate-700">{item.id}</td>
                      <td className="px-6 py-4">{item.patient}</td>
                      <td className="px-6 py-4">{item.bloodGroup}</td>
                      <td className="px-6 py-4">{item.volume}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              item.status === "Chờ xử lý"
                                ? "bg-yellow-100 text-yellow-700"
                                : item.status === "Đã duyệt"
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
            onSubmit={handleSubmitRequest}
            initialData={currentRequest}
            fieldsConfig={requestFields}
            title={currentRequest ? "Chỉnh sửa đơn nhận máu" : "Thêm đơn nhận máu mới"}
            submitText={currentRequest ? "Cập nhật" : "Tạo mới"}
          />

          {/* Popup xem chi tiết */}
          {isDetailOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết đơn nhận máu</h2>
                <div className="mb-2"><span className="font-semibold">Mã đơn:</span> {currentRequest.id}</div>
                <div className="mb-2"><span className="font-semibold">Bệnh nhân:</span> {currentRequest.patient}</div>
                <div className="mb-2"><span className="font-semibold">Nhóm máu:</span> {currentRequest.bloodGroup}</div>
                <div className="mb-2"><span className="font-semibold">Thể tích:</span> {currentRequest.volume} ml</div>
                <div className="mb-2"><span className="font-semibold">Ngày yêu cầu:</span> {currentRequest.date}</div>
                <div className="mb-2"><span className="font-semibold">Trạng thái:</span> {currentRequest.status}</div>
                <div className="mb-4"><span className="font-semibold">Ghi chú:</span> {currentRequest.note}</div>
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

export default ManageBloodRequest;
