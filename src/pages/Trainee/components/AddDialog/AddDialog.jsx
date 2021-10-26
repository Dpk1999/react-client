/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
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
import * as Yup from 'yup';
import { IconButton } from '@mui/material';
import { getError, hasErrors, isTouched } from '../../../../lib/utils/helper';

const schema = Yup.object({
  name: Yup.string().min(3).max(10).label('Name')
    .required(),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    'Password must contain at least 8 characters, one uppercase, one number and one special case character',
  ).required('Password is required'),
  passwordConfirmation: Yup.string().required('Password Confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const AddDialog = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [show, setShow] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const handleErrors = (formValues) => {
    const {
      name: newName,
      email: newEmail,
      password: newPassword,
      passwordConfirmation: newPasswordConfirmation,
    } = formValues;
    schema.validate({
      name: newName,
      email: newEmail,
      password: newPassword,
      passwordConfirmation: newPasswordConfirmation,
    }, { abortEarly: false }).then(() => {
      setError({});
    }).catch((errors) => {
      const schemaErrors = {};
      if (errors) {
        errors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
        setError(schemaErrors);
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (field, event) => {
    if (field === 'password') {
      setPassword(event.target.value);
    }
    if (field === 'passwordConfirmation') {
      setPasswordConfirmation(event.target.value);
    }
    if (field === 'name') {
      setName(event.target.value);
    }
    if (field === 'email') {
      setEmail(event.target.value);
    }
    handleErrors({
      name, email, password, passwordConfirmation,
    });
  };

  const onClickHandler = (field) => {
    if (field === 'showpassword') {
      setShow({
        ...show,
        password: show.password !== true,
      });
    }

    if (field === 'showpasswordconfirm') {
      setShow({
        ...show,
        passwordConfirmation: show.passwordConfirmation !== true,
      });
    }
  };

  const onBlurHandler = (field) => {
    touched[field] = true;
    setTouched(touched);
    handleErrors({
      name, email, password, passwordConfirmation,
    });
  };

  useEffect(() => {
    console.log({
      name, email, password, passwordConfirmation,
    });
  });

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
        <form>
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
              required
              label="Name"
              variant="outlined"
              onChange={(event) => onChangeHandler('name', event)}
              onBlur={() => onBlurHandler('name')}
              helperText={getError(touched, error, 'name')}
              error={touched.name && getError(touched, error, 'name') !== ''}
            />
            {/* <Icon baseClassName="material-icons-two-tone">add_circle</Icon> */}
            {/* <PersonIcon /> */}
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

export default AddDialog;
