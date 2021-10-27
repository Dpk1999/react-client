import React from 'react';
import { TextField, Slider } from '../../components';
import { inputContainer, headingStyle, mainContainer } from './style';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/Constant';

const TextFieldDemo = () => {
  const images = [
    `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
    `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
    `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
    `${PUBLIC_IMAGE_FOLDER}js.jpg`,
    `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
  ];

  return (
    <>
      <div style={mainContainer}>
        <Slider altText="Image not found" banners={images} defaultBanner={DEFAULT_BANNER_IMAGE} duration={2000} height={200} random={5} />
      </div>
      <div style={inputContainer}>
        <h4 style={headingStyle}><b>This is a disable Input</b></h4>
        <TextField value="Disabled Input" disabled />
        <h4 style={headingStyle}><b>A Valid Input</b></h4>
        <TextField value="Accessible" disabled={false} />
        <h4 style={headingStyle}><b>An Input with error</b></h4>
        <TextField value="101" errorMessage="Could not be greater than" disabled={false} />
      </div>
    </>
  );
};
export default TextFieldDemo;
