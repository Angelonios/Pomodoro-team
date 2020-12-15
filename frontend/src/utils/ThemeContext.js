import React, { createContext, useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';

import getTheme from 'src/utils/Themes';

export const CustomThemeContext = createContext({
  currentTheme: 'light',
  setTheme: null,
});

export function CustomThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    if (!localStorage.getItem('appTheme') && prefersDarkMode) {
      localStorage.setItem('appTheme', 'dark');
    }
    /*     console.log('local storage: ', localStorage.getItem('appTheme'));
    console.log('prefers: ', prefersDarkMode); */
  }, [prefersDarkMode]);
  const currentTheme = localStorage.getItem('appTheme') || 'dark';
  const [themeName, setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);
  const setAppTheme = (name) => {
    localStorage.setItem('appTheme', name);
    setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setAppTheme,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}
