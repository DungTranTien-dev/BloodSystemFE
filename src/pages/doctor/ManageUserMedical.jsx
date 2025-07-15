import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import Sidebar from "../../components/SideBar";
// import PopupForm from "../../components/PopupForm";
import Header from "../../components/Header";



// Màu trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case "Đã từng hiến máu":
      return "bg-green-100 text-green-700";
    case "Chưa từng hiến máu":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// // Sidebar component
// const Sidebar = ({ title, version, menus, activeLabel }) => (
//   <aside className="w-64 bg-white shadow h-full p-6">
//     <h2 className="text-xl font-bold text-red-600 mb-4">{title}</h2>
//     <ul className="space-y-2">
//       {menus.map((menu) => (
//         <li key={menu.label}>
//           <a
//             href={menu.href}
//             className={`block px-4 py-2 rounded hover:bg-red-100 ${
//               menu.label === activeLabel ? "bg-red-200 font-semibold" : ""
//             }`}
//           >
//             {menu.label}
//           </a>
//         </li>
//       ))}
//     </ul>
//     <div className="mt-6 text-sm text-slate-500">Phiên bản: {version}</div>
//   </aside>
// );

// // Header component
// const Header = ({ pageTitle }) => (
//   <header className="bg-white shadow px-8 py-4 sticky top-0 z-30">
//     <h1 className="text-xl font-bold text-red-600">{pageTitle}</h1>
//   </header>
// );

