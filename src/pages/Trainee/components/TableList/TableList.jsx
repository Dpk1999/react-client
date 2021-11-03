import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '../../../../components';
import trainees from '../../data/trainee';
import { getDateFormatted, toUpperCase } from '../../../../lib/utils/helper';
import { EditDialog, RemoveDialog } from '../index';

const tableData = [
  {
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    field: 'email',
    label: 'Eamil Address',
    format: toUpperCase,
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getDateFormatted,
  },
];

const TableList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [itemValue, setItemValue] = useState({
    id: '',
    name: '',
    email: '',
    createdAt: '',
  });

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditDialogOpen = (item) => {
    setOpenEditDialog(true);
    setItemValue({
      name: item.name,
      email: item.email,
    });
  };

  const handleRemoveDialogOpen = (item) => {
    setOpenRemoveDialog(true);
    setItemValue({
      name: item.name,
      email: item.email,
      id: item.id,
      createdAt: item.createdAt,
    });
  };

  const handleOnEditClose = () => {
    setOpenEditDialog(false);
    setItemValue({
      name: '',
      email: '',
    });
  };

  const handleOnEditSubmit = (item) => {
    console.log('Edited Item', item);
  };

  const handleOnRemoveClose = () => {
    setOpenRemoveDialog(false);
    setItemValue({
      id: '',
      name: '',
      email: '',
      createdAt: '',
    });
  };

  const handleOnRemoveSubmit = (item) => {
    console.log('Deleted Item', item);
  };

  const tableActions = [
    {
      icon: <EditIcon fontSize="small" />,
      handler: handleEditDialogOpen,
    },
    {
      icon: <DeleteIcon fontSize="small" />,
      handler: handleRemoveDialogOpen,
    },
  ];

  return (
    <>
      <DataTable
        id="table1"
        data={trainees}
        columns={tableData}
        actions={tableActions}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        compPath="/trainee"
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        count={trainees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openEditDialog && (
        <EditDialog
          nameValue={itemValue.name}
          emailValue={itemValue.email}
          open={openEditDialog}
          onClose={handleOnEditClose}
          handleSubmit={() => handleOnEditSubmit(itemValue)}
        />
      )}
      {openRemoveDialog && (
        <RemoveDialog
          open={openRemoveDialog}
          onClose={handleOnRemoveClose}
          handleSubmit={() => handleOnRemoveSubmit(itemValue)}
        />
      )}
    </>
  );
};

export default TableList;
