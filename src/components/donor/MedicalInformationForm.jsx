import React from 'react';
import { FaIdCard } from 'react-icons/fa';

const MedicalInformationForm = ({ formData, handleInputChange, errors }) => {
  return (
    <>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
        <div className="flex items-center space-x-2">
          <FaIdCard className="text-lg" />
          <h2 className="text-lg font-semibold">Medical Information</h2>
        </div>
      </div>
      
      <div className="p-6 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hemoglobin Level (g/dL)
            </label>
            <input
              type="number"
              name="hemoglobin"
              value={formData.hemoglobin}
              onChange={handleInputChange}
              step="0.1"
              min="12"
              max="18"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter hemoglobin level"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Blood Pressure (mmHg)
            </label>
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="e.g., 120/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Pulse Rate (bpm)
            </label>
            <input
              type="number"
              name="pulse"
              value={formData.pulse}
              onChange={handleInputChange}
              min="60"
              max="100"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter pulse rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Temperature (°F)
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              step="0.1"
              min="96"
              max="100"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter temperature"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter occupation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Previous Donations
            </label>
            <input
              type="number"
              name="previousDonations"
              value={formData.previousDonations}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Number of previous donations"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter any relevant medical history"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Medications
            </label>
            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="List any current medications"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Allergies
            </label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="List any known allergies"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalInformationForm;
