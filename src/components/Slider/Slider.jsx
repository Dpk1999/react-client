import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MAX_NUMBER } from '../../configs/Constant';
import { getNextRoundRobin, getRandomNumber } from '../../lib/utils/math';
import { sliderContainer } from './style';

const Slider = (props) => {
  const {
    altText, banners, height, duration, random, defaultBanner,
  } = props;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (random) {
        setIndex(getRandomNumber(MAX_NUMBER));
      } else {
        setIndex((i) => getNextRoundRobin(MAX_NUMBER, i));
      }
    },
    duration);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div style={sliderContainer}>
        <img src={banners[index] ? banners[index] : defaultBanner} alt={altText} height={height} />
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
  defaultBanner: PropTypes.string.isRequired,
};

export default Slider;
