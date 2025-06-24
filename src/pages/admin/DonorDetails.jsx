import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Calendar, Droplet, FileText, CreditCard, Award, Mail, Download } from 'lucide-react';

const DonorDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('details');

  // Sample donor data
  const donorData = {
    name: "Anupama",
    donorNo: "222",
    age: "49",
    gender: "Female",
    mobile: "9995522522",
    city: "vellore",
    district: "Dharmapuri",
    state: "Tamilnadu",
    donorType: "-",
    bloodGroup: "A+",
    rhType: "Positive"
  };

  const donationHistory = [
    { id: 1, date: "Mar 28, 2023", volume: "350.00ml", anyCritical: "-" },
    { id: 2, date: "May 4, 2023", volume: "350.00ml", anyCritical: "-" }
  ];

  const deferralHistory = [
    { id: 1, date: "Oct 26, 2021", reason: "Fever", type: "Temporary", notes: "-" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Blood Donor</h1>
          <p className="text-gray-600 text-lg">
            Collect details of donors using a robust online blood bank management software that lists, searches
            and reaches out to donors on the go.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Back Button and Add Donor */}
          <div className="flex justify-between items-center mb-6">
            <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              + Add Donor
            </button>
          </div>

          {/* Donor Details Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Donor Details</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Donor Name</label>
                    <div className="flex items-center text-gray-800">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {donorData.name}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Alt. Mobile</label>
                    <div className="text-gray-800">-</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Donor no.</label>
                    <div className="text-gray-800">{donorData.donorNo}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                    <div className="flex items-center text-gray-800">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {donorData.city}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Age/Gender</label>
                    <div className="text-gray-800">{donorData.age}/ {donorData.gender}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">District</label>
                    <div className="text-gray-800">{donorData.district}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mobile</label>
                    <div className="flex items-center text-gray-800">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      {donorData.mobile}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                    <div className="text-gray-800">{donorData.state}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Blood Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Donor type</label>
                    <div className="text-gray-800">{donorData.donorType}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Blood group</label>
                    <div className="flex items-center text-red-600 font-semibold text-lg">
                      <Droplet className="w-5 h-5 mr-2" />
                      {donorData.bloodGroup}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Rh type</label>
                    <div className="text-gray-800">{donorData.rhType}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                <Droplet className="w-4 h-4 mr-2" />
                Collect Blood
              </button>
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                <CreditCard className="w-4 h-4 mr-2" />
                Bill payment
              </button>
              <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                <Award className="w-4 h-4 mr-2" />
                Certificate
              </button>
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                Donor Card
              </button>
              <button className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Thanks letter
              </button>
            </div>
          </div>

          {/* Donor History Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Donor Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 text-sm font-medium text-gray-600">#</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Donate Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Volume</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Any Critical</th>
                  </tr>
                </thead>
                <tbody>
                  {donationHistory.map((donation) => (
                    <tr key={donation.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm">{donation.id}</td>
                      <td className="p-3 text-sm">{donation.date}</td>
                      <td className="p-3 text-sm">{donation.volume}</td>
                      <td className="p-3 text-sm">{donation.anyCritical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Donor Deferral Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Donor Deferral</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3 text-sm font-medium text-gray-600">#</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Reason for Deferral</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Type</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-600">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {deferralHistory.map((deferral) => (
                    <tr key={deferral.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm">{deferral.id}</td>
                      <td className="p-3 text-sm">{deferral.date}</td>
                      <td className="p-3 text-sm">{deferral.reason}</td>
                      <td className="p-3 text-sm">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          {deferral.type}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{deferral.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetailsPage;
