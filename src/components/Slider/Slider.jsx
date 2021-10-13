import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getRandomNumber } from '../../lib/utils/math';
import { sliderContainer } from './style';

const Slider = (props) => {
  const {
    altText, banners, height, duration, random,
  } = props;

  const [state, setState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(getRandomNumber(random));
    }, duration);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div style={sliderContainer}>
        <img src={banners[state]} alt={altText} height={height} />
      </div>
    </>
  );
};

Slider.propTypes = {
  altText: PropTypes.string.isRequired,
  banners: PropTypes.arrayOf.isRequired,
  height: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  random: PropTypes.number.isRequired,
};

export default Slider;
