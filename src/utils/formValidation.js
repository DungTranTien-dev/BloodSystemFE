// Common Form Validation Utilities
import moment from 'moment';

/**
 * Comprehensive validation utilities for the Blood Donation System
 * Provides reusable validation functions for forms across the application
 */

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  idCard: /^[0-9]{9}$|^[0-9]{12}$/,
  passport: /^[A-Z]{1}[0-9]{7}$|^[A-Z]{2}[0-9]{6}$/,
  bloodGroup: /^(A|B|AB|O)[+-]$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
};

// Error messages in Vietnamese
export const ERROR_MESSAGES = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  idCard: 'Số CMND/CCCD không hợp lệ (9 hoặc 12 số)',
  passport: 'Số hộ chiếu không hợp lệ',
  bloodGroup: 'Nhóm máu không hợp lệ (A+, A-, B+, B-, AB+, AB-, O+, O-)',
  password: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
  confirmPassword: 'Mật khẩu xác nhận không khớp',
  minLength: (min) => `Phải có ít nhất ${min} ký tự`,
  maxLength: (max) => `Không được vượt quá ${max} ký tự`,
  minAge: (min) => `Tuổi phải từ ${min} trở lên`,
  maxAge: (max) => `Tuổi không được vượt quá ${max}`,
  futureDate: 'Ngày không được ở tương lai',
  pastDate: 'Ngày phải ở quá khứ',
  dateRange: 'Ngày bắt đầu phải trước ngày kết thúc'
};

/**
 * Basic validation functions
 */
export const validators = {
  // Required field validation
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return ERROR_MESSAGES.required;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return ERROR_MESSAGES.required;
    }
    return null;
  },

  // Email validation
  email: (value) => {
    if (!value) return null;
    if (!VALIDATION_PATTERNS.email.test(value)) {
      return ERROR_MESSAGES.email;
    }
    return null;
  },

  // Phone number validation (Vietnamese format)
  phone: (value) => {
    if (!value) return null;
    const cleanPhone = value.replace(/\s+/g, '');
    if (!VALIDATION_PATTERNS.phone.test(cleanPhone)) {
      return ERROR_MESSAGES.phone;
    }
    return null;
  },

  // ID Card validation (CMND/CCCD)
  idCard: (value) => {
    if (!value) return null;
    if (!VALIDATION_PATTERNS.idCard.test(value)) {
      return ERROR_MESSAGES.idCard;
    }
    return null;
  },

  // Passport validation
  passport: (value) => {
    if (!value) return null;
    if (!VALIDATION_PATTERNS.passport.test(value.toUpperCase())) {
      return ERROR_MESSAGES.passport;
    }
    return null;
  },

  // Blood group validation
  bloodGroup: (value) => {
    if (!value) return null;
    if (!VALIDATION_PATTERNS.bloodGroup.test(value)) {
      return ERROR_MESSAGES.bloodGroup;
    }
    return null;
  },

  // Password validation
  password: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return ERROR_MESSAGES.minLength(8);
    }
    if (!VALIDATION_PATTERNS.password.test(value)) {
      return ERROR_MESSAGES.password;
    }
    return null;
  },

  // Confirm password validation
  confirmPassword: (value, originalPassword) => {
    if (!value) return null;
    if (value !== originalPassword) {
      return ERROR_MESSAGES.confirmPassword;
    }
    return null;
  },

  // Length validation
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return ERROR_MESSAGES.minLength(min);
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return ERROR_MESSAGES.maxLength(max);
    }
    return null;
  },

  // Age validation
  minAge: (min) => (birthDate) => {
    if (!birthDate) return null;
    const age = moment().diff(moment(birthDate), 'years');
    if (age < min) {
      return ERROR_MESSAGES.minAge(min);
    }
    return null;
  },

  maxAge: (max) => (birthDate) => {
    if (!birthDate) return null;
    const age = moment().diff(moment(birthDate), 'years');
    if (age > max) {
      return ERROR_MESSAGES.maxAge(max);
    }
    return null;
  },

  // Date validation
  futureDate: (value) => {
    if (!value) return null;
    if (moment(value).isAfter(moment())) {
      return ERROR_MESSAGES.futureDate;
    }
    return null;
  },

  pastDate: (value) => {
    if (!value) return null;
    if (moment(value).isBefore(moment())) {
      return ERROR_MESSAGES.pastDate;
    }
    return null;
  },

  // Date range validation
  dateRange: (startDate, endDate) => {
    if (!startDate || !endDate) return null;
    if (moment(startDate).isAfter(moment(endDate))) {
      return ERROR_MESSAGES.dateRange;
    }
    return null;
  }
};

/**
 * Composite validation for specific use cases
 */
