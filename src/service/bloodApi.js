import api from '../config/axios';

export async function getBloodList() {
  try {
    const response = await api.get('/Blood');
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

export const addBlood = async (payload) => {
  try {
    const res = await api.post("/api/blood", payload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export async function updateBlood(id, data) {
  try {
    const response = await api.put(`/Blood/${id}`, data);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}

export const deleteBlood = async (id) => {
  try {
    await api.delete(`blood/${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const changeBloodStatus = async (id, status) => {
  try {
    const res = await api.post('Blood/change-status', null, { params: { id, status } });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
}; 