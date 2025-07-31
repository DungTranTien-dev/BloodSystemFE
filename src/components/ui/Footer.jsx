import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">LifeStream</h3>
          <p className="text-sm">Kết nối người hiến máu, cứu sống cuộc đời. Sự đóng góp của bạn rất quan trọng.</p>
          <div className="flex space-x-4 mt-6 text-xl">
            <a href="#" className="hover:text-red-500 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><FaLinkedin /></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="/bloodtype" className="hover:text-red-500 hover:underline">Nhóm máu</a></li>
            <li><a href="/blog" className="hover:text-red-500 hover:underline">Blog</a></li>
            <li><a href="/Q&A" className="hover:text-red-500 hover:underline">Hỏi đáp (Q&A)</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@lifestream.org</li>
            <li>Điện thoại: +84 123 456 789</li>
            <li>Địa chỉ: 123 Đường Sức Khỏe, TP. Y tế</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Bản tin</h3>
          <p className="text-sm mb-4">Nhận thông tin mới nhất về các chiến dịch và tin tức của chúng tôi.</p>
          <div className="flex overflow-hidden rounded-md shadow-sm border border-slate-300">
            <input type="email" placeholder="Email của bạn" className="w-full px-4 py-2 text-slate-800 focus:outline-none" />
            <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 font-semibold">Đăng ký</button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} LifeStream. Đã đăng ký bản quyền. Được tạo ra với ❤️ vì một thế giới tốt đẹp hơn.</p>
      </div>
    </footer>
  );
};

export default Footer;