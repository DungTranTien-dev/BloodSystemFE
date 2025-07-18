import React from 'react';

const IdentityDocumentUpload = ({
  identityFile,
  setIdentityFile,
  dragActive,
  setDragActive,
  fileInputRef,
  errors,
  simulateOCRExtraction
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdentityFile(file);
      simulateOCRExtraction(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setIdentityFile(file);
      simulateOCRExtraction(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://localhost:5173/upload";

  return (
    <div className="max-w-6xl mx-auto mt-8 mb-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-slate-200">
            <div className="flex items-center mb-4">
              <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 mr-2 font-semibold text-sm">
                Giấy tờ tùy thân
              </span>
              <span className="font-bold text-lg">Đăng ký tài khoản</span>
            </div>
            <ul className="list-disc ml-6 text-slate-700 text-sm mb-4">
              <li>Để đăng ký tài khoản vui lòng cung cấp thông tin giấy tờ tùy thân của người hiến máu.</li>
              <li>Vui lòng chuẩn bị giấy tờ tùy thân để hệ thống ghi nhận lại mặt trước của giấy tờ tùy thân.</li>
            </ul>
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{ minHeight: 180 }}
            >
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-slate-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0-3.5 3.5M12 8l3.5 3.5M21 16.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5M3 16.5A4.5 4.5 0 0 1 7.5 12h9a4.5 4.5 0 0 1 4.5 4.5" />
                </svg>
                <span className="font-medium text-slate-700">Cách 1: Kéo và thả file tại đây</span>
                <span className="text-slate-500 text-sm mb-2">Hoặc</span>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => fileInputRef.current.click()}
                >
                  Chọn file để tải lên
                </button>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                {identityFile && (
                  <div className="mt-2 text-green-600 text-sm">
                    <span>✓ Đã chọn: {identityFile.name}</span>
                    <div className="text-xs text-slate-500 mt-1">
                      Size: {(identityFile.size / 1024).toFixed(1)} KB | Type: {identityFile.type}
                    </div>
                  </div>
                )}
                {errors.identityFile && (
                  <span className="mt-2 text-red-500 text-sm">{errors.identityFile}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <span className="font-semibold text-slate-700 mb-2">
              Cách 2: Quét mã QR Code để tải lên từ điện thoại
            </span>
            <img src={qrCodeUrl} alt="QR Code" className="w-36 h-36 border border-slate-200 rounded bg-white" />
            <span className="text-xs text-blue-600 mt-2">Quét mã QR Code để tải file từ điện thoại</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityDocumentUpload;
