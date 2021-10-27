import React from 'react';
import Typography from '@mui/material/Typography';

const Footer = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © Successive Technologies '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Footer;
