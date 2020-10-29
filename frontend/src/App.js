import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from 'src/utils/ScrollToTop';
import { CssBaseline } from '@material-ui/core';

import { AuthProvider } from 'src/utils/auth';
import { PomodoroProvider } from 'src/utils/PomodoroContext';
import { EnhancedAppoloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PomodoroProvider>
          <EnhancedAppoloProvider>
            <CssBaseline />
            <ScrollToTop />
            <Routes />
          </EnhancedAppoloProvider>
        </PomodoroProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
