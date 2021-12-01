/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { PrivateLayout } from '../Layouts';

const PrivateRoute = (props) => {
  const {
    exact, path, component: Component, token,
  } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(matchProps) => (Boolean(token) === true
        ? (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        ) : (<Redirect to={{ pathname: '/Login' }} />))}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  matchesParam: PropTypes.objectOf.isRequired,
  token: PropTypes.bool.isRequired,
};

export default PrivateRoute;
