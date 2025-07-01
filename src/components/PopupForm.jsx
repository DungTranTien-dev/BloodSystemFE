import React, { useState, useEffect } from "react";

function PopupForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  fieldsConfig,
  title,
  submitText = "Lưu"
}) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Khởi tạo form rỗng
      const emptyForm = {};
      fieldsConfig.forEach(field => {
        emptyForm[field.name] = field.defaultValue || "";
      });
      setFormData(emptyForm);
    }
    setErrors({});
  }, [initialData, fieldsConfig]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Gọi hàm xử lý API từ component cha
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // Xử lý lỗi từ API (có thể truyền lỗi cụ thể)
      setErrors(error.response?.data?.errors || {});
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-slate-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">
            {title || (initialData?.id ? "Cập nhật" : "Tạo mới")}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {fieldsConfig.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block mb-2 font-medium text-slate-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={`w-full border ${errors[field.name] ? "border-red-500" : "border-slate-300"} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300`}
                    required={field.required}
                  >
                    <option value="">Chọn {field.label.toLowerCase()}</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full border ${errors[field.name] ? "border-red-500" : "border-slate-300"} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300`}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ) : field.type === "checkbox" ? (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={formData[field.name] || false}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {field.checkboxLabel}
                  </label>
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={`w-full border ${errors[field.name] ? "border-red-500" : "border-slate-300"} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300`}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
                
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              disabled={isLoading}
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:from-red-600 hover:to-pink-600 transition disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                submitText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
