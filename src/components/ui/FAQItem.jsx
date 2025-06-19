// File: FAQItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Bước 1: Import PropTypes
import { ChevronDown, ChevronUp } from 'lucide-react';

// Bước 2: Loại bỏ hoàn toàn "interface" của TypeScript
// interface FAQItemProps { ... } -> Đã bị xóa

const FAQItem = ({ question, answer, isOpen = false }) => {
  // Bước 3: Loại bỏ type annotation ": FAQItemProps" khỏi props
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-white/80" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/80" />
          )}
        </div>
      </button>
      
      {/* Animation `animate-accordion-down` là một custom animation trong tailwind.config.js,
          nó vẫn sẽ hoạt động nếu bạn đã định nghĩa nó. */}
      {expanded && (
        <div className="px-6 pb-4 animate-accordion-down">
          <div className="border-t border-white/20 pt-4">
            <p className="text-white/90 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Bước 4: Thêm PropTypes để thay thế cho interface
FAQItem.propTypes = {
  /** Câu hỏi sẽ được hiển thị */
  question: PropTypes.string.isRequired,
  
  /** Câu trả lời tương ứng, sẽ được ẩn/hiện */
  answer: PropTypes.string.isRequired,
  
  /** Trạng thái mở mặc định của item (không bắt buộc) */
  isOpen: PropTypes.bool
};

export default FAQItem;