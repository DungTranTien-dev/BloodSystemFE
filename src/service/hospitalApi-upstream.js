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
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi lß║Ñy danh s├ích bß╗çnh viß╗çn',
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
        message: response.data.message || 'Bß╗çnh viß╗çn ─æ├ú ─æ╞░ß╗úc tß║ío th├ánh c├┤ng'
    };
    } else {
      return {
        success: false,
        error: response.data?.message || 'C├│ lß╗ùi xß║úy ra khi tß║ío bß╗çnh viß╗çn'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi tß║ío bß╗çnh viß╗çn'
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
        error: response.data?.message || 'Kh├┤ng t├¼m thß║Ñy bß╗çnh viß╗çn'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi lß║Ñy th├┤ng tin bß╗çnh viß╗çn'
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
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi lß║Ñy danh s├ích bß╗çnh viß╗çn',
      data: [] // Return empty array on error
    };
  }
};

// Update hospital
export const updateHospital = async (donationEventId, hospitalData) => {
  try {
    // Gß╗¡i to├án bß╗Ö hospitalData (bao gß╗ôm donationEventId) v├áo body
    const response = await api.put('Event/update', hospitalData);

    if (response.data && response.data.isSuccess) {
    return {
      success: true,
        data: response.data.result || response.data,
        message: response.data.message || 'Bß╗çnh viß╗çn ─æ├ú ─æ╞░ß╗úc cß║¡p nhß║¡t th├ánh c├┤ng'
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'C├│ lß╗ùi xß║úy ra khi cß║¡p nhß║¡t bß╗çnh viß╗çn'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi cß║¡p nhß║¡t bß╗çnh viß╗çn'
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
        message: response.data.message || 'Bß╗çnh viß╗çn ─æ├ú ─æ╞░ß╗úc x├│a th├ánh c├┤ng'
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'C├│ lß╗ùi xß║úy ra khi x├│a bß╗çnh viß╗çn'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'C├│ lß╗ùi xß║úy ra khi x├│a bß╗çnh viß╗çn'
    };
  }
};
