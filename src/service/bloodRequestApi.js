import axios from "../config/axios";
import api from '../config/axios';

export const requestBlood = async (payload) => {
  try {
    const res = await axios.post("/api/blood-requests", payload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const getBloodRequests = async () => {
  try {
    const res = await axios.get("BloodRequest/getall");
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const addBloodRequest = async (payload) => {
  try {
    const res = await axios.post("http://localhost:5101/api/BloodRequest/create", payload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const updateBloodRequest = async (id, payload) => {
  try {
    const res = await axios.put(`http://localhost:5101/api/BloodRequest/update/${id}`, payload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const deleteBloodRequest = async (id) => {
  try {
    await axios.delete(`http://localhost:5101/api/BloodRequest/delete/${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

// Tạo yêu cầu hiến máu (DonorBlood)
export const submitDonorBlood = async (data) => {
  try {
    const response = await api.post('BloodRequest/create', data);
    toast.success("Register Donor Blood successful!");
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result || response.data,
        message: response.data.message || 'Tạo yêu cầu hiến máu thành công',
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Có lỗi xảy ra khi tạo yêu cầu hiến máu',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi tạo yêu cầu hiến máu',
    };
  }
};

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
