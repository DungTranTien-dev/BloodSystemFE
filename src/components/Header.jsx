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
  return (
    <header className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Tiêu đề & ngày */}
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-1">{pageTitle}</h1>
          <div className="text-slate-500 text-sm">{getToday()}</div>
        </div>

        {/* Lời chào & user */}

      </div>
    </header>
  );
}

export default Header;
