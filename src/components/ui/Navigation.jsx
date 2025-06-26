const navigation = {
  user: [
    { label: "Home", path: "/" },
    { label: "Lịch sử đặt hẹn", path: "/track-donation" },
    { label: "Blog", path: "/blog" },
    { label: "Q&A", path: "/Q&A" },
    { label: "Blood Group", path: "/bloodtype" },
    { label: "Request Blood", path: "/blood-request" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Quản lý người dùng", path: "/admin/users" },
    { label: "Quản lý bài viết", path: "/admin/blogs" },
    { label: "Blood Requests", path: "/admin/blood-requests" },
  ],
  staff: [
    { label: "Trang chủ", path: "/" },
    { label: "Quản lý lịch hẹn", path: "/staff-request-blood" },
    { label: "Quản lý kho máu", path: "/staff-request-donor" },
  ],
};

export default navigation;