const hospitals = [
  {
    id: 1,
    name: "Bệnh viện Bạch Mai",
    type: "public",
    address: "78 Giải Phóng, Đông Da, Hà Nội",
    phone: "024 3869 3731",
    workingHours: "07:00 - 17:00",
    operatingDays: "Thứ 2 - Thứ 6",
    operatingSchedule: [
      { date: "2025-06-26", hours: "07:00 - 17:00" },
      { date: "2025-06-27", hours: "07:00 - 17:00" },
      { date: "2025-06-28", hours: "07:00 - 17:00" },
      { date: "2025-06-29", hours: "07:00 - 17:00" },
      { date: "2025-06-30", hours: "07:00 - 17:00" },
      { date: "2025-07-01", hours: "07:00 - 17:00" },
      { date: "2025-07-02", hours: "07:00 - 17:00" },
      { date: "2025-07-03", hours: "07:00 - 17:00" },
      { date: "2025-07-04", hours: "07:00 - 17:00" },
      { date: "2025-07-05", hours: "07:00 - 17:00" }
    ],
    donationDays: [
      { date: "2025-06-26", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-27", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-28", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-06-29", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-30", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-01", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-02", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-03", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-04", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-05", timeSlots: ["08:00-10:00", "10:00-12:00"] }
    ],
    description: "Bệnh viện hạng đặc biệt với đầy đủ trang thiết bị hiện đại",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Bệnh viện Việt Đức",
    type: "public",
    address: "40 Tràng Thi, Hoàn Kiếm, Hà Nội",
    phone: "024 3825 3531",
    workingHours: "07:30 - 17:30",
    operatingDays: "Thứ 2 - Thứ 7",
    operatingSchedule: [
      { date: "2025-06-26", hours: "07:30 - 17:30" },
      { date: "2025-06-27", hours: "07:30 - 17:30" },
      { date: "2025-06-28", hours: "07:30 - 17:30" },
      { date: "2025-06-29", hours: "07:30 - 17:30" },
      { date: "2025-06-30", hours: "07:30 - 17:30" },
      { date: "2025-07-01", hours: "07:30 - 17:30" },
      { date: "2025-07-02", hours: "07:30 - 17:30" },
      { date: "2025-07-03", hours: "07:30 - 17:30" },
      { date: "2025-07-04", hours: "07:30 - 17:30" },
      { date: "2025-07-05", hours: "07:30 - 17:30" }
    ],
    donationDays: [
      { date: "2025-06-26", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-27", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-06-28", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-29", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-30", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-01", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-02", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-03", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-04", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-05", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] }
    ],
    description: "Bệnh viện chuyên khoa ngoại hàng đầu Việt Nam",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Bệnh viện Vinmec Times City",
    type: "private",
    address: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
    phone: "024 3974 3556",
    workingHours: "08:00 - 20:00",
    operatingDays: "Thứ 2 - Chủ nhật",
    operatingSchedule: [
      { date: "2025-06-26", hours: "08:00 - 20:00" },
      { date: "2025-06-27", hours: "08:00 - 20:00" },
      { date: "2025-06-28", hours: "08:00 - 20:00" },
      { date: "2025-06-29", hours: "08:00 - 20:00" },
      { date: "2025-06-30", hours: "08:00 - 20:00" },
      { date: "2025-07-01", hours: "08:00 - 20:00" },
      { date: "2025-07-02", hours: "08:00 - 20:00" },
      { date: "2025-07-03", hours: "08:00 - 20:00" },
      { date: "2025-07-04", hours: "08:00 - 20:00" },
      { date: "2025-07-05", hours: "08:00 - 20:00" }
    ],
    donationDays: [
      { date: "2025-06-26", timeSlots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-27", timeSlots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-28", timeSlots: ["09:00-11:00", "13:00-15:00"] },
      { date: "2025-06-29", timeSlots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-06-30", timeSlots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-07-01", timeSlots: ["09:00-11:00", "13:00-15:00"] },
      { date: "2025-07-02", timeSlots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-07-03", timeSlots: ["09:00-11:00", "13:00-15:00"] },
      { date: "2025-07-04", timeSlots: ["09:00-11:00", "13:00-15:00", "15:00-17:00"] },
      { date: "2025-07-05", timeSlots: ["09:00-11:00", "13:00-15:00"] }
    ],
    description: "Bệnh viện tư nhân với dịch vụ chất lượng cao",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Bệnh viện 108",
    type: "military",
    address: "1 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
    phone: "024 3622 5741",
    workingHours: "07:00 - 16:30",
    operatingDays: "Thứ 2 - Thứ 6",
    operatingSchedule: [
      { date: "2025-06-26", hours: "07:00 - 16:30" },
      { date: "2025-06-27", hours: "07:00 - 16:30" },
      { date: "2025-06-30", hours: "07:00 - 16:30" },
      { date: "2025-07-01", hours: "07:00 - 16:30" },
      { date: "2025-07-02", hours: "07:00 - 16:30" },
      { date: "2025-07-03", hours: "07:00 - 16:30" },
      { date: "2025-07-04", hours: "07:00 - 16:30" }
    ],
    donationDays: [
      { date: "2025-06-26", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-27", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-06-30", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-01", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-02", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-03", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-04", timeSlots: ["08:00-10:00", "10:00-12:00"] }
    ],
    description: "Bệnh viện quân y trung ương",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Bệnh viện K",
    type: "public",
    address: "43 Quân Sứ, Hoàn Kiếm, Hà Nội",
    phone: "024 3822 5531",
    workingHours: "07:00 - 17:00",
    operatingDays: "Thứ 2 - Thứ 6",
    operatingSchedule: [
      { date: "2025-06-27", hours: "07:00 - 17:00" },
      { date: "2025-06-28", hours: "07:00 - 17:00" },
      { date: "2025-06-30", hours: "07:00 - 17:00" },
      { date: "2025-07-01", hours: "07:00 - 17:00" },
      { date: "2025-07-02", hours: "07:00 - 17:00" },
      { date: "2025-07-04", hours: "07:00 - 17:00" },
      { date: "2025-07-05", hours: "07:00 - 17:00" }
    ],
    donationDays: [
      { date: "2025-06-27", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-06-28", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-06-30", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-01", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-02", timeSlots: ["08:00-10:00", "10:00-12:00"] },
      { date: "2025-07-04", timeSlots: ["08:00-10:00", "10:00-12:00", "14:00-16:00"] },
      { date: "2025-07-05", timeSlots: ["08:00-10:00", "10:00-12:00"] }
    ],
    description: "Bệnh viện ung bướu hàng đầu",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2940&auto=format&fit=crop"
  }
];

// API Functions
export const getHospitals = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredHospitals = [...hospitals];
  
  // Filter by type
  if (filters.type && filters.type !== 'all') {
    filteredHospitals = filteredHospitals.filter(hospital => hospital.type === filters.type);
  }
  
  // Filter by date range
  if (filters.startDate && filters.endDate) {
    filteredHospitals = filteredHospitals.filter(hospital => {
      return hospital.operatingSchedule.some(schedule => {
        const scheduleDate = new Date(schedule.date);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        return scheduleDate >= startDate && scheduleDate <= endDate;
      });
    });
  }
  
  return {
    success: true,
    data: filteredHospitals,
    total: filteredHospitals.length
  };
};

export const getHospitalById = async (hospitalId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const hospital = hospitals.find(h => h.id === parseInt(hospitalId));
  
  if (hospital) {
    return {
      success: true,
      data: hospital
    };
  } else {
    return {
      success: false,
      message: 'Hospital not found'
    };
  }
};

export const getHospitalsByDate = async (date) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const availableHospitals = hospitals.filter(hospital => {
    return hospital.operatingSchedule.some(schedule => schedule.date === date);
  }).map(hospital => ({
    ...hospital,
    todaySchedule: hospital.operatingSchedule.find(schedule => schedule.date === date),
    availableSlots: hospital.donationDays.find(day => day.date === date)?.timeSlots || []
  }));
  
  return {
    success: true,
    data: availableHospitals
  };
};
