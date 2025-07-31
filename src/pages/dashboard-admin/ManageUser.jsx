import React, { useEffect, useState } from "react";
import PopupForm from "../../components/PopupForm";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../../service/userApi";

function ManageUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res.success) setUsers(res.data);
  };

  const filteredList = users.filter(
    (item) =>
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCreate = () => {
    setCurrentUser(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser({
      id: user.userId,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
    setIsPopupOpen(true);
  };

  const handleSubmitUser = async (formData) => {
    const payload = {
      userName: formData.userName,
      email: formData.email,
      role: formData.role,
      password: formData.password || "", // chỉ khi tạo mới thì có
    };

    let res;
    if (currentUser) {
      res = await updateUser(currentUser.id, payload);
    } else {
      res = await createUser(payload);
    }

    if (res.success) {
      await fetchUsers();
      setIsPopupOpen(false);
      setCurrentUser(null);
      return true;
    }
    return false;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const res = await deleteUser(id);
      if (res.success) {
        setUsers(users.filter((u) => u.userId !== id));
      }
    }
  };

  const handleViewDetail = async (id) => {
    const res = await getUserById(id);
    if (res.success) setDetailUser(res.data);
  };

  // Cấu hình field cho form (ẩn password khi update)
  const userFieldsConfig = [
    {
      name: "userName",
      label: "Tên người dùng",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    !currentUser && {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      required: true,
    },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      required: true,
      options: [
        { value: "CUSTOMER", label: "Khách hàng" },
        { value: "STAFF", label: "Nhân viên" },
        { value: "HOSPITAL", label: "Bệnh viện" },
        { value: "ADMIN", label: "Quản trị" },
      ],
    },
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-1">
              Quản lý người dùng
            </h1>
            <p className="text-slate-600">
              Thêm, sửa, xóa và xem chi tiết người dùng.
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
            onClick={handleCreate}
          >
            + Thêm người dùng
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm theo tên, email hoặc vai trò..."
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
                {["Tên", "Email", "Vai trò", "Hành động"].map((title) => (
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
                  <td colSpan={4} className="text-center py-8 text-slate-400">
                    Không tìm thấy người dùng phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedList.map((user) => (
                  <tr
                    key={user.userId}
                    className="hover:bg-red-50 transition"
                  >
                    <td className="px-6 py-4">{user.userName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 flex gap-3">
                    
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(user.userId)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
                className={`px-3 py-1 border text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-red-100 transition`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded-r border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-red-100 transition"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        )}

        {/* Popup Form */}
        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmitUser}
          initialData={currentUser}
          fieldsConfig={userFieldsConfig}
          title={currentUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          submitText={currentUser ? "Cập nhật" : "Tạo mới"}
          popupEffect
        />

        {/* Detail Popup */}
        {detailUser && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 backdrop-blur-sm" />
            <div className="relative flex items-center justify-center min-h-screen w-full">
              <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg transition-all duration-300">
                <h2 className="text-xl font-bold mb-4 text-red-600">
                  Chi tiết người dùng
                </h2>
                <div className="mb-2">
                  <span className="font-semibold">Tên:</span>{" "}
                  {detailUser.userName}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {detailUser.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Vai trò:</span>{" "}
                  {detailUser.role}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition"
                    onClick={() => setDetailUser(null)}
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
  );
}

export default ManageUser;
