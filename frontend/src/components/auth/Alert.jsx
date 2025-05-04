import { useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      {onClose && (
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;