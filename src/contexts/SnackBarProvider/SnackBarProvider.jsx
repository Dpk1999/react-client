import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// eslint-disable-next-line react/jsx-props-no-spreading
const MuiAlert = React.forwardRef((props, ref) => <Alert elevation={6} ref={ref} variant="filled" />);

export const SnackBarContext = React.createContext();

const SnackBarProvider = ({ children }) => {
  const [snackBarValues, setSnackBarValues] = useState({
    open: false,
    message: '',
    status: '',
  });
  const { open, message, status } = snackBarValues;

  const openSnackBar = ([msg, stat]) => {
    setSnackBarValues({
      ...snackBarValues, open: true, message: msg, status: stat,
    });
  };

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarValues({ ...snackBarValues, open: false });
  };

  return (
    <>
      <SnackBarContext.Provider value={openSnackBar}>
        {children}
      </SnackBarContext.Provider>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackBar}>
        <MuiAlert onClose={closeSnackBar} severity={status} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SnackBarProvider;
