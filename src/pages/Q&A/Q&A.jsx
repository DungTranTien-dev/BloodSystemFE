import React, { useState } from 'react';
import FAQ from '../../components/ui/FAQ';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

import { motion } from 'framer-motion';

// Animation variants giống Home/Blog
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

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
        {/* Hero Section với hiệu ứng xuất hiện */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-r from-red-700 to-pink-600 text-white py-15.5"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-5xl font-extrabold tracking-tight"
            >
              Lưu ý quan trọng
            </motion.h1>
          </div>
        </motion.section>
        {/* Nội dung chính của trang (FAQ) với hiệu ứng xuất hiện */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10"
        >
          <FAQ />
        </motion.div>
      </div>
      <Footer/>
    </>
  );
};

export default QAPage;
