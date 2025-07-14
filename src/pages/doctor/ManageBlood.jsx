import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import Header from "../../components/Header";
import api from "../../config/axios"; // Axios config
import CreateSeparatedBloodComponentPopup from "../../components/CreateSeparatedBloodComponentPopup";

const doctorMenus = [
  { label: "Staff Page", href: "/staff" },
  { label: "Manage Event", href: "/staff/manage-event" },
  { label: "Manage News", href: "/staff/manage-news" },
  { label: "Manage Blood Requests", href: "/staff/manage-blood-requests" },
  { label: "Manage Medical", href: "/doctor/manage-medical" },
  { label: "Manage Blood", href: "/doctor/manage-blood" },
  { label: "Manage Blood đã phân tách", href: "/doctor/manage-separated" },
  { label: "Manage Blood Registion", href: "/staff/manage-registion" }, // sửa path đúng

];

function ManageBlood() {
  const [search, setSearch] = useState("");
  const [bloodUnits, setBloodUnits] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBloodUnit, setCurrentBloodUnit] = useState(null);

  // Trong component ManageBlood:
const [isSeparatePopupOpen, setIsSeparatePopupOpen] = useState(false);
const [separatingBloodId, setSeparatingBloodId] = useState(null);

const openSeparatePopup = (bloodId) => {
  setSeparatingBloodId(bloodId);
  setIsSeparatePopupOpen(true);
};

  useEffect(() => {
    const fetchBloodUnits = async () => {
      try {
        const res = await api.get("Blood");
        setBloodUnits(res.data.result);
      } catch (error) {
        console.error("Failed to fetch blood units:", error);
      }
    };
    fetchBloodUnits();
  }, []);

  const filteredList = bloodUnits.filter((item) =>
    item.bloodName.toLowerCase().includes(search.toLowerCase())
  );

  // const handleSeparate = async (id) => {
  //   try {
  //     await api.put(`/blood-units/${id}/separate`);
  //     setBloodUnits((prev) =>
  //       prev.map((item) =>
  //         item.id === id ? { ...item, status: "Đã tách" } : item
  //       )
  //     );
  //     alert(`Đã tách máu cho đơn vị ${id}`);
  //   } catch (error) {
  //     alert("Lỗi khi tách máu");
  //     console.error(error);
  //   }
  // };
  const BloodComponentType = {
  WHOLE_BLOOD: 0,
  RED_BLOOD_CELL: 1,
  PLASMA: 2,
  PLATELET: 3,
  IN_PROGRESS: 4,
};

const BloodSeparationStatus = {
  UNPROCESSED: 0,
  PROCESSING: 1,
  PROCESSED: 2,
  ERROR: 3,
};

  const submitSeparatedComponents = async ({ bloodId, components }) => {
  try {
    // Gọi API với dữ liệu components tách
    for (const comp of components) {
      await api.post("SeparatedBloodComponent/create", {
  bloodId,
  componentType: BloodComponentType[comp.componentType],
  volumeInML: comp.volumeInML,
  expiryDate: comp.expiryDate ? comp.expiryDate : null, // nếu có expiryDate trong comp thì gửi
  // không cần gửi createdDate vì backend tự gán rồi
});

    }

  await api.post(`Blood/change-status?id=${bloodId}&status=${BloodSeparationStatus.PROCESSED}`);


    // Cập nhật local state
    setBloodUnits(prev =>
      prev.map(item =>
        item.bloodId === bloodId ? { ...item, status: "PROCESSED" } : item
      )
    );

    alert("Tách thành công!");
    setIsSeparatePopupOpen(false);
    setSeparatingBloodId(null);
  } catch (error) {
    alert("Lỗi khi tách thành phần máu");
    console.error(error);
  }
};

  const handleCreate = () => {
    setCurrentBloodUnit(null);
    setIsPopupOpen(true);
  };

