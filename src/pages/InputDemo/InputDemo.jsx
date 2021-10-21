import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  SelectField, RadioGroup, TextField, Button,
} from '../../components';
import { btnContainer, inputDemoContainer, btnStyle } from './style';
import {
  SELECT_OPTIONS, RADIO_OPTIONS, DEFAULTSELECT, CRICKET_VALUE,
} from '../../configs/Constant';
import { getError, hasError, isTouched } from '../../lib/utils/helper';

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

  const handleErrors = (formValues) => {
    const {
      name: newName, sport: newSport, football: newFootball, cricket: newCricket,
    } = formValues;
    schema.validate({
      name: newName, sport: newSport, football: newFootball, cricket: newCricket,
    }, { abortEarly: false }).then(() => {
    }).catch((errors) => {
      const schemaErrors = {};
      if (errors) {
        errors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
        setError(schemaErrors);
        console.log('handleError', error);
      }
    });
  };

  const onBlurHandler = (event, type) => {
    touched[type] = true;
    setTouched(touched);
    handleErrors({
      name, sport, football, cricket,
    });
    console.log(touched);
  };

  const handleSportChange = async (event) => {
    const { value } = event.target;
    if (value === '' || value === DEFAULTSELECT) {
      setSport('');
    } else {
      setSport(value);
    }
    setCricket('');
    setFootball('');
    setName(name);
    handleErrors({
      name, sport, football, cricket,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setSport(sport);
    setFootball(football);
    setCricket(cricket);
    handleErrors({
      name, sport, football, cricket,
    });
  };

  const handleSportProfileChange = (event) => {
    if (event.target.value === CRICKET_VALUE) {
      setFootball('');
      setCricket(event.target.attributes.label.value);
    } else {
      setCricket('');
      setFootball(event.target.attributes.label.value);
    }
    setName(name);
    setSport(sport);
    handleErrors({
      name, sport, football, cricket,
    });
  };

  useEffect(() => {
    console.log({
      name, sport, football, cricket,
    });
    console.log(error);
  });

  const onClick = () => {
  };

  return (
    <form style={inputDemoContainer}>
      <TextField
        onBlur={(event) => { onBlurHandler(event, 'name'); }}
        errorMessage={touched.name ? getError(error, 'name') : ''}
        label="Name"
        onChange={handleNameChange}
      />
      <SelectField
        onBlur={(event) => { onBlurHandler(event, 'sport'); }}
        error={touched.sport ? getError(error, 'sport') : ''}
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
            error={touched.cricket ? getError(error, 'cricket') : ''}
            value={sport}
            options={RADIO_OPTIONS}
            onChange={handleSportProfileChange}
          />
        )
        : (
          <RadioGroup
            onBlur={(event) => { onBlurHandler(event, 'football'); }}
            error={touched.football ? getError(error, 'football') : ''}
            value={sport}
            options={RADIO_OPTIONS}
            onChange={handleSportProfileChange}
          />
        )}
      <div style={btnContainer}>
        <Button color="gray" style={btnStyle} value="Cancel" />
        <Button color={hasError(error) || !isTouched(touched) ? 'gray' : '#28a745'} style={btnStyle} value="Submit" disabled={hasError(error) || !isTouched(touched)} onClick={onClick} />
      </div>
    </form>
  );
};
export default InputDemo;
