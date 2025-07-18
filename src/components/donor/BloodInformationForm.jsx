import React from 'react';
import { FaTint } from 'react-icons/fa';

const BloodInformationForm = ({ formData, handleInputChange, errors }) => {
  return (
    <>
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
        <div className="flex items-center space-x-2">
          <FaTint className="text-lg" />
          <h2 className="text-lg font-semibold">Blood Information</h2>
        </div>
      </div>
      
      <div className="p-6 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Blood Group <span className="text-red-500">*</span>
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.bloodGroup ? 'border-red-300' : 'border-slate-300'
              }`}
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rh Type <span className="text-red-500">*</span>
            </label>
            <select
              name="rhType"
              value={formData.rhType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.rhType ? 'border-red-300' : 'border-slate-300'
              }`}
            >
              <option value="">Select Rh type</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
            {errors.rhType && <p className="text-red-500 text-sm mt-1">{errors.rhType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Donor Type
            </label>
            <select
              name="donorType"
              value={formData.donorType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select donor type</option>
              <option value="First Time">First Time</option>
              <option value="Regular">Regular</option>
              <option value="Repeat">Repeat</option>
              <option value="Voluntary">Voluntary</option>
              <option value="Replacement">Replacement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              step="0.1"
              min="45"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              min="140"
              max="220"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter height"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Donation Date
            </label>
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodInformationForm;
