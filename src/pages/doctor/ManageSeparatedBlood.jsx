import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import Header from "../../components/Header";
import api from "../../config/axios";


function ManageSeparatedBlood() {
  const [search, setSearch] = useState("");
  const [separatedBlood, setSeparatedBlood] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBlood, setCurrentBlood] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedList = separatedBlood.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(separatedBlood.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  // Call API GET when component mounts
  useEffect(() => {
    const fetchSeparatedBlood = async () => {
      try {
        const res = await api.get("SeparatedBloodComponent/all");
        if (res.data && res.data.isSuccess) {
          const mapped = res.data.result.map((item) => ({
            id: item.code, // ✅ đúng key camelCase
            bloodUnitId: item.blood.bloodName,
            component: item.componentType,
            volume: item.volumeInML,
            separatedDate: item.createdDate?.split("T")[0],
            status: item.isAvailable ? "Sẵn sàng sử dụng" : "Đã sử dụng",
          }));

          setSeparatedBlood(mapped);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchSeparatedBlood();
  }, []);
  const mapComponentType = (type) => {
    switch (type) {
      case 0:
      case "0":
        return "Huyết tương";
      case 1:
      case "1":
        return "Hồng cầu";
      case 2:
      case "2":
        return "Tiểu cầu";
      case 3:
      case "3":
        return "Bạch cầu";
      default:
        return "Không xác định";
    }
  };

  const filteredList = separatedBlood.filter(
    (item) =>
      mapComponentType(item.component) // ← đúng key
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.bloodUnitId.toLowerCase().includes(search.toLowerCase()) // ← nếu bạn muốn cho phép tìm theo mã máu gốc nữa
  );

  const separatedBloodFields = [
    {
      name: "bloodUnitId",
      label: "Mã đơn vị máu gốc",
      type: "text",
      required: true,
    },
    {
      name: "component",
      label: "Thành phần máu",
      type: "select",
      options: [
        { value: "Hồng cầu", label: "Hồng cầu" },
        { value: "Tiểu cầu", label: "Tiểu cầu" },
        { value: "Huyết tương", label: "Huyết tương" },
        { value: "Bạch cầu", label: "Bạch cầu" },
      ],
      required: true,
    },
    {
      name: "volume",
      label: "Thể tích (ml)",
      type: "number",
      min: 1,
      max: 500,
      required: true,
    },
    {
      name: "separatedDate",
      label: "Ngày tách",
      type: "date",
      required: true,
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      options: [
        { value: "Sẵn sàng sử dụng", label: "Sẵn sàng sử dụng" },
        { value: "Đã sử dụng", label: "Đã sử dụng" },
      ],
      required: true,
    },
  ];

  const handleSubmitSeparatedBlood = async (formData) => {
    try {
      const payload = {
        SeparatedBloodComponentId: formData.id || undefined,
        BloodId: formData.bloodUnitId,
        ComponentType: formData.component,
        VolumeInML: formData.volume,
        CreatedDate: formData.separatedDate,
        IsAvailable: formData.status === "Sẵn sàng sử dụng",
      };

      if (formData.id) {
        await api.put(`/separated-blood/${formData.id}`, payload);
      } else {
        await api.post("/separated-blood", payload);
      }

      // Refresh after save
      const res = await api.get("/separated-blood/all");
      const mapped = res.data.data.map((item) => ({
        id: item.SeparatedBloodComponentId,
        bloodUnitId: item.BloodId,
        component: item.ComponentType,
        volume: item.VolumeInML,
        separatedDate: item.CreatedDate?.split("T")[0],
        status: item.IsAvailable ? "Sẵn sàng sử dụng" : "Đã sử dụng",
      }));
      setSeparatedBlood(mapped);
      return true;
    } catch (err) {
      console.error("Lỗi khi submit:", err);
      return false;
    }
  };

  const handleCreate = () => {
    setCurrentBlood(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentBlood(item);
    setIsPopupOpen(true);
  };

  const handleDetail = (item) => {
    setCurrentBlood(item);
    setIsDetailOpen(true);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-red-600 mb-1">
                Đơn vị máu đã phân tách
              </h1>
              <p className="text-slate-600">
                Quản lý, tìm kiếm và cập nhật các thành phần máu đã tách.
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
              onClick={handleCreate}
            >
              + Thêm thành phần máu
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Tìm theo mã đơn vị máu hoặc thành phần..."
              className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-red-200 to-pink-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Mã phân tách
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Mã máu gốc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Thành phần
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Thể tích (ml)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Ngày tách
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      Không tìm thấy thành phần máu phù hợp.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50 transition">
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">{item.bloodUnitId}</td>
                      <td className="px-6 py-4">{mapComponentType(item.component)}</td>
                      <td className="px-6 py-4">{item.volume}</td>
                      <td className="px-6 py-4">{item.separatedDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Sẵn sàng sử dụng"
                              ? "bg-green-100 text-green-700"
                              : "bg-pink-100 text-pink-700"
                          }`}
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
                          className="text-pink-600 hover:text-pink-800 hover:underline"
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
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded border text-sm font-medium ${currentPage === i + 1 ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-300'} hover:bg-red-100 transition`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Popup Form */}
          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleSubmitSeparatedBlood}
            initialData={currentBlood}
            fieldsConfig={separatedBloodFields}
            title={
              currentBlood
                ? "Chỉnh sửa thành phần máu"
                : "Thêm thành phần máu mới"
            }
            submitText={currentBlood ? "Cập nhật" : "Tạo mới"}
          />

          {/* Detail Popup */}
          {isDetailOpen && (
            <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} currentBlood={currentBlood} />
          )}
        </main>
      </div>
    </>
  );
}

// Popup chi tiết có hiệu ứng blur + scale+fade-in
const DetailModal = ({ isOpen, onClose, currentBlood }) => {
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
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Chi tiết thành phần máu
          </h2>
          <div className="mb-2">
            <span className="font-semibold">Mã phân tách:</span>{" "}
            {currentBlood.id}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mã máu gốc:</span>{" "}
            {currentBlood.bloodUnitId}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Thành phần:</span>{" "}
            {currentBlood.component}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Thể tích:</span>{" "}
            {currentBlood.volume} ml
          </div>
          <div className="mb-2">
            <span className="font-semibold">Ngày tách:</span>{" "}
            {currentBlood.separatedDate}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Trạng thái:</span>{" "}
            {currentBlood.status}
          </div>
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

export default ManageSeparatedBlood;
