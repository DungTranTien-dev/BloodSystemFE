import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import Header from "../../components/Header";
import {
  getCreatedHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../../service/hospitalApi";

function ManageEvent() {
  const [search, setSearch] = useState("");
  const [eventList, setEventList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchEvents() {
      const res = await getCreatedHospitals();
      if (res.success && Array.isArray(res.data)) {
        setEventList(
          res.data.map((ev) => ({
            id: ev.donationEventId,
            name: ev.title,
            date: ev.startTime ? ev.startTime.split("T")[0] : "",
            startTime: ev.startTime,
            endTime: ev.endTime,
            location: ev.location,
            description: ev.description,
          }))
        );
      }
    }
    fetchEvents();
  }, []);

  const filteredList = eventList.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);

  const eventFields = [
    {
      name: "name",
      label: "Tên sự kiện",
      type: "text",
      placeholder: "Nhập tên sự kiện",
      required: true,
    },
    {
      name: "date",
      label: "Ngày bắt đầu",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "Ngày kết thúc",
      type: "date",
      required: true,
    },
    {
      name: "location",
      label: "Địa điểm",
      type: "text",
      placeholder: "Nhập địa điểm",
      required: true,
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
      placeholder: "Nhập mô tả sự kiện",
      required: true,
    },
  ];

  const handleSubmitEvent = async (formData) => {
    const payload = {
      title: formData.name,
      location: formData.location,
      startTime: formData.startTime || (formData.date ? new Date(formData.date).toISOString() : new Date().toISOString()),
      endTime: formData.endTime || (formData.endDate ? new Date(formData.endDate).toISOString() : new Date().toISOString()),
      description: formData.description,
    };

    if (formData.id) {
      payload.donationEventId = formData.id;
      const res = await updateHospital(formData.id, payload);
      if (res.success) {
        const reload = await getCreatedHospitals();
        if (reload.success && Array.isArray(reload.data)) {
          setEventList(
            reload.data.map((ev) => ({
              id: ev.donationEventId,
              name: ev.title,
              date: ev.startTime ? ev.startTime.split("T")[0] : "",
              startTime: ev.startTime,
              endTime: ev.endTime,
              location: ev.location,
              description: ev.description,
            }))
          );
        }
        return true;
      } else {
        alert(res.error || "Cập nhật sự kiện thất bại");
        return false;
      }
    } else {
      const res = await createHospital(payload);
      if (res.success) {
        const reload = await getCreatedHospitals();
        if (reload.success && Array.isArray(reload.data)) {
          setEventList(
            reload.data.map((ev) => ({
              id: ev.donationEventId,
              name: ev.title,
              date: ev.startTime ? ev.startTime.split("T")[0] : "",
              startTime: ev.startTime,
              endTime: ev.endTime,
              location: ev.location,
              description: ev.description,
            }))
          );
        }
        return true;
      } else {
        alert(res.error || "Tạo sự kiện thất bại");
        return false;
      }
    }
  };

  const handleDetail = (item) => {
    setCurrentEvent(item);
    setIsDetailOpen(true);
  };

  const handleCreate = () => {
    setCurrentEvent(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentEvent(item);
    setIsPopupOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) return;
    const res = await deleteHospital(id);
    if (res.success) {
      const reload = await getCreatedHospitals();
      if (reload.success && Array.isArray(reload.data)) {
        setEventList(
          reload.data.map((ev) => ({
            id: ev.donationEventId,
            name: ev.title,
            date: ev.startTime ? ev.startTime.split("T")[0] : "",
            startTime: ev.startTime,
            endTime: ev.endTime,
            location: ev.location,
            description: ev.description,
          }))
        );
      }
    } else {
      alert(res.error || "Xóa sự kiện thất bại");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <main className="flex-1 p-8">
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

        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm theo tên sự kiện hoặc địa điểm..."
            className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-red-200 to-pink-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Tên sự kiện</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ngày bắt đầu</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ngày kết thúc</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Địa điểm</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">Không tìm thấy sự kiện phù hợp.</td>
                </tr>
              ) : (
                paginatedList.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.startTime ? new Date(item.startTime).toLocaleDateString("vi-VN") : ""}</td>
                    <td className="px-6 py-4">{item.endTime ? new Date(item.endTime).toLocaleDateString("vi-VN") : ""}</td>
                    <td className="px-6 py-4">{item.location}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="text-pink-600 hover:underline" onClick={() => handleDetail(item)}>Xem chi tiết</button>
                      <button className="text-pink-600 hover:text-pink-800 hover:underline" onClick={() => handleEdit(item)}>Sửa</button>
                      <button className="text-pink-600 hover:text-pink-800 hover:underline" onClick={() => handleDelete(item.id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button className="px-3 py-1 rounded-l border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-red-100 transition"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`px-3 py-1 border text-sm font-medium ${currentPage === i + 1 ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-700 border-gray-300"} hover:bg-red-100 transition`}
                onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            ))}
            <button className="px-3 py-1 rounded-r border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-red-100 transition"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              Sau
            </button>
          </div>
        )}

        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmitEvent}
          initialData={currentEvent ? {
            ...currentEvent,
            date: currentEvent?.startTime ? currentEvent.startTime.split("T")[0] : '',
            endDate: currentEvent?.endTime ? currentEvent.endTime.split("T")[0] : ''
          } : null}
          fieldsConfig={eventFields}
          title={currentEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
          submitText={currentEvent ? "Cập nhật" : "Tạo mới"}
        />

        {isDetailOpen && (
          <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} currentEvent={currentEvent} />
        )}
      </main>
    </div>
  );
}

export default ManageEvent;

// ✅ DetailModal chỉ hiển thị ngày
const DetailModal = ({ isOpen, onClose, currentEvent }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isOpen) setTimeout(() => setShow(true), 10);
    else setShow(false);
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="relative flex items-center justify-center min-h-screen w-full">
        <div className={`bg-white rounded-xl shadow-xl p-8 w-full max-w-lg transition-all duration-300 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết sự kiện</h2>
          <div className="mb-2"><strong>Tên sự kiện:</strong> {currentEvent.name}</div>
          <div className="mb-2"><strong>Ngày bắt đầu:</strong> {new Date(currentEvent.startTime).toLocaleDateString("vi-VN")}</div>
          <div className="mb-2"><strong>Ngày kết thúc:</strong> {new Date(currentEvent.endTime).toLocaleDateString("vi-VN")}</div>
          <div className="mb-2"><strong>Địa điểm:</strong> {currentEvent.location}</div>
          <div className="mb-4"><strong>Mô tả:</strong> {currentEvent.description}</div>
          <div className="flex justify-end">
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
};
