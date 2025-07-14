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
import ChatBox from '../../components/ai/ChatBox';
import { MessageCircle } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:bg-red-50 text-center">
    <div className="inline-block p-5 bg-gradient-to-br from-red-100 to-pink-100 rounded-full mb-6">
      {React.cloneElement(icon, { className: "text-4xl text-red-600" })}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const CollaboratorCard = ({ name, description, image }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
    <img
      src={image}
      alt={name}
      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{name}</h3>
      <p className="text-slate-500">{description}</p>
    </div>
  </div>
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

    navigate(`/hospital?${searchParams.toString()}`);
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
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <img
          src="https://benhviennhitrunguong.gov.vn/wp-content/uploads/2014/05/82feb3b54937f356ae4a240a8710782b.jpeg"
          alt="Blood donation background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />{" "}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg">
            Hãy là <span className="text-red-500">Người hùng</span>. Hãy <span className="text-pink-400">hiến máu</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-8">
            Máu của bạn có thể cứu sống nhiều người. Hãy tham gia cùng chúng tôi ngay hôm nay.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Bạn muốn đặt lịch hiến máu vào thời gian nào?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Chọn khoảng thời gian phù hợp với lịch trình của bạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl ring-1 ring-slate-900/5">
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

              {/* --- Nút Tìm kiếm được làm LỚN HƠN --- */}
              <div className="md:w-auto w-full">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-10 h-16 text-lg font-semibold text-white rounded-lg
                       flex items-center justify-center
                       bg-gradient-to-r from-red-500 to-pink-600
                       border-0 shadow-lg hover:shadow-xl
                       transform transition-all duration-300 ease-in-out
                       hover:-translate-y-1 active:scale-95"
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Sứ mệnh của chúng tôi</h2>
          <p className="text-lg text-slate-400 mb-12">
            Chung tay xây dựng tương lai khỏe mạnh hơn
          </p>
          <p className="max-w-4xl mx-auto text-xl text-slate-600 leading-relaxed">
            Chúng tôi nỗ lực tạo ra một hệ sinh thái hiến máu <span className="font-semibold text-pink-600">bền vững</span> và <span className="font-semibold text-pink-600">hiệu quả</span>. Thông qua sự gắn kết cộng đồng và hợp tác tiên tiến, chúng tôi đảm bảo mọi người đều được tiếp cận <span className="font-semibold text-red-600">nguồn máu an toàn</span> kịp thời khi cần thiết.
          </p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Những cách đơn giản để đóng góp
            </h2>
            <p className="text-lg text-slate-500">
              Hành trình cứu người bắt đầu từ đây.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {donationMethods.map((method) => (
              <FeatureCard key={method.title} {...method} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Đối tác đồng hành
            </h2>
            <p className="text-lg text-slate-500">
              Chung tay xây dựng cộng đồng khỏe mạnh hơn.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collaborators.map((c) => (
              <CollaboratorCard key={c.name} {...c} />
            ))}
          </div>
        </div>{" "}
      </section>

      {/* Floating AI Chat Button & Box */}
      <div>
        {/* Floating Button */}
        <button
          onClick={() => setShowChat((v) => !v)}
          className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Mở chat AI"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
        {/* ChatBox Floating */}
        {showChat && (
          <div className="fixed z-50 bottom-24 right-6 animate-fade-in">
            <div className="shadow-2xl rounded-2xl">
              <ChatBox />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;