import React from 'react';
import { Paper, Button, FormControl, OutlinedInput, InputLabel, Typography } from '@material-ui/core';
import './LoginForm.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
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
            onChange={(e) => setLogin(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Password</InputLabel>
          <OutlinedInput
            id="input-pass"
            value={password}
            label="Passwword"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Paper>
  );
}


export default LoginForm;
