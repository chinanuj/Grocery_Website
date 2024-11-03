// frontend/src/components/Alert.jsx
import React from 'react';

const Alert = ({ type, message }) => {
  const baseStyles = "px-4 py-3 rounded relative mb-4";
  const typeStyles = {
    success: "bg-green-100 border border-green-400 text-green-700",
    danger: "bg-red-100 border border-red-400 text-red-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border border-blue-400 text-blue-700",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Alert;