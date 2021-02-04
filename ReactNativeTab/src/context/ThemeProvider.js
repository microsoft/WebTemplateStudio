import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

import themes from '../themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const selectedTheme = themes[deviceTheme] ?? NavigationDefaultTheme;

  const [theme, setTheme] = useState(selectedTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
