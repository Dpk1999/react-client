import React, { useState } from 'react';
import { DataTable } from '../../../../components';
import trainees from '../../data/trainee';
import { getDateFormatted, toUpperCase } from '../../../../lib/utils/helper';

const tableData = [
  {
    field: 'name',
    label: 'Name',
    align: 'left',
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

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  return (
    <DataTable
      id="table1"
      data={trainees}
      columns={tableData}
      orderBy={orderBy}
      order={order}
      onSort={handleSort}
      compPath="/trainee"
    />
  );
};

export default TableList;
