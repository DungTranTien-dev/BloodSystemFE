import React from "react";

function Sidebar({ title, version, menus, activeLabel }) {
  return (
    <aside className="w-64 bg-white shadow-xl text-slate-800 flex flex-col border-r border-slate-200 min-h-screen">
      {/* Tiêu đề sidebar */}
      <header className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 border-b">
        <h1 className="text-lg font-bold leading-tight truncate">{title}</h1>
        {version && <p className="text-xs text-red-100 mt-1">{version}</p>}
      </header>

      {/* Menu điều hướng */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menus.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className={`w-full flex items-center px-6 py-3 text-left rounded-r-full mr-4 transition-colors duration-200
                  ${
                    activeLabel === item.label
                      ? "bg-gradient-to-r from-red-100 to-pink-100 border-r-4 border-red-500 text-red-700"
                      : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                  }
                `}
                aria-current={activeLabel === item.label ? "page" : undefined}
              >
                <span className="text-sm font-medium truncate">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Phần cuối sidebar */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto">
        <div className="text-xs text-slate-500">
          Giải pháp quản lý ngân hàng máu toàn diện
        </div>
        <div className="text-xs text-slate-400 mt-1">
          Cập nhật lần cuối: 25/06/2025
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