const handleEdit = (item) => {
  const editableData = {
    donor: item.userName,
    bloodName: item.bloodName,
    volume: item.volume,
    collectedDate: item.collectedDate ? item.collectedDate.split("T")[0] : "",
    expiryDate: item.expiryDate ? item.expiryDate.split("T")[0] : "",
    id: item.bloodId,
    code: item.code,
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
      expiryDate: formData.expiryDate || null,
    };

    if (currentBloodUnit) {
      // === CẬP NHẬT ===
      const res = await api.put(`/Blood/${currentBloodUnit.id}`, dto);
      setBloodUnits((prev) =>
        prev.map((item) =>
          item.bloodId === currentBloodUnit.id ? { ...item, ...res.data } : item
        )
      );
    } else {
      // === TẠO MỚI ===
      const res = await api.post(`/Blood/create`, dto); // <-- sửa đúng endpoint tạo mới
      setBloodUnits((prev) => [...prev, res.data.result]); // res.data.result phải là object máu vừa tạo
    }

    return true;
  } catch (error) {
    console.error("Submit error:", error);
    return false;
  }
};



const bloodFieldsConfig = [
 
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
    placeholder: "Nhập thể tích",
    required: true,
    min: 100,
    max: 500,
  },
  {
    name: "collectedDate",  // đổi từ 'date' thành 'collectedDate' cho đúng với dữ liệu
    label: "Ngày hiến",
    type: "date",
    required: true,
  },
  {
    name: "expiryDate",   // thêm trường ngày hết hạn
    label: "Ngày hết hạn",
    type: "date",
    required: false,
  },
];


  return (
    <>
      <Header pageTitle="Quản lý máu" />
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Sidebar
          title="Doctor Panel"
          version="v1.0.0"
          menus={doctorMenus}
          activeLabel="Manage Blood"
        />
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-red-600 mb-1">
                Quản lý đơn vị máu
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
              placeholder="Tìm theo tên người hiến hoặc nhóm máu..."
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
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      Không tìm thấy đơn vị máu phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr
                      key={item.bloodId}
                      className="hover:bg-red-50 transition"
                    >
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {item.code}
                      </td>
                      {/* <td className="px-6 py-4">{item.patientName}</td> */}
                      <td className="px-6 py-4">{item.bloodName}</td>
                      <td className="px-6 py-4">
  {item.volumeInML && item.volumeInML !== 1 ? item.volumeInML : "Chưa hiến máu"}
</td>

                     <td className="px-6 py-4">
  {item.collectedDate
    ? new Date(item.collectedDate).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-"}
</td>
<td className="px-6 py-4">
  {item.expiryDate
    ? new Date(item.expiryDate).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
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
                          className="text-pink-600 hover:text-pink-800"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>
                        {item.status === "UNPROCESSED" ? (
                          <button
  className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-1 rounded-lg font-semibold shadow hover:from-pink-500 hover:to-red-500 transition"
  onClick={() => openSeparatePopup(item.bloodId)}
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
                          <span className="text-red-500 italic">
                            Lỗi khi tách
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <nav className="inline-flex rounded-md shadow-sm">
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-l hover:bg-red-50">
                Trước
              </button>
              <button className="px-3 py-1 bg-pink-500 text-white border-t border-b border-slate-200 font-semibold">
                1
              </button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-r hover:bg-red-50">
                Sau
              </button>
            </nav>
          </div>

          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleSubmitBloodUnit}
            initialData={currentBloodUnit}
            fieldsConfig={bloodFieldsConfig}
            title={
              currentBloodUnit ? "Chỉnh sửa đơn vị máu" : "Thêm đơn vị máu mới"
            }
            submitText={currentBloodUnit ? "Cập nhật" : "Tạo mới"}
          />

          <CreateSeparatedBloodComponentPopup
  isOpen={isSeparatePopupOpen}
  onClose={() => setIsSeparatePopupOpen(false)}
  onSubmit={submitSeparatedComponents}
  bloodId={separatingBloodId}
/>

        </main>
      </div>
    </>
  );
}

export default ManageBlood;
