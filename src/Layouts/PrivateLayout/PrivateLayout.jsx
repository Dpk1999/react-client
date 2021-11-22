import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';
import stylesPrivateRoute from './style';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div style={stylesPrivateRoute.container}>
        {children}
      </div>
    </>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLayout;
