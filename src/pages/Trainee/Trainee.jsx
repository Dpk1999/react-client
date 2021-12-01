import React, { useState } from 'react';
import { AddDialog } from './components';
import trainees from './data/trainee';
import TraineeList from './TraineeList';

const Trainee = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <br />
      <AddDialog open={openDialog} onClose={handleOnClose} />
      <TraineeList trainees={trainees} />

    </div>
  );
};

export default Trainee;
