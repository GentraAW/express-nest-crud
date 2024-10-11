import React, { createContext, useState, useEffect, useContext } from 'react';

const FrameworkContext = createContext();

export const FrameworkProvider = ({ children }) => {
  const [selectedFramework, setSelectedFramework] = useState(() => {
    return localStorage.getItem('selectedFramework') || 'express';
  });

  useEffect(() => {
    localStorage.setItem('selectedFramework', selectedFramework);
  }, [selectedFramework]);

  return (
    <FrameworkContext.Provider
      value={{ selectedFramework, setSelectedFramework }}
    >
      {children}
    </FrameworkContext.Provider>
  );
};

export const useFramework = () => useContext(FrameworkContext);
