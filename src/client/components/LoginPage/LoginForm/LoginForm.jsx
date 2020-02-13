import React, { useState, useCallback } from 'react';
import { Paper, Button, FormControl, OutlinedInput, InputLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './LoginForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = useCallback(({ target: { value } }) => setLogin(value), []);
  const handlePasswordChange = useCallback(({ target: { value } }) => setPassword(value), []);

  return (
    <Paper elevation={3} className="form-box">
      <form className={classes.root}>
        <Typography gutterBottom variant="h5" component="h2">
          Login
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
          <InputLabel htmlFor="component-outlined">Password</InputLabel>
          <OutlinedInput
            id="input-pass"
            value={password}
            label="Passwword"
            type="password"
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
