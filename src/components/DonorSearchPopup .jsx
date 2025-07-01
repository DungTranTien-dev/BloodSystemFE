import React from 'react';
import { FaTimes, FaHeart, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Map, { Marker, Source, Layer } from 'react-map-gl';

const DonorSearchPopup = ({
  isOpen,
  onClose,
  selectedBloodType,
  setSelectedBloodType,
  handleSearchDonors,
  donors,
  selectedDonor,
  handleContactDonor,
  userLocation,
  donorCoords,
  route,
  MAPBOX_TOKEN
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-600">Tìm người hiến máu gần bạn</h2>
          <button onClick={onClose}>
            <FaTimes className="text-slate-500 hover:text-slate-700 text-xl" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Form tìm kiếm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Nhóm máu cần</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
              >
                <option value="">Chọn nhóm máu</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={handleSearchDonors}
                disabled={!selectedBloodType}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
          
          {/* Kết quả tìm kiếm */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Danh sách người hiến máu */}
            <div className="space-y-4">
              {donors.length > 0 && (
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tìm thấy {donors.length} người hiến máu phù hợp
                </h3>
              )}
              
              {donors.map((donor) => (
                <div 
                  key={donor.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedDonor?.id === donor.id 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-200 hover:shadow-md"
                  }`}
                  onClick={() => handleContactDonor(donor)}
                >
                  <div className="flex items-start">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold text-gray-800">{donor.name}</h3>
                        <div className="flex items-center">
                          <FaHeart className="text-red-600 mr-1" />
                          <span className="font-semibold">{donor.bloodType}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>Cách {donor.distance} km</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaPhone className="mr-2" />
                          <span>{donor.phone}</span>
                        </div>
                        <div className="text-gray-600">
                          Hiến máu lần cuối: {donor.lastDonation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bản đồ chỉ đường */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                {selectedDonor && donorCoords
                  ? `Chỉ đường đến ${selectedDonor.name}`
                  : "Chọn người hiến máu để xem chỉ đường"}
              </h4>
              
              {selectedDonor && donorCoords && (
                <div className="border rounded-lg overflow-hidden">
                  <Map
                    initialViewState={{
                      latitude: userLocation.lat,
                      longitude: userLocation.lng,
                      zoom: 12
                    }}
                    style={{ width: '100%', height: 300 }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                  >
                    <Marker 
                      longitude={userLocation.lng} 
                      latitude={userLocation.lat} 
                      color="blue" 
                    />
                    <Marker 
                      longitude={donorCoords.lng} 
                      latitude={donorCoords.lat} 
                      color="red" 
                    />
                    
                    {route && (
                      <Source id="route" type="geojson" data={{
                        type: 'Feature',
                        geometry: route
                      }}>
                        <Layer
                          id="route"
                          type="line"
                          paint={{
                            'line-color': '#f43f5e',
                            'line-width': 5
                          }}
                        />
                      </Source>
                    )}
                  </Map>
                  
                  <div className="p-4 bg-gray-50">
                    <button
                      className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                      onClick={() => window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${donorCoords.lat},${donorCoords.lng}&travelmode=driving`,
                        '_blank'
                      )}
                    >
                      Mở trong Google Maps
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorSearchPopup;
