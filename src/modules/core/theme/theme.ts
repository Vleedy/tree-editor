import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(171, 171, 171)',
      light: 'rgb(171, 171, 171)',
      dark: 'rgb(171, 171, 171)',
    },

    text: {
      primary: 'rgb(210, 210, 210)',
      secondary: 'rgb(210, 210, 210)',
    },
  },
});
