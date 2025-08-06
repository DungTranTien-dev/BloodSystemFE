import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createUserMedical, updateUserMedical } from "../../service/medicalApi";
import api from "../../config/axios";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { login } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

const genderOptions = [
  { value: 0, label: "Nam" },
  { value: 1, label: "Nữ" },
];

const bloodOptions = [
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" }
];

function UpdateProfile() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const user = userState?.user || {};
  const medical = userState?.userMedical || {};
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  const [form, setForm] = useState({
    userMedicalId: "",
    fullName: "",
    dateOfBirth: "",
    gender: 0,
    citizenId: "",
    phoneNumber: "",
    email: "",
    currentAddress: "",
    hasDonatedBefore: false,
    donationCount: 0,
    diseaseDescription: "",
    type: 0,
    createDate: "",
    userId: "",
    bloodName: "",
  });
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!isInitialized && medical && Object.keys(medical).length > 0) {
      setForm((prev) => ({
        ...prev,
        userMedicalId: medical.userMedicalId || "",
        fullName: medical.fullName || user.userName || "",
        dateOfBirth: medical.dateOfBirth ? medical.dateOfBirth.slice(0, 10) : "",
        gender: medical.gender === "MALE" ? 0 : medical.gender === "FEMALE" ? 1 : 2,
        citizenId: medical.citizenId || "",
        phoneNumber: medical.phoneNumber || user.phoneNumber || "",
        email: medical.email || user.email || "",
        currentAddress: medical.currentAddress || "",
        hasDonatedBefore: medical.hasDonatedBefore || false,
        donationCount: medical.donationCount || 0,
        diseaseDescription: medical.diseaseDescription || "",
        type: medical.type === "PENDING" ? 0 : medical.type === "AVAILABLE" ? 1 : 2,
        createDate: medical.createDate || "",
        userId: medical.userId || user.userId || "",
        bloodName: medical.bloodName ?? "",
      }));
      setIsInitialized(true);
    }
  }, [medical, user, isInitialized]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "gender" ? Number(value) : (type === "checkbox" ? checked : value)
    }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !form.fullName?.trim() ||
      !form.email?.trim() ||
      !form.phoneNumber?.trim() ||
      !form.citizenId?.trim() ||
      !form.currentAddress?.trim() ||
      !form.bloodName?.trim() ||
      !form.diseaseDescription?.trim()
    ) {
      toast.error("Vui lòng điền đầy đủ tất cả các trường bắt buộc.");
      // setLoading(false); 
    }
    const genderMapToString = { 0: "MALE", 1: "FEMALE", 2: "OTHER" };
    let result = null;
    const dateOfBirthISO = form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : null;
    try {
      if (!form.userMedicalId) {
        // ➕ Gọi API tạo mới
        const createPayload = {
          createUserMediCalDTO: {
            FullName: form.fullName || "",
            DateOfBirth: dateOfBirthISO,
            Gender: Number(form.gender),
            CitizenId: form.citizenId || "",
            PhoneNumber: form.phoneNumber || "",
            Email: form.email || "",
            CurrentAddress: form.currentAddress || "",
            HasDonatedBefore: form.hasDonatedBefore || false,
            DonationCount: form.donationCount || 0,
            DiseaseDescription: form.diseaseDescription || "",
            ChronicDiseaseIds: [], // ✅ BẮT BUỘC: dù không có thì vẫn truyền mảng rỗng
            BloodName: form.bloodName,
            LastDonorDate: null,
            Latitue: 0,
            Longtitue: 0
          }
        };

        const { createUserMedical } = await import("../../service/medicalApi");
        result = await createUserMedical(createPayload);

        if (result.success) {
          const newMedical = {
            ...form,
            userMedicalId: result.data?.result?.userMedicalId || "",
            gender: genderMapToString[form.gender],
          };
          const updatedUser = {
            ...userState,
            userMedical: newMedical,
          };
          // console.log(updatedUser);
          dispatch(login(updatedUser));
          alert("Tạo hồ sơ y tế thành công!");
          navigate("/profile");
        } else {
          alert(result.error || "Tạo hồ sơ thất bại!");
        }
      } else {
        // ✏️ Gọi API update
        const updatePayload = {
          ...form,
          gender: Number(form.gender),
          dateOfBirth: new Date(form.dateOfBirth).toISOString(),
          lastDonorDate: null
        };

        result = await updateUserMedical(updatePayload);

        if (result.success) {
          // 🔁 Gọi lại API để lấy thông tin mới nhất từ backend
          const getUserRes = await api.get(`/User/id`);
          const userDto = getUserRes.data?.result?.userDTO;
          const medicalDto = getUserRes.data?.result?.userMedicalDTO;

          if (userDto && medicalDto) {
            dispatch(login({
              user: userDto,
              userMedical: medicalDto
            }));
          }

          alert("Cập nhật hồ sơ thành công!");
          navigate("/profile");
        } else {
          alert(result.error || "Cập nhật hồ sơ thất bại!");
        }
      }
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      alert("Đã xảy ra lỗi không xác định!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-red-500 to-pink-500 min-h-screen pb-12">
        <div className="max-w-5xl mx-auto mt-0 bg-white rounded-2xl p-6 md:p-8 shadow-md">
          <button
            className="mb-4 flex items-center gap-2 text-slate-700 hover:text-red-500 font-semibold"
            onClick={() => navigate(-1)}
          >
            <span className="text-xl">←</span> Quay lại
          </button>
          <h1 className="text-3xl font-bold text-red-600 mb-6">Chỉnh sửa hồ sơ</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar */}
            <div className="col-span-1 flex flex-col items-center bg-white rounded-xl p-6 border shadow">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-4xl font-bold text-white mb-4">
                {form.fullName
                  ? form.fullName.split(" ").map((w) => w[0]).join("").toUpperCase()
                  : "N/A"}
              </div>
              <div className="text-center text-slate-600 mb-2">Ảnh đại diện</div>
              <div className="text-xs text-slate-400 mb-4">(Chức năng thay đổi ảnh đã bị ẩn)</div>
            </div>

            {/* Thông tin cá nhân + liên hệ + hiến máu */}
            <div className="col-span-2 grid grid-cols-1 gap-6">
              {/* Thông tin cá nhân */}
              <div className="bg-white rounded-xl p-6 border shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">👤 Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Họ và tên</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Giới tính</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                    >
                      {genderOptions.map((g) => (
                        <option key={g.value} value={g.value}>{g.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Ngày sinh</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Căn cước công dân</label>
                    <input
                      type="text"
                      name="citizenId"
                      value={form.citizenId}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                    />
                  </div>
                </div>
              </div>
              {/* Thông tin liên hệ */}
              <div className="bg-white rounded-xl p-6 border shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📧 Thông tin liên hệ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Số điện thoại</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">Địa chỉ</label>
                    <textarea
                      name="currentAddress"
                      value={form.currentAddress}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              {/* Thông tin hiến máu */}
              <div className="bg-white rounded-xl p-6 border shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🔥 Thông tin hiến máu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Nhóm máu hiện tại của bạn</label>
                    <select
                      name="bloodName"
                      value={form.bloodName}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded px-3 py-2 mb-2"
                    >
                      {bloodOptions.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Mô tả bệnh lý</label>
                  <textarea
                    name="diseaseDescription"
                    value={form.diseaseDescription}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded px-3 py-2"
                    rows={3}
                  />
                </div>
              </div>
              {/* Nút hành động */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border border-pink-400 text-pink-600 font-semibold hover:bg-pink-50 transition"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Hủy thay đổi
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow hover:from-pink-600 hover:to-red-600 transition disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : "Lưu hồ sơ"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
