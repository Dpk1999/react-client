import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '../../components';
import { getDateFormatted } from '../../lib/utils/helper';
import { AddDialog } from './components';
import trainees from './data/trainee';
import TraineeList from './TraineeList';
import EditDialog from './components/EditDialog';
import RemoveDialog from './components/RemoveDialog';
import { SnackContext } from '../../contexts/SnackBarProvider/SnackBarProvider';

const Trainee = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [alltrainees, setAllTrainees] = useState(trainees);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [traineeValues, setTraineeValues] = useState({
    id: '',
    name: '',
    email: '',
    createdAt: '',
  });
  const AddSnack = React.useContext(SnackContext);
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

  const handleEditDialogOpen = (data) => {
    setOpenEditDialog(true);
    setTraineeValues({
      name: data.name,
      email: data.email,
      id: data.id,
    });
  };

  const handleRemoveDialogOpen = (data) => {
    console.log('data', data);
    setOpenRemoveDialog(true);
    setTraineeValues({
      name: data.name,
      email: data.email,
      id: data.id,
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

  const handleOnEditSubmit = (event) => {
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
    AddSnack({ message: 'Trainee Edited Successefully', status: 'success' });
  };

  const handleOnRemoveClose = () => {
    setOpenRemoveDialog(false);
    setTraineeValues({
      name: '',
      email: '',
      id: '',
    });
  };

  const handleOnRemoveSubmit = (event) => {
    setOpenRemoveDialog(false);
    const data = alltrainees.find((trainee) => trainee.id === event.target.id);
    const fixdate = new Date('2019-02-14');
    const date = new Date(data.createdAt);
    if (fixdate.getTime() < date.getTime()) {
      AddSnack({ message: 'Trainee Deleted Successefully', status: 'success' });
    } else {
      AddSnack({ message: 'Error Message', status: 'error' });
    }
  };

  return (
    <div>
      <AddDialog />
      <DataTable
        trainees={alltrainees}
        id="data_table_id"
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
            format: (value) => value.toUpperCase(),
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
        count={trainees.length}
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
          handleSubmit={(event) => handleOnEditSubmit(event)}
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
