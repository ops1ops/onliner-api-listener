import React, { useCallback, useContext, useState } from "react";

import { Alert, Button, FormControl, InputLabel, Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { registerUserAction } from "@root/client/store/actions";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../../contexts/AuthContext";
import { registerUser } from "../../../services/api";
import DefaultInput from "../../common/DefaultInput";

import "./styles.css";

const useStyles = makeStyles<Theme>(() => ({
  root: {
    "& > *": {
      margin: "8px",
    },
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const inputGroup = [
    { label: "Login", onChange: setLogin, value: login, type: "text" },
    { label: "Email", onChange: setEmail, value: email, type: "email" },
    { label: "Password", onChange: setPassword, value: password, type: "password" },
    {
      label: "Password Confirmation",
      onChange: setPasswordConfirmation,
      value: passwordConfirmation,
      type: "password",
    },
  ];

  const registerForm = inputGroup.map(({ label, onChange, value, type }) => (
    <FormControl key={`input${label}`} variant="outlined">
      <InputLabel htmlFor="component-outlined">{label}</InputLabel>
      <DefaultInput onChange={onChange} value={value} label={label} type={type} />
    </FormControl>
  ));

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      const arePasswordsMatched = password === passwordConfirmation;
      const areAllFieldsFilled = email && login && password && passwordConfirmation;

      if (!areAllFieldsFilled) {
        setErrorMessage("All fields are not filled");

        return;
      }

      if (!arePasswordsMatched) {
        setErrorMessage("Passwords dont match");

        return;
      }

      try {
        const { data: user } = await registerUser(login, email, password, passwordConfirmation);

        dispatch(registerUserAction(user));
        history.push("/");
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    },
    [email, login, password, passwordConfirmation],
  );

  return (
    <Paper elevation={3} className="formBox">
      <form className={classes.root} onSubmit={handleRegister}>
        <Typography gutterBottom variant="h5" component="h2">
          Register
        </Typography>
        {registerForm}
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
        <Link to="/login" className="signUpLink">
          <Button variant="contained" color="primary" className="signUpButton">
            Already have an account? Sign In
          </Button>
        </Link>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </form>
    </Paper>
  );
};

export default RegisterForm;
