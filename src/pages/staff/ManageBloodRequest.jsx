import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import PopupForm from "../../components/PopupForm";
import api from "../../config/axios";
import { Row, Col, Card, Typography, Form } from "antd";
import BloodRequestForm from "../../components/BloodRequestForm";
import { Modal, message  } from 'antd';

const { Title, Text } = Typography;

const staffMenus = [
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
        message.error("Lỗi khi tải dữ liệu:", err);
      }
    };
    fetchRequests();
  }, []);

  const filteredList = requestList.filter(
    (item) =>
      (activeStatus === "all" || item.status === activeStatus) &&
      (item.patient.toLowerCase().includes(search.toLowerCase()) ||
        item.bloodGroup.toLowerCase().includes(search.toLowerCase()))
  );

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

  const [showCreateModal, setShowCreateModal] = useState(false);
const [createForm] = Form.useForm();

const handleCreateBloodRequest = async (values) => {
  try {
    const unitMap = {
      '1 Unit (450ml)': 450,
      '2 Units (900ml)': 900,
      '3 Units (1350ml)': 1350,
      '4 Units (1800ml)': 1800,
      '5+ Units (Contact for details)': 2000
    };
    const requestDto = {
      patientName: values.patientName,
      hospitalName: values.hospitalName || 'Unknown',
      bloodGroup: values.bloodGroup,
      componentType: values.componentType,
      volumeInML: unitMap[values.units] || 450,
      reason: values.reason || 'Không rõ'
    };
    const res = await api.post("BloodRequest/create", requestDto);
    if (res.data?.isSuccess) {
      message.success(res.data.message || "Tạo yêu cầu thành công!");

      // 👉 Sau khi tạo xong, gọi lại API để load danh sách mới
      await fetchRequests(); // <-- gọi lại API load danh sách

      createForm.resetFields();
      setShowCreateModal(false);
    } else {
      message.error(res.data?.message || "Tạo yêu cầu thất bại.");
    }
  } catch (err) {
    console.error("Error:", err);
    message.error("Đã có lỗi xảy ra.");
  }
};



  return (
    <>
      <Header pageTitle="Quản lý đơn nhận máu" />
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Sidebar title="Staff Panel" version="v1.0.0" menus={staffMenus} activeLabel="Manage Blood Requests" />
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

          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm theo tên bệnh nhân hoặc nhóm máu..."
              className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex justify-end mb-4">
  <button
    className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold"
    onClick={() => setShowCreateModal(true)}
  >
    + Tạo mới đơn nhận máu
  </button>
</div>


          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-red-200">
                <tr>
                  {["Bệnh nhân", "Nhóm máu", "Thể tích", "Ngày", "Trạng thái", "Hành động"].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-slate-400">Không tìm thấy đơn phù hợp.</td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
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
                      <td className="px-6 py-4 space-y-1">
                        <button className="text-pink-600 hover:underline mr-2" onClick={() => handleDetail(item)}>Chi tiết</button>
                        <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(item)}>Sửa</button>
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
                      <td className="px-6 py-4 space-x-2">
                        <button className="text-pink-600 hover:underline" onClick={() => handleDetail(item)}>Chi tiết</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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


          {isDetailOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết đơn nhận máu</h2>
                {/* <div className="mb-2"><b>Mã đơn:</b> {currentRequest.id}</div> */}
                <div className="mb-2"><b>Bệnh nhân:</b> {currentRequest.patient}</div>
                <div className="mb-2"><b>Nhóm máu:</b> {currentRequest.bloodGroup}</div>
                <div className="mb-2"><b>Thể tích:</b> {currentRequest.volume} ml</div>
                <div className="mb-2"><b>Ngày yêu cầu:</b> {currentRequest.date}</div>
                <div className="mb-2"><b>Trạng thái:</b> {currentRequest.status}</div>
                <div className="mb-2"><b>Ghi chú:</b> {currentRequest.note}</div>
                <div className="flex justify-end">
                  <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white" onClick={() => setIsDetailOpen(false)}>
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