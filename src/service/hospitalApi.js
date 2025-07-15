import api from "../config/axios";

// API Functions
export const getHospitals = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // TODO: Replace with actual API call
  // const response = await axios.get('/api/hospitals', { params: filters });
  // return response.data;
  
  return {
    success: true,
    data: [],
    total: 0
  };
};

// New API function for the new hospital structure
export const getHospitalsNew = async () => {
  try {
    const response = await api.get('Event/all');
    
    if (response.data && response.data.isSuccess && Array.isArray(response.data.result)) {
      return {
        success: true,
        data: response.data.result,
        total: response.data.result.length
      };
    } else {
    return {
      success: true,
        data: [],
        total: 0
    };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lấy danh sách bệnh viện',
      data: []
    };
  }
};

// Create new hospital
export const createHospital = async (hospitalData) => {
  try {
    const response = await api.post('Event/create', hospitalData);
    
    // Handle the actual API response structure
    if (response.data && response.data.isSuccess) {
    return {
      success: true,
        data: response.data.result || response.data,
        message: response.data.message || 'Bệnh viện đã được tạo thành công'
    };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Có lỗi xảy ra khi tạo bệnh viện'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi tạo bệnh viện'
    };
  }
};

export const getHospitalById = async (donationEventId) => {
  try {
    const response = await api.get(`Event/${donationEventId}`);
  
    if (response.data && response.data.isSuccess && response.data.result) {
  return {
    success: true,
        data: response.data.result
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Không tìm thấy bệnh viện'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lấy thông tin bệnh viện'
  };
  }
};

export const getHospitalsByDate = async (date) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: Replace with actual API call
  // const response = await axios.get('/api/hospitals', { params: { date } });
  // return response.data;
  
  return {
    success: true,
    data: [],
    total: 0
  };
};

// Get list of created hospitals/events
export const getCreatedHospitals = async () => {
  try {
    const response = await api.get('Event/all');
    
    // Handle the actual API response structure
    if (response.data && response.data.isSuccess && Array.isArray(response.data.result)) {
      return {
        success: true,
        data: response.data.result,
        total: response.data.result.length
      };
    } else {
      // If API response is not in expected format, return empty array
      return {
        success: true,
        data: [],
        total: 0
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lấy danh sách bệnh viện',
      data: [] // Return empty array on error
    };
  }
};

// Update hospital
export const updateHospital = async (donationEventId, hospitalData) => {
  try {
    // Gửi toàn bộ hospitalData (bao gồm donationEventId) vào body
    const response = await api.put('Event/update', hospitalData);

    if (response.data && response.data.isSuccess) {
    return {
      success: true,
        data: response.data.result || response.data,
        message: response.data.message || 'Bệnh viện đã được cập nhật thành công'
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Có lỗi xảy ra khi cập nhật bệnh viện'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi cập nhật bệnh viện'
    };
  }
};

// Delete hospital
export const deleteHospital = async (donationEventId) => {
  try {
    const response = await api.delete(`Event/${donationEventId}`);
    
    if (response.data && response.data.isSuccess) {
      return {
        success: true,
        message: response.data.message || 'Bệnh viện đã được xóa thành công'
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Có lỗi xảy ra khi xóa bệnh viện'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi xóa bệnh viện'
    };
  }
};

// Check if user has medical record
export const checkUserMedical = async () => {
  try {
    const response = await api.get('UserMedical/check');
    return {
      success: response.data?.isSuccess,
      data: response.data,
      message: response.data?.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi kiểm tra hồ sơ y tế',
      data: null
    };
  }
};

// Get events by date range
export const getEventsByRange = async (start, end) => {
  try {
    const response = await api.get('Event/range', {
      params: { start, end }
    });
    if (response.data && response.data.isSuccess && Array.isArray(response.data.result)) {
      return {
        success: true,
        data: response.data.result,
        total: response.data.result.length
      };
    } else {
      return {
        success: false,
        data: [],
        total: 0,
        error: response.data?.message || 'Không tìm thấy sự kiện'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lấy danh sách sự kiện',
      data: [],
      total: 0
    };
  }
};
