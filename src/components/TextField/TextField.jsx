import * as React from 'react';
import PropTypes from 'prop-types';
import { input, error, errorBorder } from './style';

const TextField = (props) => {
  // console.log(props);
  const { value, errorMessage, disabled } = props;

  return (
    <div>
      <input style={errorMessage ? errorBorder : input} type="text" value={value} disabled={disabled} />
      <p style={error}>{errorMessage}</p>
    </div>
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TextField;
