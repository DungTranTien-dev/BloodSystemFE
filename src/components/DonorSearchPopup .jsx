import React, { useState, useEffect } from 'react';
import { FaTimes, FaHeart, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import api from '../config/axios';

const DonorSearchPopup = ({
  isOpen,
  onClose,
  selectedDonor,
  handleContactDonor,
  userLocation,
  setUserLocation,
  donorCoords,
  setDonors,
  setRoute,
  donors,
  route,
  MAPBOX_TOKEN,
}) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  // const [searchLocation, setSearchLocation] = useState(null); // tách riêng

  // Lấy vị trí người dùng khi mở popup
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.warn('Không lấy được vị trí người dùng:', err);
        }
      );
    }
  }, [setUserLocation]);

  useEffect(() => {
    if (!address) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?autocomplete=true&access_token=${MAPBOX_TOKEN}`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error('Lỗi khi gợi ý địa chỉ:', err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [address, MAPBOX_TOKEN]);

  const searchDonorsFromAddress = async () => {
    if (!address) return;
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`
      );
      const geoData = await geoRes.json();
      const location = geoData.features[0];
      if (!location) {
        alert('Không tìm thấy địa chỉ');
        return;
      }

      const [lng, lat] = location.center;
      // setSearchLocation({ lat, lng }); // dùng để tìm người hiến máu

      const donorRes = await api.get(
        `UserMedical/nearest-available?latitude=${lat}&longitude=${lng}`
      );
      const { statusCode, result } = donorRes.data;

      if (statusCode === 200 && Array.isArray(result)) {
        const mappedDonors = result.map((d) => ({
          id: d.userMedicalId,
          name: d.fullName,
          bloodType: d.bloodName,
          phone: d.phoneNumber,
          address: d.currentAddress,
          lat: d.latitue,
          lng: d.longtitue,
          lastDonation: d.donationCount > 0 ? `${d.donationCount} lần` : 'Chưa rõ',
          distance: null,
        }));
        setDonors(mappedDonors);
      }
    } catch (error) {
      console.error('Lỗi khi tìm người hiến máu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchRoute = async () => {
    if (!selectedDonor || !userLocation || !donorCoords) return;

    try {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${donorCoords.lng},${donorCoords.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const geojson = data.routes[0].geometry;
        if (typeof setRoute === 'function') {
          setRoute(geojson);
        }
      }
    } catch (err) {
      console.error('Lỗi khi gọi directions API:', err);
    }
  };

  fetchRoute();
}, [selectedDonor, userLocation, donorCoords, MAPBOX_TOKEN]);


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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <label className="block text-gray-700 mb-2">Nhập địa chỉ của bạn</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="VD: 123 Lý Thường Kiệt, Quận 10, TP.HCM"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto w-full shadow-md">
                  {suggestions.map((s) => (
                    <li
                      key={s.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setAddress(s.place_name);
                        setSuggestions([]);
                      }}
                    >
                      {s.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-end">
              <button
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={searchDonorsFromAddress}
                disabled={loading || !address}
              >
                {loading ? 'Đang tìm...' : 'Tìm kiếm'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {donors.length > 0 && (
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tìm thấy {donors.length} người hiến máu gần bạn
                </h3>
              )}

              {donors.map((donor) => (
                <div
                  key={donor.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedDonor?.id === donor.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:shadow-md'
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
                          <span>{donor.distance ? `Cách ${donor.distance} km` : donor.address}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaPhone className="mr-2" />
                          <span>{donor.phone}</span>
                        </div>
                        <div className="text-gray-600">Hiến máu: {donor.lastDonation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">
                {selectedDonor && donorCoords
                  ? `Chỉ đường đến ${selectedDonor.name}`
                  : 'Chọn người hiến máu để xem chỉ đường'}
              </h4>

              {selectedDonor && donorCoords && userLocation && (
                <div className="border rounded-lg overflow-hidden">
                  <Map
                    initialViewState={{
                      latitude: userLocation.lat,
                      longitude: userLocation.lng,
                      zoom: 12,
                    }}
                    style={{ width: '100%', height: 300 }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                  >
                    <Marker longitude={userLocation.lng} latitude={userLocation.lat} color="blue" />
                    <Marker longitude={donorCoords.lng} latitude={donorCoords.lat} color="red" />

                    {route && (
                      <Source
                        id="route"
                        type="geojson"
                        data={{
                          type: 'Feature',
                          geometry: route,
                        }}
                      >
                        <Layer
                          id="route"
                          type="line"
                          paint={{
                            'line-color': '#f43f5e',
                            'line-width': 5,
                          }}
                        />
                      </Source>
                    )}
                  </Map>

                  <div className="p-4 bg-gray-50">
                    <button
                      className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (pos) => {
                              const { latitude, longitude } = pos.coords;
                              const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${donorCoords.lat},${donorCoords.lng}&travelmode=driving`;
                              window.open(googleMapsUrl, '_blank');
                            },
                            (err) => {
                              console.error('Không thể lấy vị trí người dùng:', err);
                              alert('Không thể truy cập vị trí hiện tại. Vui lòng cho phép quyền truy cập vị trí.');
                            }
                          );
                        } else {
                          alert('Trình duyệt của bạn không hỗ trợ định vị vị trí.');
                        }
                      }}
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
