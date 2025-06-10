import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { newsData } from "./newsData";


const NewsDetail = () => {
  const navigate = useNavigate();
  // const id = window.location.pathname.split("/")[2];
  const { id } = useParams();
  const news = newsData.find(item => item.id === parseInt(id));

  if (!news) return <div>Không tìm thấy tin tức</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <button 
        onClick={() => navigate("/")} 
        className="mb-6 text-primary hover:text-primary-dark"
      >
        ← Quay lại
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          <div className="flex items-center text-gray-500 mb-6">
            <span>{news.date}</span>
            <span className="mx-2">•</span>
            <span>{news.readTime} phút đọc</span>
          </div>
          <p className="text-lg leading-relaxed">{news.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;