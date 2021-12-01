/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

/**
 * @SnackContext hold state of snackBar and messages.
 */
export const SnackContext = createContext();

/**
 *@description SnackBar method
 * @returns Snack Component
 */

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export const SnackBars = (props) => {
  const {
    open, message, status, onClose,
  } = props;
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

SnackBars.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @description SnackBar Context Provider
 */
const SnackBarProvider = (props) => {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('success');
  const [message, setMessage] = useState(false);

  const handleChange = ({ message: newMessage, status: newStatus }) => {
    setOpen(true);
    setStatus(newStatus);
    setMessage(newMessage);
  };
  const handleClose = (event, reason) => {
    if (reason === 'click-away') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <SnackContext.Provider value={handleChange}>{children}</SnackContext.Provider>
      <SnackBars open={open} message={message} status={status} onClose={handleClose} />
    </>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SnackBarProvider;
