import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 18,
  },
  container: {
    maxHeight: 440,
  },
});

const DataTable = (props) => {
  const {
    id, data, columns,
  } = props;
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table id={id} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((header, index) => {
                const { idx } = index;
                return (
                  <TableCell
                    align={header.align}
                    style={
                      {
                        fontSize: 13,
                        color: 'rgb(153, 153, 153)',
                      }
                    }
                    key={idx}
                  >
                    {header.label || 'field'}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((body) => (typeof body === 'object' ? (
                  <TableCell
                    align={body.align}
                    key={body}
                  >
                    {item[body.field]}
                  </TableCell>
                ) : (
                  <TableCell key={body}>
                    No Data Found
                  </TableCell>
                )))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    align: PropTypes.string,
  })).isRequired,
};

export default DataTable;
