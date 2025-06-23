import { useState } from "react";
// Các import từ @/components/ui/... đã được xóa
import { Calendar, Heart, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

// Các component từ shadcn/ui đã được thay thế bằng các thẻ HTML tiêu chuẩn
// với các className tương ứng để giữ lại giao diện.

const DonorBlood = () => {
  const [formData, setFormData] = useState({
    age: "",
    bloodType: "",
    weight: "",
    medicalHistory: "",
    preferredDate: "",
    preferredTime: "",
    agreeTerms: false,
    agreeHealth: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.age || !formData.bloodType || !formData.weight || !formData.preferredDate || !formData.preferredTime) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }
    
    if (!formData.agreeTerms || !formData.agreeHealth) {
      toast.error("Vui lòng đồng ý với các điều khoản và cam kết sức khỏe");
      return;
    }

    toast.success("Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    console.log("Form submitted:", formData);
    
    setFormData({
      age: "",
      bloodType: "",
      weight: "",
      medicalHistory: "",
      preferredDate: "",
      preferredTime: "",
      agreeTerms: false,
      agreeHealth: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-pink-600 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-white mr-3 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Hiến Máu Cứu Người
            </h1>
          </div>
        </div>

        {/* Registration Form - <Card> và các thành phần con được thay bằng <div> */}
        <div className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl rounded-lg">
          <div className="p-6 text-center">
            <p className="text-lg text-gray-600 mt-2">
              Vui lòng điền thông tin y tế để chúng tôi có thể hỗ trợ bạn tốt nhất
            </p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Medical Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium text-gray-700">
                    Tuổi *
                  </label>
                  {/* <Input> thay bằng <input> */}
                  <input
                    id="age"
                    type="number"
                    placeholder="18-65 tuổi"
                    min="18"
                    max="65"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    required
                    className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bloodType" className="text-sm font-medium text-gray-700">
                    Nhóm máu *
                  </label>
                  {/* <Select> thay bằng <select> */}
                  <select
                    id="bloodType"
                    value={formData.bloodType}
                    onChange={(e) => handleInputChange("bloodType", e.target.value)}
                    required
                    className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="" disabled>Chọn nhóm máu</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                    Cân nặng (kg) *
                  </label>
                  <input
                    id="weight"
                    type="number"
                    placeholder="Tối thiểu 45kg"
                    min="45"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    required
                    className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">
                    Ngày muốn hiến máu *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                    <input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      required
                      className="h-12 w-full rounded-md border border-gray-300 pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="preferredTime" className="text-sm font-medium text-gray-700">
                    Khung giờ mong muốn *
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                    required
                    className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="" disabled>Chọn khung giờ</option>
                    <option value="morning">Sáng (8:00 - 12:00)</option>
                    <option value="afternoon">Chiều (13:00 - 17:00)</option>
                    <option value="evening">Tối (18:00 - 20:00)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700">
                  Tiền sử bệnh lý (nếu có)
                </label>
                {/* <Textarea> thay bằng <textarea> */}
                <textarea
                  id="medicalHistory"
                  placeholder="Vui lòng mô tả chi tiết các bệnh lý hiện tại hoặc đã từng mắc phải..."
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                  className="min-h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Agreements */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  {/* <Checkbox> thay bằng <input type="checkbox"> */}
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-5">
                    Tôi đồng ý với các điều khoản và điều kiện của chương trình hiến máu. Tôi hiểu rằng việc hiến máu là hoàn toàn tự nguyện và không được trả tiền.
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    id="agreeHealth"
                    type="checkbox"
                    checked={formData.agreeHealth}
                    onChange={(e) => handleInputChange("agreeHealth", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="agreeHealth" className="text-sm text-gray-700 leading-5">
                    Tôi cam kết tình trạng sức khỏe của mình ổn định, không mắc các bệnh truyền nhiễm và đã trung thực khai báo thông tin y tế.
                  </label>
                </div>
              </div>

              {/* <Button> thay bằng <button> */}
              <button
                type="submit"
                className="w-full h-14 inline-flex items-center justify-center rounded-md text-lg font-semibold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Heart className="w-6 h-6 mr-2" />
                Đăng Ký Hiến Máu
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-white/80 text-sm">
            Mọi thắc mắc xin liên hệ: <strong>1900-1234</strong> hoặc email: <strong>info@hienmau.vn</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonorBlood;