import React, { useEffect, useState } from 'react';

const Alert = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Hide alert after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const alertStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    danger: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700'
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${alertStyles[type]}`} role="alert">
      <p className="font-medium">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-0 right-0 p-4"
        aria-label="Close alert"
      >
        <span className="text-xl">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
