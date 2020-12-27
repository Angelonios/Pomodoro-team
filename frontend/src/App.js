import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { AuthProvider } from 'src/utils/auth';
import { PomodoroProvider } from 'src/utils/PomodoroContext';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { CustomThemeProvider } from './utils/ThemeContext';
import { Favicon } from './utils/userNotification/Favicon';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomThemeProvider>
          <EnhancedAppoloProvider>
            <PomodoroProvider>
              <CssBaseline />
              <Favicon />
              <ScrollToTop />
              <Routes />
            </PomodoroProvider>
          </EnhancedAppoloProvider>
        </CustomThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
