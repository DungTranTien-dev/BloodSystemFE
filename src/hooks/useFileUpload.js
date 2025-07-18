// Custom hook for file upload functionality
import { useState } from 'react';

export const useFileUpload = () => {
  const [identityFile, setIdentityFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  // QR Code URL for mobile upload
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent('https://bloodsystem.com/upload-mobile');

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIdentityFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIdentityFile(e.target.files[0]);
    }
  };

  const resetFile = () => {
    setIdentityFile(null);
    setDragActive(false);
  };

  return {
    identityFile,
    setIdentityFile,
    dragActive,
    setDragActive,
    qrCodeUrl,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileChange,
    resetFile
  };
};
