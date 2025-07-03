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

// export async function createBloodRegistration(data) {}
// export async function updateBloodRegistration(id, data) {}
// export async function deleteBloodRegistration(id) {} 