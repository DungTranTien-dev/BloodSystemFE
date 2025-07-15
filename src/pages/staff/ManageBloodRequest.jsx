import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import PopupForm from "../../components/PopupForm";
import api from "../../config/axios";
import { Row, Col, Card, Typography } from "antd";

const { Title, Text } = Typography;


const mapStatusText = (status) => {
  switch (status) {
    case "PENDING": return "Chờ xử lý";
    case "APPROVED": return "Đã duyệt";
    case "WAITING_PAYMENT": return "Chờ thanh toán";
    case "REJECTED": return "Đã từ chối";
    case "FULFILLED": return "Đã cấp máu";
    default: return status;
  }
};

function ManageBloodRequest() {
  const [search, setSearch] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Đảm bảo filteredList được khai báo trước khi dùng
  const filteredList = requestList.filter(
    (item) =>
      (activeStatus === "all" || item.status === activeStatus) &&
      (item.patient.toLowerCase().includes(search.toLowerCase()) ||
        item.bloodGroup.toLowerCase().includes(search.toLowerCase()))
  );
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
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
      }
    };
    fetchRequests();
  }, []);

  const getStatusCounts = () => {
    const counts = {
      total: requestList.length,
      PENDING: 0,
      APPROVED: 0,
      WAITING_PAYMENT: 0,
      REJECTED: 0,
      FULFILLED: 0,
    };
    requestList.forEach((req) => {
      if (counts[req.status] !== undefined) counts[req.status]++;
    });
    return counts;
  };

  const counts = getStatusCounts();

  const requestFields = [
    { name: "patient", label: "Tên bệnh nhân", type: "text", required: true },
    { name: "bloodGroup", label: "Nhóm máu", type: "select", required: true,
      options: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(v => ({ value: v, label: v })) },
    { name: "volume", label: "Thể tích (ml)", type: "number", required: true, min: 100, max: 500 },
    { name: "date", label: "Ngày yêu cầu", type: "date", required: true },
    { name: "status", label: "Trạng thái", type: "select", required: true,
      options: ["PENDING", "APPROVED", "WAITING_PAYMENT", "REJECTED", "FULFILLED"].map(v => ({ value: v, label: mapStatusText(v) })) },
    { name: "note", label: "Ghi chú", type: "textarea" }
  ];

  const handleSubmitRequest = async (formData) => {
    await new Promise((res) => setTimeout(res, 500));
    if (formData.id) {
      setRequestList((prev) => prev.map((item) => item.id === formData.id ? { ...formData, statusText: mapStatusText(formData.status) } : item));
    } else {
      const newId = `REQ${String(requestList.length + 1).padStart(3, "0")}`;
      setRequestList((prev) => [...prev, { ...formData, id: newId, statusText: mapStatusText(formData.status) }]);
    }
    return true;
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
          note: data.reason
        });
        setIsDetailOpen(true);
      }
    } catch (err) {
      console.error("Lỗi lấy chi tiết đơn:", err);
    }
  };

  return (
    <>  
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <main className="flex-1 p-8">
          <Row gutter={[24, 24]} className="mb-8">
            {["total", "PENDING", "APPROVED", "WAITING_PAYMENT", "REJECTED", "FULFILLED"].map((key) => (
              <Col xs={12} md={8} lg={4} key={key}>
                <Card
                  className="cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setActiveStatus(key === "total" ? "all" : key)}>
                  <div className="text-center">
                    <Title level={3}>{counts[key]}</Title>
                    <Text>{key === "total" ? "Tất cả" : mapStatusText(key)}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Title level={2} className="!text-red-600">Quản lý yêu cầu cần máu</Title>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm theo tên bệnh nhân hoặc nhóm máu..."
              className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-red-200">
                <tr>
                  {[
                    // "Mã", // Bỏ cột mã
                    "Bệnh nhân",
                    "Nhóm máu",
                    "Thể tích",
                    "Ngày",
                    "Trạng thái",
                    "Hành động",
                  ].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-slate-400">Không tìm thấy đơn phù hợp.</td>
                  </tr>
                ) : (
                  paginatedList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50">
                      {/* <td className="px-6 py-4 font-mono">{item.id}</td> */}
                      <td className="px-6 py-4">{item.patient}</td>
                      <td className="px-6 py-4">{item.bloodGroup}</td>
                      <td className="px-6 py-4">{item.volume}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${item.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : item.status === "REJECTED"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-slate-100 text-slate-600"}`}>
                          {item.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-y-1 flex gap-2 flex-wrap min-w-[180px]">
                        <button className="text-pink-600 hover:underline" onClick={() => handleDetail(item)}>Xem chi tiết</button>
                        <button className="text-blue-600 hover:text-blue-800 hover:underline" onClick={() => handleEdit(item)}>Sửa</button>
                        {item.status === "PENDING" && (
                          <div className="mt-1 flex gap-2">
                            <button
                              className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs"
                              onClick={() => handleUpdateStatus(item.id, "APPROVED")}
                            >
                              Đồng ý
                            </button>
                            <button
                              className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                              onClick={() => handleUpdateStatus(item.id, "REJECTED")}
                            >
                              Từ chối
                            </button>
                          </div>
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

          <PopupForm
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleSubmitRequest}
            initialData={currentRequest}
            fieldsConfig={requestFields}
            title={currentRequest ? "Chỉnh sửa đơn nhận máu" : "Thêm đơn nhận máu mới"}
            submitText={currentRequest ? "Cập nhật" : "Tạo mới"}
          />

          {isDetailOpen && currentRequest && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="relative flex items-center justify-center min-h-screen w-full">
                <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg transition-all duration-300 transform scale-100 opacity-100">
                  <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết đơn nhận máu</h2>
                  <div className="mb-2"><b>Bệnh nhân:</b> {currentRequest.patient}</div>
                  <div className="mb-2"><b>Nhóm máu:</b> {currentRequest.bloodGroup}</div>
                  <div className="mb-2"><b>Thể tích:</b> {currentRequest.volume} ml</div>
                  <div className="mb-2"><b>Ngày yêu cầu:</b> {currentRequest.date}</div>
                  <div className="mb-2"><b>Trạng thái:</b> {currentRequest.status}</div>
                  <div className="mb-2"><b>Ghi chú:</b> {currentRequest.note}</div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition"
                      onClick={() => setIsDetailOpen(false)}
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

export default ManageBloodRequest;