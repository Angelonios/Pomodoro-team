import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const dark = createMuiTheme({
  palette: {
    type: 'dark',
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
