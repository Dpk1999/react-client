import React from 'react';
import PropTypes from 'prop-types';
import { errorField } from '../SelectField/style';
import { DEFAULTSELECT } from '../../configs/Constant';

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
      <div>
        <label htmlFor>
          {value === '' || value === DEFAULTSELECT ? '' : <b>What to do</b>}
          <div style={{ marginTop: '20px' }} />
          {options.map((item) => {
            const { value: selectValue, label } = item;
            if (selectValue !== value) return false;
            return (
              <div>
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  id={selectValue}
                  label={label}
                  name={value}
                  type="radio"
                  value={selectValue}
                  style={{ marginRight: '5px' }}
                />
                <label htmlFor={selectValue}>{label}</label>
              </div>
            );
          })}
        </label>
      </div>
      <p style={errorField}>{error}</p>
    </>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
};

export default RadioGroup;
