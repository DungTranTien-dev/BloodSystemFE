import api from "../config/axios";

// ─É─âng k├╜ th├┤ng tin y tß║┐/hiß║┐n m├íu
export const createUserMedical = async (medicalData) => {
  try {
    const response = await api.post("UserMedical/create", medicalData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "─É─âng k├╜ th├ánh c├┤ng!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "C├│ lß╗ùi xß║úy ra khi ─æ─âng k├╜ y tß║┐"
    };
  }
};

// Lß║Ñy tß║Ñt cß║ú y├¬u cß║ºu y tß║┐
export const getAllUserMedical = async () => {
  try {
    const response = await api.get("UserMedical");
    return {
      success: true,
      data: response.data?.result || [],
      message: response.data?.message || "Lß║Ñy danh s├ích th├ánh c├┤ng!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "C├│ lß╗ùi xß║úy ra khi lß║Ñy danh s├ích y├¬u cß║ºu y tß║┐",
      data: []
    };
  }
};

// Cß║¡p nhß║¡t th├┤ng tin y├¬u cß║ºu y tß║┐
export const updateUserMedical = async (medicalData) => {
  try {
    console.log('Sending update request with data:', medicalData);
    const response = await api.post("UserMedical/update", medicalData);
    console.log('Update response:', response);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Cß║¡p nhß║¡t th├ánh c├┤ng!"
    };
  } catch (error) {
    console.error('Update API error:', error);
    console.error('Error response:', error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || error.response?.data?.error || error.message || "C├│ lß╗ùi xß║úy ra khi cß║¡p nhß║¡t y├¬u cß║ºu y tß║┐"
    };
  }
};

// Thay ─æß╗òi trß║íng th├íi y├¬u cß║ºu y tß║┐
export const changeUserMedicalStatus = async (userMedicalId, type) => {
  try {
    const response = await api.post(`UserMedical/change-status?userMedicalId=${userMedicalId}&type=${type}`);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Cß║¡p nhß║¡t trß║íng th├íi th├ánh c├┤ng!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "C├│ lß╗ùi xß║úy ra khi cß║¡p nhß║¡t trß║íng th├íi"
    };
  }
}; 
