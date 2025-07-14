// pages/blood/BloodTypePage.js
import React, { useState } from "react";
import { 
  FaHeart, FaTint, FaInfoCircle, FaHospital, FaSearch, 
  FaFilter, FaTimes, FaPhone, FaMapMarkerAlt, FaUser 
} from "react-icons/fa";
import Layout from "../../components/ui/Layout";
import DonorSearchPopup from "../../components/DonorSearchPopup ";
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

const MAPBOX_TOKEN = "pk.eyJ1IjoiZHVuZ2RldjExMyIsImEiOiJjbWNicWJnd2owYzF2MmtvbHRjbTI3c3Z6In0.GxTBXw4sDwC2RAzMpNPMRA"; // Replace with your real token

const BloodTypePage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [componentMode, setComponentMode] = useState("whole");

  const [isDonorPopupOpen, setIsDonorPopupOpen] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [donorCoords, setDonorCoords] = useState(null);
  const [route, setRoute] = useState(null);

  const bloodTypes = [
    { type: "A+", description: "Nhóm máu phổ biến thứ hai", percentage: "35.7%", canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
    { type: "A-", description: "Người hiến huyết tương phổ quát", percentage: "6.3%", canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
    { type: "B+", description: "Nhóm máu phổ biến thứ ba", percentage: "8.5%", canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
    { type: "B-", description: "Nhóm máu hiếm", percentage: "1.5%", canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
    { type: "AB+", description: "Người nhận máu phổ quát", percentage: "3.4%", canDonateTo: ["AB+"], canReceiveFrom: ["Tất cả các nhóm"] },
    { type: "AB-", description: "Nhóm máu hiếm nhất", percentage: "0.6%", canDonateTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "O-", "AB-"] },
    { type: "O+", description: "Nhóm máu phổ biến nhất", percentage: "37.4%", canDonateTo: ["O+", "A+", "B+", "AB+"], canReceiveFrom: ["O+", "O-"] },
    { type: "O-", description: "Người hiến máu phổ quát", percentage: "6.6%", canDonateTo: ["Tất cả các nhóm"], canReceiveFrom: ["O-"] }
  ];

  const componentCompatibility = {
    red: {
      "A+": ["A+", "A-", "O+", "O-"],
      "A-": ["A-", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "B-": ["B-", "O-"],
      "AB+": ["All Types"],
      "AB-": ["A-", "B-", "O-", "AB-"],
      "O+": ["O+", "O-"],
      "O-": ["O-"]
    },
    plasma: {
      "A+": ["A+", "AB+"],
      "A-": ["A+", "A-", "AB+", "AB-"],
      "B+": ["B+", "AB+"],
      "B-": ["B+", "B-", "AB+", "AB-"],
      "AB+": ["AB+"],
      "AB-": ["AB+", "AB-"],
      "O+": ["O+", "A+", "B+", "AB+"],
      "O-": ["All Types"]
    },
    platelet: {
      "A+": ["A+", "AB+"],
      "A-": ["A+", "A-", "AB+", "AB-"],
      "B+": ["B+", "AB+"],
      "B-": ["B+", "B-", "AB+", "AB-"],
      "AB+": ["AB+"],
      "AB-": ["AB+", "AB-"],
      "O+": ["O+", "A+", "B+", "AB+"],
      "O-": ["All Types"]
    }
  };

  const facts = [
    "Cứ mỗi 2 giây lại có một người cần truyền máu",
    "Một lần hiến máu có thể cứu tới 3 người",
    "Chỉ dưới 38% dân số đủ điều kiện hiến máu",
    "Máu không thể sản xuất nhân tạo – chỉ có thể đến từ người hiến"
  ];

  const sampleDonors = [
    { id: 1, name: "Nguyễn Văn A", bloodType: "O+", distance: 2.5, lastDonation: "2023-06-15", phone: "0912345678", address: "123 Đường ABC, Quận 1" },
    { id: 2, name: "Trần Thị B", bloodType: "A+", distance: 5.1, lastDonation: "2023-05-20", phone: "0987654321", address: "456 Đường XYZ, Quận 2" },
    { id: 3, name: "Lê Văn C", bloodType: "B+", distance: 3.7, lastDonation: "2023-07-01", phone: "0901122334", address: "789 Đường LMN, Quận 3" }
  ];

  const filteredBloodTypes = bloodTypes.filter(blood => {
    const matchesSearch = blood.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blood.description.toLowerCase().includes(searchTerm.toLowerCase());
    return filterType === "all" ? matchesSearch : matchesSearch && blood.type.includes(filterType);
  });

  const renderCompatibility = () => {
    if (!selectedType) return null;

    let donateTo = [];
    let receiveFrom = [];

    switch(componentMode) {
      case "whole":
        donateTo = selectedType.canDonateTo;
        receiveFrom = selectedType.canReceiveFrom;
        break;
      case "red":
      case "plasma":
      case "platelet":
        donateTo = componentCompatibility[componentMode][selectedType.type] || [];
        receiveFrom = bloodTypes
          .filter(bt => componentCompatibility[componentMode][bt.type]?.includes(selectedType.type))
          .map(bt => bt.type);
        break;
    }

    return (
      <div className="bg-white rounded-lg p-6 mb-16 animate-fade-in">
        <div className="flex flex-wrap gap-4 mb-6">
          {["whole", "red", "plasma", "platelet"].map(mode => (
            <button
              key={mode}
              className={`px-4 py-2 rounded-lg ${componentMode === mode ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setComponentMode(mode)}
            >
              {{
                whole: "Truyền toàn phần",
                red: "Hồng cầu",
                plasma: "Huyết tương",
                platelet: "Tiểu cầu"
              }[mode]}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {selectedType.type} Compatibility ({{
            "whole": "Truyền toàn phần",
            "red": "Hồng cầu",
            "plasma": "Huyết tương",
            "platelet": "Tiểu cầu"
          }[componentMode]})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Có thể hiến cho:</h3>
            <div className="flex flex-wrap gap-2">
              {donateTo.map(type => (
                <span key={type} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{type}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Có thể nhận từ:</h3>
            <div className="flex flex-wrap gap-2">
              {receiveFrom.map(type => (
                <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{type}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSearchDonors = () => {
    const filteredDonors = sampleDonors.filter(donor => donor.bloodType === selectedBloodType);
    setDonors(filteredDonors);
  };

  const handleContactDonor = (donor) => {
    setSelectedDonor(donor);
    const fakeCoords = {
      lat: userLocation.lat + (Math.random() * 0.02 - 0.01),
      lng: userLocation.lng + (Math.random() * 0.02 - 0.01)
    };
    setDonorCoords(fakeCoords);

    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${fakeCoords.lng},${fakeCoords.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`)
      .then(res => res.json())
      .then(data => {
        if (data.routes?.length > 0) {
          setRoute(data.routes[0].geometry);
        }
      });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Tiêu đề với nền chuyển sắc giống Q&A */}
        <div className="bg-gradient-to-r from-red-700 to-pink-600 text-white py-15.5 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Nhóm máu & Tương thích</h1>
          <p className="mt-2 text-lg text-pink-100">Tìm hiểu về các nhóm máu và khả năng truyền nhận</p>
        </div>
        {/* Nội dung chính của trang */}
        <div className="relative z-10 py-8 px-2 sm:px-4 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            {/* Đã chuyển phần title ra ngoài, không cần lặp lại ở đây */}
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm nhóm máu..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-white bold px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="+">Nhóm máu dương (+)</option>
              <option value="-">Nhóm máu âm (-)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredBloodTypes.map((blood) => (
              <div
                key={blood.type}
                className="bg-white rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border"
                onClick={() => setSelectedType(blood)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-red-600">{blood.type}</span>
                  <FaTint className="text-2xl text-red-600" />
                </div>
                <p className="text-gray-600 mb-2">{blood.description}</p>
                <div className="bg-gray-100 rounded-full h-2 mb-2">
                  <div className="bg-red-600 rounded-full h-2" style={{ width: blood.percentage }}></div>
                </div>
                <p className="text-sm text-gray-500">{blood.percentage} dân số</p>
              </div>
            ))}
          </div>

          {selectedType && renderCompatibility()}


  
        </div>
        <DonorSearchPopup
          isOpen={isDonorPopupOpen}
          onClose={() => setIsDonorPopupOpen(false)}
          selectedBloodType={selectedBloodType}
          setSelectedBloodType={setSelectedBloodType}
          setDonors={setDonors}
          handleSearchDonors={handleSearchDonors}
          donors={donors}
          selectedDonor={selectedDonor}
          handleContactDonor={handleContactDonor}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          donorCoords={donorCoords}
          route={route}
          setRoute={setRoute}
          MAPBOX_TOKEN={MAPBOX_TOKEN}
        />
      </div>
      <Footer />
    </>
  );
};

export default BloodTypePage;
