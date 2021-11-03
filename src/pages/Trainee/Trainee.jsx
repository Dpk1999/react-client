import React from 'react';
import { AddDialog, TableList } from './components';
import trainees from './data/trainee';
import TraineeList from './TraineeList';

const Trainee = () => (
  <div>
    <AddDialog />
    <TableList />
    <TraineeList trainees={trainees} />
  </div>
);

export default Trainee;
