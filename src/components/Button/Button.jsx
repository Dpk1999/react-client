import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    color,
    disable,
    style,
    value,
    onClick,
  } = props;

  const btnstyle = {
    ...style,
    backgroundcolor: color,
  };

  return (
    <>
      <input type="button" style={btnstyle} value={value} disable={disable} onClick={onClick} />
    </>
  );
};
Button.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  style: PropTypes.objectOf.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
