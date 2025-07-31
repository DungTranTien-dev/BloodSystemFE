// TODO: Implement API calls for blood registration CRUD operations
// Example: getAllBloodRegistrations, createBloodRegistration, updateBloodRegistration, deleteBloodRegistration

import api from '../config/axios';

export async function getAllBloodRegistrations() {
  try {
    const response = await api.get('/BloodRegistrations');
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

export async function getUserBloodRegistrations() {
  try {
    const response = await api.get('/BloodRegistrations/user');
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
// Lấy lịch sử hiến máu của user
export async function getUserBloodDonationHistory() {
  try {
    const response = await api.get('BloodRegistrations/user');
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
// Đăng ký hiến máu với eventId
export const registerBloodDonation = async (eventId, data) => {
  try {
    const response = await api.post(`BloodRegistrations/${eventId}`, data);
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result || response.data,
        message: response.data.message || 'Đăng ký hiến máu thành công',
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Có lỗi xảy ra khi đăng ký hiến máu',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đăng ký hiến máu',
    };
  }
};
// export async function createBloodRegistration(data) {}
// export async function updateBloodRegistration(id, data) {}
// export async function deleteBloodRegistration(id) {} 