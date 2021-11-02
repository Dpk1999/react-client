import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
// import theme from './theme';
import Trainee from './pages/Trainee/Trainee';

const App = () => (
  <>
    <CssBaseline />
    <Typography>
      <Trainee />
    </Typography>
  </>
);

export default App;
