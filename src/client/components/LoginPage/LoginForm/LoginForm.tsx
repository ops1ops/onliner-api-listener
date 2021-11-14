import React, { FormHTMLAttributes, useCallback, useContext, useState } from 'react';

import { Alert, Button, FormControl, InputLabel, Paper, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import DefaultInput from '@root/client/components/common/DefaultInput';
import { HOME_PATH } from '@root/client/constants/paths';
import AuthContext from '@root/client/contexts/AuthContext';
import { loginUser } from '@root/client/services/api';
import { loginUserAction } from '@root/client/store/actions';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

const useStyles = makeStyles<Theme>(() => ({
  root: {
    '& > *': {
      margin: '8px',
    },
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const inputGroup = [
    { label: 'Login', onChange: setLogin, value: login, type: 'text' },
    { label: 'Password', onChange: setPassword, value: password, type: 'password' },
  ];

  const loginForm = inputGroup.map(({ label, onChange, value, type }) => (
    <FormControl key={`input${label}`} variant="outlined">
      <InputLabel htmlFor="component-outlined">{label}</InputLabel>
      <DefaultInput onChange={onChange} value={value} label={label} type={type} />
    </FormControl>
  ));

  const handleLogin: FormHTMLAttributes<HTMLFormElement>['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();
      const isValid = login && password;

      if (isValid) {
        try {
          const { data: user } = await loginUser(login, password);

          dispatch(loginUserAction(user));

          history.push(HOME_PATH);
        } catch (error) {
          setErrorMessage(error.response.data.message);
        }
      } else {
        setErrorMessage('Login and password are required');
      }
    },
    [login, password],
  );

  return (
    <Paper elevation={3} className="formBox">
      <form className={classes.root} onSubmit={handleLogin}>
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>
        {loginForm}
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <Link to="/register" className="signUpLink">
          <Button variant="contained" color="primary" className="signUpButton">
            Dont have an account? Sign Up
          </Button>
        </Link>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </form>
    </Paper>
  );
};

export default LoginForm;
