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
// ─É─âng k├╜ hiß║┐n m├íu vß╗¢i eventId
export const registerBloodDonation = async (eventId, data) => {
  try {
    const response = await api.post(`BloodRegistrations/${eventId}`, data);
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result || response.data,
        message: response.data.message || '─É─âng k├╜ hiß║┐n m├íu th├ánh c├┤ng',
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'C├│ lß╗ùi xß║úy ra khi ─æ─âng k├╜ hiß║┐n m├íu',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi ─æ─âng k├╜ hiß║┐n m├íu',
    };
  }
};
// export async function createBloodRegistration(data) {}
// export async function updateBloodRegistration(id, data) {}
// export async function deleteBloodRegistration(id) {} 
