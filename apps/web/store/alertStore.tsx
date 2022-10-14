import React, { useState, createContext, useMemo, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AlertContextType {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
}

export const AlertContext = createContext<AlertContextType>({
  success: () => {},
  error: () => {},
  info: () => {},
});

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const success = (msg: string) => {
    toast.success(msg);
  };

  const error = (msg: string) => {
    toast.error(msg);
  };

  const info = (msg: string) => {
    toast.info(msg);
  };

  const value = useMemo(
    () => ({
      success,
      error,
      info,
    }),
    []
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <ToastContainer
        theme='dark'
        position='top-right'
        autoClose={2000}
        // hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
