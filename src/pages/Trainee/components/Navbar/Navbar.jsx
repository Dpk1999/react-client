import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trainee Portal
        </Typography>
        <Button color="inherit">TRAINEE</Button>
        <Button color="inherit">TEXTFIELD DEMO</Button>
        <Button color="inherit">INPUT DEMO</Button>
        <Button color="inherit">CHILDREN DEMO</Button>
        <Button style={{ marginLeft: '30px' }} color="inherit">LOGOUT</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
