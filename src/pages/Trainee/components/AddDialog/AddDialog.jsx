import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';

const AddDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showconfirmPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showconfirmPassword: !values.showconfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Trainee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Trainee details
          </DialogContentText>
        </DialogContent>
        <FormControl sx={{ m: 2, width: '60ch' }}>
          <TextField
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
            }}
            required
            id="outlined-required"
            label="Name"
          />
          <br />
          <TextField
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
            }}
            id="outlined-required"
            label="Email"
          />
        </FormControl>
        <div>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showconfirmPassword ? 'text' : 'password'}
              value={values.confirmpassword}
              onChange={handleChange('confirmpassword')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showconfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              label="Confirm Password"
            />
          </FormControl>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};
export default AddDialog;
