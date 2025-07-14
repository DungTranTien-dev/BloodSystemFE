// pages/blood/BloodTypePage.js
import React, { useState } from "react";
import { 
  FaHeart, FaTint, FaInfoCircle, FaHospital, FaSearch, 
  FaFilter, FaTimes, FaPhone, FaMapMarkerAlt, FaUser 
} from "react-icons/fa";
import Layout from "../../components/ui/Layout";
import DonorSearchPopup from "../../components/DonorSearchPopup ";

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
    { type: "A+", description: "Second most common blood type", percentage: "35.7%", canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
    { type: "A-", description: "Universal plasma donor", percentage: "6.3%", canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
    { type: "B+", description: "Third most common blood type", percentage: "8.5%", canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
    { type: "B-", description: "Rare blood type", percentage: "1.5%", canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
    { type: "AB+", description: "Universal recipient", percentage: "3.4%", canDonateTo: ["AB+"], canReceiveFrom: ["All Types"] },
    { type: "AB-", description: "Rarest blood type", percentage: "0.6%", canDonateTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "O-", "AB-"] },
    { type: "O+", description: "Most common blood type", percentage: "37.4%", canDonateTo: ["O+", "A+", "B+", "AB+"], canReceiveFrom: ["O+", "O-"] },
    { type: "O-", description: "Universal donor", percentage: "6.6%", canDonateTo: ["All Types"], canReceiveFrom: ["O-"] }
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
    "Someone needs blood every two seconds",
    "One donation can save up to three lives",
    "Less than 38% of the population is eligible to donate blood",
    "Blood cannot be manufactured – it can only come from donors"
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
    <Layout className="bg-gradient-to-r from-red-500 to-pink-600">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Understanding Blood Types</h1>
            <p className="text-xl text-white opacity-90">Learn about different blood types and their compatibility</p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blood types..."
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
              <option value="all">All Types</option>
              <option value="+">Positive Types</option>
              <option value="-">Negative Types</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredBloodTypes.map((blood) => (
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
                  <div className="bg-red-600 rounded-full h-2" style={{ width: blood.percentage }}></div>
                </div>
                <p className="text-sm text-gray-500">{blood.percentage} of population</p>
              </div>
            ))}
          </div>

          {selectedType && renderCompatibility()}

          <div className="bg-white rounded-lg p-6 mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Facts About Blood Donation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facts.map((fact, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FaInfoCircle className="text-red-600 text-xl flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center mx-auto"
              onClick={() => setIsDonorPopupOpen(true)}
            >
              <FaUser className="mr-2" />
              Find Local Donors
            </button>
          </div>
        </div>
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
    </Layout>
  );
};

export default BloodTypePage;
