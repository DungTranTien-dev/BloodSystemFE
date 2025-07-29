import React from "react";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

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

const pieData = [
  { name: "A+", value: 30 },
  { name: "O+", value: 40 },
  { name: "B+", value: 20 },
  { name: "AB+", value: 10 }
];

const COLORS = ["#EF4444", "#F97316", "#3B82F6", "#10B981"];

const lineData = [
  { name: "Tuần 1", số_lượng: 20 },
  { name: "Tuần 2", số_lượng: 35 },
  { name: "Tuần 3", số_lượng: 50 },
  { name: "Tuần 4", số_lượng: 45 }
];

function StaffPage() {
  const stats = [
    {
      title: "Sự kiện sắp diễn ra",
      value: 4,
      icon: <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
      bg: "bg-pink-100",
    },
    {
      title: "Bản tin chờ duyệt",
      value: 2,
      icon: <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l7 7v9a2 2 0 0 1-2 2z" /></svg>,
      bg: "bg-red-100",
    },
    {
      title: "Blog mới trong tuần",
      value: 7,
      icon: <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M3 4h9" /><path d="M3 20h9" /></svg>,
      bg: "bg-red-50",
    },
  ];

  const notifications = [
    { type: "info", message: "Có sự kiện hiến máu vào ngày 28/06/2025." },
    { type: "warning", message: "Nhớ cập nhật lịch trực tuần tới!" },
    { type: "success", message: "Bạn vừa đăng thành công một blog mới." },
  ];

  return (
    <>
      <Header pageTitle="Welcome Staff" />
      <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Sidebar title="Staff Panel" version="v1.0.0" menus={staffMenus} activeLabel="Staff Page" />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-600 mb-2">Xin chào, Nhân viên!</h1>
            <p className="text-slate-600 text-lg">Chào mừng bạn đến với hệ thống quản lý sự kiện, tin tức và blog.</p>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {notifications.map((n, idx) => (
              <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-sm ${n.type === "warning" ? "bg-red-100 text-red-700" : ""} ${n.type === "info" ? "bg-pink-100 text-pink-700" : ""} ${n.type === "success" ? "bg-green-100 text-green-700" : ""}`}>
                {/* Icons... */}
                <span className="font-medium">{n.message}</span>
              </div>
            ))}
          </div>

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-pink-600 mb-4">Tỷ lệ nhóm máu hiến</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-pink-600 mb-4">Số lượt hiến máu theo tuần</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="số_lượng" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

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
