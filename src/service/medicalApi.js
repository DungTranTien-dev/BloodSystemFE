import api from "../config/axios";

// Đăng ký thông tin y tế/hiến máu
export const createUserMedical = async (medicalData) => {
  try {
    const response = await api.post("UserMedical/create", medicalData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Đăng ký thành công!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Có lỗi xảy ra khi đăng ký y tế"
    };
  }
}; 