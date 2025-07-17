// Custom hooks for donor management logic
import { useState } from 'react';

// Sample donor data to check for unique donor numbers
const sampleDonors = [
  { donorNo: '222' },
  { donorNo: '223' },
  { donorNo: '224' }
];

export const useDonorForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    donorName: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    mobile: '',
    email: '',
    
    // Address Information
    address: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    
    // Blood Information
    bloodGroup: '',
    rhType: '',
    donorType: '',
    
    // Medical Information
    weight: '',
    height: '',
    hemoglobin: '',
    bloodPressure: '',
    pulse: '',
    temperature: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // Additional Information
    occupation: '',
    previousDonations: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    lastDonationDate: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (identityFile, userRole) => {
    const newErrors = {};

    // Identity document validation
    if (!identityFile) {
      newErrors.identityFile = 'Identity document is required';
    }

    // Required fields validation
    if (!formData.donorName.trim()) newErrors.donorName = 'Donor name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.rhType) newErrors.rhType = 'Rh type is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    // Admin validation - ensure proper role management
    if (userRole !== 'admin' && userRole !== 'staff') {
      newErrors.userRole = 'Invalid user role assignment';
    }

    // Format validations
    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.age && (formData.age < 18 || formData.age > 65)) {
      newErrors.age = 'Age must be between 18 and 65';
    }

    if (formData.pinCode && !/^[0-9]{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Pin code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateDonorNumber = () => {
    const existingDonors = JSON.parse(localStorage.getItem('donors') || '[]');
    const allDonorNumbers = [...sampleDonors.map(d => parseInt(d.donorNo)), ...existingDonors.map(d => parseInt(d.donorNo))];
    const maxDonorNo = Math.max(...allDonorNumbers, 224);
    return (maxDonorNo + 1).toString();
  };

  // Simulate OCR extraction from identity document
  const simulateOCRExtraction = (file) => {
    // In real implementation, this would use OCR service
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        donorName: 'Extracted Name', // Simulated extraction
        dateOfBirth: '1990-01-01',
        // Add more extracted fields as needed
      }));
    }, 1000);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    generateDonorNumber,
    simulateOCRExtraction
  };
};
