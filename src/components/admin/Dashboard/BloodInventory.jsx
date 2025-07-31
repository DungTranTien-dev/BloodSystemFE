// Blood Inventory Component - Extracted from main dashboard
import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { 
  Droplets, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  X,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Sample blood inventory data
const initialBloodInventory = [
  { id: 1, type: 'A+', units: 45, expiryDate: '2024-02-20', status: 'Good', donor: 'Nguyễn Văn A', collectionDate: '2024-01-20', location: 'Bệnh viện Bach Mai' },
  { id: 2, type: 'A-', units: 12, expiryDate: '2024-02-18', status: 'Low', donor: 'Trần Thị B', collectionDate: '2024-01-18', location: 'Bệnh viện Việt Đức' },
  { id: 3, type: 'B+', units: 38, expiryDate: '2024-02-25', status: 'Good', donor: 'Lê Văn C', collectionDate: '2024-01-25', location: 'Bệnh viện Chợ Rẫy' },
  { id: 4, type: 'B-', units: 8, expiryDate: '2024-02-15', status: 'Critical', donor: 'Phạm Thị D', collectionDate: '2024-01-15', location: 'Bệnh viện 108' },
  { id: 5, type: 'AB+', units: 15, expiryDate: '2024-02-22', status: 'Good', donor: 'Hoàng Văn E', collectionDate: '2024-01-22', location: 'Bệnh viện K' },
  { id: 6, type: 'AB-', units: 5, expiryDate: '2024-02-16', status: 'Critical', donor: 'Vũ Thị F', collectionDate: '2024-01-16', location: 'Bệnh viện Đại học Y' },
  { id: 7, type: 'O+', units: 62, expiryDate: '2024-02-28', status: 'Good', donor: 'Đặng Văn G', collectionDate: '2024-01-28', location: 'Bệnh viện Bạch Mai' },
  { id: 8, type: 'O-', units: 18, expiryDate: '2024-02-19', status: 'Low', donor: 'Bùi Thị H', collectionDate: '2024-01-19', location: 'Bệnh viện Việt Đức' }
];

const BloodInventory = () => {
  const [bloodInventory, setBloodInventory] = useState(initialBloodInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', status: '' });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddBloodModal, setShowAddBloodModal] = useState(false);
  const [selectedBloodUnit, setSelectedBloodUnit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search blood units
  const filteredBloodInventory = useMemo(() => {
    let result = bloodInventory;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(blood =>
        blood.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blood.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blood.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type) {
      result = result.filter(blood => blood.type === filters.type);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(blood => blood.status === filters.status);
    }

    return result;
  }, [bloodInventory, searchTerm, filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const total = bloodInventory.reduce((sum, blood) => sum + blood.units, 0);
    const critical = bloodInventory.filter(blood => blood.status === 'Critical').length;
    const low = bloodInventory.filter(blood => blood.status === 'Low').length;
    const good = bloodInventory.filter(blood => blood.status === 'Good').length;
    const expiringSoon = bloodInventory.filter(blood => {
      const expiryDate = new Date(blood.expiryDate);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    }).length;

    return { total, critical, low, good, expiringSoon };
  }, [bloodInventory]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Good': return <CheckCircle size={16} className="text-green-600" />;
      case 'Low': return <Clock size={16} className="text-yellow-600" />;
      case 'Critical': return <AlertTriangle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const handleEditBloodUnit = (bloodUnit) => {
    setSelectedBloodUnit(bloodUnit);
    setShowAddBloodModal(true);
  };

  const handleDeleteBloodUnit = async (bloodId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn vị máu này?')) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBloodInventory(bloodInventory.filter(blood => blood.id !== bloodId));
        toast.success('Xóa đơn vị máu thành công!');
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa đơn vị máu!');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleExportInventory = () => {
    const csvContent = [
      ['Blood Type', 'Units', 'Expiry Date', 'Status', 'Donor', 'Collection Date', 'Location'],
      ...filteredBloodInventory.map(blood => [
        blood.type,
        blood.units,
        blood.expiryDate,
        blood.status,
        blood.donor,
        blood.collectionDate,
        blood.location
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blood_inventory_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Xuất dữ liệu thành công!');
  };

  const clearFilters = () => {
    setFilters({ type: '', status: '' });
    setSearchTerm('');
    toast.success('Đã xóa bộ lọc!');
  };

  // Check if blood unit is expiring soon
  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kho máu</h2>
          <p className="text-gray-600">Quản lý tồn kho và theo dõi đơn vị máu</p>
        </div>
        <button
          onClick={() => setShowAddBloodModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Thêm đơn vị máu</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Droplets className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng đơn vị</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tình trạng tốt</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.good}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sắp hết</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.low}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tình trạng nguy hiểm</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.critical}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sắp hết hạn</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.expiringSoon}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo nhóm máu, người hiến, địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span>Bộ lọc</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExportInventory}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download size={20} />
              <span>Xuất dữ liệu</span>
            </button>

            {/* Clear Filters */}
            {(searchTerm || Object.values(filters).some(Boolean)) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={20} />
                <span>Xóa bộ lọc</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.values(filters).some(Boolean) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.type && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                Nhóm máu: {filters.type}
              </span>
            )}
            {filters.status && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Trạng thái: {filters.status}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Blood Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhóm máu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng (ml)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày hết hạn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người hiến
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa điểm thu thập
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBloodInventory.length > 0 ? (
                filteredBloodInventory.map((blood) => (
                  <tr key={blood.id} className={`hover:bg-gray-50 ${isExpiringSoon(blood.expiryDate) ? 'bg-orange-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {blood.type}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{blood.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-medium">{blood.units} ml</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${isExpiringSoon(blood.expiryDate) ? 'text-orange-600 font-medium' : 'text-gray-900'}`}>
                          {blood.expiryDate}
                        </span>
                        {isExpiringSoon(blood.expiryDate) && (
                          <AlertTriangle size={16} className="text-orange-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(blood.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blood.status)}`}>
                          {blood.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blood.donor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blood.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedBloodUnit(blood)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Xem chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditBloodUnit(blood)}
                          className="text-green-600 hover:text-green-900"
                          title="Chỉnh sửa"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBloodUnit(blood.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa"
                          disabled={isLoading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Droplets className="text-gray-400" size={32} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Không tìm thấy đơn vị máu</h3>
                        <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* Add/Edit Blood Unit Modal */}
      {showAddBloodModal && (
        <AddBloodUnitModal
          bloodUnit={selectedBloodUnit}
          onClose={() => {
            setShowAddBloodModal(false);
            setSelectedBloodUnit(null);
          }}
          onSave={(bloodData) => {
            if (selectedBloodUnit) {
              // Edit existing blood unit
              setBloodInventory(bloodInventory.map(blood => 
                blood.id === selectedBloodUnit.id ? { ...blood, ...bloodData } : blood
              ));
              toast.success('Cập nhật đơn vị máu thành công!');
            } else {
              // Add new blood unit
              const newBloodUnit = {
                id: Math.max(...bloodInventory.map(b => b.id)) + 1,
                ...bloodData
              };
              setBloodInventory([...bloodInventory, newBloodUnit]);
              toast.success('Thêm đơn vị máu thành công!');
            }
            setShowAddBloodModal(false);
            setSelectedBloodUnit(null);
          }}
        />
      )}

      {/* Blood Unit Details Modal */}
      {selectedBloodUnit && !showAddBloodModal && (
        <BloodUnitDetailsModal
          bloodUnit={selectedBloodUnit}
          onClose={() => setSelectedBloodUnit(null)}
        />
      )}
    </div>
  );
};

// Filter Modal Component
const FilterModal = ({ filters, setFilters, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
    toast.success('Áp dụng bộ lọc thành công!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Bộ lọc kho máu</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm máu</label>
            <select
              value={localFilters.type}
              onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Tất cả nhóm máu</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              value={localFilters.status}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Good">Tình trạng tốt</option>
              <option value="Low">Sắp hết</option>
              <option value="Critical">Nguy hiểm</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Áp dụng bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Blood Unit Modal Component
const AddBloodUnitModal = ({ bloodUnit, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: bloodUnit?.type || 'A+',
    units: bloodUnit?.units || '',
    expiryDate: bloodUnit?.expiryDate || '',
    status: bloodUnit?.status || 'Good',
    donor: bloodUnit?.donor || '',
    collectionDate: bloodUnit?.collectionDate || '',
    location: bloodUnit?.location || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {bloodUnit ? 'Chỉnh sửa đơn vị máu' : 'Thêm đơn vị máu mới'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm máu</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng (ml)</label>
            <input
              type="number"
              value={formData.units}
              onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày hết hạn</label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Good">Tình trạng tốt</option>
              <option value="Low">Sắp hết</option>
              <option value="Critical">Nguy hiểm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Người hiến</label>
            <input
              type="text"
              value={formData.donor}
              onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày thu thập</label>
            <input
              type="date"
              value={formData.collectionDate}
              onChange={(e) => setFormData({ ...formData, collectionDate: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm thu thập</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              {bloodUnit ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Blood Unit Details Modal Component
const BloodUnitDetailsModal = ({ bloodUnit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Chi tiết đơn vị máu</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Blood Type Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {bloodUnit.type}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Nhóm máu {bloodUnit.type}</h4>
                <p className="text-gray-600">{bloodUnit.units} ml</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Thông tin cơ bản</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số lượng:</span>
                  <span className="font-medium">{bloodUnit.units} ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày hết hạn:</span>
                  <span className="font-medium">{bloodUnit.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    bloodUnit.status === 'Good' ? 'bg-green-100 text-green-800' :
                    bloodUnit.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bloodUnit.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-2">Thông tin thu thập</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Người hiến:</span>
                  <span className="font-medium">{bloodUnit.donor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày thu thập:</span>
                  <span className="font-medium">{bloodUnit.collectionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm:</span>
                  <span className="font-medium">{bloodUnit.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 mt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodInventory;
