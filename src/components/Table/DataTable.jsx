import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {
  Card, IconButton, TablePagination, TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const DataTable = (props) => {
  const {
    trainees, id, columns, order, orderBy, onSort, count, page, rowsPerPage, actions, onChangePage,
  } = props;

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: '12px',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#eeeeef',
    },
  }));
  return (
    <>
      <TableContainer sx={{ width: 'auto', margin: '30px' }} component={Card}>
        <Table
          sx={{
            '& .MuiTableRow-root:hover': {
              backgroundColor: 'lightgray',
              cursor: 'pointer',
            },
          }}
        >
          <TableHead>
            {columns.map((row) => (
              <StyledTableCell align={row.align} component="tr" scope="column">
                <TableSortLabel
                  active={orderBy === row.field}
                  direction={order}
                  onClick={() => onSort(row.field)}
                >
                  <span>{row.label}</span>
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableHead>
          <TableBody stripedRows id={id}>
            {(rowsPerPage > 0
              ? trainees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : trainees
            ).map((row) => (
              <StyledTableRow
                id={row.id}
              >
                {
                  columns.map((data) => (
                    <StyledTableCell align={data.align}>
                      {data.format(row[data.field])}
                    </StyledTableCell>
                  ))
                }
                <StyledTableCell align="center" onClick={(e) => e.preventDefault()}>
                  {actions.map((action) => (
                    <IconButton
                      onClick={() => action.handler(row)}
                      size="small"
                      sx={{ color: 'rgb(32,32,32)' }}
                    >
                      {action.icon}
                    </IconButton>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={false}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
        />
      </TableContainer>

    </>
  );
};

export default DataTable;

DataTable.propTypes = {
  trainees: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
  columns: PropTypes.objectOf.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
