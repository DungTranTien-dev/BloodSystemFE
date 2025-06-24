// File: Index.jsx
import { useState } from "react";
import { Calendar, Heart, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  // -------------------- STATE --------------------
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

  // Lưu field đang lỗi để tô viền đỏ
  const [errors, setErrors] = useState({});

  // -------------------- HANDLERS --------------------
  const handleInputChange = (field, value) => {
    // Cập nhật form
    setFormData(prev => ({ ...prev, [field]: value }));

    // Xoá lỗi của field đó (nếu có) khi người dùng đang sửa
    setErrors(prev => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra lỗi
    const newErrors = {};
    if (!formData.age)           newErrors.age           = true;
    if (!formData.bloodType)     newErrors.bloodType     = true;
    if (!formData.weight)        newErrors.weight        = true;
    if (!formData.preferredDate) newErrors.preferredDate = true;
    if (!formData.preferredTime) newErrors.preferredTime = true;
    if (!formData.agreeTerms)    newErrors.agreeTerms    = true;
    if (!formData.agreeHealth)   newErrors.agreeHealth   = true;

    // Nếu có lỗi ⇒ cập nhật state + hiện toast
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);

      const missing = Object.keys(newErrors)
        .map(key => {
          switch (key) {
            case "age":            return "Tuổi";
            case "bloodType":      return "Nhóm máu";
            case "weight":         return "Cân nặng";
            case "preferredDate":  return "Ngày hiến máu";
            case "preferredTime":  return "Khung giờ";
            case "agreeTerms":     return "Đồng ý điều khoản";
            case "agreeHealth":    return "Cam kết sức khỏe";
            default: return key;
          }
        });
      toast.error(`Vui lòng điền/đồng ý: ${missing.join(", ")}`);
      return;
    }

    // Không lỗi ⇒ thành công
    toast.success("Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    console.log("Form submitted:", formData);

    // Reset
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
    setErrors({});
  };

  // -------------------- RENDER --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-100 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div className="relative container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-red-500 animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 w-16 h-16 text-red-300 animate-ping opacity-20">
                <Heart className="w-16 h-16" />
              </div>
            </div>
          </div>
          {/* ➜ antialiased để không mất nét dọc */}
          <h1 className="text-5xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 antialiased leading-tight">
            Đăng ký hiến máu
          </h1>
        </div>

        {/* Registration Form */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden animate-scale-in">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Thông tin đăng ký</h2>
            <p className="text-red-100">
              Vui lòng điền thông tin y tế để chúng tôi có thể hỗ trợ bạn tốt nhất
            </p>
          </div>
          
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Medical Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Shield className="w-6 h-6 text-red-500 mr-3" />
                  Thông tin y tế
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Tuổi */}
                  <div className="space-y-3 group">
                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700 group-focus-within:text-red-500 transition-colors">
                      Tuổi *
                    </label>
                    <input
                      id="age"
                      type="number"
                      placeholder="18-65 tuổi"
                      min="18"
                      max="65"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      required
                      className={`w-full h-14 rounded-xl border-2 px-4 py-3 text-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:bg-white transition-all duration-300 hover:shadow-md
                        ${errors.age ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-200 focus:border-red-400 hover:border-red-300"}`}
                    />
                  </div>

                  {/* Nhóm máu */}
                  <div className="space-y-3 group">
                    <label htmlFor="bloodType" className="block text-sm font-semibold text-gray-700 group-focus-within:text-red-500 transition-colors">
                      Nhóm máu *
                    </label>
                    <select
                      id="bloodType"
                      value={formData.bloodType}
                      onChange={(e) => handleInputChange("bloodType", e.target.value)}
                      required
                      className={`w-full h-14 rounded-xl border-2 px-4 py-3 text-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:bg-white transition-all duration-300 hover:shadow-md
                        ${errors.bloodType ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-200 focus:border-red-400 hover:border-red-300"}`}
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

                  {/* Cân nặng */}
                  <div className="space-y-3 group">
                    <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 group-focus-within:text-red-500 transition-colors">
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
                      className={`w-full h-14 rounded-xl border-2 px-4 py-3 text-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:bg-white transition-all duration-300 hover:shadow-md
                        ${errors.weight ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-200 focus:border-red-400 hover:border-red-300"}`}
                    />
                  </div>
                </div>
              </div>

              {/* Scheduling Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Clock className="w-6 h-6 text-red-500 mr-3" />
                  Lịch hẹn
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ngày hiến máu */}
                  <div className="space-y-3 group">
                    <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 group-focus-within:text-red-500 transition-colors">
                      Ngày muốn hiến máu *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-red-400 transition-colors" />
                      <input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full h-14 rounded-xl border-2 pl-14 pr-4 py-3 text-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:bg-white transition-all duration-300 hover:shadow-md
                          ${errors.preferredDate ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-200 focus:border-red-400 hover:border-red-300"}`}
                      />
                    </div>
                  </div>

                  {/* Khung giờ */}
                  <div className="space-y-3 group">
                    <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 group-focus-within:text-red-500 transition-colors">
                      Khung giờ mong muốn *
                    </label>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                      required
                      className={`w-full h-14 rounded-xl border-2 px-4 py-3 text-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:bg-white transition-all duration-300 hover:shadow-md
                        ${errors.preferredTime ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-200 focus:border-red-400 hover:border-red-300"}`}
                    >
                      <option value="" disabled>Chọn khung giờ</option>
                      <option value="morning">🌅 Sáng (8:00 - 12:00)</option>
                      <option value="afternoon">🌤️ Chiều (13:00 - 17:00)</option>
                      <option value="evening">🌙 Tối (18:00 - 20:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="space-y-3 group">
                <label htmlFor="medicalHistory" className="block text-sm font-semibold text-gray-700 group-focus-within:text-red-500 transition-colors">
                  Tiền sử bệnh lý (nếu có)
                </label>
                <textarea
                  id="medicalHistory"
                  placeholder="Vui lòng mô tả chi tiết các bệnh lý hiện tại hoặc đã từng mắc phải..."
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:border-red-400 focus:bg-white transition-all duration-300 hover:border-red-300 shadow-sm hover:shadow-md resize-none"
                />
              </div>

              {/* Agreements */}
              <div className="space-y-6 p-8 bg-gradient-to-r from-red-50/80 to-pink-50/80 rounded-2xl border border-red-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cam kết và điều khoản</h3>
                
                <div className="space-y-4">
                  {/* Điều khoản */}
                  <div className="flex items-start space-x-4 group">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                      className={`mt-1.5 h-5 w-5 rounded border-2 text-red-600 focus:ring-red-500 focus:ring-2 transition-all duration-200
                        ${errors.agreeTerms ? "border-red-500" : "border-red-300 hover:border-red-400"}`}
                    />
                    <label htmlFor="agreeTerms" className="text-gray-700 leading-6 group-hover:text-gray-800 transition-colors cursor-pointer">
                      Tôi đồng ý với các điều khoản và điều kiện của chương trình hiến máu. Tôi hiểu rằng việc hiến máu là hoàn toàn tự nguyện và không được trả tiền.
                    </label>
                  </div>

                  {/* Cam kết sức khoẻ */}
                  <div className="flex items-start space-x-4 group">
                    <input
                      id="agreeHealth"
                      type="checkbox"
                      checked={formData.agreeHealth}
                      onChange={(e) => handleInputChange("agreeHealth", e.target.checked)}
                      className={`mt-1.5 h-5 w-5 rounded border-2 text-red-600 focus:ring-red-500 focus:ring-2 transition-all duration-200
                        ${errors.agreeHealth ? "border-red-500" : "border-red-300 hover:border-red-400"}`}
                    />
                    <label htmlFor="agreeHealth" className="text-gray-700 leading-6 group-hover:text-gray-800 transition-colors cursor-pointer">
                      Tôi cam kết tình trạng sức khỏe của mình ổn định, không mắc các bệnh truyền nhiễm và đã trung thực khai báo thông tin y tế.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-16 inline-flex items-center justify-center rounded-2xl text-xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/30 group"
              >
                <Heart className="w-7 h-7 mr-3 group-hover:animate-pulse" />
                Đăng Ký Hiến Máu
                <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ❤️
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
