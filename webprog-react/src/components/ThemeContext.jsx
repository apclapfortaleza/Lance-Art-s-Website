import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isSketchMode, setIsSketchMode] = useState(() => {
    const saved = localStorage.getItem('sketch-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sketch-mode', isSketchMode);
    if (isSketchMode) {
      document.documentElement.classList.add('sketch-mode');
    } else {
      document.documentElement.classList.remove('sketch-mode');
    }
  }, [isSketchMode]);

  const toggleTheme = () => setIsSketchMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isSketchMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
