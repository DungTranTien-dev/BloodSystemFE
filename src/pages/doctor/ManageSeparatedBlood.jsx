import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import Header from "../../components/Header";
import api from "../../config/axios";

const doctorMenus = [
{ label: "Trang Nhân Viên", href: "/staff" },
{ label: "Quản Lý Sự Kiện", href: "/staff/manage-event" },
// { label: "Quản Lý Tin Tức", href: "/staff/manage-news" },
{ label: "Quản Lý Yêu Cầu Máu", href: "/staff/manage-blood-requests" },
{ label: "Quản Lý Hồ Sơ Y Tế", href: "/doctor/manage-medical" },
{ label: "Quản Lý Đơn Vị Máu", href: "/doctor/manage-blood" },
{ label: "Quản Lý Máu Đã Phân Tách", href: "/doctor/manage-separated" },
{ label: "Quản Lý Đăng Ký Hiến Máu", href: "/staff/manage-registion" },
{ label: "Trang Chủ", href: "/" },


];

function ManageSeparatedBlood() {
  const [search, setSearch] = useState("");
  const [separatedBlood, setSeparatedBlood] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBlood, setCurrentBlood] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
        return "Plasma";
      case 1:
        return "Red Blood Cells";
      case 2:
        return "Platelets";
      default:
        return "Unknown";
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
      <Header pageTitle="Quản lý máu đã phân tách" />
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Sidebar
          title="Doctor Panel"
          version="v1.0.0"
          menus={doctorMenus}
          activeLabel="Manage Blood đã phân tách"
        />
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
                  filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50 transition">
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">{item.bloodUnitId}</td>
                      <td className="px-6 py-4">{item.component}</td>
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
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

export default ManageSeparatedBlood;
