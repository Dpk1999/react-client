import React, { useEffect, useState } from 'react';
import {
  Card, TextField, IconButton, CardContent, Button, Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import { cardStyle } from './style';
import { callAllApi } from '../../lib/utils/api';
import { getError, hasErrors, isTouched } from '../../lib/utils/helper';
import { SnackContext } from '../../contexts/SnackBarProvider/SnackBarProvider';

const schema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const openSnackBar = React.useContext(SnackContext);
  const handleError = (formValues) => {
    const {
      email: newEmail, password: newPassword,
    } = formValues;

    schema.validate({
      email: newEmail, password: newPassword,
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

  const handleLogin = async () => {
    setLoading(true);
    const result = await callAllApi('user/createToken', 'POST', { email, password });
    if (result) {
      setLoading(false);
      openSnackBar({ message: 'Successfully Login', status: 'success' });
      localStorage.setItem('token', result.data.token);
      history.push('/trainee');
    } else {
      setLoading(false);
      openSnackBar({ message: 'Authrization Failed', status: 'error' });
    }
  };
  const onClickHandler = () => {
    setShowPassword(showPassword !== true);
  };

  const onBlurHandler = (field) => {
    touched[field] = true;
    setTouched(touched);
    handleError({
      email, password,
    });
  };

  const onChangeHandler = (field, event) => {
    if (field === 'email') {
      setEmail(event.target.value);
      setLoading(false);
    }
    if (field === 'password') {
      setPassword(event.target.value);
      setLoading(false);
    }
    handleError({
      email, password,
    });
  };

  useEffect(() => {
    console.log({ email, password });
  });

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '90px',
    }}
    >
      <Card style={cardStyle} variant="outlined">
        <CardContent style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <img height="50" src="/lock.jpg" alt="not found" />
          <Typography> Login </Typography>
          <br />
          <TextField
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
            }}
            value={email}
            onChange={(event) => { onChangeHandler('email', event); }}
            onBlur={(event) => { onBlurHandler('email', event); }}
            id="outlined-basic"
            fullWidth
            label="Email"
            error={touched.email && getError(touched, error, 'email') !== ''}
            helperText={getError(touched, error, 'email')}
            variant="outlined"
          />
          <br />
          <TextField
            InputProps={{
              startAdornment:
  <InputAdornment onClick={onClickHandler} position="start">
    <IconButton aria-label="toggle password visibility" edge="end">
      { true ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>,
            }}
            value={password}
            onChange={(event) => { onChangeHandler('password', event); }}
            onBlur={(event) => { onBlurHandler('password', event); }}
            fullWidth
            helperText={getError(touched, error, 'password')}
            type={showPassword ? 'text' : 'password'}
            style={{ marginRight: '5px' }}
            id="outlined-basic"
            label="Password"
            error={touched.email && getError(touched, error, 'password') !== ''}
            variant="outlined"
          />
          <br />
          <Button
            fullWidth
            variant="contained"
            disabled={hasErrors(error) || !isTouched(touched) || loading}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
