import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

/**
 * Component hiển thị lỗi cho React Router
 * Xử lý các lỗi điều hướng và cung cấp giao diện thân thiện với người dùng
 */
const ErrorPage = () => {
  const error = useRouteError();
  console.error('Lỗi định tuyến:', error);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Biểu tượng lỗi */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Tiêu đề lỗi */}
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Ôi! Có lỗi xảy ra
        </h1>

        {/* Thông báo lỗi */}
        <p className="text-slate-600 mb-6">
          {error?.status === 404 
            ? "Trang bạn đang tìm không tồn tại."
            : error?.statusText || error?.message || "Đã xảy ra lỗi không xác định."
          }
        </p>

        {/* Chi tiết lỗi (chỉ hiển thị ở môi trường phát triển) */}
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <details className="text-left mb-6 p-3 bg-slate-100 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium text-slate-700 mb-2">
              Chi tiết lỗi (chế độ phát triển)
            </summary>
            <pre className="text-xs text-slate-600 overflow-auto max-h-32">
              {error.stack}
            </pre>
          </details>
        )}

        {/* Các nút điều hướng */}
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Về trang chủ
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
          >
            Quay lại
          </button>
        </div>

        {/* Mã trạng thái lỗi */}
        {error?.status && (
          <p className="text-xs text-slate-400 mt-4">
            Mã lỗi {error.status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
