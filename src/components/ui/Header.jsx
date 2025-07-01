import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";


// Component NavLink
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          userId: decoded.UserId,
          email: decoded.Email,
          userName: decoded.UserName,
          avatarUrl: decoded.AvatarUrl || null, // nếu có
        });
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công!");
    setUser(null);
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<ProfileOutlined />} onClick={() => navigate('/profile')}>
        Trang cá nhân
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaHeartbeat className="h-8 w-8 text-red-600" />
            <span className="ml-3 text-2xl font-bold text-slate-800">
              Life<span className="text-pink-600">Stream</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8 bold">
              <NavLink onClick={() => navigate("/")}>Home</NavLink>
              <NavLink onClick={() => navigate("/blog")}>Blog</NavLink>
              <NavLink onClick={() => navigate("/donorblood")}>Donor Blood</NavLink>
              <NavLink onClick={() => navigate("/bloodtype")}>Blood Group</NavLink>
              <NavLink onClick={() => navigate("/blood-request")}>Request Blood</NavLink>
            </ul>
          </nav>

          {/* Auth */}
          <div className="flex items-center">
            {user ? (
              <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar icon={<UserOutlined />} src={user.avatarUrl} />
                  <span className="font-semibold text-slate-700 hidden sm:block">
                    {user.userName || "Tài khoản"}
                  </span>
                </div>
              </Dropdown>
            ) : (
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
        </div>
      </div>
    </header>
  );
}

export default Header;
