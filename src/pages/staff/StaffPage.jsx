import React from "react";
import Sidebar from "../../components/SideBar"; // Đường dẫn tuỳ theo cấu trúc dự án
import Header from "../../components/Header";

const staffMenus = [
  { label: "Trang nhân viên", href: "/staff" },
  { label: "Quản lý sự kiện", href: "/staff/manage-event" },
  { label: "Quản lý tin tức", href: "/staff/manage-news" },
  { label: "Quản lý yêu cầu máu", href: "/staff/manage-blood-requests" },
  { label: "Quản lý hồ sơ y tế", href: "/doctor/manage-medical" },
  { label: "Quản lý máu", href: "/doctor/manage-blood" },
  { label: "Quản lý máu đã phân tách", href: "/doctor/manage-separated" },
  { label: "Quản lý đăng ký hiến máu", href: "/staff/manage-registion" },
];

function StaffPage() {
  // Dữ liệu tổng quan mẫu
  const stats = [
    {
      title: "Sự kiện sắp diễn ra",
      value: 4,
      icon: (
        <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      bg: "bg-pink-100",
    },
    {
      title: "Tin tức chờ duyệt",
      value: 2,
      icon: (
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l7 7v9a2 2 0 0 1-2 2z" />
        </svg>
      ),
      bg: "bg-red-100",
    },
    {
      title: "Blog mới trong tuần",
      value: 7,
      icon: (
        <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 20h9" />
          <path d="M12 4v16" />
          <path d="M3 4h9" />
          <path d="M3 20h9" />
        </svg>
      ),
      bg: "bg-red-50",
    },
  ];

  // Thông báo mẫu
  const notifications = [
    { type: "info", message: "Có sự kiện hiến máu vào ngày 28/06/2025." },
    { type: "warning", message: "Nhớ cập nhật lịch trực tuần tới!" },
    { type: "success", message: "Bạn vừa đăng thành công một blog mới." },
  ];

  return (
    <>
    <Header pageTitle="Chào mừng Nhân viên" />
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        
      <Sidebar
        title="Staff Panel"
        version="v1.0.0"
        menus={staffMenus}
        activeLabel="Staff Page"
      />
      <main className="flex-1 p-8">
        {/* Chào mừng */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">Xin chào, Nhân viên!</h1>
          <p className="text-slate-600 text-lg">Chào mừng bạn đến với hệ thống quản lý sự kiện, tin tức và blog.</p>
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

        {/* Lịch sự kiện mẫu */}
        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-pink-600 mb-3">Sự kiện sắp diễn ra</h2>
          <ul className="text-slate-700 space-y-2">
            <li>28/06/2025: Hiến máu nhân đạo tại Trung tâm A</li>
            <li>01/07/2025: Tập huấn nhân viên mới</li>
            <li>05/07/2025: Hội thảo truyền thông nội bộ</li>
          </ul>
        </div>
      </main>
    </div>
    </>
  );
}

export default StaffPage;
