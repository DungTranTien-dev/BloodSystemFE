import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Chiến dịch hiến máu mùa hè 2024",
    excerpt: "Tham gia chiến dịch hiến máu lớn nhất trong năm để cứu sống nhiều người",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
    date: "2024-01-15",
    readTime: "5",
    content: "Chiến dịch hiến máu mùa hè 2024 là một trong những sự kiện quan trọng nhất của năm, nhằm đảm bảo nguồn máu dự trữ cho các bệnh viện trong mùa cao điểm. Chương trình được tổ chức với quy mô lớn, thu hút hàng nghìn người tham gia trên toàn quốc."
  },
  {
    id: 2,
    title: "Hành trình của một giọt máu",
    excerpt: "Khám phá quá trình từ người hiến máu đến người nhận",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    date: "2024-01-14",
    readTime: "8",
    content: "Mỗi giọt máu hiến tặng đều trải qua một hành trình dài và kỹ lưỡng trước khi đến được với người cần. Từ khâu kiểm tra sức khỏe người hiến, quy trình lấy máu an toàn, đến việc bảo quản và vận chuyển đều được thực hiện theo tiêu chuẩn nghiêm ngặt."
  },
  {
    id: 3,
    title: "Những người hùng thầm lặng",
    excerpt: "Câu chuyện về những người hiến máu thường xuyên",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8",
    date: "2024-01-13",
    readTime: "6",
    content: "Họ là những người bình thường nhưng mang trong mình trái tim nhân ái. Các tình nguyện viên hiến máu thường xuyên đã góp phần quan trọng trong việc duy trì nguồn máu ổn định cho các bệnh viện."
  },
  {
    id: 4,
    title: "Công nghệ mới trong bảo quản máu",
    excerpt: "Những tiến bộ mới nhất trong việc lưu trữ và bảo quản máu",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    date: "2024-01-12",
    readTime: "7",
    content: "Các phương pháp bảo quản máu hiện đại đang được áp dụng, giúp kéo dài thời gian sử dụng và đảm bảo chất lượng máu tốt nhất cho người nhận."
  },
  {
    id: 5,
    title: "Hiến máu an toàn mùa dịch",
    excerpt: "Hướng dẫn hiến máu an toàn trong thời kỳ dịch bệnh",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
    date: "2024-01-11",
    readTime: "5",
    content: "Trong bối cảnh dịch bệnh, việc hiến máu vẫn được thực hiện với các biện pháp an toàn cao nhất, đảm bảo sức khỏe cho cả người hiến và người nhận máu."
  }
];


const NewsPage = () => {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <div 
                key={news.id} 
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{news.title}</h3>
                  <p className="text-accent text-sm mb-3">{news.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-accent">
                    <span>{news.date}</span>
                    <span>{news.readTime} phút đọc</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default NewsPage;