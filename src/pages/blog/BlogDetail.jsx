import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/ui/Header";

// Dữ liệu mẫu cho các bài blog (copy từ Blog.jsx)
const blogPosts = [
  { id: 1, title: "Tầm quan trọng của việc hiến máu định kỳ", category: "Kiến thức y học", image: "https://images.unsplash.com/photo-1524721696987-b9527df9e512?q=80&w=2940&auto=format&fit=crop", author: "Dr. Anna", date: "15 Tháng 7, 2024", excerpt: "Hiến máu không chỉ cứu người mà còn mang lại nhiều lợi ích sức khỏe cho chính người hiến. Hãy cùng tìm hiểu..." },
  { id: 2, title: "Câu chuyện từ người được cứu sống nhờ máu hiến tặng", category: "Câu chuyện cộng đồng", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop", author: "Minh Anh", date: "12 Tháng 7, 2024", excerpt: "Tôi đã từng đứng giữa ranh giới sự sống và cái chết. Và chính những giọt máu nhân ái đã cứu sống tôi..." },
  { id: 3, title: "Chuẩn bị gì trước khi đi hiến máu?", category: "Hướng dẫn", image: "https://images.unsplash.com/photo-1605152276857-859c4b574244?q=80&w=2848&auto=format&fit=crop", author: "Y tá Hạnh", date: "10 Tháng 7, 2024", excerpt: "Để buổi hiến máu diễn ra thuận lợi, bạn cần chuẩn bị tốt về sức khỏe và tinh thần. Dưới đây là những lưu ý quan trọng." },
  { id: 4, title: "Ngày hội hiến máu 'Chủ Nhật Đỏ' thành công rực rỡ", category: "Sự kiện", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=3132&auto=format&fit=crop", author: "Ban tổ chức", date: "08 Tháng 7, 2024", excerpt: "Sự kiện đã thu hút hàng ngàn người tham gia, thu về hàng nghìn đơn vị máu quý giá cho cộng đồng." },
  { id: 5, title: "Nhóm máu hiếm và tại sao chúng lại quan trọng", category: "Kiến thức y học", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop", author: "Dr. Nam", date: "05 Tháng 7, 2024", excerpt: "Những người có nhóm máu hiếm luôn cần sự chung tay đặc biệt từ cộng đồng. Bạn có thể là một trong số họ." },
  { id: 6, title: "Hành trình giọt máu: Từ người hiến đến bệnh nhân", category: "Quy trình", image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2940&auto=format&fit=crop", author: "Kỹ thuật viên Lan", date: "02 Tháng 7, 2024", excerpt: "Khám phá quy trình xử lý và bảo quản nghiêm ngặt để đảm bảo mỗi đơn vị máu đều an toàn và chất lượng." },
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <h2 className="text-2xl font-bold text-red-600 mt-10">Không tìm thấy bài viết!</h2>
        <Link to="/blog" className="mt-4 text-blue-600 underline">Quay lại Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg mb-6" />
          <div className="flex items-center mb-4 text-sm text-slate-500">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full mr-3">{post.category}</span>
            <span className="mr-3">Tác giả: {post.author}</span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-6">{post.title}</h1>
          <p className="text-lg text-slate-700 leading-relaxed">{post.excerpt}</p>
        </div>
        <div className="mt-8 text-center">
          <Link to="/blog" className="text-red-600 underline">← Quay lại danh sách Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 