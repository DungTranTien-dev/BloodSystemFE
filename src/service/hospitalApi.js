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
    // TODO: Replace with actual API call
    // const response = await axios.get('/api/hospitals');
    // return response.data;
    
    // Mock data for new structure
    const mockHospitals = [
      {
        id: 1,
        title: "Bệnh viện Bạch Mai",
        location: "78 Giải Phóng, Đông Da, Hà Nội",
        startTime: "2025-06-29T07:00:00.000Z",
        endTime: "2025-06-29T17:00:00.000Z",
        description: "Bệnh viện hạng đặc biệt với đầy đủ trang thiết bị hiện đại"
      },
      {
        id: 2,
        title: "Bệnh viện Việt Đức",
        location: "40 Tràng Thi, Hoàn Kiếm, Hà Nội",
        startTime: "2025-06-29T07:30:00.000Z",
        endTime: "2025-06-29T17:30:00.000Z",
        description: "Bệnh viện chuyên khoa ngoại hàng đầu Việt Nam"
      },
      {
        id: 3,
        title: "Bệnh viện Vinmec Times City",
        location: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
        startTime: "2025-06-29T08:00:00.000Z",
        endTime: "2025-06-29T20:00:00.000Z",
        description: "Bệnh viện tư nhân với dịch vụ chất lượng cao"
      }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: mockHospitals,
      total: mockHospitals.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Create new hospital
export const createHospital = async (hospitalData) => {
  try {
    const response = await api.post('Event/create', hospitalData);
    
    return {
      success: true,
      data: response.data,
      message: 'Bệnh viện đã được tạo thành công'
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi tạo bệnh viện'
    };
  }
};

export const getHospitalById = async (hospitalId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: Replace with actual API call
  // const response = await axios.get(`/api/hospitals/${hospitalId}`);
  // return response.data;
  
  return {
    success: true,
    data: null
  };
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
    
    return {
      success: true,
      data: response.data,
      total: response.data?.length || 0
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lấy danh sách bệnh viện'
    };
  }
};
