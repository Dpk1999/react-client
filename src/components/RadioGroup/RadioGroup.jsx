import React from 'react';
import PropTypes from 'prop-types';
// import { hide, show } from './style';

const RadioGroup = (props) => {
  const {
    value,
    error,
    onChange,
    options,
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
              <input onChange={onChange} id={selectValue} label={label} name={value} type="radio" key={selectValue} value={selectValue} />
              <label htmlFor={selectValue}>{label}</label>
            </div>
          );
        })}
      </div>
      <p>{error}</p>
    </>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired,
};
export default RadioGroup;
