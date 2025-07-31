// Hàm để giả lập độ trễ mạng
const networkDelay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Gửi yêu cầu hiến máu mới.
 * @param {object} donationData Dữ liệu từ form.
 * @returns {Promise<{success: boolean, data: object}>}
 */
export const submitDonationRequest = async (donationData) => {
  await networkDelay(1000); // Giả lập độ trễ 1 giây
  
  try {
    const newRequest = {
      ...donationData,
      id: `DON-${Date.now()}`,
      submissionDate: new Date().toISOString(),
      status: 'pending', // Trạng thái mặc định là "Chờ duyệt"
    };
    
    const existingDonations = JSON.parse(localStorage.getItem('bloodDonations') || '[]');
    existingDonations.unshift(newRequest); // Thêm vào đầu mảng để hiển thị mới nhất trước
    localStorage.setItem('bloodDonations', JSON.stringify(existingDonations));

    return { success: true, data: newRequest };
  } catch (error) {
    console.error("Failed to submit donation request:", error);
    return { success: false, error: "Lỗi khi lưu trữ dữ liệu." };
  }
};

/**
 * Lấy tất cả các yêu cầu hiến máu đã gửi.
 * @returns {Promise<{success: boolean, data: Array<object>}>}
 */
export const getDonationRequests = async () => {
  await networkDelay(500); // Giả lập độ trễ 0.5 giây
  
  try {
    const requests = JSON.parse(localStorage.getItem('bloodDonations') || '[]');
    return { success: true, data: requests };
  } catch (error) {
    console.error("Failed to get donation requests:", error);
    return { success: false, error: "Lỗi khi truy xuất dữ liệu." };
  }
};