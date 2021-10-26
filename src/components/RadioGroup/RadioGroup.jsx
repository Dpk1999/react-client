import React from 'react';
import PropTypes from 'prop-types';
import { errorMessage } from '../SelectField/style';
// import { hide, show } from './style';

const RadioGroup = (props) => {
  const {
    value,
    error,
    onChange,
    options,
    onBlur,
  } = props;

  return (
    <>
      <div value={value}>
        { value
          ? (
            <span>
              <b>
                What you do?
              </b>
            </span>
          ) : ''}
        {options.map((item) => {
          const { value: selectValue, label } = item;
          if (selectValue !== value) return false;
          return (
            <div>
              <input onChange={onChange} id={selectValue} label={label} onBlur={onBlur} name={value} type="radio" key={selectValue} value={selectValue} />
              <label htmlFor={selectValue}>{label}</label>
            </div>
          );
        })}
      </div>
      <p style={errorMessage}>{error}</p>
    </>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};
export default RadioGroup;
