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

// Lấy tất cả yêu cầu y tế
export const getAllUserMedical = async () => {
  try {
    const response = await api.get("UserMedical");
    return {
      success: true,
      data: response.data?.result || [],
      message: response.data?.message || "Lấy danh sách thành công!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Có lỗi xảy ra khi lấy danh sách yêu cầu y tế",
      data: []
    };
  }
};

// Cập nhật thông tin yêu cầu y tế
export const updateUserMedical = async (medicalData) => {
  try {
    console.log('Sending update request with data:', medicalData);
    const response = await api.post("UserMedical/update", medicalData);
    console.log('Update response:', response);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Cập nhật thành công!"
    };
  } catch (error) {
    console.error('Update API error:', error);
    console.error('Error response:', error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || error.response?.data?.error || error.message || "Có lỗi xảy ra khi cập nhật yêu cầu y tế"
    };
  }
};

// Thay đổi trạng thái yêu cầu y tế
export const changeUserMedicalStatus = async (userMedicalId, type) => {
  try {
    const response = await api.post(`UserMedical/change-status?userMedicalId=${userMedicalId}&type=${type}`);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Cập nhật trạng thái thành công!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Có lỗi xảy ra khi cập nhật trạng thái"
    };
  }
}; 