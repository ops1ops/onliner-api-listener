import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { registerUser } from '../../../api/api';

import './styles.css';
import DefaultInput from '../../../common/DefaultInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const labels = [
    { label: 'Login', onChange: setLogin, value: login, type: 'text' },
    { label: 'Email', onChange: setEmail, value: email, type: 'email' },
    { label: 'Password', onChange: setPassword, value: password, type: 'password' },
    { label: 'Password Confirmation', onChange: setPasswordConfirmation, value: passwordConfirmation, type: 'password' },
  ];

  const formsLabels = labels.map(({ label, onChange, value, type }) => (
    <FormControl key={`input${label}`} variant="outlined">
      <InputLabel htmlFor="component-outlined">{label}</InputLabel>
      <DefaultInput onChange={onChange} value={value} label={label} type={type} />
    </FormControl>
  ));

  const onRegister = useCallback(async () => {
    const isValid = email
      && login
      && password
      && passwordConfirmation
      && password === passwordConfirmation;

    if (isValid) {
      try {
        await registerUser(login, email, password);
        history.push('/');
      } catch (error) {
        setErrorMessage(error.response.data.reason);
      }
    } else {
      setErrorMessage('invalid');
    }
  }, [email, login, password, passwordConfirmation]);

  return (
    <Paper elevation={3} className="form-box">
      <form className={classes.root}>
        <Typography gutterBottom variant="h5" component="h2">
          Register
        </Typography>
        {formsLabels}
        <Button variant="contained" color="primary" onClick={onRegister}>
          Register
        </Button>
        <Link to="/" className="signUp_link">
          <Button variant="contained" color="primary" className="signUp_button">
            Already have an account? Sign In
          </Button>
        </Link>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      </form>
    </Paper>
  );
};

export default RegisterForm;
