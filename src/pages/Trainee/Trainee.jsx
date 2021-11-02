import React from 'react';
import { DataTable } from '../../components';
import { AddDialog } from './components';
import trainees from './data/trainee';
import TraineeList from './TraineeList';

const Trainee = () => (
  <div>
    <AddDialog />
    <DataTable
      trainees={trainees}
      id="data_table_id"
      column={[
        {
          field: 'name',
          label: 'Name',
          align: 'left',
        },
        {
          field: 'email',
          label: 'Email Address',
          align: 'left',
        },
      ]}
    />
    <TraineeList trainees={trainees} />
  </div>
);

export default Trainee;
