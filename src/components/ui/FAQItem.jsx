// File: FAQItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen = false }) => {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-200 rounded-lg" // Thay đổi màu focus-ring cho hợp tone
      >
        {/* === DÒNG ĐƯỢC THAY ĐỔI === */}
        <h3 className="text-lg font-semibold pr-4 bg-gradient-to-r from-red-700 to-pink-600 bg-clip-text text-transparent">
          {question}
        </h3>
        {/* ========================== */}

        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-700" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-4 animate-accordion-down">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool
};

export default FAQItem;