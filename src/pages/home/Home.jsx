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
      title: "Direct Hospital Donation",
      icon: <FaHospital />,
      description: "Visit your nearest hospital to donate blood directly.",
    },
    {
      title: "Mobile Blood Donation Camps",
      icon: <FaTruck />,
      description: "Find mobile camps in your area for convenient donation.",
    },
    {
      title: "Community Donation Centers",
      icon: <FaBuilding />,
      description: "Dedicated centers for safe and efficient blood donation.",
    },
  ];

  const collaborators = [
    {
      name: "NCC",
      description: "National Civic Council",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop",
    },
    {
      name: "NSS",
      description: "National Service Scheme",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    },
    {
      name: "YMCA",
      description: "Young Men's Christian Association",
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
            Be a <span className="text-red-500">Hero</span>. Give{" "}
            <span className="text-pink-400">Blood</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-8">
            Your blood can save lives. Join the movement today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/blood-request")}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Request Blood Now
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/30 transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Become a Donor
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Bạn cần đặt lịch vào thời gian nào?
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
                  // Thêm icon vào nút bấm của Ant Design
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
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-slate-400 mb-12">
            Building a Healthier Future, Together
          </p>
          <p className="max-w-4xl mx-auto text-xl text-slate-600 leading-relaxed">
            We strive to create a{" "}
            <span className="font-semibold text-pink-600">sustainable</span> and{" "}
            <span className="font-semibold text-pink-600">efficient</span> blood
            donation ecosystem. Through community engagement and advanced
            partnerships, we ensure timely access to{" "}
            <span className="font-semibold text-red-600">safe blood</span> for
            all in need.
          </p>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple Ways to Contribute
            </h2>
            <p className="text-lg text-slate-500">
              Your journey to saving lives starts here.
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
              Our Trusted Collaborators
            </h2>
            <p className="text-lg text-slate-500">
              Working together to build a healthier future.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collaborators.map((c) => (
              <CollaboratorCard key={c.name} {...c} />
            ))}
          </div>
        </div>{" "}
      </section>
    </Layout>
  );
};

export default Homepage;
