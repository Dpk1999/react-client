import PropTypes from 'prop-types';
import React from 'react';
import { selectInput, errorMessage } from './style';

const SelectField = (props) => {
  const {
    value, error, onChange, options, defaultText, onBlur,
  } = props;

  return (
    <div>
      <div>
        <b>
          Select the game you want to play?
        </b>
      </div>
      <br />
      <div>
        <select onBlur={onBlur} style={selectInput} value={value} onChange={onChange}>
          <option key={defaultText} value={defaultText}>{defaultText}</option>
          {
            options.map((item) => {
              const { value: selectValue, label } = item;
              return <option key={label} value={selectValue}>{label}</option>;
            })
          }
        </select>
      </div>
      <p style={errorMessage}>{error}</p>
    </div>
  );
};
SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf.isRequired,
  defaultText: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SelectField;
