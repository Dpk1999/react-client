/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import { traineeListStyle } from './style';

const TraineeList = (props) => {
  const { trainees } = props;
  return (
    <div style={traineeListStyle}>
      <ul>
        {
          trainees.map((trainee) => (
            <li>
              <Link to={`/trainee/${trainee.id}`}>
                <span>{trainee.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default TraineeList;

TraineeList.propTypes = {
  trainees: PropTypes.objectOf.isRequired,
};
