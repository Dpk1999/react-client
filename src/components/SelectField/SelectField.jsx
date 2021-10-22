import PropTypes from 'prop-types';
import React from 'react';
import { selectInput, errorField } from './style';

const SelectField = (props) => {
  const {
    value, error, onChange, options, defaultText, onBlur, selectLabel,
  } = props;
  return (
    <div>
      <div>
        <b />
      </div>
      <br />
      <div>
        <label htmlFor>
          <b>{selectLabel}</b>
          <select
            onBlur={onBlur}
            style={selectInput}
            value={value}
            onChange={onChange}
          >
            <option key={defaultText} value={defaultText}>{defaultText}</option>
            {
              options.map((item) => {
                const { value: selectValue, label } = item;
                return (
                  <option
                    key={label}
                    value={selectValue}
                  >
                    {label}
                  </option>
                );
              })
            }
          </select>
        </label>
      </div>
      <p style={errorField}>{error}</p>
    </div>
  );
};
SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf.isRequired,
  defaultText: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  selectLabel: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  error: '',
};

export default SelectField;
