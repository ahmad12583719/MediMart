import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const iconMap = {
    success: '✓', // Using simple checkmark for cleaner look
    error: '!',
    warning: '?',
    info: 'i',
  };

  return (
    <div className={`toast toast-${type}`} role="alert">
      {/* Icon is now wrapped in a bubble for styling */}
      <div className="toast-icon-wrapper">
        <span className="toast-icon">{iconMap[type]}</span>
      </div>
      
      <div className="toast-content">
        <span className="toast-title">{type}</span> {/* Optional Title */}
        <p className="toast-message">{message}</p>
      </div>

      {onClose && (
        <button className="toast-close-btn" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Toast;