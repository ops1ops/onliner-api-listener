import React, { useState, useCallback } from 'react';
import {
  Paper,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import registerUser from '../../api/api';

import './styles.css';

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
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginChange = useCallback(
    ({ target: { value } }) => setLogin(value),
    [],
  );
  const handleEmailChange = useCallback(
    ({ target: { value } }) => setEmail(value),
    [],
  );
  const handlePasswordChange = useCallback(
    ({ target: { value } }) => setPassword(value),
    [],
  );
  const handleConfirmPasswordChange = useCallback(
    ({ target: { value } }) => setConfirmPassword(value),
    [],
  );

  const onRegister = () => {
    if (
      email
      && login
      && password
      && confirmPassword
      && password === confirmPassword
    ) {
      registerUser(login, email, password).then((response) => response);
      console.log('1');
    } else console.log('sliv');
  };

  return (
    <Paper elevation={3} className="form-box">
      <form className={classes.root}>
        <Typography gutterBottom variant="h5" component="h2">
          Register
        </Typography>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Login</InputLabel>
          <OutlinedInput
            id="input-login"
            value={login}
            label="Login"
            onChange={handleLoginChange}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Email</InputLabel>
          <OutlinedInput
            id="input-email"
            value={email}
            label="email"
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Password</InputLabel>
          <OutlinedInput
            id="input-pass"
            value={password}
            label="Password"
            type="password"
            onChange={handlePasswordChange}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Confirm Password</InputLabel>
          <OutlinedInput
            id="input-confirm-pass"
            value={confirmPassword}
            label="Confirm Password"
            type="password"
            onChange={handleConfirmPasswordChange}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={onRegister}>
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
