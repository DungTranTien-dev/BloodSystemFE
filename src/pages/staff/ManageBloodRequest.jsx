import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm";
import api from "../../config/axios";
import { Modal, message, Form } from "antd";
import BloodRequestForm from "../../components/BloodRequestForm";
import { toast } from 'react-toastify';
const staffMenus = [
  { label: "Trang Nhân Viên", href: "/staff" },
  { label: "Quản Lý Sự Kiện", href: "/staff/manage-event" },
  { label: "Quản Lý Yêu Cầu Máu", href: "/staff/manage-blood-requests" },
  { label: "Quản Lý Hồ Sơ Y Tế", href: "/doctor/manage-medical" },
  { label: "Quản Lý Đơn Vị Máu", href: "/doctor/manage-blood" },
  { label: "Quản Lý Máu Đã Phân Tách", href: "/doctor/manage-separated" },
  { label: "Quản Lý Đăng Ký Hiến Máu", href: "/staff/manage-registion" },
  { label: "Trang Chủ", href: "/" },
];

const mapStatusText = (status) => {
  switch (status) {
    case "PENDING":
      return "Chờ xử lý";
    case "APPROVED":
      return "Đã duyệt";
    case "WAITING_PAYMENT":
      return "Chờ thanh toán";
    case "REJECTED":
      return "Đã từ chối";
    case "FULFILLED":
      return "Đã cấp máu";
    default:
      return status;
  }
};

