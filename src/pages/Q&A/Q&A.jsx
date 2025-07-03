import React, { useState } from 'react';
import FAQ from '../../components/ui/FAQ';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ChatBox from '../../components/ai/ChatBox';
import { MessageCircle } from 'lucide-react';

const QAPage = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-White relative overflow-hidden">
      {/* Các yếu tố trang trí nền (decorative background elements) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-2xl"></div>
      </div>
      {/* Nội dung chính của trang (được đặt trên nền) */}
      <div className="relative z-10">
        <FAQ />
      </div>
      {/* Floating AI Chat Button & Box */}
      <div>
        <button
          onClick={() => setShowChat((v) => !v)}
          className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
        {showChat && (
          <div className="fixed z-50 bottom-24 right-6 animate-fade-in">
            <div className="shadow-2xl rounded-2xl">
              <ChatBox />
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default QAPage;
