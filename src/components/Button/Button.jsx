import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    color,
    disabled,
    style,
    value,
    onClick,
  } = props;

  const btnStyle = {
    ...style,
    backgroundColor: color,
  };

  return (
    <>
      <input type="button" style={btnStyle} value={value} disabled={disabled} onClick={onClick} />
    </>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.objectOf.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
