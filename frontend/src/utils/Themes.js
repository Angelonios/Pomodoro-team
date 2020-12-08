import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#880e4f',
    },
    background: {
      default: '#a64646',
      paper: '#1c2120',
    },
  },
});

const light = createMuiTheme({
  palette: {
    type: 'light',
    action: {
      active: '#fff',
    },
  },
});

const themes = {
  dark,
  light,
};

export default function getTheme(theme) {
  return themes[theme];
}
