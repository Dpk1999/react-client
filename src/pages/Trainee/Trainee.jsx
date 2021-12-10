/* eslint-disable no-underscore-dangle */import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import { DataTable, withLoaderAndMessage } from '../../components';
import { getDateFormatted } from '../../lib/utils/helper';
import { AddDialog } from './components';
import trainees from './data/trainee';
import TraineeList from './TraineeList';
import EditDialog from './components/EditDialog';
import RemoveDialog from './components/RemoveDialog';
import { callAllApi } from '../../lib/utils/api';
import { SnackContext } from '../../contexts/SnackBarProvider/SnackBarProvider';

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

const Trainee = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [alltrainees, setAllTrainees] = useState(trainees);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [traineeValues, setTraineeValues] = useState({
    id: '',
    name: '',
    email: '',
    createdAt: '',
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const AddSnack = React.useContext(SnackContext);
  const [show, setShow] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const openSnackBar = React.useContext(SnackContext);
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

  const fetchTrainee = async () => {
    const result = await callAllApi('user', 'GET', { sort: { createdAt: '-1' } });
    setLoader(false);
    if (result) {
      setAllTrainees(result.data[0].result);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      role: 'trainee',
      name,
      email,
      password,
    };
    const result = await callAllApi('user', 'POST', data);
    if (result) {
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setOpen(false);
      fetchTrainee();
      openSnackBar({ message: 'Trainee Added Successefully', status: 'success' });
    }
  };

  const handleSort = (field) => {
    let sortedItems = [];
    if (order === 'asc') {
      setOrder('desc');
    } else {
      setOrder('asc');
    }
    setOrderBy(field);
    const itemsToSort = JSON.parse(JSON.stringify(alltrainees));
    sortedItems = itemsToSort.sort((first, second) => {
      if (first[orderBy] < second[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (first[orderBy] > second[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setAllTrainees(sortedItems);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditDialogOpen = async (data) => {
    setOpenEditDialog(true);
    setTraineeValues({
      name: data.name,
      email: data.email,
      id: data._id,
      originalId: data.originalId,
    });
  };

  const handleRemoveDialogOpen = (data) => {
    console.log('data', data);
    setOpenRemoveDialog(true);
    setTraineeValues({
      name: data.name,
      email: data.email,
      id: data._id,
      originalId: data.originalId,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnEditClose = () => {
    setOpenEditDialog(false);
    setTraineeValues({
      name: '',
      email: '',
      id: '',
    });
  };

  const handleOnEditSubmit = async (event) => {
    event.preventDefault();
    setTraineeValues({
      ...traineeValues,
      name: event.target.name.value,
      email: event.target.email.value,
    });
    setOpenEditDialog(false);
    console.log('Edit Item', {
      id: traineeValues.id,
      name: event.target.name.value,
      email: event.target.email.value,
    });
    await callAllApi(`user/${traineeValues.originalId}`, 'PUT', { name: event.target.name.value, email: event.target.email.value });
    fetchTrainee();
    openSnackBar({ message: 'Trainee Edited Succesfully', status: 'success' });
  };

  const handleOnRemoveClose = () => {
    setOpenRemoveDialog(false);
    setTraineeValues({
      name: '',
      email: '',
      id: '',
      originalId: '',
    });
  };

  const handleOnRemoveSubmit = async (event) => {
    setOpenRemoveDialog(false);
    const data = alltrainees.find((trainee) => trainee._id === event.target.id);
    const fixdate = new Date('2019-02-14');
    const date = new Date(data.createdAt);
    if (fixdate.getTime() < date.getTime()) {
      await callAllApi(`user/${event.target.id}`, 'DELETE');
      fetchTrainee();
      AddSnack({ message: 'Trainee Deleted Successefully', status: 'success' });
    } else {
      AddSnack({ message: 'Error Message', status: 'error' });
    }
  };

  useEffect(() => {
    console.log({
      name, email, password, passwordConfirmation,
    });
    setLoader(true);
    fetchTrainee();
  }, []);

  const EnhancedDataTable = withLoaderAndMessage(DataTable);

  return (
    <div>
      <AddDialog
        error={error}
        touched={touched}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        onClickHandler={onClickHandler}
        onBlurHandler={onBlurHandler}
        handleSubmit={handleSubmit}
        name={name}
        email={email}
        password={password}
        passwordConfirmation={passwordConfirmation}
        show={show}
      />
      <EnhancedDataTable
        trainees={alltrainees}
        id="data_table_id"
        loader={loader}
        dataLength={alltrainees.length}
        columns={[
          {
            field: 'name',
            label: 'Name',
            align: 'left',
            format: (value) => value,
          },
          {
            field: 'email',
            label: 'Email',
            align: 'left',
            format: (value) => value,
          },
          {
            field: 'createdAt',
            label: 'Date',
            align: 'right',
            format: getDateFormatted,
          },
        ]}
        onSort={handleSort}
        order={order}
        orderBy={orderBy}
        actions={[
          {
            icon: <EditIcon fontSize="small" />,
            handler: handleEditDialogOpen,
          },
          {
            icon: <DeleteIcon fontSize="small" />,
            handler: handleRemoveDialogOpen,
          },
        ]}
        count={alltrainees.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handlePageChange}
        onRowPerPageChange={handleChangeRowsPerPage}
      />
      {openEditDialog && (
        <EditDialog
          open={openEditDialog}
          traineeValues={traineeValues}
          onClose={handleOnEditClose}
          onSubmit={(event) => handleOnEditSubmit(event)}
        />
      )}
      {openRemoveDialog && (
        <RemoveDialog
          open={openRemoveDialog}
          onClose={handleOnRemoveClose}
          id={traineeValues.id}
          handleSubmit={(event) => handleOnRemoveSubmit(event)}
        />
      )}
      <TraineeList trainees={trainees} />
    </div>
  );
};

export default Trainee;
