import * as React from 'react';
import { PropTypes } from 'prop-types';
import { error, errorBorder, inputSize } from './style';

const TextField = (props) => {
  const {
    label, value, disabled, errorMessage, onChange,
  } = props;
  return (
    <>
      <label htmlFor>
        <b>{label}</b>
        <input name="name" onChange={onChange} style={errorMessage ? errorBorder : inputSize} type="text" value={value} disabled={disabled} />
      </label>
      <div style={error}>{errorMessage}</div>
    </>
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextField;
