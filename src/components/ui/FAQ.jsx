// File: FAQ.jsx
import React from 'react';
import FAQItem from './FAQItem';

const FAQ = () => {
  // Dữ liệu câu hỏi được định nghĩa trực tiếp trong component.
  // Trong một ứng dụng thực tế, dữ liệu này có thể đến từ một API.
  const faqData = [
    {
      question: "Làm thế nào để tôi có thể bắt đầu sử dụng dịch vụ?",
      answer: "Bạn chỉ cần đăng ký tài khoản miễn phí, xác nhận email và có thể bắt đầu sử dụng ngay lập tức. Quá trình đăng ký chỉ mất vài phút và hoàn toàn đơn giản."
    },
    {
      question: "Có những gói dịch vụ nào available?",
      answer: "Chúng tôi cung cấp 3 gói chính: Gói cơ bản (miễn phí), Gói Pro (299k/tháng) và Gói Enterprise (999k/tháng). Mỗi gói có những tính năng và giới hạn khác nhau phù hợp với nhu cầu của bạn."
    },
    {
      question: "Tôi có thể hủy đăng ký bất cứ lúc nào không?",
      answer: "Có, bạn hoàn toàn có thể hủy đăng ký bất cứ lúc nào mà không mất phí. Tài khoản của bạn sẽ được chuyển về gói miễn phí và dữ liệu sẽ được bảo toàn trong 30 ngày."
    },
    {
      question: "Dữ liệu của tôi có được bảo mật không?",
      answer: "Tuyệt đối! Chúng tôi sử dụng mã hóa SSL 256-bit và tuân thủ các tiêu chuẩn bảo mật quốc tế. Dữ liệu được lưu trữ trên các server có bảo mật cao và được sao lưu hàng ngày."
    },
    {
      question: "Tôi có thể liên hệ hỗ trợ như thế nào?",
      answer: "Bạn có thể liên hệ qua nhiều kênh: Email (support@company.com), Chat trực tuyến trên website, hoặc hotline 1900-xxxx. Đội ngũ hỗ trợ làm việc 24/7 để giải đáp mọi thắc mắc."
    },
    {
      question: "Có hỗ trợ tiếng Việt không?",
      answer: "Có, chúng tôi hỗ trợ đầy đủ tiếng Việt cho cả giao diện người dùng và đội ngũ chăm sóc khách hàng. Tất cả tài liệu và hướng dẫn đều được dịch sang tiếng Việt."
    },
    {
      question: "Có thời gian dùng thử miễn phí không?",
      answer: "Có, chúng tôi cung cấp 14 ngày dùng thử miễn phí cho tất cả các gói trả phí. Bạn có thể trải nghiệm đầy đủ tính năng mà không cần thanh toán trước."
    },
    {
      question: "Làm sao để nâng cấp hoặc hạ cấp gói dịch vụ?",
      answer: "Bạn có thể thay đổi gói dịch vụ bất cứ lúc nào trong phần 'Cài đặt tài khoản'. Việc nâng cấp có hiệu lực ngay lập tức, còn hạ cấp sẽ có hiệu lực từ chu kỳ thanh toán tiếp theo."
    }
  ];

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Tiêu đề chính của khu vực FAQ */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Những Câu Hỏi Phổ Biến
          </h2>
        </div>
        
        {/* Danh sách các câu hỏi, được render từ mảng faqData */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              // Mặc định mở câu hỏi đầu tiên
              isOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;