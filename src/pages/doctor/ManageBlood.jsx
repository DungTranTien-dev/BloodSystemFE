import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import api from "../../config/axios";

const doctorMenus = [
  { label: "Trang Nhân Viên", href: "/staff" },
  { label: "Quản Lý Sự Kiện", href: "/staff/manage-event" },
  { label: "Quản Lý Yêu Cầu Máu", href: "/staff/manage-blood-requests" },
  { label: "Quản Lý Hồ Sơ Y Tế", href: "/doctor/manage-medical" },
  { label: "Quản Lý Đơn Vị Máu", href: "/doctor/manage-blood" },
  { label: "Quản Lý Máu Đã Phân Tách", href: "/doctor/manage-separated" },
  { label: "Quản Lý Đăng Ký Hiến Máu", href: "/staff/manage-registion" },
  { label: "Trang Chủ", href: "/" },
];

function ManageBlood() {
  const [search, setSearch] = useState("");
  const [bloodUnits, setBloodUnits] = useState([]);
  const [userMedicals, setUserMedicals] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBloodUnit, setCurrentBloodUnit] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filteredList = bloodUnits.filter((item) =>
    item.bloodName.toLowerCase().includes(search.toLowerCase()) ||
    (item.userName && item.userName.toLowerCase().includes(search.toLowerCase()))
  );
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBlood = await api.get("Blood");
        setBloodUnits(resBlood.data.result);
        const resUser = await api.get("UserMedical");
        setUserMedicals(resUser.data.result);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleAutoSeparate = async (bloodId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn tách máu không?");
    if (!confirmed) return;

    try {
      const res = await api.post(`/SeparatedBloodComponent/autoseparateall/${bloodId}`);
      const { message } = res.data;

      alert(message);

      setBloodUnits((prev) =>
        prev.map((item) =>
          item.bloodId === bloodId ? { ...item, status: "PROCESSED" } : item
        )
      );
    } catch (error) {
      alert("❌ Tách máu tự động thất bại");
      console.error(error);
    }
  };

  const handleCreate = () => {
    setCurrentBloodUnit(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (item) => {
    const editableData = {
      id: item.bloodId,
      userMedicalId: item.userMedicalId,
      bloodName: item.bloodName,
      volume: item.volumeInML,
      collectedDate: item.collectedDate?.split("T")[0] || "",
    };
    setCurrentBloodUnit(editableData);
    setIsPopupOpen(true);
  };

  const handleSubmitBloodUnit = async (formData) => {
    try {
      const dto = {
        bloodName: formData.bloodName,
        volumeInML: Number(formData.volume),
        collectedDate: formData.collectedDate,
        userMedicalId: formData.userMedicalId,
      };

      if (currentBloodUnit) {
        await api.put(`/Blood/${currentBloodUnit.id}`, dto);
      } else {
        await api.post(`/Blood/create`, dto);
      }

      const res = await api.get("Blood");
      setBloodUnits(res.data.result);
      return true;
    } catch (error) {
      console.error("Lỗi khi submit:", error);
      return false;
    }
  };

  const bloodFieldsConfig = [
    {
      name: "userMedicalId",
      label: "Chọn hồ sơ người hiến máu",
      type: "select",
      options: userMedicals.map((u) => ({
        value: u.userMedicalId,
        label: `${u.fullName} - ${u.email} `,
      })),
      required: true,
    },
    {
      name: "bloodName",
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
      required: true,
    },
    {
      name: "volume",
      label: "Thể tích (ml)",
      type: "number",
      min: 100,
      max: 500,
      required: true,
    },
    {
      name: "collectedDate",
      label: "Ngày hiến",
      type: "date",
      required: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-1">
              Đơn vị máu
            </h1>
            <p className="text-slate-600">
              Kiểm tra, tìm kiếm và tách các đơn vị máu.
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
            onClick={handleCreate}
          >
            + Thêm đơn vị máu
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm theo người hiến hoặc nhóm máu..."
            className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-red-200 to-pink-100">
              <tr>
                {[
                  "Mã đơn vị",
                  "Người hiến",
                  "Nhóm máu",
                  "Thể tích (ml)",
                  "Ngày hiến",
                  "Ngày hết hạn",
                  "Trạng thái",
                  "Hành động",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    Không tìm thấy đơn vị máu phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => (
                  <tr key={item.bloodId} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4 font-mono text-slate-700">
                      {item.code}
                    </td>
                    <td className="px-6 py-4">{item.userName || "Ẩn danh"}</td>
                    <td className="px-6 py-4">{item.bloodName}</td>
                    <td className="px-6 py-4">{item.volumeInML || "Chưa hiến máu"}</td>
                    <td className="px-6 py-4">
                      {item.collectedDate
                        ? new Date(item.collectedDate).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      {item.expiryDate
                        ? new Date(item.expiryDate).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "PROCESSED"
                            ? "bg-green-100 text-green-700"
                            : item.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "ERROR"
                            ? "bg-red-100 text-red-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {{
                          UNPROCESSED: "Chưa tách",
                          PROCESSING: "Đang xử lý",
                          PROCESSED: "Đã tách",
                          ERROR: "Lỗi",
                        }[item.status] || "Không xác định"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="text-pink-600 hover:text-pink-800 hover:underline"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      {item.status === "UNPROCESSED" ? (
                        <button
                          className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-1 rounded-lg font-semibold shadow hover:from-pink-500 hover:to-red-500 transition"
                          onClick={() => handleAutoSeparate(item.bloodId)}
                        >
                          Tách máu
                        </button>
                      ) : item.status === "PROCESSING" ? (
                        <span className="text-yellow-500 italic">
                          Đang xử lý...
                        </span>
                      ) : item.status === "PROCESSED" ? (
                        <span className="text-slate-400 italic">Đã tách</span>
                      ) : (
                        <span className="text-red-500 italic">Lỗi khi tách</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:bg-red-100 transition`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmitBloodUnit}
          initialData={currentBloodUnit}
          fieldsConfig={bloodFieldsConfig}
          title={currentBloodUnit ? "Chỉnh sửa đơn vị máu" : "Thêm đơn vị máu mới"}
          submitText={currentBloodUnit ? "Cập nhật" : "Tạo mới"}
        />
      </main>
    </div>
  );
}

export default ManageBlood;
