import React, { useEffect } from 'react';

const SampleDataCreator = () => {
  useEffect(() => {
    // Tạo dữ liệu mẫu cho blood requests
    const sampleRequests = [
      {
        id: 1703123456789,
        patientName: 'Nguyễn Văn An',
        patientAge: 45,
        disease: 'Tai nạn giao thông',
        bloodGroup: 'O+',
        units: '2 Units (900ml)',
        requestDate: new Date('2024-12-20T08:30:00').toISOString(),
        status: 'Pending',
        priority: 'Normal'
      },
      {
        id: 1703123556789,
        patientName: 'Trần Thị Bích',
        patientAge: 67,
        disease: 'Phẫu thuật tim',
        bloodGroup: 'A+',
        units: '3 Units (1350ml)',
        requestDate: new Date('2024-12-19T14:15:00').toISOString(),
        status: 'Approved',
        priority: 'High',
        updatedAt: new Date('2024-12-19T16:30:00').toISOString()
      },
      {
        id: 1703123656789,
        patientName: 'Lê Minh Tuấn',
        patientAge: 12,
        disease: 'Bệnh bạch cầu',
        bloodGroup: 'AB+',
        units: '1 Unit (450ml)',
        requestDate: new Date('2024-12-18T10:45:00').toISOString(),
        status: 'Pending',
        priority: 'High'
      },
      {
        id: 1703123756789,
        patientName: 'Phạm Thu Hằng',
        patientAge: 29,
        disease: 'Sinh con',
        bloodGroup: 'B-',
        units: '2 Units (900ml)',
        requestDate: new Date('2024-12-17T22:20:00').toISOString(),
        status: 'Completed',
        priority: 'Normal',
        updatedAt: new Date('2024-12-18T08:15:00').toISOString()
      },
      {
        id: 1703123856789,
        patientName: 'Hoàng Đức Minh',
        patientAge: 55,
        disease: 'Ung thư máu',
        bloodGroup: 'O-',
        units: '4 Units (1800ml)',
        requestDate: new Date('2024-12-16T16:30:00').toISOString(),
        status: 'Rejected',
        priority: 'Normal',
        updatedAt: new Date('2024-12-17T09:45:00').toISOString()
      }
    ];

    // Lưu vào localStorage
    localStorage.setItem('bloodRequests', JSON.stringify(sampleRequests));
    console.log('Sample blood requests data created!');
  }, []);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Đã tạo dữ liệu mẫu!</h2>
      <p className="text-gray-600 mb-4">
        Dữ liệu mẫu đã được thêm vào localStorage. Bây giờ bạn có thể:
      </p>
      <div className="space-y-2">
        <p>✅ Xem danh sách requests tại: <strong>/admin/blood-requests</strong></p>
        <p>✅ Thêm request mới tại: <strong>/blood-request</strong></p>
        <p>✅ Quản lý từ admin dashboard: <strong>/admin</strong></p>
      </div>
    </div>
  );
};

export default SampleDataCreator;
