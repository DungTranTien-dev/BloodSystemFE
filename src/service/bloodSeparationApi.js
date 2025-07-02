import api from '../config/axios';

export async function getBloodSeparations() {
  try {
    const response = await api.get('/SeparatedBloodComponent/all');
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

export async function updateBloodSeparation(data) {
  try {
    const response = await api.put('/SeparatedBloodComponent/update', data);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

export async function deleteBloodSeparation(id) {
  try {
    const response = await api.delete(`/SeparatedBloodComponent/${id}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

export async function createBloodSeparation(data) {
  try {
    const response = await api.post('/SeparatedBloodComponent/create', data);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

// TODO: Implement API calls for blood separation CRUD operations
// Example: getBloodSeparations, createBloodSeparation, updateBloodSeparation, deleteBloodSeparation

// export async function getBloodSeparations() {}
// export async function createBloodSeparation(data) {}
// export async function deleteBloodSeparation(id) {} 