import React, { useCallback, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import DefaultInput from '../../common/DefaultInput';
import { loginUser } from '../../../services/api';

import './styles.css';
import AuthContext from '../../../contexts/AuthContext';

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
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const isValid = login && password;
    if (isValid) {
      try {
        const { data: user } = await loginUser(login, password);
        dispatch({
          type: 'LOGIN',
          payload: user,
        });
        history.push('/user');
      } catch (error) {
        setErrorMessage(error.response.data.reason);
      }
    } else {
      setErrorMessage('invalid');
    }
  }, [login, password]);


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
