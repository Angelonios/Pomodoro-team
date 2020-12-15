import { createMuiTheme } from '@material-ui/core/styles';

const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#CF3D3A',
      contrastText: '#fff',
    },
    secondary: {
      main: '#709E1A',
    },
    background: {
      default: '#212121',
      paper: '#474747',
    },
  },
});

const light = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fc345c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#49beb7',
      contrastText: '#fff',
    },
    background: {
      default: '#afffdf',
      paper: '#eafff7',
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
