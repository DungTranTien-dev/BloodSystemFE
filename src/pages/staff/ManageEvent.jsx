import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm"; // Đường dẫn tuỳ dự án
import Header from "../../components/Header";
import { getCreatedHospitals, createHospital, updateHospital, deleteHospital } from '../../service/hospitalApi';

function ManageEvent() {
  const [search, setSearch] = useState("");
  const [eventList, setEventList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch event list from API
  useEffect(() => {
    async function fetchEvents() {
      const res = await getCreatedHospitals();
      if (res.success && Array.isArray(res.data)) {
        // Mapping API fields to UI fields
        setEventList(res.data.map(ev => ({
          id: ev.donationEventId,
          name: ev.title,
          date: ev.startTime ? ev.startTime.split('T')[0] : '',
          startTime: ev.startTime,
          endTime: ev.endTime,
          location: ev.location,
          description: ev.description,
        })));
      }
    }
    fetchEvents();
  }, []);

  // Lọc theo tên sự kiện hoặc địa điểm
  const filteredList = eventList.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

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
  ];

  // Xử lý submit form (thêm/sửa)
  const handleSubmitEvent = async (formData) => {
    if (formData.id) {
      // Cập nhật: gọi API updateHospital
      const payload = {
        donationEventId: formData.id,
        title: formData.name,
        location: formData.location,
        startTime: formData.startTime || (formData.date ? new Date(formData.date).toISOString() : new Date().toISOString()),
        endTime: formData.endTime || (formData.date ? new Date(formData.date).toISOString() : new Date().toISOString()),
        description: formData.description
      };
      const res = await updateHospital(formData.id, payload);
      if (res.success) {
        // Reload lại danh sách sự kiện
        const reload = await getCreatedHospitals();
        if (reload.success && Array.isArray(reload.data)) {
          setEventList(reload.data.map(ev => ({
            id: ev.donationEventId,
            name: ev.title,
            date: ev.startTime ? ev.startTime.split('T')[0] : '',
            startTime: ev.startTime,
            endTime: ev.endTime,
            location: ev.location,
            description: ev.description,
          })));
        }
        return true;
      } else {
        alert(res.error || 'Cập nhật sự kiện thất bại');
        return false;
      }
    } else {
      // Thêm mới: gọi API createHospital
      const payload = {
        title: formData.name,
        location: formData.location,
        startTime: formData.startTime || (formData.date ? new Date(formData.date).toISOString() : new Date().toISOString()),
        endTime: formData.endTime || (formData.date ? new Date(formData.date).toISOString() : new Date().toISOString()),
        description: formData.description
      };
      const res = await createHospital(payload);
      if (res.success) {
        // Reload lại danh sách sự kiện
        const reload = await getCreatedHospitals();
        if (reload.success && Array.isArray(reload.data)) {
          setEventList(reload.data.map(ev => ({
            id: ev.donationEventId,
            name: ev.title,
            date: ev.startTime ? ev.startTime.split('T')[0] : '',
            startTime: ev.startTime,
            endTime: ev.endTime,
            location: ev.location,
            description: ev.description,
          })));
        }
        return true;
      } else {
        alert(res.error || 'Tạo sự kiện thất bại');
        return false;
      }
    }
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

  // Xóa sự kiện
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) return;
    const res = await deleteHospital(id);
    if (res.success) {
      // Reload lại danh sách sự kiện
      const reload = await getCreatedHospitals();
      if (reload.success && Array.isArray(reload.data)) {
        setEventList(reload.data.map(ev => ({
          id: ev.donationEventId,
          name: ev.title,
          date: ev.startTime ? ev.startTime.split('T')[0] : '',
          startTime: ev.startTime,
          endTime: ev.endTime,
          location: ev.location,
          description: ev.description,
        })));
      }
    } else {
      alert(res.error || 'Xóa sự kiện thất bại');
    }
  };

  return (
    <>
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
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
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Không tìm thấy sự kiện phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.startTime ? new Date(item.startTime).toLocaleString('vi-VN') : ''}</td>
                    <td className="px-6 py-4">{item.endTime ? new Date(item.endTime).toLocaleString('vi-VN') : ''}</td>
                    <td className="px-6 py-4">{item.location}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="text-pink-600 hover:underline"
                        onClick={() => handleDetail(item)}
                      >
                        Xem chi tiết
                      </button>
                      <button
                        className="text-pink-600 hover:text-pink-800 hover:underline"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="text-pink-600 hover:text-pink-800 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination mới: chỉ hiện khi >5 bản ghi */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="px-3 py-1 rounded-l border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-red-100 transition"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border text-sm font-medium ${currentPage === i + 1 ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-300'} hover:bg-red-100 transition`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded-r border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-red-100 transition"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        )}

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
          <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} currentEvent={currentEvent} />
        )}
      </main>
    </div>
    </>
  );
}

export default ManageEvent;

// Popup chi tiết: ẩn mã sự kiện
const DetailModal = ({ isOpen, onClose, currentEvent }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="relative flex items-center justify-center min-h-screen w-full">
        <div className={`bg-white rounded-xl shadow-xl p-8 w-full max-w-lg transition-all duration-300 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết sự kiện</h2>
          {/* <div className="mb-2"><span className="font-semibold">Mã sự kiện:</span> {currentEvent.id}</div> */}
          <div className="mb-2"><span className="font-semibold">Tên sự kiện:</span> {currentEvent.name}</div>
          <div className="mb-2"><span className="font-semibold">Ngày bắt đầu:</span> {currentEvent.startTime ? new Date(currentEvent.startTime).toLocaleString('vi-VN') : ''}</div>
          <div className="mb-2"><span className="font-semibold">Ngày kết thúc:</span> {currentEvent.endTime ? new Date(currentEvent.endTime).toLocaleString('vi-VN') : ''}</div>
          <div className="mb-2"><span className="font-semibold">Địa điểm:</span> {currentEvent.location}</div>
          <div className="mb-4"><span className="font-semibold">Mô tả:</span> {currentEvent.description}</div>
          <div className="flex justify-end">
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
