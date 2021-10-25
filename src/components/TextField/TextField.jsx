import * as React from 'react';
import { PropTypes } from 'prop-types';
import { error, errorBorder, inputSize } from './style';

const TextField = (props) => {
  const {
    label, value, disabled, errorMessage, onChange, onBlur,
  } = props;
  // eslint-disable-next-line no-console
  console.log(props);
  return (
    <>
      <label htmlFor>
        <b>{label}</b>
        <input onBlur={onBlur} name="name" onChange={onChange} style={errorMessage ? errorBorder : inputSize} type="text" value={value} disabled={disabled} />
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
  onBlur: PropTypes.func.isRequired,
};

export default TextField;
