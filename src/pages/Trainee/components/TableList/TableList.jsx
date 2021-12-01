import React from 'react';
import { DataTable } from '../../../../components';
import trainees from '../../data/trainee';

const tableData = [
  {
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    field: 'email',
    label: 'Eamil Address',
  },
];

const TableList = () => (
  <DataTable
    id="table1"
    trainees={trainees}
    column={tableData}
  />
);

export default TableList;
