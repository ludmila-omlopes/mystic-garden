'use client'

import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

interface LoginStateContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: any; // Replace 'any' with the type of your user data
  setUserData: Dispatch<SetStateAction<any>>; // Replace 'any' with the type of your user data
}

interface LoginStateProviderProps {
    children: React.ReactNode;
  }

const LoginStateContext = createContext<LoginStateContextType | null>(null);

export const LoginStateProvider: React.FC<LoginStateProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
  
    return (
      <LoginStateContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
        {children}
      </LoginStateContext.Provider>
    );
  };

export const useLoginState = () => {
  const context = useContext(LoginStateContext);
  if (!context) {
    throw new Error('useLoginState must be used within a LoginStateProvider');
  }
  return context;
};