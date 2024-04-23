'use client';

import React, { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';

interface LoginStateContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  profileId: string | null;
  setProfileId: Dispatch<SetStateAction<string | null>>;
}

interface LoginStateProviderProps {
  children: React.ReactNode;
}

const LoginStateContext = createContext<LoginStateContextType | undefined>(undefined);

export const LoginStateProvider: React.FC<LoginStateProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => JSON.parse(localStorage.getItem('isLoggedIn') || 'false'));
  const [profileId, setProfileId] = useState<string | null>(() => localStorage.getItem('profileId'));

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    if (profileId) {
      localStorage.setItem('profileId', profileId);
    } else {
      localStorage.removeItem('profileId');
    }
  }, [isLoggedIn, profileId]);

  return (
    <LoginStateContext.Provider value={{ isLoggedIn, setIsLoggedIn, profileId, setProfileId }}>
      {children}
    </LoginStateContext.Provider>
  );
};

export const useLoginState = () => {
  const context = useContext(LoginStateContext);
  if (context === undefined) {
    throw new Error('useLoginState must be used within a LoginStateProvider');
  }
  return context;
};
