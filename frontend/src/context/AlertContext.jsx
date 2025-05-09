import { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};