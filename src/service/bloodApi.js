import axios from "../config/axios";

export const getBloodList = async () => {
  try {
    const res = await axios.get("/api/blood");
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const addBlood = async (payload) => {
  try {
    const res = await axios.post("/api/blood", payload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const updateBlood = async (id, payload) => {
  try {
    const res = await axios.put(`/api/blood/${id}`, payload);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const deleteBlood = async (id) => {
  try {
    await axios.delete(`/api/blood/${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
}; 