function ManageBloodRequest() {
  const [search, setSearch] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm] = Form.useForm();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredList = requestList.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // Load data
  const fetchRequests = async () => {
    try {
      const res = await api.get("BloodRequest/all");
      if (res.data?.isSuccess) {
        const mapped = res.data.result.map((item) => ({
          id: item.bloodRequestId,
          patient: item.patientName,
          bloodGroup: item.bloodGroup,
          volume: item.volumeInML,
          date: item.requestedDate.slice(0, 10),
          status: item.status,
          statusText: mapStatusText(item.status),
          note: item.reason,
        }));
        setRequestList(mapped);
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      message.error("Lỗi khi tải dữ liệu!");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestFields = [
    {
      name: "patient",
      label: "Tên bệnh nhân",
      type: "text",
      required: true,
    },
    {
      name: "bloodGroup",
      label: "Nhóm máu",
      type: "select",
      required: true,
      options: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((v) => ({
        value: v,
        label: v,
      })),
    },
    {
      name: "volume",
      label: "Thể tích cần (ml)",
      type: "number",
      required: true,
      min: 100,
      max: 500,
    },
    {
      name: "componentType",
      label: "Thành phần máu",
      type: "select",
      required: true,
      options: [
        { value: "WHOLE_BLOOD", label: "Máu toàn phần" },
        { value: "RED_BLOOD_CELL", label: "Hồng cầu" },
        { value: "PLASMA", label: "Huyết tương" },
        { value: "PLATELET", label: "Tiểu cầu" },
        { value: "IN_PROGESS", label: "Đang xử lý" },
      ],
    },
    {
      name: "date",
      label: "Ngày yêu cầu",
      type: "date",
      required: true,
    },
    {
      name: "note",
      label: "Ghi chú",
      type: "textarea",
    },
  ];

  const handleSubmitRequest = async (formData) => {
    try {
      const componentMap = {
        WHOLE_BLOOD: 0,
        RED_BLOOD_CELL: 1,
        PLASMA: 2,
        PLATELET: 3,
        IN_PROGESS: 4,
      };

      const statusMap = {
        PENDING: 0,
        APPROVED: 1,
        WAITING_PAYMENT: 2,
        REJECTED: 3,
        FULFILLED: 4,
      };

      const dto = {
        bloodRequestId: formData.id,
        patientName: formData.patient,
        hospitalName: formData.hospitalName || "Unknown",
        bloodGroup: formData.bloodGroup,
        componentType: componentMap[formData.componentType],
        volumeInML: Number(formData.volume),
        reason: formData.note,
        requestedDate: formData.date,
        status: statusMap[formData.status],
      };

      const res = await api.put("BloodRequest/update", dto);
      if (res.data?.isSuccess) {
        message.success("Cập nhật thành công.");
        setIsPopupOpen(false);
        setCurrentRequest(null);
        fetchRequests();
        return true;
      } else {
        message.error(res.data?.message || "Cập nhật thất bại.");
        return false;
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      message.error("Đã xảy ra lỗi khi cập nhật.");
      return false;
    }
  };

  const handleDetail = async (item) => {
    try {
      const res = await api.get(`BloodRequest/${item.id}`);
      if (res.data?.isSuccess) {
        const data = res.data.result;
        setCurrentRequest({
          id: data.bloodRequestId,
          patient: data.patientName,
          bloodGroup: data.bloodGroup,
          volume: data.volumeInML,
          date: data.requestedDate.slice(0, 10),
          status: mapStatusText(data.status),
          note: data.reason,
        });
        setIsDetailOpen(true);
      }
    } catch (err) {
      console.error("Lỗi lấy chi tiết đơn:", err);
    }
  };

  const handleEdit = async (item) => {
    try {
      const res = await api.get(`BloodRequest/${item.id}`);
      if (res.data?.isSuccess) {
        const data = res.data.result;
        const statusEnum = {
          0: "PENDING",
          1: "APPROVED",
          2: "WAITING_PAYMENT",
          3: "REJECTED",
          4: "FULFILLED",
        };

        const componentEnum = {
          0: "WHOLE_BLOOD",
          1: "RED_BLOOD_CELL",
          2: "PLASMA",
          3: "PLATELET",
          4: "IN_PROGESS",
        };

        setCurrentRequest({
          id: data.bloodRequestId,
          patient: data.patientName,
          bloodGroup: data.bloodGroup,
          volume: data.volumeInML,
          date: data.requestedDate.slice(0, 10),
          status: statusEnum[data.status],
          componentType: componentEnum[data.componentType],
          note: data.reason,
        });

        setIsPopupOpen(true);
      } else {
        message.error("Không tìm thấy đơn nhận máu.");
      }
    } catch (err) {
      console.error("Lỗi khi sửa đơn:", err);
      message.error("Đã xảy ra lỗi khi tải thông tin.");
    }
  };

  const handleCreateBloodRequest = async (values) => {
    try {
      const unitMap = {
        "1 Unit (450ml)": 450,
        "2 Units (900ml)": 900,
        "3 Units (1350ml)": 1350,
        "4 Units (1800ml)": 1800,
        "5+ Units (Contact for details)": 2000,
      };
  
      const requestDto = {
        patientName: values.patientName,
        hospitalName: values.hospitalName || "Unknown",
        bloodGroup: values.bloodGroup,
        componentType: values.componentType,
        volumeInML: unitMap[values.units] || 450,
        reason: values.reason || "Không rõ",
      };
  
      const res = await api.post("BloodRequest/create", requestDto);
  
      if (res.data?.isSuccess) {
        toast.success(res.data.message || "Tạo yêu cầu thành công!");
        fetchRequests();
        createForm.resetFields();
        setShowCreateModal(false);
      } else {
        toast.error(res.data.message || "Tạo yêu cầu thất bại.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err.response?.data?.message || "Đã có lỗi xảy ra khi tạo yêu cầu."
      );
    }
  };
  

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-red-600 mb-1">
                Yêu cầu cần máu
              </h1>
              <p className="text-slate-600">
                Quản lý, tìm kiếm và xử lý các yêu cầu cần máu.
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
              onClick={() => setShowCreateModal(true)}
            >
              + Tạo mới đơn nhận máu
            </button>
          </div>

          {/* Search Box */}
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
                  {[
                    "Bệnh nhân",
                    "Nhóm máu",
                    "Thể tích (ml)",
                    "Ngày yêu cầu",
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
                    <td
                      colSpan={6}
                      className="text-center py-8 text-slate-400"
                    >
                      Không tìm thấy đơn yêu cầu máu phù hợp.
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50 transition">
                      <td className="px-6 py-4">{item.patient}</td>
                      <td className="px-6 py-4">{item.bloodGroup}</td>
                      <td className="px-6 py-4">{item.volume}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : item.status === "REJECTED"
                              ? "bg-pink-100 text-pink-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="text-pink-600 hover:underline"
                          onClick={() => handleDetail(item)}
                        >
                          Chi tiết
                        </button>
                        <button
                          className="text-blue-600 hover:underline"
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

          {/* Popup chỉnh sửa yêu cầu */}
          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleSubmitRequest}
            initialData={currentRequest}
            fieldsConfig={requestFields}
            title={
              currentRequest ? "Chỉnh sửa đơn nhận máu" : "Thêm đơn nhận máu"
            }
            submitText={currentRequest ? "Cập nhật" : "Tạo mới"}
          />

          {/* Modal tạo mới yêu cầu */}
          <Modal
            open={showCreateModal}
            onCancel={() => setShowCreateModal(false)}
            footer={null}
            title="Tạo đơn nhận máu mới"
            width={600}
          >
            <BloodRequestForm
              form={createForm}
              onSubmit={handleCreateBloodRequest}
              loading={false}
            />
          </Modal>

          {/* Modal chi tiết */}
          {isDetailOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-red-600">
                  Chi tiết đơn nhận máu
                </h2>
                <div className="mb-2">
                  <b>Bệnh nhân:</b> {currentRequest.patient}
                </div>
                <div className="mb-2">
                  <b>Nhóm máu:</b> {currentRequest.bloodGroup}
                </div>
                <div className="mb-2">
                  <b>Thể tích:</b> {currentRequest.volume} ml
                </div>
                <div className="mb-2">
                  <b>Ngày yêu cầu:</b> {currentRequest.date}
                </div>
                <div className="mb-2">
                  <b>Trạng thái:</b> {currentRequest.status}
                </div>
                <div className="mb-2">
                  <b>Ghi chú:</b> {currentRequest.note}
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white"
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
