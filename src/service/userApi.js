import api from "../config/axios";

// Lấy danh sách tất cả user
export const getUsers = async () => {
  try {
    const response = await api.get("User/all");

    if (response.data && response.data.isSuccess && Array.isArray(response.data.result)) {
      return {
        success: true,
        data: response.data.result,
        total: response.data.result.length,
      };
    } else {
      return {
        success: true,
        data: [],
        total: 0,
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi lấy danh sách người dùng",
      data: [],
    };
  }
};

// Lấy thông tin user theo id
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`User/${userId}`);

    if (response.data && response.data.isSuccess && response.data.result) {
      return {
        success: true,
        data: response.data.result,
      };
    } else {
      return {
        success: false,
        error: response.data?.message || "Không tìm thấy người dùng",
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi lấy thông tin người dùng",
    };
  }
};

// Thêm mới user
export const createUser = async (userData) => {
  try {
    const response = await api.post("User/create", userData);

    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        data: response.data.result || response.data,
        message: response.data.message || "Người dùng đã được tạo thành công",
      };
    } else {
      return {
        success: false,
        error: response.data?.message || "Có lỗi xảy ra khi tạo người dùng",
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi tạo người dùng",
    };
  }
};

// Cập nhật user
export const updateUser = async (userId, userData) => {
    try {
      const payload = {
        userId, // server yêu cầu có userId trong body
        userName: userData.userName,
        email: userData.email,
        password: userData.password || "", // Có thể bỏ trống nếu không đổi pass
      };
  
      const response = await api.put(`User/update`, payload);
  
      if (response.data && response.data.isSuccess) {
        return {
          success: true,
          data: response.data.result || response.data,
          message:
            response.data.message || "Người dùng đã được cập nhật thành công",
        };
      }
      return {
        success: false,
        error:
          response.data?.message || "Có lỗi xảy ra khi cập nhật người dùng",
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra khi cập nhật người dùng",
      };
    }
  };

// Xóa user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`User/${userId}`);

    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        message: response.data.message || "Người dùng đã được xóa thành công",
      };
    } else {
      return {
        success: false,
        error: response.data?.message || "Có lỗi xảy ra khi xóa người dùng",
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi xóa người dùng",
    };
  }
};
