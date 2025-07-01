import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";


function getToday() {
  return new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function Header({ pageTitle = "Dashboard" }) {
  const [open, setOpen] = useState(false);

  // Lấy user từ token trong localStorage
  let user = null;
  const token = localStorage.getItem("token");
  console.log(token);
if (token) {
    try {
      const payload = jwtDecode(token); // dùng thư viện để decode
      console.log("JWT Payload:", payload);
      user = {
        name: payload.UserName || payload.username || payload.name || "Người dùng",
        email: payload.Email,
        userId: payload.UserId,
        role: payload.Role || "User",
        avatar: "https://i.pravatar.cc/100?img=3",
      };
    } catch (e) {
      console.error("Lỗi giải mã token:", e);
      user = null;
    }
  
  }

  return (
    <header className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Tiêu đề & ngày */}
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-1">{pageTitle}</h1>
          <div className="text-slate-500 text-sm">{getToday()}</div>
        </div>

        {/* Lời chào & user */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <div className="font-semibold text-slate-700">
              Xin chào,{" "}
              <span className="text-pink-600">
                {user ? user.name : "Người dùng"}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {user ? user.role : ""}
            </div>
          </div>
          {/* Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="focus:outline-none"
              aria-label="Tài khoản"
            >
              <img
                src={user?.avatar || "https://i.pravatar.cc/100?img=3"}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-pink-400 shadow"
              />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                <div className="px-4 py-3 border-b">
                  <div className="font-semibold">{user ? user.name : ""}</div>
                  <div className="text-xs text-slate-400">
                    {user ? user.role : ""}
                  </div>
                </div>
                <ul>
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-pink-50 text-slate-700"
                    >
                      Thông tin cá nhân
                    </a>
                  </li>
                  <li>
                    <a
                      href="/settings"
                      className="block px-4 py-2 hover:bg-pink-50 text-slate-700"
                    >
                      Cài đặt
                    </a>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-pink-50 text-red-500"
                      onClick={() => alert("Đăng xuất")}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