export const compositeValidators = {
  // Donor registration validation
  donorPersonalInfo: {
    fullName: [validators.required, validators.minLength(2), validators.maxLength(100)],
    email: [validators.required, validators.email],
    phone: [validators.required, validators.phone],
    idCard: [validators.required, validators.idCard],
    birthDate: [validators.required, validators.futureDate, validators.minAge(18), validators.maxAge(65)],
    bloodGroup: [validators.required, validators.bloodGroup]
  },

  // Medical information validation
  donorMedicalInfo: {
    weight: [
      validators.required,
      (value) => {
        const weight = parseFloat(value);
        if (isNaN(weight) || weight < 45) {
          return 'Cân nặng phải từ 45kg trở lên';
        }
        if (weight > 200) {
          return 'Cân nặng không hợp lệ';
        }
        return null;
      }
    ],
    height: [
      validators.required,
      (value) => {
        const height = parseFloat(value);
        if (isNaN(height) || height < 140) {
          return 'Chiều cao phải từ 140cm trở lên';
        }
        if (height > 220) {
          return 'Chiều cao không hợp lệ';
        }
        return null;
      }
    ],
    bloodPressure: [validators.required],
    lastDonationDate: [
      (value) => {
        if (!value) return null;
        const daysSinceLastDonation = moment().diff(moment(value), 'days');
        if (daysSinceLastDonation < 56) {
          return 'Phải cách lần hiến máu trước ít nhất 8 tuần (56 ngày)';
        }
        return null;
      }
    ]
  },

  // User account validation
  userAccount: {
    username: [validators.required, validators.minLength(3), validators.maxLength(50)],
    password: [validators.required, validators.password],
    email: [validators.required, validators.email]
  },

  // Hospital registration validation
  hospitalInfo: {
    hospitalName: [validators.required, validators.minLength(5), validators.maxLength(200)],
    hospitalCode: [
      validators.required,
      (value) => {
        if (!/^[A-Z0-9]{4,10}$/.test(value)) {
          return 'Mã bệnh viện phải từ 4-10 ký tự, chỉ bao gồm chữ hoa và số';
        }
        return null;
      }
    ],
    address: [validators.required, validators.minLength(10)],
    phone: [validators.required, validators.phone],
    email: [validators.required, validators.email]
  }
};

/**
 * Validate a single field with multiple validators
 * @param {any} value - The value to validate
 * @param {Array} validatorList - Array of validator functions
 * @returns {string|null} - First error message or null if valid
 */
export const validateField = (value, validatorList) => {
  for (const validator of validatorList) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
};

/**
 * Validate an entire form object
 * @param {Object} formData - The form data object
 * @param {Object} validationSchema - Schema with field names and validator arrays
 * @returns {Object} - Object with field errors
 */
export const validateForm = (formData, validationSchema) => {
  const errors = {};
  
  Object.keys(validationSchema).forEach(fieldName => {
    const validators = validationSchema[fieldName];
    const value = formData[fieldName];
    const error = validateField(value, validators);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} - True if form is valid (no errors)
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

/**
 * Custom validation rules for blood donation specific scenarios
 */
export const bloodDonationValidators = {
  // Check if donor is eligible to donate (age, weight, health status)
  donorEligibility: (donorData) => {
    const errors = [];
    
    // Age check
    const age = moment().diff(moment(donorData.birthDate), 'years');
    if (age < 18 || age > 65) {
      errors.push('Người hiến máu phải từ 18 đến 65 tuổi');
    }
    
    // Weight check
    if (donorData.weight < 45) {
      errors.push('Cân nặng phải từ 45kg trở lên');
    }
    
    // Last donation check
    if (donorData.lastDonationDate) {
      const daysSinceLastDonation = moment().diff(moment(donorData.lastDonationDate), 'days');
      if (daysSinceLastDonation < 56) {
        errors.push('Phải cách lần hiến máu trước ít nhất 8 tuần');
      }
    }
    
    // Health conditions check
    if (donorData.hasChronicDisease) {
      errors.push('Không thể hiến máu khi có bệnh mãn tính');
    }
    
    return errors;
  },

  // Validate blood bag information
  bloodBagInfo: (bloodBagData) => {
    const errors = {};
    
    if (!bloodBagData.bagId || bloodBagData.bagId.length < 8) {
      errors.bagId = 'Mã túi máu phải có ít nhất 8 ký tự';
    }
    
    if (!bloodBagData.bloodGroup || !VALIDATION_PATTERNS.bloodGroup.test(bloodBagData.bloodGroup)) {
      errors.bloodGroup = ERROR_MESSAGES.bloodGroup;
    }
    
    if (!bloodBagData.volume || bloodBagData.volume < 250 || bloodBagData.volume > 500) {
      errors.volume = 'Thể tích túi máu phải từ 250ml đến 500ml';
    }
    
    if (!bloodBagData.collectionDate || moment(bloodBagData.collectionDate).isAfter(moment())) {
      errors.collectionDate = 'Ngày thu thập không hợp lệ';
    }
    
    // Check expiry date
    const expiryDate = moment(bloodBagData.collectionDate).add(35, 'days');
    if (moment().isAfter(expiryDate)) {
      errors.expiry = 'Túi máu đã hết hạn sử dụng';
    }
    
    return errors;
  }
};

/**
 * Real-time validation hook for React components
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationSchema - Validation schema
 * @returns {Object} - Form state and validation methods
 */
export const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateSingleField = (name, value) => {
    if (validationSchema[name]) {
      const error = validateField(value, validationSchema[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
      return error;
    }
    return null;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      validateSingleField(name, value);
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    validateSingleField(name, values[name]);
  };

  const validateAll = () => {
    const formErrors = validateForm(values, validationSchema);
    setErrors(formErrors);
    setTouched(
      Object.keys(validationSchema).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {})
    );
    return isFormValid(formErrors);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    resetForm,
    isValid: isFormValid(errors)
  };
};

export default {
  validators,
  compositeValidators,
  validateField,
  validateForm,
  isFormValid,
  bloodDonationValidators,
  useFormValidation,
  VALIDATION_PATTERNS,
  ERROR_MESSAGES
};
