const navigation = {
  user: [
    { label: "Trang chủ", path: "/" },
    { label: "Lịch sử đặt hẹn", path: "/track-donation" },
    { label: "Bài viết", path: "/blog" },
    { label: "Hỏi đáp", path: "/Q&A" },
    { label: "Nhóm máu", path: "/bloodtype" },
    { label: "Yêu cầu nhận máu", path: "/blood-request" },
  ],
  admin: [
    { label: "Bảng điều khiển", path: "/admin/dashboard" },
    { label: "Quản lý người dùng", path: "/admin/users" },
    { label: "Quản lý bài viết", path: "/admin/blogs" },
    { label: "Yêu cầu nhận máu", path: "/admin/blood-requests" },
  ],
  staff: [
    { label: "Trang chủ", path: "/" },
    { label: "Quản lý lịch hẹn", path: "/staff-request-blood" },
    { label: "Quản lý kho máu", path: "/staff-request-donor" },
    { label: "Tách máu", path: "/DashboardS/blood-separation" },
  ],
};

export default navigation;