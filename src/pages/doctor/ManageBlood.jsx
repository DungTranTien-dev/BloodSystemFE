import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import Header from "../../components/Header";
import api from "../../config/axios"; // Axios config
import CreateSeparatedBloodComponentPopup from "../../components/CreateSeparatedBloodComponentPopup";



function ManageBlood() {
  const [search, setSearch] = useState("");
  const [bloodUnits, setBloodUnits] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentBloodUnit, setCurrentBloodUnit] = useState(null);

  // Trong component ManageBlood:
  const [isSeparatePopupOpen, setIsSeparatePopupOpen] = useState(false);
  const [separatingBloodId, setSeparatingBloodId] = useState(null);
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Thêm state và popup xem chi tiết
  const [detailBlood, setDetailBlood] = useState(null);

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
  // Phân trang
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

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
    PLATELET: 2,
    PLASMA: 3,
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
        await api.put(`/Blood/${currentBloodUnit.id}`, dto);
        // Fetch lại danh sách máu
        const res = await api.get("Blood");
        setBloodUnits(res.data.result);
        setIsPopupOpen(false);
        setCurrentBloodUnit(null);
      } else {
        await api.post(`/Blood/create`, dto);
        const listRes = await api.get("Blood");
        setBloodUnits(listRes.data.result);
        setIsPopupOpen(false);
        setCurrentBloodUnit(null);
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
      min: 50,
      max: 1000,
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
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
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
                    // "Mã đơn vị", // Bỏ mã đơn vị
                    "Người hiến",
                    "Nhóm máu",
                    "Thể tích (ml)",
                    // "Ngày hiến", // Bỏ cột này
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
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      Không tìm thấy đơn vị máu phù hợp.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item) => (
                    <tr
                      key={item.bloodId}
                      className="hover:bg-red-50 transition"
                    >
                      {/* <td className="px-6 py-4 font-mono text-slate-700">{item.code}</td> */}
                      <td className="px-6 py-4">{item.userName || '-'}</td>
                      <td className="px-6 py-4">{item.bloodName}</td>
                      <td className="px-6 py-4">
                        {item.volumeInML && item.volumeInML !== 1 ? item.volumeInML : "Chưa hiến máu"}
                      </td>
                      {/* <td className="px-6 py-4">Ngày hiến</td> */}
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
                      {/* Cột Trạng thái */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold mb-1 ${item.status === "PROCESSED"
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
                      {/* Cột Hành động */}
                      <td className="px-6 py-4 flex gap-2 flex-wrap min-w-[180px]">
                        <button
                          className="text-pink-600 hover:underline"
                          onClick={() => setDetailBlood(item)}
                        >
                          Xem chi tiết
                        </button>
                        <button
                          className="text-pink-600 hover:text-pink-800 hover:underline"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>

                        {item.status === "UNPROCESSED" && (
                          <button
                            className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-1 rounded-lg font-semibold shadow hover:from-pink-500 hover:to-red-500 transition"
                            onClick={() => openSeparatePopup(item.bloodId)}
                          >
                            Tách máu
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination: chỉ hiện khi tổng số bản ghi > itemsPerPage */}
          {filteredList.length > itemsPerPage && (
            <div className="flex justify-end mt-6 gap-2">
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
            popupEffect
          />

          <CreateSeparatedBloodComponentPopup
            isOpen={isSeparatePopupOpen}
            onClose={() => setIsSeparatePopupOpen(false)}
            onSubmit={submitSeparatedComponents}
            bloodId={separatingBloodId}
            popupEffect
          />

          {/* Popup xem chi tiết */}
          {detailBlood && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="relative flex items-center justify-center min-h-screen w-full">
                <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg transition-all duration-300 transform scale-100 opacity-100">
                  <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết đơn vị máu</h2>
                  <div className="mb-2"><span className="font-semibold">Người hiến:</span> {detailBlood.userName || '-'}</div>
                  <div className="mb-2"><span className="font-semibold">Nhóm máu:</span> {detailBlood.bloodName}</div>
                  <div className="mb-2"><span className="font-semibold">Thể tích:</span> {detailBlood.volumeInML}</div>
                  <div className="mb-2"><span className="font-semibold">Ngày hiến:</span> {detailBlood.collectedDate ? new Date(detailBlood.collectedDate).toLocaleString("vi-VN") : '-'}</div>
                  <div className="mb-2"><span className="font-semibold">Ngày hết hạn:</span> {detailBlood.expiryDate ? new Date(detailBlood.expiryDate).toLocaleString("vi-VN") : '-'}</div>
                  <div className="mb-2"><span className="font-semibold">Trạng thái:</span> {{
                    UNPROCESSED: "Chưa tách",
                    PROCESSING: "Đang xử lý",
                    PROCESSED: "Đã tách",
                    ERROR: "Lỗi",
                  }[detailBlood.status] || "Không xác định"}</div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition"
                      onClick={() => setDetailBlood(null)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default ManageBlood;
