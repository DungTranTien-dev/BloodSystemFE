import React, { useState, useEffect } from "react";

const bloodComponentOptions = [
  { value: "RED_BLOOD_CELL", label: "Hồng cầu (RBC)" },
  { value: "PLASMA", label: "Huyết tương (PLASMA)" },
  { value: "PLATELET", label: "Tiểu cầu (PLATELET)" },
];

export default function CreateSeparatedBloodComponentPopup({
  isOpen, onClose, onSubmit, bloodId
}) {
  const [components, setComponents] = useState([
    { componentType: "", volumeInML: "" },
  ]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleChange = (index, field, value) => {
    const newComponents = [...components];
    newComponents[index][field] = value;
    setComponents(newComponents);
  };

  const addComponent = () => {
    setComponents([...components, { componentType: "", volumeInML: "" }]);
  };

  const handleSubmit = () => {
    // Validate
    if (components.some(c => !c.componentType || !c.volumeInML)) {
      alert("Vui lòng điền đầy đủ thông tin cho tất cả thành phần.");
      return;
    }
    // Gọi onSubmit với dữ liệu chuẩn
    onSubmit({
      bloodId,
      components: components.map(c => ({
        componentType: c.componentType,
        volumeInML: Number(c.volumeInML),
      })),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="relative flex justify-center items-center min-h-screen w-full">
        <div className={`bg-white rounded-lg p-6 w-[400px] max-h-[80vh] overflow-auto transition-all duration-300 transform ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-xl font-bold mb-4">Tách thành phần máu</h2>

          {components.map((comp, idx) => (
            <div key={idx} className="mb-3 border-b pb-3 last:border-none">
              <label className="block mb-1 font-semibold">Loại thành phần</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={comp.componentType}
                onChange={(e) => handleChange(idx, "componentType", e.target.value)}
              >
                <option value="">-- Chọn loại --</option>
                {bloodComponentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <label className="block mt-2 mb-1 font-semibold">Thể tích (ml)</label>
              <input
                type="number"
                min={0}
                className="w-full border px-2 py-1 rounded"
                value={comp.volumeInML}
                onChange={(e) => handleChange(idx, "volumeInML", e.target.value)}
                placeholder="Nhập thể tích"
              />
              <label className="block mt-2 mb-1 font-semibold">Ngày hết hạn</label>
              <input
                type="date"
                className="w-full border px-2 py-1 rounded"
                value={comp.expiryDate || ""}
                onChange={(e) => handleChange(idx, "expiryDate", e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={addComponent}
            className="text-pink-600 hover:text-pink-800 font-semibold mb-4"
          >
            + Thêm thành phần
          </button>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Tách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
