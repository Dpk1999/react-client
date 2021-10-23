import React, { useState } from 'react';
import { AddDialog } from './components';

const Trainee = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <AddDialog open={openDialog} onClose={handleOnClose} />
    </div>
  );
};

export default Trainee;