// Popup Form
const PopupForm = ({ isOpen, onClose, onSubmit, initialData, fieldsConfig, title, submitText }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFormData(initialData || {});
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const success = await onSubmit(formData);
    if (success) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className={`relative flex items-center justify-center min-h-screen w-full`}>
        <div className={`bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full transition-all duration-300 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-xl font-bold mb-4 text-red-600">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldsConfig.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className="border border-slate-300 p-2 rounded"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className="border border-slate-300 p-2 rounded"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 rounded bg-slate-300 hover:bg-slate-400">Hủy</button>
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">{submitText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper hiển thị thông tin, đặt ở đầu file để mọi component đều dùng được
const Info = ({ label, value }) => (
  <div className="mb-1">
    <strong className="text-gray-600">{label}:</strong>{" "}
    <span className="text-gray-800">{value || "Không rõ"}</span>
  </div>
);

// Hàm định dạng trạng thái
const formatType = (type) => {
  switch (type) {
    case "PENDING": return "Đang chờ duyệt";
    case "AVAILABLE": return "Đã duyệt";
    case "BLOCK": return "Từ chối";
    case "COMPLETE": return "Đã hoàn tất";
    default: return "Không xác định";
  }
};

function ManageUserMedical() {
  const [search, setSearch] = useState("");
  const [medicalList, setMedicalList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentMedical, setCurrentMedical] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Đảm bảo filteredList được khai báo trước khi dùng
  const filteredList = medicalList.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const fetchMedicalList = async () => {
      try {
        const res = await api.get("UserMedical");
        if (res.data.isSuccess && Array.isArray(res.data.result)) {
          const formatted = res.data.result.map((u) => {
            const status = u.hasDonatedBefore ? "Đã từng hiến máu" : "Chưa từng hiến máu";
            return {
              id: u.userMedicalId,
              patient: u.fullName,
              age: new Date().getFullYear() - new Date(u.dateOfBirth).getFullYear(),
              diagnosis: u.diseaseDescription || "Không rõ",
              date: new Date().toISOString().split("T")[0],
              status,
              statusColor: getStatusColor(status),
              email: u.email,
              phone: u.phoneNumber,
              address: u.currentAddress,
              province: u.province || "Không rõ",
              blood: u.bloodName,
              gender: u.gender,
              citizenId: u.citizenId,
              donationCount: u.donationCount,
              userId: u.userId,
              latitude: u.latitude,
              longitude: u.longitude,
              type: u.type,
            };
          });
          setMedicalList(formatted);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API GetAllUserMedical:", err);
      }
    };
    fetchMedicalList();
  }, []);

  const medicalFields = [
    { name: "patient", label: "Tên bệnh nhân", type: "text", required: true },
    { name: "age", label: "Tuổi", type: "number", required: true },
    { name: "diagnosis", label: "Chẩn đoán", type: "textarea", required: true },
    { name: "date", label: "Ngày tạo", type: "date", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Số điện thoại", type: "text" },
    { name: "address", label: "Địa chỉ", type: "text" },
    { name: "province", label: "Tỉnh/Thành phố", type: "text" },
    { name: "blood", label: "Nhóm máu", type: "text" },
    { name: "gender", label: "Giới tính", type: "text" },
    { name: "citizenId", label: "CMND/CCCD", type: "text" },
    { name: "donationCount", label: "Số lần hiến máu", type: "number" },
    { name: "type", label: "Loại hồ sơ", type: "text" },
    { name: "status", label: "Trạng thái", type: "text" },
  ];

  const handleSubmitMedical = async (formData) => {
    await new Promise((r) => setTimeout(r, 500));
    if (formData.id) {
      setMedicalList((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData, statusColor: getStatusColor(formData.status) } : item))
      );
    } else {
      const newId = `MED${String(medicalList.length + 1).padStart(3, "0")}`;
      setMedicalList((prev) => [...prev, { ...formData, id: newId, statusColor: getStatusColor(formData.status) }]);
    }
    return true;
  };

  const handleDetail = (item) => {
    setCurrentMedical(item);
    setIsDetailOpen(true);
  };

  const handleChangeStatus = async (userMedicalId, newType) => {
    try {
      const res = await api.post("UserMedical/change-status", null, {
        params: {
          userMedicalId,
          type: newType,
        },
      });
      if (res.data.isSuccess) {
        setMedicalList((prev) =>
          prev.map((item) =>
            item.id === userMedicalId ? { ...item, type: newType } : item
          )
        );
        alert(`✅ Cập nhật trạng thái thành công: ${formatType(newType)}`);
      } else {
        alert("❌ Cập nhật thất bại: " + res.data.message);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API ChangeStatus:", err);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-red-600 mb-1">Danh sách hồ sơ y tế</h1>
              <p className="text-slate-600">Quản lý, tìm kiếm và theo dõi hồ sơ bệnh nhân.</p>
            </div>
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
              onClick={() => {
                setCurrentMedical(null);
                setIsPopupOpen(true);
              }}
            >
              + Thêm hồ sơ mới
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Tìm theo tên bệnh nhân hoặc chẩn đoán..."
              className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-red-200 to-pink-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Bệnh nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Tuổi</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">Không tìm thấy hồ sơ phù hợp.</td>
                  </tr>
                ) : (
                  paginatedList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50 transition">
                      <td className="px-6 py-4">{item.patient}</td>
                      <td className="px-6 py-4">{item.age}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {formatType(item.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="text-pink-600 hover:underline" onClick={() => handleDetail(item)}>Xem</button>
                        <button className="text-blue-600 hover:underline" onClick={() => { setCurrentMedical(item); setIsPopupOpen(true); }}>Sửa</button>
                        {item.type === "PENDING" && (
                          <>
                            <button className="text-green-600 hover:text-green-800" onClick={() => handleChangeStatus(item.id, "AVAILABLE")}>Duyệt</button>
                            <button className="text-red-600 hover:text-red-800" onClick={() => handleChangeStatus(item.id, "BLOCK")}>Từ chối</button>
                          </>
                        )}
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

          {/* Form popup */}
          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleSubmitMedical}
            initialData={currentMedical}
            fieldsConfig={medicalFields}
            title={currentMedical ? "Chỉnh sửa hồ sơ y tế" : "Thêm hồ sơ y tế mới"}
            submitText={currentMedical ? "Cập nhật" : "Tạo mới"}
          />

          {/* Detail popup */}
          {isDetailOpen && currentMedical && (
            <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} currentMedical={currentMedical} />
          )}
        </main>
      </div>
    </>
  );
}

export default ManageUserMedical;

// Popup chi tiết có hiệu ứng
const DetailModal = ({ isOpen, onClose, currentMedical }) => {
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
      <div className={`relative flex items-center justify-center min-h-screen w-full`}>
        <div className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl transition-all duration-300 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-2xl font-bold mb-6 text-red-600 border-b pb-2">📋 Chi tiết hồ sơ hiến máu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
            <Info label="👤 Họ tên" value={currentMedical.patient} />
            <Info label="🎂 Tuổi" value={currentMedical.age} />
            <Info label="📧 Email" value={currentMedical.email} />
            <Info label="📞 SĐT" value={currentMedical.phone} />
            <Info label="📍 Địa chỉ" value={currentMedical.address} />
            <Info label="🌍 Tỉnh/TP" value={currentMedical.province} />
            <Info label="🩸 Nhóm máu" value={currentMedical.blood} />
            <Info label="⚧️ Giới tính" value={currentMedical.gender} />
            <Info label="🆔 CMND/CCCD" value={currentMedical.citizenId} />
            <Info label="📝 Chẩn đoán" value={currentMedical.diagnosis} />
            <Info label="📅 Ngày tạo" value={currentMedical.date} />
            <Info label="💉 Lần hiến máu" value={currentMedical.donationCount} />
            <Info label="📂 Loại hồ sơ" value={formatType(currentMedical.type)} />
            <div className="col-span-1 md:col-span-2 flex items-center">
              <strong className="mr-2">🚦 Trạng thái:</strong>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentMedical.statusColor}`}>
                {currentMedical.status}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:opacity-90" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
};
