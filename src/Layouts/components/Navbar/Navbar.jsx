import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trainee Portal
        </Typography>
        <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/Trainee">TRAINEE</Link></Button>
        <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/TextFieldDemo">TEXTFIELD DEMO</Link></Button>
        <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/InputDemo">INPUT DEMO</Link></Button>
        <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/ChildrenDemo">CHILDREN DEMO</Link></Button>
        <Button style={{ marginLeft: '30px' }}><Link style={{ color: 'white', textDecoration: 'none' }} to="/Login">LOGOUT</Link></Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
