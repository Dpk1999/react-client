import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  SelectField, RadioGroup, TextField, Button,
} from '../../components/index';
import { btnContainer, inputDemoContainer, btnStyle } from './style';
import {
  SELECT_OPTIONS, RADIO_OPTIONS, DEFAULT_SELECT, CRICKET_VALUE,
} from '../../configs/Constant';
import { getError, hasErrors, isTouched } from '../../lib/utils/helper';

const schema = Yup.object({
  name: Yup.string().min(3).max(10).label('Name')
    .required(),
  sport: Yup.string().required().label('Sport'),
  football: Yup.string().label('What you do?').when('sport', {
    is: (value) => value === 'football',
    then: Yup.string().required(),
    otherwise: Yup.string().min(0),
  }),
  cricket: Yup.string().label('What you do?').when('sport', {
    is: (value) => value === 'cricket',
    then: Yup.string().required(),
    otherwise: Yup.string().min(0),
  }),
});

const InputDemo = () => {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [cricket, setCricket] = useState('');
  const [football, setFootball] = useState('');
  const [error, setError] = useState([]);
  const [touched, setTouched] = useState([]);

  const handleErrors = async (formValues) => {
    const {
      name: newName, sport: newSport, football: newFootball, cricket: newCricket,
    } = formValues;
    await schema.validate({
      name: newName, sport: newSport, football: newFootball, cricket: newCricket,
    }, { abortEarly: false }).then(() => {
      setError({});
    }).catch((errors) => {
      const schemaErrors = {};
      if (errors) {
        errors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
        setError(schemaErrors);
      }
    });
  };

  const onBlurHandler = async (event, type) => {
    touched[type] = true;
    setTouched(touched);
    await handleErrors({
      name, sport, football, cricket,
    });
  };

  const handleSportChange = async (event) => {
    const { value } = event.target;
    if (value === '' || value === DEFAULT_SELECT) {
      setSport('');
    } else {
      setSport(value);
    }
    setCricket('');
    setFootball('');
    await handleErrors({
      name, sport, football, cricket,
    });
  };

  const handleNameChange = async (event) => {
    setName(event.target.value);
    await handleErrors({
      name, sport, football, cricket,
    });
  };

  const handleWhatToDoChange = async (event) => {
    if (event.target.value === CRICKET_VALUE) {
      setFootball('');
      setCricket(event.target.attributes.label.value);
    } else {
      setCricket('');
      setFootball(event.target.attributes.label.value);
    }
    await handleErrors({
      name, sport, football, cricket,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({
      name, sport, football, cricket,
    });
  });

  const onClick = () => {
  };

  return (
    <form style={inputDemoContainer}>
      <TextField
        onBlur={(event) => { onBlurHandler(event, 'name'); }}
        errorMessage={getError(touched, error, 'name')}
        label="Name"
        onChange={handleNameChange}
      />
      <SelectField
        onBlur={(event) => { onBlurHandler(event, 'sport'); }}
        error={getError(touched, error, 'sport')}
        selectLabel="Select the game you want to play?"
        defaultText="Select"
        value={sport}
        options={SELECT_OPTIONS}
        onChange={handleSportChange}
      />
      {sport === 'cricket'
        ? (
          <RadioGroup
            onBlur={(event) => { onBlurHandler(event, 'cricket'); }}
            error={getError(touched, error, 'cricket')}
            value={sport}
            options={RADIO_OPTIONS}
            onChange={handleWhatToDoChange}
          />
        )
        : (
          <RadioGroup
            onBlur={(event) => { onBlurHandler(event, 'football'); }}
            error={getError(touched, error, 'football')}
            value={sport}
            options={RADIO_OPTIONS}
            onChange={handleWhatToDoChange}
          />
        )}
      <div style={btnContainer}>
        <Button color="gray" style={btnStyle} value="Cancel" />
        <Button
          color={hasErrors(error) || !isTouched(touched) ? 'gray' : '#28a745'}
          style={btnStyle}
          value="Submit"
          disabled={hasErrors(error) || !isTouched(touched)}
          onClick={onClick}
        />
      </div>
    </form>
  );
};
export default InputDemo;
