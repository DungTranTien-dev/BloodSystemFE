import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaTruck,
  FaBuilding,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Layout from "../../components/ui/Layout";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Button, Card, DatePicker, Popover } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { MessageCircle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";

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

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    custom={index}
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 text-center border border-transparent hover:border-red-200"
  >
    <div className="inline-block p-5 bg-gradient-to-br from-red-100 to-pink-100 rounded-full mb-6 shadow-md">
      {React.cloneElement(icon, { className: "text-3xl text-red-600 drop-shadow-lg" })}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const CollaboratorCard = ({ name, description, image, index }) => (
  <motion.div
    custom={index}
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="bg-white rounded-3xl shadow-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-pink-200"
  >
    <img
      src={image}
      alt={name}
      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
    />
    <div className="p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-2">{name}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  </motion.div>
);

const Homepage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { RangePicker } = DatePicker;
  const [showChat, setShowChat] = useState(false);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      toast.error("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc để tìm kiếm");
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.set("startDate", format(startDate, "yyyy-MM-dd"));
    searchParams.set("endDate", format(endDate, "yyyy-MM-dd"));

    navigate(`/hospitals?${searchParams.toString()}`);
  };
  const donationMethods = [
    {
      title: "Hiến máu trực tiếp tại bệnh viện",
      icon: <FaHospital />,
      description: "Đến bệnh viện gần nhất để hiến máu trực tiếp.",
    },
    {
      title: "Xe hiến máu lưu động",
      icon: <FaTruck />,
      description: "Tìm các điểm hiến máu lưu động thuận tiện gần bạn.",
    },
    {
      title: "Trung tâm hiến máu cộng đồng",
      icon: <FaBuilding />,
      description: "Các trung tâm chuyên biệt đảm bảo an toàn và hiệu quả cho việc hiến máu.",
    },
  ];

  const collaborators = [
    {
      name: "NCC",
      description: "Hội đồng Công dân Quốc gia",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop",
    },
    {
      name: "NSS",
      description: "Chương trình Dịch vụ Quốc gia",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    },
    {
      name: "YMCA",
      description: "Hiệp hội Thanh niên Cơ đốc",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop",
    },
  ];
  return (
    <Layout className="bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden"
      >
        <img
          src="https://benhviennhitrunguong.gov.vn/wp-content/uploads/2014/05/82feb3b54937f356ae4a240a8710782b.jpeg"
          alt="Blood donation background"
          className="absolute inset-0 w-full h-full object-cover scale-100 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-red-900/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg"
          >
            Hãy là <span className="text-red-500">Người hùng</span>. Hãy <span className="text-pink-400">hiến máu</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-8"
          >
            Máu của bạn có thể cứu sống nhiều người. Hãy tham gia cùng chúng tôi ngay hôm nay.
          </motion.p>
        </div>
      </motion.section>

      {/* Đặt lịch hiến máu Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 md:py-24 bg-slate-50"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 tracking-tight">
              Bạn muốn đặt lịch hiến máu vào thời gian nào?
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Chọn khoảng thời gian phù hợp với lịch trình của bạn
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl ring-1 ring-slate-900/5"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full group">
                <div className="relative transition-all duration-300 rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <RangePicker
                    onChange={(dates) => {
                      setStartDate(dates?.[0]?.toDate());
                      setEndDate(dates?.[1]?.toDate());
                    }}
                    format="DD/MM/YYYY"
                    className="h-16 w-full !border-slate-300 !rounded-lg text-base placeholder:!text-slate-400 focus:!border-blue-500 focus:!shadow-none"
                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  />
                </div>
              </div>
              <div className="md:w-auto w-full">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-10 h-16 text-lg font-semibold text-white rounded-lg flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 border-0 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:-translate-y-1 active:scale-95"
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sứ mệnh Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Nội dung bên trái */}
            <div className="flex-1 text-left md:pl-0 md:pr-6">
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-3xl font-bold mb-4 text-slate-800"
              >
                Sứ mệnh của chúng tôi
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-base text-slate-500 mb-4"
              >
                Chung tay xây dựng tương lai khỏe mạnh hơn
              </motion.p>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-base text-slate-600 mb-6"
              >
                Chúng tôi nỗ lực tạo ra một hệ sinh thái hiến máu <span className="font-semibold text-pink-600">bền vững</span> và <span className="font-semibold text-pink-600">hiệu quả</span>. Thông qua sự gắn kết cộng đồng và hợp tác tiên tiến, chúng tôi đảm bảo mọi người đều được tiếp cận <span className="font-semibold text-red-600">nguồn máu an toàn</span> kịp thời khi cần thiết.
              </motion.p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-2 text-base text-slate-700"><CheckCircle className="w-5 h-5 text-green-400 mt-1" /> Đội ngũ y bác sĩ có trình độ chuyên môn cao</li>
                <li className="flex items-start gap-2 text-base text-slate-700"><CheckCircle className="w-5 h-5 text-green-400 mt-1" /> Phòng y tế được trang bị đầy đủ thiết bị</li>
                <li className="flex items-start gap-2 text-base text-slate-700"><CheckCircle className="w-5 h-5 text-green-400 mt-1" /> Hệ thống theo dõi sức khỏe học sinh thông minh</li>
                <li className="flex items-start gap-2 text-base text-slate-700"><CheckCircle className="w-5 h-5 text-green-400 mt-1" /> Kết nối trực tiếp với phụ huynh và giáo viên</li>
              </ul>
            </div>
            {/* Hình ảnh bên phải */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-2 md:p-4 flex items-center justify-center w-full max-w-md">
                <img
                  src="http://phacdo.soytequangninh.gov.vn/uploads/news/642f8b6de014f/happy-mothers-day.jpg"
                  alt="Sứ mệnh hiến máu"
                  className="rounded-2xl w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Đóng góp Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-slate-50"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Những cách đơn giản để đóng góp
            </h2>
            <p className="text-base text-slate-500">
              Hành trình cứu người bắt đầu từ đây.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {donationMethods.map((method, idx) => (
              <FeatureCard key={method.title} {...method} index={idx + 1} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Đối tác Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Đối tác đồng hành
            </h2>
            <p className="text-base text-slate-500">
              Chung tay xây dựng cộng đồng khỏe mạnh hơn.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {collaborators.map((c, idx) => (
              <CollaboratorCard key={c.name} {...c} index={idx + 1} />
            ))}
          </div>
        </div>
      </motion.section>

   
    </Layout>
  );
};

export default Homepage;