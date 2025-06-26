// File: Hero.jsx
import React from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';

const Hero = () => {
  return (
    // Phần container chính của Hero section, với padding và vị trí tương đối
    <div className="relative overflow-hidden py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon chính được bọc trong một hình tròn mờ */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        
        {/* Tiêu đề chính, với font lớn và hiệu ứng fade-in */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Câu Hỏi Thường Gặp
        </h1>
        
        {/* Đoạn mô tả ngắn, giới hạn chiều rộng để dễ đọc */}
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          Tìm kiếm câu trả lời cho các thắc mắc của bạn. Chúng tôi đã tổng hợp những câu hỏi phổ biến nhất để giúp bạn.
        </p>
        
        {/* Một "badge" nhỏ thể hiện sự hỗ trợ, với hiệu ứng scale-in */}
        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 animate-scale-in">
            <HelpCircle className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Hỗ trợ 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;