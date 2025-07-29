import React from 'react';

// Component fallback đơn giản (phải dùng function vì ErrorBoundary yêu cầu class)
const SimpleErrorFallback = ({ error, resetError }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Đã xảy ra lỗi
        </h1>
        <p className="text-gray-600 mb-6">
          Có lỗi bất ngờ xảy ra. Vui lòng tải lại trang hoặc thử lại sau.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Tải lại trang
        </button>

        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-gray-700 font-medium">
              Chi tiết lỗi (Chỉ hiển thị ở chế độ phát triển)
            </summary>
            <div className="mt-2 p-4 bg-gray-100 rounded text-sm">
              <p className="font-bold text-red-600">Lỗi:</p>
              <pre className="whitespace-pre-wrap">{error.toString()}</pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

// Xuất cho tương thích
export default SimpleErrorFallback;
export { SimpleErrorFallback };
