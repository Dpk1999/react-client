import React, { useState } from 'react';
import { AddDialog } from './components';
import { Navbar } from './components/Navbar';

const Trainee = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Navbar />
      <br />
      <AddDialog open={openDialog} onClose={handleOnClose} />
    </div>
  );
};

export default Trainee;
