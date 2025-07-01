import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import PopupForm from "../../components/PopupForm"; // Đường dẫn tuỳ dự án
import Header from "../../components/Header";
const staffMenus = [
  { label: "Staff Page", href: "/staff" },
  { label: "Manage Event", href: "/staff/manage-event" },
  { label: "Manage News", href: "/staff/manage-news" },
  { label: "Manage Blood Requests", href: "/staff/manage-blood-requests" },
];

// Dữ liệu mẫu
const newsSample = [
  {
    id: "NEWS001",
    title: "Khai trương điểm hiến máu mới tại Quận 1",
    date: "2025-06-25",
    author: "Nguyễn Văn B",
    summary: "Điểm hiến máu mới tại Quận 1 chính thức đi vào hoạt động từ hôm nay.",
    content: "Sáng nay, Trung tâm hiến máu nhân đạo đã khai trương điểm hiến máu mới tại Quận 1, TP.HCM...",
    status: "Đã đăng",
  },
  {
    id: "NEWS002",
    title: "Thông báo lịch hiến máu tháng 7",
    date: "2025-06-20",
    author: "Trần Thị C",
    summary: "Lịch hiến máu tháng 7 đã được cập nhật. Mời mọi người đăng ký tham gia.",
    content: "Trung tâm xin thông báo lịch hiến máu tháng 7 tại các điểm hiến máu cố định và lưu động...",
    status: "Chờ duyệt",
  },
];

function ManageNews() {
  const [search, setSearch] = useState("");
  const [newsList, setNewsList] = useState(newsSample);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Lọc theo tiêu đề hoặc tác giả
  const filteredList = newsList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase())
  );

  // Cấu hình field cho form News
  const newsFields = [
    {
      name: "title",
      label: "Tiêu đề",
      type: "text",
      placeholder: "Nhập tiêu đề tin tức",
      required: true
    },
    {
      name: "date",
      label: "Ngày đăng",
      type: "date",
      required: true
    },
    {
      name: "author",
      label: "Tác giả",
      type: "text",
      placeholder: "Nhập tên tác giả",
      required: true
    },
    {
      name: "summary",
      label: "Tóm tắt",
      type: "textarea",
      placeholder: "Nhập tóm tắt tin tức",
      required: true
    },
    {
      name: "content",
      label: "Nội dung",
      type: "textarea",
      placeholder: "Nhập nội dung chi tiết",
      required: true
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      options: [
        { value: "Đã đăng", label: "Đã đăng" },
        { value: "Chờ duyệt", label: "Chờ duyệt" },
        { value: "Bản nháp", label: "Bản nháp" }
      ],
      required: true
    }
  ];

  // Xử lý submit form (thêm/sửa)
  const handleSubmitNews = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (formData.id) {
      // Cập nhật
      setNewsList(prev =>
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      // Thêm mới
      const newId = `NEWS${String(newsList.length + 1).padStart(3, '0')}`;
      setNewsList(prev => [
        ...prev,
        { ...formData, id: newId }
      ]);
    }
    return true;
  };

  // Xem chi tiết
  const handleDetail = (item) => {
    setCurrentNews(item);
    setIsDetailOpen(true);
  };

  // Mở popup thêm mới
  const handleCreate = () => {
    setCurrentNews(null);
    setIsPopupOpen(true);
  };

  // Mở popup sửa
  const handleEdit = (item) => {
    setCurrentNews(item);
    setIsPopupOpen(true);
  };

  return (
    <>
    <Header pageTitle="Quản lý tin tức" />
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Sidebar
        title="Staff Panel"
        version="v1.0.0"
        menus={staffMenus}
        activeLabel="Manage News"
      />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-1">Quản lý tin tức</h1>
            <p className="text-slate-600">Tạo, chỉnh sửa và theo dõi các bản tin.</p>
          </div>
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
            onClick={handleCreate}
          >
            + Thêm tin tức
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm theo tiêu đề hoặc tác giả..."
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
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Mã tin</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Tiêu đề</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Ngày đăng</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Tác giả</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    Không tìm thấy tin tức phù hợp.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50 transition">
                    <td className="px-6 py-4 font-mono text-slate-700">{item.id}</td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.author}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            item.status === "Đã đăng"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Chờ duyệt"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-pink-100 text-pink-700"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="text-pink-600 hover:underline"
                        onClick={() => handleDetail(item)}
                      >
                        Xem chi tiết
                      </button>
                      <button
                        className="text-pink-600 hover:text-pink-800"
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
        </div>

        {/* Pagination mẫu */}
        <div className="mt-6 flex justify-end">
          <nav className="inline-flex rounded-md shadow-sm">
            <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-l hover:bg-red-50">Trước</button>
            <button className="px-3 py-1 bg-pink-500 text-white border-t border-b border-slate-200 font-semibold">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-r hover:bg-red-50">Sau</button>
          </nav>
        </div>

        {/* PopupForm dùng chung cho thêm/sửa */}
        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmitNews}
          initialData={currentNews}
          fieldsConfig={newsFields}
          title={currentNews ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
          submitText={currentNews ? "Cập nhật" : "Tạo mới"}
        />

        {/* Popup xem chi tiết */}
        {isDetailOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4 text-red-600">Chi tiết tin tức</h2>
              <div className="mb-2"><span className="font-semibold">Mã tin:</span> {currentNews.id}</div>
              <div className="mb-2"><span className="font-semibold">Tiêu đề:</span> {currentNews.title}</div>
              <div className="mb-2"><span className="font-semibold">Ngày đăng:</span> {currentNews.date}</div>
              <div className="mb-2"><span className="font-semibold">Tác giả:</span> {currentNews.author}</div>
              <div className="mb-2"><span className="font-semibold">Trạng thái:</span> {currentNews.status}</div>
              <div className="mb-2"><span className="font-semibold">Tóm tắt:</span> {currentNews.summary}</div>
              <div className="mb-4"><span className="font-semibold">Nội dung:</span> {currentNews.content}</div>
              <div className="flex justify-end">
                <button
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition"
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

export default ManageNews;
