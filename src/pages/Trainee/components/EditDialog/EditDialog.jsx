/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import * as Yup from 'yup';
import { getError, hasErrors, isTouched } from '../../../../lib/utils/helper';

const schema = Yup.object({
  name: Yup.string().required().min(3).label('Name'),
  email: Yup.string().email().required().label('Email'),
});

const EditDialog = (props) => {
  const {
    open, onClose, handleSubmit, traineeValues,
  } = props;
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);
  const [name, setName] = useState(traineeValues.name);
  const [email, setEmail] = useState(traineeValues.email);

  const handleErrors = (formValues) => {
    const {
      name: newName,
      email: newEmail,
    } = formValues;
    schema.validate({
      name: newName,
      email: newEmail,
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

  const onChangeHandler = (field, event) => {
    if (field === 'name') {
      setName(event.target.value);
    }
    if (field === 'email') {
      setEmail(event.target.value);
    }
    handleErrors({
      name, email,
    });
  };

  const onBlurHandler = (field) => {
    touched[field] = true;
    setTouched(touched);
    handleErrors({
      name, email,
    });
  };

  return (
    <div>
      <Dialog maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle>Edit Trainee</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <br />
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
              }}
              id="outlined-basic"
              fullWidth
              required
              name="name"
              label="Name"
              variant="outlined"
              value={name}
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
              name="email"
              fullWidth
              value={email}
              onChange={(event) => onChangeHandler('email', event)}
              label="Email"
              variant="outlined"
              onBlur={() => onBlurHandler('email')}
              helperText={getError(touched, error, 'email')}
              error={touched.email && getError(touched, error, 'email') !== ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose('cancel')}>Cancel</Button>
            <Button
              type="submit"
              disabled={hasErrors(error) || !isTouched(touched)}
              id={traineeValues.id}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  traineeValues: PropTypes.objectOf.isRequired,
};

export default EditDialog;
