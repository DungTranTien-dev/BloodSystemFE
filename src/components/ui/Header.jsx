import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHeartbeat } from "react-icons/fa";
import { Dropdown, Menu, Avatar, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { logout } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

// Component NavLink không thay đổi
const NavLink = ({ children, onClick }) => (
  <li
    className="font-medium text-slate-700 hover:text-red-600 transition-colors duration-300 cursor-pointer"
    onClick={onClick}
  >
    {children}
  </li>
);

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  // Menu cho Dropdown khi người dùng đã đăng nhập
  const userMenu = {
    items: [
      {
        key: "profile",
        icon: <ProfileOutlined />,
        label: "Trang cá nhân",
        onClick: () => navigate("/profile"),
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        onClick: handleLogout,
      },
    ],
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section (Giữ nguyên) */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaHeartbeat className="h-8 w-8 text-red-600" />
            <span className="ml-3 text-2xl font-bold text-slate-800">
              Life<span className="text-pink-600">Stream</span>
            </span>
          </div>

          {/* Desktop Navigation (Giữ nguyên) */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8 bold">
              <NavLink onClick={() => navigate("/")}>Home</NavLink>
              {user && (
                <NavLink onClick={() => navigate("/track-donation")}>
                  Lịch sử đặt hẹn
                </NavLink>
              )}
              <NavLink onClick={() => navigate("/blog")}>Blog</NavLink>
              <NavLink onClick={() => navigate("/about-us")}>About Us</NavLink>
              <NavLink onClick={() => navigate("/Q&A")}>Q&A</NavLink>
              <NavLink onClick={() => navigate("/bloodtype")}>
                Blood Group
              </NavLink>
              <NavLink onClick={() => navigate("/blood-request")}>
                Request Blood
              </NavLink>
            </ul>
          </nav>

          {/* === PHẦN ĐÃ ĐƯỢC THAY ĐỔI ĐỂ TRỞ NÊN ĐA NĂNG === */}
          <div className="flex items-center">
            {user ? (
              // Giao diện khi ĐÃ ĐĂNG NHẬP
              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar icon={<UserOutlined />} src={user.avatarUrl} />
                  {/* Giả sử API trả về có trường `fullName` */}
                  <span className="font-semibold text-slate-700 hidden sm:block">
                    {user.fullName || "Tài khoản"}
                  </span>
                </div>
              </Dropdown>
            ) : (
              // Giao diện khi CHƯA ĐĂNG NHẬP (Giữ nguyên code cũ của bạn)
              <div className="flex items-center space-x-3">
                <button
                  className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-3.5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
          {/* === KẾT THÚC PHẦN THAY ĐỔI === */}
        </div>
      </div>
    </header>
  );
}

export default Header;
