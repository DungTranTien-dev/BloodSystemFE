import React from "react";
import Sidebar from "../../components/SideBar"; // Đường dẫn tuỳ theo cấu trúc dự án
import Header from "../../components/Header";

const doctorMenus = [
  { label: "Doctor Page", href: "/doctor" },

  { label: "Manage Medical", href: "/doctor/manage-medical" },
  { label: "Manage Blood", href: "/doctor/manage-blood" },
  { label: "Manage Blood đã phân tách", href: "/doctor/manage-separated" },
];

function DoctorPage() {
  // Giả lập dữ liệu tổng quan
  const stats = [
    {
      title: "Ca khám hôm nay",
      value: 12,
      icon: (
        <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      bg: "bg-pink-100",
    },
    {
      title: "Đơn vị máu còn lại",
      value: 48,
      icon: (
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 21C12 21 5 13.5 5 9.5C5 6.46243 7.46243 4 10.5 4C11.8807 4 13.1174 4.63214 14 5.67157C14.8826 4.63214 16.1193 4 17.5 4C20.5376 4 23 6.46243 23 9.5C23 13.5 16 21 16 21H12Z" />
        </svg>
      ),
      bg: "bg-red-100",
    },
    {
      title: "Yêu cầu truyền máu chờ",
      value: 3,
      icon: (
        <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      bg: "bg-red-50",
    },
  ];

  // Thông báo mẫu
  const notifications = [
    { type: "warning", message: "Cảnh báo: Sắp hết máu nhóm O-!" },
    { type: "info", message: "Lịch trực hôm nay: 08:00 - 17:00" },
    { type: "success", message: "Bạn đã xử lý tất cả yêu cầu khẩn cấp." },
  ];

  return (
    <>
    <Header pageTitle="Welcome Doctor" />
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
    
      <Sidebar
        title="Doctor Panel"
        version="v1.0.0"
        menus={doctorMenus}
        activeLabel="Doctor Page"
      />
      <main className="flex-1 p-8">
        {/* Chào mừng */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Xin chào, Bác sĩ!</h1>
          <p className="text-slate-600 text-lg">Chúc bạn một ngày làm việc hiệu quả và nhiều sức khỏe.</p>
        </div>

        {/* Thông báo */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {notifications.map((n, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-sm
                ${n.type === "warning" ? "bg-red-100 text-red-700" : ""}
                ${n.type === "info" ? "bg-pink-100 text-pink-700" : ""}
                ${n.type === "success" ? "bg-green-100 text-green-700" : ""}
              `}
            >
              {n.type === "warning" && (
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {n.type === "info" && (
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
              {n.type === "success" && (
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span className="font-medium">{n.message}</span>
            </div>
          ))}
        </div>

        {/* Thống kê nhanh */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`rounded-xl p-6 flex items-center gap-4 shadow-md ${stat.bg}`}>
              <div className="flex-shrink-0">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-slate-600">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Lịch trực mẫu */}
        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-red-600 mb-3">Lịch trực hôm nay</h2>
          <ul className="text-slate-700 space-y-2">
            <li>08:00 - 12:00: Khám bệnh thường</li>
            <li>12:00 - 13:00: Nghỉ trưa</li>
            <li>13:00 - 17:00: Quản lý đơn vị máu & xử lý yêu cầu</li>
          </ul>
        </div>
      </main>
    </div>
    </>
  );
}


export default DoctorPage;
