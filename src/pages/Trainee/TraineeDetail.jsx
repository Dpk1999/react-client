import {
  Box, Button, Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import trainees from './data/trainee';
import { getDateFormatted } from '../../lib/utils/helper';
import {
  linkStyle, btnContainer, cardStyle, cardMediaStyle, boxStyle, cardContentStyle, buttonStyle,
} from './style';

const TraineeDetail = (props) => {
  const { match } = props;
  const data = trainees.find((e) => e.id === match.params.id);
  const { name, email, createdAt } = data;
  return (
    <div>
      <Card style={cardStyle}>
        <Box sx={boxStyle}>
          <CardMedia style={cardMediaStyle}>
            <div>Thumbnail</div>
          </CardMedia>

        </Box>
        <Box sx={boxStyle}>
          <CardContent sx={cardContentStyle}>
            <Typography component="div" variant="h5">
              <div>{name}</div>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <div>{getDateFormatted(createdAt)}</div>
              <div>{email}</div>
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <div style={btnContainer}>
        <Button style={buttonStyle} variant="contained">
          <Link
            style={linkStyle}
            to="/trainee"
          >
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

TraineeDetail.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default TraineeDetail;
