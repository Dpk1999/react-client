/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { getError, hasErrors, isTouched } from '../../../../lib/utils/helper';

const AddDialog = (props) => {
  const {
    error,
    open,
    touched,
    handleClickOpen,
    handleClose,
    onChangeHandler,
    onClickHandler,
    onBlurHandler,
    handleSubmit,
    name,
    email,
    password,
    passwordConfirmation,
    show,
  } = props;
  return (
    <div>
      <Button
        style={{ margin: '12px' }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        ADD TRAINEE
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Add Trainee</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <br />
            <TextField
              InputProps={{
                startAdornment: <InputAdornment onClick={() => { onClickHandler('password'); }} position="start"><PersonIcon /></InputAdornment>,
              }}
              id="outlined-basic"
              fullWidth
              value={name}
              required
              label="Name"
              variant="outlined"
              onChange={(event) => onChangeHandler('name', event)}
              onBlur={() => onBlurHandler('name')}
              helperText={getError(touched, error, 'name')}
              error={touched.name && getError(touched, error, 'name') !== ''}
            />
            <br />
            <br />
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
              }}
              id="outlined-basic"
              fullWidth
              value={email}
              onChange={(event) => onChangeHandler('email', event)}
              label="Email"
              variant="outlined"
              onBlur={() => onBlurHandler('email')}
              helperText={getError(touched, error, 'email')}
              error={touched.email && getError(touched, error, 'email') !== ''}
            />
            <br />
            <br />
            <div style={{ display: 'flex' }}>
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment onClick={() => { onClickHandler('showpassword'); }} position="start">
                    <IconButton aria-label="toggle password visibility" edge="end">
                      {' '}
                      { show.password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                }}
                fullWidth
                type={show.password ? 'text' : 'password'}
                style={{ marginRight: '5px' }}
                id="outlined-basic"
                value={password}
                onChange={(event) => onChangeHandler('password', event)}
                label="Password"
                variant="outlined"
                onBlur={() => onBlurHandler('password')}
                helperText={getError(touched, error, 'password')}
                error={touched.password && getError(touched, error, 'password') !== ''}
              />
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">
                    <IconButton aria-label="toggle password visibility" onClick={() => { onClickHandler('showpasswordconfirm'); }} edge="end">
                      {' '}
                      { show.passwordConfirmation ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
                }}
                fullWidth
                type={show.passwordConfirmation ? 'text' : 'password'}
                id="outlined-basic"
                value={passwordConfirmation}
                onChange={(event) => onChangeHandler('passwordConfirmation', event)}
                label="Confirm Password"
                variant="outlined"
                onBlur={() => onBlurHandler('passwordConfirmation')}
                helperText={getError(touched, error, 'passwordConfirmation')}
                error={touched.passwordConfirmation && getError(touched, error, 'passwordConfirmation') !== ''}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('cancel')}>Cancel</Button>
            <Button
              type="submit"
              disabled={hasErrors(error) || !isTouched(touched)}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  error: PropTypes.arrayOf.isRequired,
  touched: PropTypes.arrayOf.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  show: PropTypes.objectOf.isRequired,

};
export default AddDialog;
