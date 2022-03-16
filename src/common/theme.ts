import { createTheme } from '@mui/material/styles';
import { Colors } from './colors';

export const light = createTheme({
  palette: {
    primary: {
      main: Colors.black,
    },
  },
});

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: Colors.white,
    },
  },
});
