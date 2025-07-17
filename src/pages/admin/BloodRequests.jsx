import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button, Modal, Descriptions, message, Space, Input, Select } from 'antd';
import { FaArrowLeft, FaEye, FaCheck, FaTimes, FaSearch, FaDroplet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const BloodRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load blood requests from localStorage
  useEffect(() => {
    const loadRequests = () => {
      const savedRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
      setRequests(savedRequests);
      setFilteredRequests(savedRequests);
    };
    
    loadRequests();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadRequests();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadRequests);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadRequests);
    };
  }, []);

  // Filter requests based on search and status
  useEffect(() => {
    let filtered = requests;
    
    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.disease.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter]);

  const handleStatusUpdate = (requestId, newStatus) => {
    setLoading(true);
    
    setTimeout(() => {
      const updatedRequests = requests.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus, updatedAt: new Date().toISOString() }
          : request
      );
      
      setRequests(updatedRequests);
      localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests));
      
      message.success(`Request ${newStatus.toLowerCase()} successfully!`);
      setLoading(false);
      setModalVisible(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'orange',
      'Approved': 'green',
      'Rejected': 'red',
      'Completed': 'blue'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    return priority === 'High' ? 'red' : 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => `#${id.toString().slice(-6)}`,
      width: 120,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'patientAge',
      key: 'patientAge',
      width: 80,
    },
    {
      title: 'Blood Group',
      dataIndex: 'bloodGroup',
      key: 'bloodGroup',
      render: (bloodGroup) => (
        <Badge 
          color="red" 
          text={
            <span className="flex items-center">
              <FaDroplet className="mr-1" />
              {bloodGroup}
            </span>
          }
        />
      ),
      width: 120,
    },
    {
      title: 'Units Required',
      dataIndex: 'units',
      key: 'units',
      width: 150,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Badge 
          color={getPriorityColor(priority)} 
          text={priority}
        />
      ),
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          color={getStatusColor(status)} 
          text={status}
        />
      ),
      width: 120,
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => formatDate(date),
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<FaEye />}
            size="small"
            onClick={() => {
              setSelectedRequest(record);
              setModalVisible(true);
            }}
          >
            View
          </Button>
        </Space>
      ),
      width: 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors mr-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Admin
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Blood Requests</h1>
              <p className="text-gray-600">Manage incoming blood donation requests</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Search
              placeholder="Search by patient name, blood group, or disease"
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
              prefix={<FaSearch />}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
            >
              <Option value="all">All Status</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="Completed">Completed</Option>
            </Select>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>Pending: {requests.filter(r => r.status === 'Pending').length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Approved: {requests.filter(r => r.status === 'Approved').length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>High Priority: {requests.filter(r => r.priority === 'High').length}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Requests Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={filteredRequests}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} requests`,
            }}
            scroll={{ x: 1200 }}
            className="w-full"
          />
        </Card>

        {/* Request Details Modal */}
        <Modal
          title={`Blood Request Details - #${selectedRequest?.id?.toString().slice(-6)}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={
            selectedRequest?.status === 'Pending' ? [
              <Button
                key="reject"
                danger
                icon={<FaTimes />}
                loading={loading}
                onClick={() => handleStatusUpdate(selectedRequest.id, 'Rejected')}
              >
                Reject
              </Button>,
              <Button
                key="approve"
                type="primary"
                icon={<FaCheck />}
                loading={loading}
                onClick={() => handleStatusUpdate(selectedRequest.id, 'Approved')}
              >
                Approve
              </Button>,
            ] : [
              <Button key="close" onClick={() => setModalVisible(false)}>
                Close
              </Button>
            ]
          }
          width={600}
        >
          {selectedRequest && (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Patient Name">
                <span className="font-semibold">{selectedRequest.patientName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Patient Age">
                {selectedRequest.patientAge} years old
              </Descriptions.Item>
              <Descriptions.Item label="Blood Group">
                <Badge 
                  color="red" 
                  text={
                    <span className="flex items-center">
                      <FaDroplet className="mr-1" />
                      {selectedRequest.bloodGroup}
                    </span>
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Units Required">
                {selectedRequest.units}
              </Descriptions.Item>
              <Descriptions.Item label="Disease/Condition">
                {selectedRequest.disease}
              </Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Badge 
                  color={getPriorityColor(selectedRequest.priority)} 
                  text={selectedRequest.priority}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge 
                  color={getStatusColor(selectedRequest.status)} 
                  text={selectedRequest.status}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Request Date">
                {formatDate(selectedRequest.requestDate)}
              </Descriptions.Item>
              {selectedRequest.updatedAt && (
                <Descriptions.Item label="Last Updated">
                  {formatDate(selectedRequest.updatedAt)}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default BloodRequests;
