import React, { useState } from "react";
import { FaHeart, FaTint, FaInfoCircle, FaHospital } from "react-icons/fa";
import Layout from "../../components/ui/Layout";
import ChatBox from '../../components/ai/ChatBox';
import { MessageCircle } from 'lucide-react';

const BloodTypePage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const bloodTypes = [
    {
      type: "A+",
      description: "Nhóm máu phổ biến thứ hai",
      percentage: "35.7%",
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"]
    },
    {
      type: "A-",
      description: "Nhóm máu hiếm, cho huyết tương phổ quát",
      percentage: "6.3%",
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"]
    },
    {
      type: "B+",
      description: "Nhóm máu phổ biến thứ ba",
      percentage: "8.5%",
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"]
    },
    {
      type: "B-",
      description: "Nhóm máu hiếm",
      percentage: "1.5%",
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"]
    },
    {
      type: "AB+",
      description: "Nhận được tất cả các nhóm máu (người nhận phổ quát)",
      percentage: "3.4%",
      canDonateTo: ["AB+"],
      canReceiveFrom: ["Tất cả các nhóm"]
    },
    {
      type: "AB-",
      description: "Nhóm máu hiếm nhất",
      percentage: "0.6%",
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["A-", "B-", "O-", "AB-"]
    },
    {
      type: "O+",
      description: "Nhóm máu phổ biến nhất",
      percentage: "37.4%",
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"]
    },
    {
      type: "O-",
      description: "Người cho phổ quát",
      percentage: "6.6%",
      canDonateTo: ["Tất cả các nhóm"],
      canReceiveFrom: ["O-"]
    }
  ];

  const facts = [
    "Cứ mỗi 2 giây lại có một người cần truyền máu",
    "Một lần hiến máu có thể cứu được tới ba người",
    "Chỉ dưới 38% dân số đủ điều kiện hiến máu",
    "Máu không thể sản xuất nhân tạo – chỉ có thể đến từ người hiến"
  ];

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-pink-50">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Tìm hiểu về các nhóm máu
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {bloodTypes.map((blood) => (
            <div
              key={blood.type}
              className="bg-white rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedType(blood)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-red-600">{blood.type}</span>
                <FaTint className="text-2xl text-red-600" />
              </div>
              <p className="text-gray-600 mb-2">{blood.description}</p>
              <div className="bg-gray-100 rounded-full h-2 mb-2">
                <div
                  className="bg-red-600 rounded-full h-2"
                  style={{ width: blood.percentage }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{blood.percentage} dân số</p>
            </div>
          ))}
        </div>

        {selectedType && (
          <div className="bg-white rounded-lg p-6 mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Khả năng tương thích của nhóm {selectedType.type}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Có thể cho:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedType.canDonateTo.map((type) => (
                    <span
                      key={type}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Có thể nhận từ:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedType.canReceiveFrom.map((type) => (
                    <span
                      key={type}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}      

        {/* Floating AI Chat Button & Box */}
        <div>
          <button
            onClick={() => setShowChat((v) => !v)}
            className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Mở chat AI"
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
      </div>
    </Layout>
  );
};

export default BloodTypePage;