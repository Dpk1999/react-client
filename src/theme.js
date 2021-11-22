import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'sans-serif',
    ].join(','),
    htmlfontSize: 100,
  },
});

export default theme;
