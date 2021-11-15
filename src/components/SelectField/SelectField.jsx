import PropTypes from 'prop-types';
import React from 'react';
import { selectInput, selectOption } from './style';

const SelectField = (props) => {
  const {
    value, error, onChange, options, defaultText,
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
        <select style={selectInput} value={value} onChange={onChange}>
          <option style={selectOption} key={defaultText} value={defaultText}>
            {defaultText}
          </option>
          {
            options.map((item) => {
              const { value: selectValue, label } = item;
              return <option key={label} value={selectValue}>{label}</option>;
            })
          }
        </select>
      </div>
      <p>{error}</p>
    </div>
  );
};
SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default SelectField;
