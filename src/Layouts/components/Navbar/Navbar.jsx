import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  console.log(history);
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trainee Portal
          </Typography>
          <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/Trainee">TRAINEE</Link></Button>
          <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/TextFieldDemo">TEXTFIELD DEMO</Link></Button>
          <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/InputDemo">INPUT DEMO</Link></Button>
          <Button><Link style={{ color: 'white', textDecoration: 'none' }} to="/ChildrenDemo">CHILDREN DEMO</Link></Button>
          <Button onClick={handleLogout} style={{ marginLeft: '30px', color: 'white' }}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
