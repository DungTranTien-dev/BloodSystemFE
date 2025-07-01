// File: Q&A.jsx
import React from 'react';
import FAQ from '../../components/ui/FAQ';

const QAPage = () => {
  return (
    // Container chính của trang với background gradient và vị trí tương đối
    <div className="min-h-screen bg-White relative overflow-hidden">
      
      {/* Các yếu tố trang trí nền (decorative background elements) */}
      {/* Chúng được đặt trong một div absolute để không ảnh hưởng đến layout của nội dung */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Nội dung chính của trang (được đặt trên nền) */}
      <div className="relative z-10">
        <FAQ />
      </div>
      
    </div>
  );
};

export default QAPage;