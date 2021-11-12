/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RemoveDialog = (props) => {
  const {
    open, onClose, handleSubmit, id,
  } = props;

  return (
    <div>
      <Dialog maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle>Remove Trainee</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove the trainee?
            </DialogContentText>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose('cancel')}>Cancel</Button>
            <Button
              type="button"
              onClick={handleSubmit}
              id={id}
            >
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default RemoveDialog;
