import React from 'react';

/**
 * Component bao bọc để bắt lỗi đơn giản (không dùng ErrorBoundary class)
 * Sử dụng trong một số tình huống nhỏ hoặc thử nghiệm
 */
const SimpleWrapper = ({ children, fallback }) => {
  try {
    return children;
  } catch (error) {
    console.error('Lỗi được bắt bởi SimpleWrapper:', error);
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Đã xảy ra lỗi
          </h1>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    );
  }
};

export default SimpleWrapper;
