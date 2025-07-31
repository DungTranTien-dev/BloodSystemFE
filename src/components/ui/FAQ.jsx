import React, { useState } from 'react';
import { Collapse, Card, Typography, Input, Row, Col, Space, Tag } from 'antd';
import { SearchOutlined, QuestionCircleOutlined, HeartOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Search } = Input;

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // FAQ data for blood donation system
  const faqData = [
    {
      id: 1,
      category: 'Đăng ký hiến máu',
      question: 'Làm thế nào để đăng ký hiến máu?',
      answer: 'Bạn có thể đăng ký hiến máu bằng cách tạo tài khoản trên hệ thống, điền đầy đủ thông tin cá nhân và thông tin y tế. Sau khi đăng ký, bạn sẽ được liên hệ để xác nhận lịch hẹn hiến máu.',
      tags: ['đăng ký', 'tài khoản', 'thông tin']
    },
    {
      id: 2,
      category: 'Điều kiện hiến máu',
      question: 'Ai có thể hiến máu?',
      answer: 'Người hiến máu phải từ 18-65 tuổi, cân nặng từ 45kg trở lên, có sức khỏe tốt, không mắc các bệnh truyền nhiễm qua đường máu như HIV, viêm gan B, C.',
      tags: ['tuổi', 'cân nặng', 'sức khỏe']
    },
    {
      id: 3,
      category: 'Quy trình hiến máu',
      question: 'Quy trình hiến máu diễn ra như thế nào?',
      answer: 'Quy trình gồm: 1) Đăng ký và khám sàng lọc, 2) Xét nghiệm máu nhanh, 3) Hiến máu (khoảng 8-10 phút), 4) Nghỉ ngơi và ăn nhẹ. Toàn bộ quá trình mất khoảng 30-45 phút.',
      tags: ['quy trình', 'khám sàng lọc', 'xét nghiệm']
    },
    {
      id: 4,
      category: 'Lịch hẹn',
      question: 'Tôi có thể hủy lịch hẹn hiến máu không?',
      answer: 'Có, bạn có thể hủy lịch hẹn bằng cách đăng nhập vào tài khoản và chọn "Hủy lịch hẹn" hoặc liên hệ hotline. Vui lòng hủy trước ít nhất 24 giờ để thuận tiện cho việc sắp xếp.',
      tags: ['hủy lịch', 'lịch hẹn', 'thời gian']
    },
    {
      id: 5,
      category: 'Sau hiến máu',
      question: 'Sau khi hiến máu tôi cần lưu ý gì?',
      answer: 'Sau hiến máu, bạn nên: uống nhiều nước, ăn đầy đủ chất dinh dưỡng, tránh mang vác nặng trong 24 giờ đầu, không uống rượu bia trong 24 giờ, và liên hệ y tế nếu có bất thường.',
      tags: ['chăm sóc', 'dinh dưỡng', 'lưu ý']
    },
    {
      id: 6,
      category: 'Thông tin y tế',
      question: 'Hiến máu có ảnh hưởng đến sức khỏe không?',
      answer: 'Hiến máu an toàn và không ảnh hưởng đến sức khỏe khi thực hiện đúng quy định. Cơ thể sẽ tự phục hồi lượng máu đã hiến trong vòng 24-48 giờ. Hiến máu thường xuyên còn giúp kích thích tạo máu mới.',
      tags: ['an toàn', 'sức khỏe', 'phục hồi']
    },
    {
      id: 7,
      category: 'Tần suất hiến máu',
      question: 'Tôi có thể hiến máu bao lâu một lần?',
      answer: 'Nam giới có thể hiến máu 4-5 lần/năm, nữ giới 3-4 lần/năm. Khoảng cách giữa 2 lần hiến máu tối thiểu là 12 tuần (3 tháng) để cơ thể có thời gian phục hồi hoàn toàn.',
      tags: ['tần suất', 'thời gian', 'phục hồi']
    },
    {
      id: 8,
      category: 'Nhóm máu',
      question: 'Tại sao cần biết nhóm máu khi hiến máu?',
      answer: 'Nhóm máu quyết định tính tương thích khi truyền máu. Việc xác định chính xác nhóm máu giúp đảm bảo an toàn cho người nhận và tối ưu hóa việc phân phối máu đến các bệnh viện.',
      tags: ['nhóm máu', 'tương thích', 'an toàn']
    }
  ];

  // Filter FAQ based on search term
  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group FAQ by category
  const groupedFAQ = filteredFAQ.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <Title level={1} className="!text-red-600 !mb-4">
          <QuestionCircleOutlined className="mr-3" />
          Câu hỏi thường gặp
        </Title>
        <Text className="text-lg text-gray-600">
          Tìm hiểu thêm về quy trình hiến máu và các thông tin quan trọng
        </Text>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <Card className="shadow-md">
          <div className="text-center">
            <Title level={4} className="!mb-4">Tìm kiếm câu hỏi</Title>
            <Search
              placeholder="Nhập từ khóa để tìm kiếm..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </Card>
      </div>

      {/* FAQ Content */}
      <div className="space-y-6">
        {Object.keys(groupedFAQ).length === 0 ? (
          <Card className="text-center py-8">
            <Title level={4} className="!text-gray-500">
              Không tìm thấy câu hỏi nào phù hợp
            </Title>
            <Text className="text-gray-400">
              Thử tìm kiếm với từ khóa khác hoặc liên hệ với chúng tôi để được hỗ trợ
            </Text>
          </Card>
        ) : (
          Object.entries(groupedFAQ).map(([category, items]) => (
            <Card key={category} className="shadow-md">
              <Title level={3} className="!text-red-600 !mb-4">
                <HeartOutlined className="mr-2" />
                {category}
              </Title>
              <Collapse ghost>
                {items.map((item) => (
                  <Panel
                    header={
                      <div className="font-medium text-gray-800">
                        {item.question}
                      </div>
                    }
                    key={item.id}
                    className="!border-b !border-gray-200 last:!border-b-0"
                  >
                    <div className="pt-2">
                      <Text className="text-gray-700 leading-relaxed block mb-3">
                        {item.answer}
                      </Text>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Tag key={index} color="red" className="text-xs">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          ))
        )}
      </div>

      {/* Contact Section */}
      <Card className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <div className="text-center">
          <Title level={4} className="!text-red-600 !mb-2">
            Không tìm thấy câu trả lời?
          </Title>
          <Text className="text-gray-600 block mb-4">
            Liên hệ với chúng tôi để được hỗ trợ trực tiếp
          </Text>
          <Space size="large">
            <div className="text-center">
              <Text strong className="block text-red-600">Hotline</Text>
              <Text className="text-lg">1900-XXX-XXX</Text>
            </div>
            <div className="text-center">
              <Text strong className="block text-red-600">Email</Text>
              <Text className="text-lg">support@blooddonation.vn</Text>
            </div>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default FAQ;
